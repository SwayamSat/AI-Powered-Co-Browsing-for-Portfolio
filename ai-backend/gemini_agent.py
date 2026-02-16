import google.generativeai as genai
import json
import os
import re
from models import ChatResponse, TextResponse, ToolCall
from tools_schema import TOOLS_SCHEMA

from google.generativeai.types import FunctionDeclaration, Tool
from google.ai import generativelanguage as glm

class GeminiAgent:
    def __init__(self, api_key: str, model_name: str = None):
        if model_name is None:
            model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
        
        genai.configure(api_key=api_key)
        
        # Convert TOOLS_SCHEMA to FunctionDeclarations
        self.tools = self._convert_schema_to_tools()
        
        self.model = genai.GenerativeModel(
            model_name,
            tools=self.tools
        )
        self.system_prompt = self._get_system_prompt()

    def _convert_schema_to_tools(self):
        """Converts internal tool schema to Gemini FunctionDeclaration objects."""
        funcs = []
        for tool_def in TOOLS_SCHEMA:
            # Deep copy and transform types
            fd = tool_def.copy()
            if "parameters" in fd:
                fd["parameters"] = self._transform_schema(fd["parameters"])
            funcs.append(fd)
        return funcs

    def _transform_schema(self, schema):
        """Recursively transforms schema types to glm.Type enums."""
        new_schema = schema.copy()
        
        # Map string types to glm.Type enums
        type_str = new_schema.get("type")
        if type_str == "object":
            new_schema["type"] = glm.Type.OBJECT
        elif type_str == "string":
            new_schema["type"] = glm.Type.STRING
        elif type_str == "number":
            new_schema["type"] = glm.Type.NUMBER
        elif type_str == "integer":
            new_schema["type"] = glm.Type.INTEGER
        elif type_str == "boolean":
            new_schema["type"] = glm.Type.BOOLEAN
        elif type_str == "array":
            new_schema["type"] = glm.Type.ARRAY
        
        # Handle properties recursively
        if "properties" in new_schema:
            new_props = {}
            for k, v in new_schema["properties"].items():
                new_props[k] = self._transform_schema(v)
            new_schema["properties"] = new_props
            
        return new_schema

    def _get_system_prompt(self) -> str:
        return """You are an AI co-browsing assistant embedded inside a developer portfolio website.

You will receive the "Current Page Content" as simplified HTML with key elements and attributes.

CRITICAL RULES FOR SELECTORS:
1. ONLY use valid CSS selectors that work with document.querySelector()
2. NEVER use [text="..."] - this is INVALID CSS
3. NEVER use :contains(...) - this is INVALID CSS

VALID SELECTOR STRATEGIES:
✅ Use IDs when available: #hero, #contact, #hero-hire-me, #hero-resume
✅ Use attributes: input[placeholder="Your Name"], a[href*="resume"]
✅ Use parent + child: #hero button, #contact input, section#hero a
✅ Use element type + attribute: button[id*="hire"], a[id*="resume"]

INVALID SELECTORS (DO NOT USE):
❌ button[text="..."] - text is not a valid attribute
❌ :contains("...") - not standard CSS
❌ :has-text("...") - not valid CSS

HOW TO FIND ELEMENTS:
1. Look for elements with IDs first (most reliable)
2. If no ID, use unique attributes (placeholder, href, type)
3. If neither, use parent context (#contact input, #hero button)
4. The HTML shows both the tag structure AND text content - use both!

EXAMPLES FROM THE PAGE CONTENT:
- To scroll to hero: target="#hero"
- To click hire me button: Look for <button id="hero-hire-me"> or <button id="nav-hire-me">
- To click download resume: Look for <button id="hero-resume"> or <a href="...resume...">
- To fill name: Look for <input id="contact-name"> or <input placeholder="Your Name">
- To fill email: Look for <input id="contact-email"> or <input placeholder="Your Email">

BEHAVIOR:
- Examine the provided HTML carefully
- Match user intent to visible elements
- Use the most specific selector available
- If you can't find an exact match, suggest alternatives or ask for clarification
- Call the appropriate tool when action is needed
"""

    async def process_message(self, message: str, page_content: str, history: list) -> ChatResponse:
        # Construct the full prompt
        context_prompt = f"Current Page Content:\n{page_content[:20000]}\n\n" # Increased limit to match extractor
        
        # Add history to prompt
        history_text = ""
        for item in history[-10:]: # Last 10 messages
            role = "User" if item.role == "user" else "AI"
            content = " ".join(item.parts)
            history_text += f"{role}: {content}\n"
        
        full_prompt = f"{self.system_prompt}\n\n{context_prompt}\nConversation History:\n{history_text}\nUser: {message}\nAI:"

        try:
            # We enable automatic function calling logic handling by the model
            response = await self.model.generate_content_async(full_prompt)
            
            # Check for safety blocking or empty response
            if response.prompt_feedback and response.prompt_feedback.block_reason:
                 return ChatResponse(response=TextResponse(content=f"I cannot answer that due to safety guidelines. (Reason: {str(response.prompt_feedback.block_reason)})"))

            if not response.parts:
                 return ChatResponse(response=TextResponse(content="I'm having trouble generating a response right now. Please try again."))

            # Iterate through all parts to find function calls or text
            function_call_part = None
            text_parts = []

            for part in response.parts:
                try:
                    if part.function_call:
                        function_call_part = part.function_call
                        break # Prioritize function call
                except:
                    pass
                
                try:
                    if part.text:
                        text_parts.append(part.text)
                except ValueError:
                    # part.text raises ValueError if it's a function call
                    pass
            
            if function_call_part:
                fc = function_call_part
                # Convert native function call to our JSON Action format
                tool_call = ToolCall(
                    type="action",
                    action=fc.name,
                    target=fc.args.get("target"),
                    value=fc.args.get("value")
                )
                return ChatResponse(response=tool_call)

            # Otherwise treat as text
            response_text = " ".join(text_parts).strip()
            if not response_text:
                 response_text = "I received a response but couldn't parse it."

            return ChatResponse(response=TextResponse(content=response_text))

        except Exception as e:
            print(f"Gemini Error Details: {e}")
            import traceback
            traceback.print_exc()
            return ChatResponse(response=TextResponse(content=f"I encountered an error processing your request: {str(e)}"))


import google.generativeai as genai
import json
import os
from models import ChatResponse, TextResponse, ToolCall
from tools_schema import TOOLS_SCHEMA

class GeminiAgent:
    def __init__(self, api_key: str, model_name: str = "gemini-1.5-flash"):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)
        self.system_prompt = self._get_system_prompt()

    def _get_system_prompt(self) -> str:
        return """You are an AI co-browsing assistant embedded inside a developer portfolio website.

You must:
- Use only the provided website content.
- Never hallucinate information.
- Maintain conversation context.
- Decide if user intent requires an action.
- If action required, respond ONLY in structured JSON.
- Never manipulate DOM directly.
- Ask clarifying questions if intent unclear.

Response format:

For normal message:
{
  "type": "message",
  "content": "..."
}

For tool call:
{
  "type": "action",
  "action": "scroll | navigate | click | highlight | input | focus",
  "target": "CSS selector",
  "value": "optional input value"
}

Strictly return valid JSON. Do not return Markdown code blocks (```json ... ```). Just the raw JSON object.
"""

    async def process_message(self, message: str, page_content: str, history: list) -> ChatResponse:
        # Construct the full prompt
        context_prompt = f"Current Page Content:\n{page_content[:8000]}\n\n" # Limit content length
        
        # Add history to prompt (simplistic approach for now, can be improved)
        history_text = ""
        for item in history[-10:]: # Last 10 messages
            role = "User" if item.role == "user" else "AI"
            content = " ".join(item.parts)
            history_text += f"{role}: {content}\n"
        
        full_prompt = f"{self.system_prompt}\n\n{context_prompt}\nConversation History:\n{history_text}\nUser: {message}\nAI:"

        try:
            response = self.model.generate_content(full_prompt)
            response_text = response.text.strip()
            
            # Remove markdown code blocks if present
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            response_text = response_text.strip()

            # Parse JSON
            try:
                data = json.loads(response_text)
            except json.JSONDecodeError:
                # Fallback if valid JSON is not returned
                return ChatResponse(response=TextResponse(content=response_text))
            
            # Validate against models
            if data.get("type") == "action":
                tool_call = ToolCall(**data)
                return ChatResponse(response=tool_call)
            elif data.get("type") == "message":
                text_response = TextResponse(**data)
                return ChatResponse(response=text_response)
            else:
                 return ChatResponse(response=TextResponse(content="Error: Unknown response type."))

        except Exception as e:
            print(f"Gemini Error: {e}")
            return ChatResponse(response=TextResponse(content="I encountered an error processing your request."))

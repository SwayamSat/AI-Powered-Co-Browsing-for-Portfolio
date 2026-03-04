import google.generativeai as genai
import json
import os
import re
from models import ChatResponse, TextResponse, ToolCall


class GeminiAgent:
    def __init__(self, api_key: str, model_name: str = None):
        if model_name is None:
            model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

        if not model_name.startswith("models/"):
            full_model_name = f"models/{model_name}"
        else:
            full_model_name = model_name

        self.model_name = full_model_name
        print(f"🛠️ GeminiAgent initialized with model_name: {full_model_name}")
        genai.configure(api_key=api_key)

        # No function-calling tools — we use structured JSON-in-text instead.
        # This gives us a single, fast, deterministic API call regardless of how
        # many actions the user requests.
        self.model = genai.GenerativeModel(full_model_name)
        self.system_prompt = self._get_system_prompt()

    # ── System prompt ────────────────────────────────────────────────────────────

    def _get_system_prompt(self) -> str:
        return """You are an AI co-browsing assistant embedded inside a developer portfolio website.

You will receive the "Current Page Content" as simplified HTML with key elements and attributes.

════════════════════════════════════════════════════════════════
RESPONSE FORMAT — ALWAYS output valid JSON. NO plain text ever.
════════════════════════════════════════════════════════════════

▸ Single action:
{"type":"action","action":"scroll","target":"#projects"}

▸ Multiple sequential actions — list EVERY step upfront in ONE response:
{"type":"actions","actions":[
  {"action":"navigate","target":"/"},
  {"action":"navigate","target":"/about"},
  {"action":"navigate","target":"/projects"},
  {"action":"navigate","target":"/experience"},
  {"action":"navigate","target":"/skills"},
  {"action":"navigate","target":"/education"},
  {"action":"navigate","target":"/achievements"},
  {"action":"navigate","target":"/services"},
  {"action":"navigate","target":"/contact"},
  {"action":"input","target":"#contact-name","value":"John Doe"},
  {"action":"input","target":"#contact-email","value":"john@example.com"},
  {"action":"input","target":"#contact-message","value":"Hello! I'd love to discuss a project."},
  {"action":"click","target":"button[type='submit']"}
]}

▸ Text / conversational reply:
{"type":"text","content":"Your message here"}

════════════════════════════════════════════════════════════════
AVAILABLE ACTIONS
════════════════════════════════════════════════════════════════
• navigate  – target = route path: "/", "/about", "/projects", "/experience",
               "/skills", "/education", "/achievements", "/services", "/contact"
• scroll    – target = CSS selector of element to scroll into view
• click     – target = CSS selector of element to click
• highlight – target = CSS selector of element to highlight with a glow
• input     – target = CSS selector of input/textarea; value = text to type
• focus     – target = CSS selector of element to focus

════════════════════════════════════════════════════════════════
VALID CSS SELECTORS
════════════════════════════════════════════════════════════════
✅ #hero  #contact  #contact-name  #contact-email  #contact-message
✅ input[placeholder="Your Name"]   button[type="submit"]
✅ #hero-hire-me   #hero-resume   #nav-hire-me
❌ NEVER use :contains()  [text=...]  :has-text()  xpath

════════════════════════════════════════════════════════════════
MULTI-STEP RULE (critical)
════════════════════════════════════════════════════════════════
Whenever the user asks for more than one thing (e.g. "go through all pages then
fill the contact form"), output ALL actions in a SINGLE "actions" JSON response.
Do NOT split them across multiple replies. Do NOT hold any steps back.
Output the complete plan in one shot.
"""

    # ── Main entry point ────────────────────────────────────────────────────────

    async def process_message(self, message: str, page_content: str, history: list) -> ChatResponse:
        context_prompt = f"Current Page Content:\n{page_content[:20000]}\n\n"

        history_text = ""
        for item in history[-10:]:
            role = "User" if item.role == "user" else "AI"
            content = " ".join(item.parts)
            history_text += f"{role}: {content}\n"

        full_prompt = (
            f"{self.system_prompt}\n\n"
            f"{context_prompt}"
            f"Conversation History:\n{history_text}\n"
            f"User: {message}\n"
            f"AI (JSON only):"
        )

        print(f"🚀 Single Gemini call — model: {self.model_name}")
        try:
            response = await self.model.generate_content_async(full_prompt)

            if response.prompt_feedback and response.prompt_feedback.block_reason:
                return ChatResponse(response=TextResponse(
                    content=f"I cannot answer that due to safety guidelines. "
                            f"(Reason: {str(response.prompt_feedback.block_reason)})"
                ))

            if not response.parts:
                return ChatResponse(response=TextResponse(
                    content="I'm having trouble generating a response right now. Please try again."
                ))

            # Collect raw text
            raw_text = ""
            for part in response.parts:
                try:
                    if part.text:
                        raw_text += part.text
                except Exception:
                    pass

            print(f"📥 Raw response ({len(raw_text)} chars): {raw_text[:300]}")

            # Extract and parse JSON
            json_str = self._extract_json(raw_text)
            if not json_str:
                # Gemini returned plain text despite instructions — wrap it
                return ChatResponse(response=TextResponse(content=raw_text.strip()))

            data = json.loads(json_str)
            resp_type = data.get("type", "text")

            # ── Multiple actions ────────────────────────────────────────────────
            if resp_type == "actions":
                actions = data.get("actions", [])
                tool_calls = [
                    ToolCall(
                        type="action",
                        action=a["action"],
                        target=a["target"],
                        value=a.get("value"),
                    )
                    for a in actions
                ]
                print(f"✅ Returning {len(tool_calls)} actions in ONE response")
                if len(tool_calls) == 1:
                    return ChatResponse(response=tool_calls[0])
                return ChatResponse(response=tool_calls)

            # ── Single action ───────────────────────────────────────────────────
            if resp_type == "action":
                return ChatResponse(response=ToolCall(
                    type="action",
                    action=data["action"],
                    target=data["target"],
                    value=data.get("value"),
                ))

            # ── Text response ────────────────────────────────────────────────────
            return ChatResponse(response=TextResponse(
                content=data.get("content", raw_text.strip())
            ))

        except json.JSONDecodeError as e:
            print(f"⚠️ JSON parse error: {e} | raw: {raw_text[:200]}")
            return ChatResponse(response=TextResponse(
                content=raw_text.strip() or "I couldn't format my response. Please try again."
            ))
        except Exception as e:
            print(f"❌ Gemini Error: {e}")
            import traceback
            traceback.print_exc()
            return ChatResponse(response=TextResponse(
                content=f"I encountered an error processing your request: {str(e)}"
            ))

    # ── Helpers ─────────────────────────────────────────────────────────────────

    def _extract_json(self, text: str) -> str | None:
        """Pull the first JSON object out of a string that may contain markdown fences."""
        text = text.strip()

        # Markdown code block: ```json { ... } ```
        block = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.DOTALL)
        if block:
            return block.group(1)

        # Bare JSON object anywhere in the string
        obj = re.search(r"\{.*\}", text, re.DOTALL)
        if obj:
            return obj.group(0)

        return None

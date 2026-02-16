from pydantic import BaseModel, Field
from typing import List, Optional, Literal, Union, Dict, Any

class Message(BaseModel):
    role: Literal["user", "model"]
    content: str
    
class HistoryItem(BaseModel):
    role: Literal["user", "model"]
    parts: List[str]

class ChatRequest(BaseModel):
    message: str
    page_content: str
    history: List[HistoryItem] = []

class ToolCall(BaseModel):
    type: Literal["action"] = "action"
    action: Literal["scroll", "navigate", "click", "highlight", "input", "focus"]
    target: str
    value: Optional[str] = None

class TextResponse(BaseModel):
    type: Literal["message"] = "message"
    content: str

class ChatResponse(BaseModel):
    response: Union[TextResponse, ToolCall]

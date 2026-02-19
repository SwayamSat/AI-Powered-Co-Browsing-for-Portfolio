from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gemini_agent import GeminiAgent
from models import ChatRequest, ChatResponse
import os
from dotenv import load_dotenv

from pathlib import Path

# Robustly load .env from the same directory as this file
env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path)
print(f"📂 Loading .env from: {env_path}")
print(f"📂 GEMINI_MODEL currently set to: {os.getenv('GEMINI_MODEL')}")

app = FastAPI()

# CORS
origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize agent
api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY or GEMINI_API_KEY must be set in environment")

try:
    model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    print(f"🤖 Initializing GeminiAgent with model: {model_name}")
    agent = GeminiAgent(api_key=api_key, model_name=model_name)
    print(f"✅ GeminiAgent initialized successfully")
except Exception as e:
    print(f"❌ Failed to initialize GeminiAgent: {e}")
    raise

@app.api_route("/health", methods=["GET", "POST", "HEAD"])
async def health():
    return {"status": "ok", "model": os.getenv("GEMINI_MODEL", "gemini-1.5-flash")}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Log the page content for debugging
        print(f"\n{'='*80}")
        print(f"📨 Received message: {request.message}")
        print(f"📄 Page content length: {len(request.page_content)} chars")
        print(f"📄 Page content preview (first 500 chars):")
        print(request.page_content[:500])
        print(f"{'='*80}\n")
        
        response = await agent.process_message(
            message=request.message,
            page_content=request.page_content,
            history=request.history
        )
        
        # Log the response
        print(f"\n{'='*80}")
        print(f"📤 Response type: {response.response.type if hasattr(response.response, 'type') else 'text'}")
        if hasattr(response.response, 'action'):
            print(f"🎯 Action: {response.response.action}")
            print(f"🎯 Target: {response.response.target}")
        else:
            content = response.response.content if hasattr(response.response, 'content') else str(response.response)
            print(f"💬 Content: {content[:200]}")
        print(f"{'='*80}\n")
        
        return response
    except Exception as e:
        print(f"❌ Error in chat endpoint: {e}")
        import traceback
        traceback.print_exc()
        # Return a generic error message to the client to prevent information leakage
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Debug endpoint to see what the AI sees
@app.post("/debug/page-content")
async def debug_page_content(request: ChatRequest):
    """Debug endpoint to see exactly what page content the AI receives"""
    return {
        "page_content": request.page_content,
        "length": len(request.page_content),
         "message": request.message,
         "history_count": len(request.history)
     }

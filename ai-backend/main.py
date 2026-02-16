from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gemini_agent import GeminiAgent
from models import ChatRequest, ChatResponse
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize agent
api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY or GEMINI_API_KEY must be set in environment")

try:
    agent = GeminiAgent(api_key=api_key)
    print(f"✅ GeminiAgent initialized successfully")
except Exception as e:
    print(f"❌ Failed to initialize GeminiAgent: {e}")
    raise

@app.get("/health")
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
        raise HTTPException(status_code=500, detail=str(e))

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

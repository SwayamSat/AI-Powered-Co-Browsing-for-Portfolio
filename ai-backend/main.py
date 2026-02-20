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

# CORS configuration
# Be very permissive for production deployment to avoid headers issues
raw_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
origins = [o.strip() for o in raw_origins if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False, # Credentials must be False if using "*"
    allow_methods=["*"],
    allow_headers=["*"],
)

print(f"🔒 CORS: origins={origins}")

# Initialize agent
api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
model_env = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

if not api_key:
    # Don't crash at startup in prod if key is missing, just log it
    # This prevents the whole container from dying if env var is missing for a second
    print("⚠️ WARNING: GOOGLE_API_KEY is missing!")
    agent = None
else:
    try:
        print(f"🤖 Initializing GeminiAgent with model: {model_env}")
        agent = GeminiAgent(api_key=api_key, model_name=model_env)
        print(f"✅ GeminiAgent initialized successfully")
    except Exception as e:
        print(f"❌ Failed to initialize GeminiAgent: {e}")
        agent = None

@app.api_route("/health", methods=["GET", "POST", "HEAD"])
async def health():
    return {
        "status": "ok", 
        "model": model_env,
        "agent_online": agent is not None,
        "allowed_origins": origins
    }

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not agent:
        raise HTTPException(status_code=503, detail="AI Agent is not initialized. Check GOOGLE_API_KEY.")
    
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
        
        # Log the response (using response.response because of the Pydantic model structure)
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

if __name__ == "__main__":
    import uvicorn
    # Render provides PORT environment variable
    port = int(os.environ.get("PORT", 8000))
    print(f"🚀 Starting server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)

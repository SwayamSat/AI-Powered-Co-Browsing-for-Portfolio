# AI Co-Browsing Portfolio Assistant

An advanced AI-powered co-browsing assistant integrated into a Next.js portfolio. It uses Google Gemini 1.5 Flash via a FastAPI backend to understand the website content and execute actions like scrolling, navigating, and highlighting elements.

## 🏗️ Architecture

```mermaid
graph TD
    User[User] -->|Chat Message| Frontend[Next.js Frontend]
    Frontend -->|POST /chat (Message + Page Content)| Backend[FastAPI Backend]
    Backend -->|History + Context + System Prompt| Gemini[Gemini 1.5 Flash API]
    Gemini -->|JSON Response (Action/Message)| Backend
    Backend -->|JSON Response| Frontend
    Frontend -->|Execute Action| DOM[DOM Manipulation]
```

## ✨ Features

- **Context-Aware Chat**: Understands the visible content of the portfolio.
- **Tool Execution**: Can scroll to sections, highlight elements, and navigate pages.
- **Streaming UI**: Real-time feedback with typing indicators.
- **Secure Integration**: API keys stored securely in the backend.

## 🚀 Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js 18+

### 1. Backend Setup

 Navigate to the `ai-backend` directory:
 ```bash
 cd ai-backend
 ```

 Install dependencies:
 ```bash
 pip install -r requirements.txt
 ```
 *Or if using uv:*
 ```bash
 uv sync
 ```

 Environment Variables:
 Create a `.env` file in `ai-backend` with:
 ```env
 GOOGLE_API_KEY=your_gemini_api_key
 # Optional: Override model if 1.5-flash is unavailable
 GEMINI_MODEL=gemini-1.5-flash
 ```

### Troubleshooting
- **Backend Error: "I encountered an error processing your request"**: Check the backend logs. It usually means the API Key is invalid or the model name is incorrect.
- **Model 404 Error**: If `gemini-1.5-flash` is not found, try setting `GEMINI_MODEL=gemini-2.0-flash-lite-001` in `.env`.


 Start the server:
 ```bash
 uvicorn main:app --reload --port 8000
 ```

### 2. Frontend Setup

 The frontend is a Next.js application. Ensure dependencies are installed:
 ```bash
 npm install
 ```

 Run the development server:
 ```bash
 npm run dev
 ```

## 🛠️ Usage

1. Open the portfolio in your browser (usually `http://localhost:3000`).
2. Click the floating chat icon in the bottom right using the `ChatWidget`.
3. Ask questions like "What projects have you built?" or "Scroll to the contact section".
4. The AI will respond and interact with the page.

## 📦 Deployment

- **Frontend**: Deploy to Vercel.
- **Backend**: Deploy to Render, Railway, or Fly.io.
- Ensure `GOOGLE_API_KEY` is set in the production environment variables.
- Update the API URL in `src/lib/api.ts` to point to the production backend.

## 🔒 Security

- CORS is configured to allow requests from the frontend domain.
- Input sanitization is performed on the frontend before sending to the backend.
- API keys are never exposed to the client.

## 🎥 Demo

Ask the AI:
- "Go to the projects section."
- "Highlight the most recent project."
- "Fill the contact form with sample data."

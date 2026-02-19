# AI Co-Browsing Portfolio Assistant

An advanced AI-powered co-browsing assistant integrated into a Next.js portfolio. It uses Google Gemini 1.5 Flash via a FastAPI backend to understand the website content and execute actions like scrolling, navigating, and highlighting elements.

## Architecture

This project consists of two main components:

1.  **Frontend (Next.js)**: A React-based portfolio website that hosts the chat interface and handles user interactions.
2.  **Backend (FastAPI)**: A Python-based API that processes chat messages, communicates with the Gemini API, and returns actions or responses.

**Data Flow:**

1.  User sends a message via the Chat Widget.
2.  Frontend captures the visible page content (DOM) and sends it along with the message to the Backend.
3.  Backend constructs a prompt with history and context, then sends it to the Gemini API.
4.  Gemini returns a structured response (JSON) containing either a text reply or a tool execution command (e.g., scroll, navigate).
5.  Backend forwards this response to the Frontend.
6.  Frontend displays the message or executes the requested action on the page.

## Setup Instructions

### Prerequisites

-   Python 3.9+
-   Node.js 18+

### 1. Backend Setup

Navigate to the `ai-backend` directory:

```bash
cd ai-backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

**Environment Variables:**

Create a `.env` file in the `ai-backend` directory with the following content:

```env
GOOGLE_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
ALLOWED_ORIGINS=http://localhost:3000,https://your-deployed-frontend.com
```

Start the server:

```bash
uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup

Navigate to the root directory (if not already there):

```bash
cd ..
```

Install dependencies:

```bash
npm install
```

**Environment Variables:**

Create a `.env.local` file in the root directory (or set these in your deployment platform):

```env
NEXT_PUBLIC_AI_BACKEND_URL=http://localhost:8000/chat
```

Run the development server:

```bash
npm run dev
```

Open the portfolio in your browser (usually `http://localhost:3000`).

## Gemini API Configuration

To use this project, you need a Google Gemini API key.

1.  Go to the [Google AI Studio](https://aistudio.google.com/).
2.  Create a new API key.
3.  Copy the key and paste it into your `ai-backend/.env` file as `GOOGLE_API_KEY`.

You can also configure the model usage by setting `GEMINI_MODEL` in the same `.env` file. The default is `gemini-1.5-flash`, but you can use other available models like `gemini-1.5-pro` if you have access.

## Deployment

### Frontend

-   Deploy to a platform like Vercel.
-   Set the `NEXT_PUBLIC_AI_BACKEND_URL` environment variable to your deployed backend URL.

### Backend

-   Deploy to a platform like Render, Railway, or Fly.io.
-   Set the `GOOGLE_API_KEY` and `GEMINI_MODEL` environment variables.
-   Set `ALLOWED_ORIGINS` to your frontend's deployed URL (e.g., `https://your-portfolio.vercel.app`) to enable CORS.

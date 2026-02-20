// Interfaces matching backend models

export interface ChatRequestPayload {
    message: string;
    page_content: string;
    history: HistoryItem[];
}

export interface HistoryItem {
    role: 'user' | 'model';
    parts: string[];
}

// Response types
export interface ToolCall {
    type: 'action';
    action: 'scroll' | 'navigate' | 'click' | 'highlight' | 'input' | 'focus';
    target: string;
    value?: string;
}

export interface TextResponse {
    type: 'message';
    content: string;
}

export type ChatResponsePayload = ToolCall | TextResponse;


const API_URL = process.env.NEXT_PUBLIC_AI_BACKEND_URL || 'http://localhost:8000/chat';

export async function sendChatMessage(payload: ChatRequestPayload): Promise<ChatResponsePayload> {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        // The backend returns { response: Object }, we want the inner object
        return data.response;
    } catch (error) {
        console.error('Chat API Error:', error);
        console.error('Attempted to call URL:', API_URL);

        // Help the user identify common issues in production
        if (typeof window !== 'undefined') {
            console.log('%c [Chat Diagnostic] %c Checking connection to: ' + API_URL, 'background: #222; color: #bada55', 'color: #fff');
            if (API_URL.includes('localhost')) {
                console.warn('[Chat Diagnostic] WARNING: You are calling localhost from a deployed site. This will not work. Set NEXT_PUBLIC_AI_BACKEND_URL in Vercel.');
            }
        }

        // Fallback error message
        return {
            type: 'message',
            content: 'I am taking a moment to think. Please try again briefly.'
        };
    }
}

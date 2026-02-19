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


const API_URL = 'http://localhost:8000/chat'; // Ensure this matches backend port

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
        // Fallback error message
        return {
            type: 'message',
            content: 'I am taking a moment to think. Please try again briefly.'
        };
    }
}

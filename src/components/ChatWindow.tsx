"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from './MessageBubble';
import { sendChatMessage, HistoryItem } from '../services/api';
import { getVisiblePageContent } from '../services/domExtractor';
import { executeTool } from './ToolExecutor';

interface ChatWindowProps {
    onClose: () => void;
}

interface MessageState {
    role: 'user' | 'model';
    content: string;
    type: 'message' | 'action';
}

import { useRouter } from 'next/navigation';

export const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
    const router = useRouter();
    const [messages, setMessages] = useState<MessageState[]>([
        { role: 'model', content: "Hi! I'm your AI co-browsing assistant. Ask me anything about this portfolio or getting around!", type: 'message' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg, type: 'message' }]);
        setIsLoading(true);

        try {
            const pageContent = getVisiblePageContent();

            // Convert local state to API history format
            const history: HistoryItem[] = messages.filter(m => m.type === 'message').map(m => ({
                role: m.role,
                parts: [m.content]
            }));

            const response = await sendChatMessage({
                message: userMsg,
                page_content: pageContent,
                history: history
            });

            if (response.type === 'action') {
                setMessages(prev => [...prev, { role: 'model', content: `Executing action: ${response.action} ${response.target}`, type: 'action' }]);

                // Execute tool
                const success = executeTool(response, router);

                // Optionally, the AI could follow up, but for now we just show what happened.
                if (!success) {
                    setMessages(prev => [...prev, { role: 'model', content: "I couldn't complete that action. Could you try rephrasing?", type: 'message' }]);
                }

            } else {
                setMessages(prev => [...prev, { role: 'model', content: response.content, type: 'message' }]);
            }

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'model', content: "Sorry, I ran into an error. Please try again.", type: 'message' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-background/95 backdrop-blur-sm border rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b bg-muted/50">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <h3 className="font-semibold text-sm">AI Copilot</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <ScrollArea className="flex-1 p-4">
                {messages.map((msg, idx) => (
                    <MessageBubble key={idx} role={msg.role} content={msg.content} isAction={msg.type === 'action'} />
                ))}
                {isLoading && (
                    <div className="flex items-center gap-2 text-muted-foreground text-xs p-2">
                        <Loader2 className="h-3 w-3 animate-spin" /> Thinking...
                    </div>
                )}
                <div ref={scrollRef} />
            </ScrollArea>

            <div className="p-3 border-t bg-background">
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask or tell me to scroll..."
                        className="flex-1"
                        disabled={isLoading}
                    />
                    <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

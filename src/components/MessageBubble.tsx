"use client";

import React from 'react';
import { cn } from '@/lib/utils'; // Assuming shadcn/ui utils exist
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
    role: 'user' | 'model';
    content: string | React.ReactNode;
    isAction?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content, isAction }) => {
    const isUser = role === 'user';

    return (
        <div
            className={cn(
                "flex w-full items-start gap-2 mb-4",
                isUser ? "flex-row-reverse" : "flex-row"
            )}
        >
            <div
                className={cn(
                    "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border",
                    isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
            >
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div
                className={cn(
                    "relative max-w-[80%] rounded-lg px-3 py-2 text-sm",
                    isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground border border-border",
                    isAction && "font-mono text-xs border-dashed border-yellow-500 bg-yellow-50/10"
                )}
            >
                {content}
            </div>
        </div>
    );
};

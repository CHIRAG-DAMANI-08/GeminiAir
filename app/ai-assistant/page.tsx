"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

export default function AIChatAssistant() {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState<{ user: string; assistant: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        setIsLoading(true);
        setMessages((prev) => [...prev, { user: userInput, assistant: '' }]);
        setUserInput('');

        try {
            const assistantResponse = await getAssistantResponse(userInput);
            setMessages((prev) => {
                const updatedMessages = [...prev];
                updatedMessages[updatedMessages.length - 1].assistant = assistantResponse;
                return updatedMessages;
            });
        } catch (error) {
            console.error('Error fetching response from assistant:', error);
            alert('Failed to get response from the assistant');
        } finally {
            setIsLoading(false);
        }
    };

    const getAssistantResponse = async (input: string) => {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: input }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response from assistant');
        }

        const data = await response.json();
        return data.aiMessage;
    };

    const renderMarkdown = (text: string) => {
        return text.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
                return <h1 key={index} className="text-2xl font-bold my-2">{line.slice(2)}</h1>;
            } else if (line.startsWith('## ')) {
                return <h2 key={index} className="text-xl font-bold my-2">{line.slice(3)}</h2>;
            } else if (line.startsWith('### ')) {
                return <h3 key={index} className="text-lg font-bold my-2">{line.slice(4)}</h3>;
            } else if (line.startsWith('- ')) {
                return <li key={index} className="ml-4 my-1">{line.slice(2)}</li>;
            } else if (line.match(/`[^`]+`/)) {
                return (
                    <p key={index} className="my-2">
                        {line.split(/(`[^`]+`)/).map((part, i) => 
                            part.startsWith('`') && part.endsWith('`') 
                                ? <code key={i} className="bg-gray-800 px-1 rounded">{part.slice(1, -1)}</code>
                                : part
                        )}
                    </p>
                );
            } else {
                return <p key={index} className="my-2">{line}</p>;
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <Link href="/" className="absolute top-4 left-4 flex items-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-all duration-300">
                <span className="mr-2">Back to Dashboard</span>
            </Link>
            <Card className="w-full max-w-3xl bg-gray-800 shadow-lg rounded-lg mt-10">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold flex items-center justify-center">
                        <MessageSquare className="mr-2" />
                        Travel Assistant Chatbot
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col space-y-4">
                        <div ref={chatContainerRef} className="overflow-y-auto h-[60vh] border border-gray-700 rounded-md p-4">
                            {messages.map((msg, index) => (
                                <div key={index} className="mb-4">
                                    <div className="font-semibold text-blue-400">You:</div>
                                    <div className="bg-blue-900 p-2 rounded-md">{msg.user}</div>
                                    {msg.assistant && (
                                        <>
                                            <div className="font-semibold text-green-400 mt-2">Assistant:</div>
                                            <div className="bg-gray-700 p-2 rounded-md">
                                                {renderMarkdown(msg.assistant)}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex">
                            <Input
                                type="text"
                                placeholder="Type your message..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className="flex-1 bg-gray-700 text-white placeholder-gray-400"
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <Button 
                                onClick={handleSendMessage} 
                                className="ml-2 bg-blue-600 hover:bg-blue-500"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send'}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
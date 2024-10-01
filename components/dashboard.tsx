'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Bell, User, Home, Plane, UserCircle, Calendar, BarChart2, Glasses, Settings, Bot, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Plane, label: 'Flight Dashboard', href: '/flight-dashboard' },
    { icon: UserCircle, label: 'User Profile', href: '/user-profile' },
    { icon: Calendar, label: 'Bookings', href: '/bookings' },
    { icon: BarChart2, label: 'Analytics', href: '/analytics' },
    { icon: Glasses, label: 'XR Experience', href: '/xr-experience' },
    { icon: Settings, label: 'Settings', href: '/settings' },
]

const Dashboard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname()
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([])
    const [inputMessage, setInputMessage] = useState('')

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            setChatMessages([...chatMessages, { role: 'user', content: inputMessage }])
            // Simulate AI response (replace with actual AI integration)
            setTimeout(() => {
                setChatMessages(prev => [...prev, { role: 'bot', content: 'I can help you with that. What specific information do you need about booking a flight?' }])
            }, 1000)
            setInputMessage('')
        }
    }

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-64 bg-muted/40 border-r p-6 space-y-4">
                <h1 className="text-2xl font-bold">GeminiAir</h1>
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} passHref>
                            <Button
                                variant={pathname === item.href ? "secondary" : "ghost"}
                                className="w-full justify-start"
                            >
                                <item.icon className="mr-2 h-4 w-4"/>
                                {item.label}
                            </Button>
                        </Link>
                    ))}
                </nav>
            </aside>
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="border-b p-4 flex justify-end items-center space-x-4">
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5"/>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <User className="h-5 w-5"/>
                    </Button>
                </header>

                {/* Main content area */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>

                {/* Footer */}
                <footer className="border-t p-4 text-center text-sm text-muted-foreground">
                    © 2024 GeminiAir. All rights reserved.
                </footer>
            </div>

    {/* AI Bot Button and Chat Interface */
    }
    {
        isChatOpen ? (
            <Card className="fixed bottom-4 right-4 w-80 h-96 flex flex-col">
                <CardContent className="flex flex-col h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">AI Assistant</h3>
                        <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)}>
                            <X className="h-4 w-4"/>
                        </Button>
                    </div>
                    <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                        {chatMessages.map((msg, index) => (
                            <div key={index}
                                 className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[80%] p-2 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex space-x-2">
                            <Input
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message..."
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <Button onClick={handleSendMessage}>Send</Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Button
                    className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg"
                    onClick={() => setIsChatOpen(true)}
                >
                    <Bot className="h-6 w-6" />
                </Button>
            )}
        </div>
    )
}

export default Dashboard
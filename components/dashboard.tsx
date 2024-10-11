// components/dashboard.tsx
"use client"

import { useState } from 'react'
import { Bell, Menu, Plane, UserCircle, BarChart2, Glasses, Home, Calendar, Settings, MessageSquare, Gift } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTheme } from "next-themes"

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { setTheme } = useTheme()
 // State for the travel tips modal

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Plane, label: 'Flight Dashboard', href: '/flight-dashboard' },
    { icon: UserCircle, label: 'User Profile', href: '/user-profile' },
    { icon: Calendar, label: 'Bookings', href: '/bookings' },
    { icon: BarChart2, label: 'Analytics', href: '/analytics' },
    { icon: Glasses, label: 'XR Experience', href: '/xr-experience' },
    { icon: MessageSquare, label: 'AI Assistant', href: '/ai-assistant' },
    { icon: Gift, label: 'Loyalty Program', href: '/loyalty-program' },
    { icon: Settings, label: 'Settings', href: '/settings' }, // Open modal on click
  ];

  return (
    <div className="flex h-screen bg-background">
      <div className="hidden md:flex flex-col w-[240px] border-r bg-muted/40">
        <div className="p-6">
          <h1 className="text-2xl font-bold">GeminiAir ✈️</h1>
        </div>
        <nav className="flex flex-col space-y-2 px-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant={pathname === item.href ? "secondary" : "ghost"} className="justify-start w-full" >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {children}
          </div>
        </main>
        <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
          © 2024 GeminiAir. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
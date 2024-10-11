"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Dashboard from '@/components/dashboard'

export default function UserProfilePage() {
  return (
    <Dashboard>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>John Doe</CardTitle>
                <CardDescription>Premium Member</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value="john.doe@example.com" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value="+1 (555) 123-4567" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value="123 Main St, Anytown, USA" readOnly />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Edit Profile</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Loyalty Program</CardTitle>
            <CardDescription>Your current status and points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">Gold Status</p>
                <p className="text-sm text-muted-foreground">Valid until Dec 31, 2024</p>
              </div>
              <div>
                <p className="text-2xl font-bold">50,000</p>
                <p className="text-sm text-muted-foreground">Points Balance</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View Benefits</Button>
          </CardFooter>
        </Card>
      </div>
    </Dashboard>
  )
}
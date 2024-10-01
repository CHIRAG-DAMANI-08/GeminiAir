'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Lightbulb } from 'lucide-react'

export default function UserProfile() {
    const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

    const handlePreferenceChange = () => {
        // Simulating AI-generated suggestions based on user preferences
        setAiSuggestions([
            "Based on your seat preference, we recommend booking flights GA101 and GA303 for your upcoming trips.",
            "Your dietary requirements suggest you might enjoy our new in-flight menu on international routes.",
            "Consider trying our XR meditation experience to help with jet lag on your long-haul flights."
        ])
    }

    return (
        <>
            <h2 className="text-3xl font-bold tracking-tight mb-6">User Profile</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="seatPreference">Seat Preference</Label>
                        <Select onValueChange={handlePreferenceChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select seat preference" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="window">Window</SelectItem>
                                <SelectItem value="aisle">Aisle</SelectItem>
                                <SelectItem value="middle">Middle</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dietaryRequirements">Dietary Requirements</Label>
                        <Textarea
                            id="dietaryRequirements"
                            placeholder="Enter any dietary requirements or allergies"
                            onChange={handlePreferenceChange}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Changes</Button>
                </CardFooter>
            </Card>

            {aiSuggestions.length > 0 && (
                <Alert className="mt-6">
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>AI-Powered Suggestions</AlertTitle>
                    <AlertDescription>
                        <ul className="list-disc pl-4">
                            {aiSuggestions.map((suggestion, index) => (
                                <li key={index}>{suggestion}</li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            )}
        </>
    )
}
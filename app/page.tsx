'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Plane, Sun, Cloud, Umbrella } from 'lucide-react'
import Dashboard from '@/components/dashboard'
import Link from 'next/link'
import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY

export default function HomePage() {
    const [quote, setQuote] = useState("")
    const [weather, setWeather] = useState({ temp: 0, condition: "sunny", city: "" })
    const [weatherLoading, setWeatherLoading] = useState(true)
    const [weatherError, setWeatherError] = useState<string | null>(null)
    const [fact, setFact] = useState("")

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude)
                },
                (error) => {
                    console.error("Error getting user location:", error)
                    fetchWeather() // Fallback to default location
                },
                { maximumAge: 60000, timeout: 5000 } // Cache the location for 1 minute
            )
        } else {
            console.log("Geolocation is not supported by this browser.")
            fetchWeather() // Fallback to default location
        }
    }

    useEffect(() => {
        fetchQuote()
        getUserLocation()
        fetchFact()
    }, [fetchQuote, getUserLocation, fetchFact]) // Add this dependency array

    const fetchQuote = async () => {
        const quotes = [
            "Adventure is worthwhile in itself. – Amelia Earhart",
            "Travel makes one modest. You see what a tiny place you occupy in the world. – Gustave Flaubert",
            "The world is a book and those who do not travel read only one page. – St. Augustine",
        ]
        setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }

    const fetchWeather = async (lat = 51.5074, lon = -0.1278) => {
        setWeatherLoading(true)
        setWeatherError(null)
        console.log('API Key:', API_KEY) // Add this line
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
            
            console.log('Weather API response:', response.data)

            setWeather({
                temp: Math.round(response.data.main.temp),
                condition: response.data.weather[0].main.toLowerCase(),
                city: response.data.name
            })
        } catch (error) {
            console.error("Error fetching weather data:", error)
            if (axios.isAxiosError(error)) {
                console.error("API Error response:", error.response?.data)
                setWeatherError(error.response?.data?.message || "Failed to fetch weather data")
            } else {
                setWeatherError("An unexpected error occurred")
            }
        } finally {
            setWeatherLoading(false)
        }
    }

    const fetchFact = async () => {
        const facts = [
            "The world's longest flight is from Singapore to New York, lasting almost 19 hours.",
            "The busiest airport in the world is Hartsfield-Jackson Atlanta International Airport.",
            "The shortest commercial flight is between Westray and Papa Westray in Scotland's Orkney Islands, lasting just 2 minutes.",
        ]
        setFact(facts[Math.floor(Math.random() * facts.length)])
    }

    const dashboardContent = (
        <>
            <h1 className="text-3xl font-bold mb-6">Welcome to Your Travel Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Links</CardTitle>
                        <CardDescription>Access your most used features</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <Link href="/flight-dashboard" passHref>
                                <Button variant="outline" className="w-full justify-start">
                                    Search Flights
                                </Button>
                            </Link>
                            <Link href="/bookings" passHref>
                                <Button variant="outline" className="w-full justify-start">
                                    View Bookings
                                </Button>
                            </Link>
                            <Link href="/travel-tips" passHref>
                                <Button variant="outline" className="w-full justify-start">
                                    Travel Tips
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5" />
                            Inspirational Quote
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="italic">{quote}</p>
                        <Button onClick={fetchQuote} className="mt-4">New Quote</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plane className="h-5 w-5" />
                            Travel Fact
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{fact}</p>
                        <Button onClick={fetchFact} className="mt-4">New Fact</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {weather.condition === "sunny" && <Sun className="h-5 w-5" />}
                            {weather.condition === "cloudy" && <Cloud className="h-5 w-5" />}
                            {weather.condition === "rainy" && <Umbrella className="h-5 w-5" />}
                            Weather at Your Location
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {weatherLoading ? (
                            <p>Loading weather data...</p>
                        ) : weatherError ? (
                            <p className="text-red-500">{weatherError}</p>
                        ) : (
                            <>
                                <p>Temperature: {weather.temp}°C</p>
                                <p>Condition: {weather.condition}</p>
                            </>
                        )}
                        <Button onClick={() => getUserLocation()} className="mt-4" disabled={weatherLoading}>
                            Refresh Weather
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    )

    return <Dashboard>{dashboardContent}</Dashboard>
}

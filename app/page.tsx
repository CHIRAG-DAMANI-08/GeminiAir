'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Plane, Sun, Cloud, Umbrella } from 'lucide-react'
import Dashboard from '@/components/dashboard'
import Link from 'next/link'
import TravelTipsModal from "@/components/TravelTipsModal";
import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export default function HomePage() {
    const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);
    const [quote, setQuote] = useState("")
    const [currentWeather, setCurrentWeather] = useState<any>(null); // State for current weather
    const [weatherLoading, setWeatherLoading] = useState(true)
    const [weatherError, setWeatherError] = useState<string | null>(null)
    const [fact, setFact] = useState("")

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchCurrentWeather(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    fetchCurrentWeather(); // Fallback to default location
                },
                { maximumAge: 60000, timeout: 5000 } // Cache the location for 1 minute
            )
        } else {
            console.log("Geolocation is not supported by this browser.");
            fetchCurrentWeather(); // Fallback to default location
        }
    }

    useEffect(() => {
        fetchQuote();
        getUserLocation();
        fetchFact();
    }, [])

    const fetchQuote = async () => {
        const quotes = [
            "Adventure is worthwhile in itself. – Amelia Earhart",
            "Travel makes one modest. You see what a tiny place you occupy in the world. – Gustave Flaubert",
            "The world is a book and those who do not travel read only one page. – St. Augustine",
        ]
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }

    const fetchCurrentWeather = async (lat = 51.5074, lon = -0.1278) => {
        setWeatherLoading(true);
        setWeatherError(null);
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            console.log("Current Weather Data:", response.data);
            setCurrentWeather(response.data);
        } catch (error) {
            console.error("Error fetching current weather:", error);
            setWeatherError("Failed to fetch current weather data");
        } finally {
            setWeatherLoading(false);
        }
    }

    const fetchFact = async () => {
        const facts = [
            "The world's longest flight is from Singapore to New York, lasting almost 19 hours.",
            "The busiest airport in the world is Hartsfield-Jackson Atlanta International Airport.",
            "The shortest commercial flight is between Westray and Papa Westray in Scotland's Orkney Islands, lasting just 2 minutes.",
        ]
        setFact(facts[Math.floor(Math.random() * facts.length)]);
    }

    const getWeatherEmoji = (code: number) => {
        switch (code) {
            case 200: // Thunderstorm
            case 201:
            case 202:
                return '⛈️';
            case 300: // Drizzle
            case 301:
            case 302:
                return '🌧️';
            case 500: // Rain
            case 501:
            case 502:
                return '🌧️';
            case 600: // Snow
            case 601:
            case 602:
                return '❄️';
            case 800: // Clear
                return '☀️';
            case 801: // Few clouds
            case 802:
                return '☁️';
            default:
                return '🌈'; // Default emoji
        }
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
                            <Button variant="outline" className="w-full justify-start" onClick={() => setIsTipsModalOpen(prev => !prev)}>
                                Travel Tips
                            </Button>
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
                        <CardTitle>Current Weather</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {weatherLoading ? (
                            <p>Loading weather data...</p>
                        ) : weatherError ? (
                            <p className="text-red-500">{weatherError}</p>
                        ) : currentWeather ? (
                            <div className="flex items-center justify-between">
                                <span>{currentWeather.name}</span>
                                {currentWeather.weather && currentWeather.weather.length > 0 ? (
                                    <span>
                                        {getWeatherEmoji(currentWeather.weather[0].id)} {Math.round(currentWeather.main.temp)}°C
                                    </span>
                                ) : (
                                    <span>No weather information available</span>
                                )}
                            </div>
                        ) : (
                            <p>No weather data available.</p>
                        )}
                        <Button onClick={() => getUserLocation()} className="mt-4" disabled={weatherLoading}>
                            Refresh Weather
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Conditionally render the modal */}
            {isTipsModalOpen && (
                <TravelTipsModal isOpen={isTipsModalOpen} onClose={() => setIsTipsModalOpen(false)} />
            )}

            {/* TODO: Implement weekly weather fetching and display */}
        </>
    )

    return <Dashboard>{dashboardContent}</Dashboard>
}
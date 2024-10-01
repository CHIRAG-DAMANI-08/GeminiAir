'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Sparkles } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function BookingPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
    const [searchParams, setSearchParams] = useState({
        from: '',
        to: '',
        date: '',
    });
    const [availableFlights, setAvailableFlights] = useState<Flight[]>([]);
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        const mockBookings: Booking[] = [
            { id: 1, flight: 'FL001', from: 'New York', to: 'London', date: '2023-12-01', status: 'Confirmed', price: 200.00 },
            { id: 2, flight: 'FL002', from: 'Paris', to: 'Tokyo', date: '2023-12-15', status: 'Pending', price: 300.00 },
        ];
        setBookings(mockBookings);
    };

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Simulating API call to search for flights
        const mockFlights: Flight[] = [
            { id: 3, flight: 'FL003', from: searchParams.from, to: searchParams.to, date: searchParams.date, price: 299.99 },
            { id: 4, flight: 'FL004', from: searchParams.from, to: searchParams.to, date: searchParams.date, price: 349.99 },
        ];
        setAvailableFlights(mockFlights);
    };

    const handleBooking = async (flight: Flight) => {
        // Simulating API call to book a flight
        const newBooking: Booking = {
            id: bookings.length + 1,
            ...flight,
            status: 'Confirmed'
        };
        setBookings([...bookings, newBooking]);
        setAvailableFlights(availableFlights.filter(f => f.id !== flight.id));
    };

    const handleCancelBooking = async (bookingId: number) => {
        // Simulating API call to cancel a booking
        setBookings(bookings.filter(booking => booking.id !== bookingId));
    };

    const generateRecommendations = async () => {
        const mockRecommendations = [
            "Consider booking your return flight now for better rates.",
            "The weather in your destination might be rainy, pack accordingly.",
            "There's a popular festival in your destination city during your travel dates."
        ];
        setAiRecommendations(mockRecommendations);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Flight Bookings</h1>
            
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Search Flights</CardTitle>
                    <CardDescription>Find your next adventure</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <Input
                            placeholder="From"
                            value={searchParams.from}
                            onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
                        />
                        <Input
                            placeholder="To"
                            value={searchParams.to}
                            onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
                        />
                        <Input
                            type="date"
                            value={searchParams.date}
                            onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                        />
                        <Button type="submit">Search</Button>
                    </form>
                </CardContent>
            </Card>

            {availableFlights.length > 0 && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Available Flights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Flight</TableHead>
                                    <TableHead>From</TableHead>
                                    <TableHead>To</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {availableFlights.map((flight) => (
                                    <TableRow key={flight.id}>
                                        <TableCell>{flight.flight}</TableCell>
                                        <TableCell>{flight.from}</TableCell>
                                        <TableCell>{flight.to}</TableCell>
                                        <TableCell>{flight.date}</TableCell>
                                        <TableCell>${flight.price.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleBooking(flight)}>
                                                Book
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Your Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Flight</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>To</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>{booking.flight}</TableCell>
                                    <TableCell>{booking.from}</TableCell>
                                    <TableCell>{booking.to}</TableCell>
                                    <TableCell>{booking.date}</TableCell>
                                    <TableCell>{booking.status}</TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline">Manage</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Manage Booking</DialogTitle>
                                                </DialogHeader>
                                                <div className="flex flex-col gap-4">
                                                    <p>Flight: {booking.flight}</p>
                                                    <p>From: {booking.from} To: {booking.to}</p>
                                                    <p>Date: {booking.date}</p>
                                                    <p>Status: {booking.status}</p>
                                                    <Button 
                                                        variant="destructive"
                                                        onClick={() => handleCancelBooking(booking.id)}
                                                    >
                                                        Cancel Booking
                                                    </Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        AI Travel Recommendations
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {aiRecommendations.length > 0 ? (
                        <ul className="list-disc pl-5">
                            {aiRecommendations.map((recommendation, index) => (
                                <li key={index}>{recommendation}</li>
                            ))}
                        </ul>
                    ) : (
                        <Alert>
                            <AlertTitle>No recommendations yet</AlertTitle>
                            <AlertDescription>
                                Click the button below to generate AI-powered travel recommendations.
                            </AlertDescription>
                        </Alert>
                    )}
                    <Button onClick={generateRecommendations} className="mt-4">
                        Generate Recommendations
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

interface Booking {
    id: number;
    flight: string;
    from: string;
    to: string;
    date: string;
    status: string;
    price: number;
}

interface Flight {
    id: number;
    flight: string;
    from: string;
    to: string;
    date: string;
    price: number;
}
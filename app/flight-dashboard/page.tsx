"use client";
//@ts-ignore
import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { Button } from "@/components/ui/button"; // Keep your existing button import
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardStack } from "@/components/ui/card-stack";
import { Input } from "@/components/ui/input";

const fetchFlights = async () => {
  const response = await axios.get('/api/flights');
  return response.data.data;
};

const funFacts = [
  {
    id: 1,
    name: "Fun Fact #1",
    designation: "Flight Trivia",
    content: "✈️ Did you know? The longest commercial flight is from Singapore to New York, lasting about 18 hours!",
  },
  {
    id: 2,
    name: "Fun Fact #2",
    designation: "Flight Trivia",
    content: "🌍 On average, a commercial airplane flies at an altitude of 35,000 feet.",
  },
  {
    id: 3,
    name: "Fun Fact #3",
    designation: "Flight Trivia",
    content: "🏙️ The world's busiest airport by passenger traffic is Hartsfield-Jackson Atlanta International Airport (ATL).",
  },
  {
    id: 4,
    name: "Fun Fact #4",
    designation: "Flight Trivia",
    content: "🛫 The first commercial flight took place in 1914, flying from St. Petersburg to Tampa, Florida.",
  },
  {
    id: 5,
    name: "Fun Fact #5",
    designation: "Flight Trivia",
    content: "🧳 The average passenger carries about 2.5 bags on a flight.",
  },
  {
    id: 6,
    name: "Fun Fact #6",
    designation: "Flight Trivia",
    content: "🌟 The Concorde was the first supersonic passenger aircraft, flying at speeds over twice the speed of sound!",
  },
];

export default function Page() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFacts, setShowFacts] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFetchFlights = async () => {
    setLoading(true);
    try {
      const flightData = await fetchFlights();
      setFlights(flightData);
      setFilteredFlights(flightData);
      toast.success('Real-time flights fetched successfully!');
      setShowFacts(false);
    } catch (err) {
      toast.error('Failed to fetch flight data');
      console.error('Error fetching flight data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = term ? flights.filter(flight =>
      flight.flight?.iata?.toLowerCase().includes(term) ||
      flight.airline?.name?.toLowerCase().includes(term) ||
      flight.departure?.airport?.toLowerCase().includes(term) ||
      flight.arrival?.airport?.toLowerCase().includes(term)
    ) : flights;

    setFilteredFlights(filtered);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Real-time Flight Dashboard</h2>
      
      {showFacts ? (
        <div className="mb-12 mt-20 flex flex-col items-center">
          <CardStack items={funFacts} offset={10} scaleFactor={0.06} />
        </div>
      ) : null}

      <div className="flex justify-center mb-8">
        {/* Replace the button with the Aceternity UI button */}
        <Button onClick={handleFetchFlights} disabled={loading} className="flex items-center">
          {loading ? <Loader className="animate-spin mr-2" /> : null}
          Fetch Real-time Flights
        </Button>
      </div>

      {!showFacts && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Real-time Flights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search flights..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            {loading ? (
              <div className="flex justify-center">
                <Loader className="animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Flight</TableHead>
                      <TableHead>Airline</TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFlights.map((flight) => (
                      <TableRow key={`${flight.flight.iata}-${flight.departure.scheduled}`}>
                        <TableCell>{flight.flight.iata}</TableCell>
                        <TableCell>{flight.airline.name}</TableCell>
                        <TableCell>{flight.departure.airport}</TableCell>
                        <TableCell>{flight.arrival.airport}</TableCell>
                        <TableCell>{flight.flight_status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Toaster />
    </div>
  );
}
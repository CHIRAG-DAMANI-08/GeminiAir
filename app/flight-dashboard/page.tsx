import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from 'lucide-react'

const flights = [
    { id: 1, number: 'GA101', destination: 'New York', departure: '10:00 AM', status: 'On Time', gate: 'A1', aiPrediction: 'High chance of on-time arrival' },
    { id: 2, number: 'GA202', destination: 'London', departure: '11:30 AM', status: 'Delayed', gate: 'B2', aiPrediction: 'Possible further delays due to weather' },
    { id: 3, number: 'GA303', destination: 'Tokyo', departure: '1:00 PM', status: 'Boarding', gate: 'C3', aiPrediction: 'Smooth flight expected' },
    { id: 4, number: 'GA404', destination: 'Paris', departure: '3:30 PM', status: 'On Time', gate: 'D4', aiPrediction: 'Potential turbulence mid-flight' },
]

export default function Page() {
    return (
        <>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Flight Dashboard</h2>
            <Alert className="mb-6">
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>AI-Powered Insights</AlertTitle>
                <AlertDescription>
                    Our AI system analyzes real-time data to provide predictions and insights for each flight.
                </AlertDescription>
            </Alert>
            <Card>
                <CardHeader>
                    <CardTitle>Today's Flights</CardTitle>
                    <CardDescription>Live updates on all GeminiAir flights with AI predictions</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Flight</TableHead>
                                <TableHead>Destination</TableHead>
                                <TableHead>Departure</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Gate</TableHead>
                                <TableHead>AI Prediction</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {flights.map((flight) => (
                                <TableRow key={flight.id}>
                                    <TableCell className="font-medium">{flight.number}</TableCell>
                                    <TableCell>{flight.destination}</TableCell>
                                    <TableCell>{flight.departure}</TableCell>
                                    <TableCell>
                                        <Badge variant={flight.status === 'Delayed' ? 'destructive' : 'default'}>
                                            {flight.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{flight.gate}</TableCell>
                                    <TableCell>{flight.aiPrediction}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}
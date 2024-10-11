'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Brain } from 'lucide-react'
import Modal from "@/components/ui/Modal"
import axios from 'axios'

interface AnalyticsData {
  revenue: number
  bookings: number
  activeUsers: number
  satisfaction: number
  monthlyData: { name: string; total: number }[]
}

const initialData: AnalyticsData = {
  revenue: 45231.89,
  bookings: 2350,
  activeUsers: 573,
  satisfaction: 98.5,
  monthlyData: [
    { name: 'Jan', total: 1200 },
    { name: 'Feb', total: 1500 },
    { name: 'Mar', total: 1800 },
    { name: 'Apr', total: 2000 },
    { name: 'May', total: 2200 },
    { name: 'Jun', total: 2500 },
  ]
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData>(initialData)
  const [aiInsights, setAiInsights] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const updateData = () => {
      const newData: AnalyticsData = {
        revenue: data.revenue * (1 + (Math.random() * 0.1 - 0.05)),
        bookings: Math.floor(data.bookings * (1 + (Math.random() * 0.1 - 0.05))),
        activeUsers: Math.floor(data.activeUsers * (1 + (Math.random() * 0.1 - 0.05))),
        satisfaction: Math.min(100, Math.max(0, data.satisfaction + (Math.random() * 2 - 1))),
        monthlyData: data.monthlyData.map(item => ({
          ...item,
          total: item.total * (1 + (Math.random() * 0.1 - 0.05))
        }))
      }
      setData(newData)
    }

    const intervalId = setInterval(updateData, 20000)
    return () => clearInterval(intervalId)
  }, [data])

  const generateInsights = async () => {
    setIsLoading(true)
    setModalOpen(true)
    try {
      const response = await axios.post('/api/insights/generate', { data })
      setAiInsights(response.data.insights)
    } catch (error) {
      console.error("Error fetching AI insights:", error)
      setAiInsights(['Error generating insights. Please try again.'])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Analytics</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.revenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {((data.revenue / initialData.revenue - 1) * 100).toFixed(1)}% from initial
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{data.bookings}</div>
            <p className="text-xs text-muted-foreground">
              {((data.bookings / initialData.bookings - 1) * 100).toFixed(1)}% from initial
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{data.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              {((data.activeUsers / initialData.activeUsers - 1) * 100).toFixed(1)}% from initial
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.satisfaction.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {(data.satisfaction - initialData.satisfaction).toFixed(1)}% from initial
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
          <CardDescription>Revenue trends over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data.monthlyData}>
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button onClick={generateInsights}>Generate AI Insights</Button>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Alert className="mt-6">
          <Brain className="h-4 w-4" />
          <AlertTitle>AI-Generated Analytics Insights</AlertTitle>
          <AlertDescription>
            {isLoading ? (
              <p>Generating insights...</p>
            ) : aiInsights.length > 0 ? (
              <ul className="list-disc pl-4">
                {aiInsights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            ) : (
              <p>No insights available. Please try again.</p>
            )}
          </AlertDescription>
        </Alert>
      </Modal>
    </div>
  )
}
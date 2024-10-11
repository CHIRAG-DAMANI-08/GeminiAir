import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  try {
    console.log(`Fetching real-time flights`);

    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: process.env.AVIATIONSTACK_API_KEY,
        limit: 100, // Adjust this number based on your needs
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching flight data:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Failed to fetch flight data' }, { status: 500 });
  }
}
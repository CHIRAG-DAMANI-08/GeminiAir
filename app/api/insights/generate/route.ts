import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-latest",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 1024,
};

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json();

    const prompt = `Analyze the following analytics data and provide 3-5 concise, bullet-point insights:
    
    Total Revenue: $${data.revenue.toFixed(2)}
    Bookings: ${data.bookings}
    Active Users: ${data.activeUsers}
    Customer Satisfaction: ${data.satisfaction.toFixed(1)}%
    
    Monthly Revenue:
    ${data.monthlyData.map(item => `${item.name}: $${item.total.toFixed(2)}`).join('\n')}
    
    Please focus on trends, notable changes, and potential areas for improvement or celebration. Provide actionable insights based on this data.`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = result.response.text();
    const insights = response.split('\n').filter(line => line.trim().startsWith('-'));

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Error in insights API:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
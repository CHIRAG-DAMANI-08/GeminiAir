import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
      generationConfig,
    });

    const response = result.response.text();
    return NextResponse.json({ aiMessage: response });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
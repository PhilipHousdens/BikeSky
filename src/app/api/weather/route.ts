// Import necessary libraries
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const city = 'Chiang Mai'; // Example city, can also be from request query
  const apiKey = process.env.WEATHER_API_KEY; // Store API key in .env file
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json({ error: 'An error occurred while fetching weather data' }, { status: 500 });
  }
}

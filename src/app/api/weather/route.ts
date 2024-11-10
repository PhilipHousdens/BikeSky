// Import necessary libraries
import { NextResponse } from 'next/server';

// Utility function to fetch weather data
const fetchWeatherData = async (city: string, endpoint: string) => {
  const apiKey = process.env.WEATHER_API_KEY; // Ensure the API key is set in your environment variables
  const apiUrl = `http://api.weatherapi.com/v1/${endpoint}.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('An error occurred while fetching weather data');
  }
};

export async function GET(request: Request) {
  // Get the query parameter (current or forecast)
  const url = new URL(request.url);
  const city = 'Moscow'; // Example city, could be fetched dynamically
  const type = url.searchParams.get('type') || 'current'; // Default to 'current' if not provided

  // Validate that 'type' is either 'current' or 'forecast'
  if (!['current', 'forecast'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  }

  try {
    const data = await fetchWeatherData(city, type);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

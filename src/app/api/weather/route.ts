import { NextResponse } from 'next/server';

const fetchWeatherData = async (query: string, endpoint: string) => {
  const apiKey = process.env.WEATHER_API_KEY; // Ensure the API key is set in your environment variables
  const apiUrl = `http://api.weatherapi.com/v1/${endpoint}.json?key=${apiKey}&q=${query}`;

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
  const url = new URL(request.url);
  const lat = url.searchParams.get('lat');
  const lon = url.searchParams.get('lon');
  const type = url.searchParams.get('type') || 'current'; // Default to 'current'

  if (!['current', 'forecast'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  }

  let query = 'Chiang Mai'; // Default city

  // Update query to use latitude and longitude if available
  if (lat && lon) {
    query = `${lat},${lon}`;
  }

  try {
    const data = await fetchWeatherData(query, type);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}

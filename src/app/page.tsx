"use client";

import React, { useEffect, useState } from 'react';
import { WeatherComponent } from './compnents/WeatherComponent';

interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
  };
  forecast: {
    forecastday: Array<{
      hour: Array<{
        time: string;
        temp_c: number;
        chance_of_rain: number;
        condition: {
          text: string;
          icon: string;
        }
      }>;
    }>;
  };
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch current weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather?type=current');
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchWeather();
  }, []);
  
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <WeatherComponent weatherData={weatherData} />
    </div>
  );
}

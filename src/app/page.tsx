"use client";

import React, { useEffect, useState } from 'react';
import RainChanceGraph from './compnents/RainChangeGraph';
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
        chance_of_rain: number;
      }>;
    }>;
  };
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [rainData, setRainData] = useState<{ timestamps: string[]; chances: number[] }>({ timestamps: [], chances: [] });
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

  // Fetch forecast data and extract hourly rain chances
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch('/api/weather?type=forecast');
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        
        // Extract hourly rain chances from the forecast data
        const hourlyRainData = data.forecast.forecastday[0].hour.map((hour: any) => ({
          time: hour.time,
          chance_of_rain: hour.chance_of_rain,
        }));

        const timestamps = hourlyRainData.map((data: any) => data.time);
        const chances = hourlyRainData.map((data: any) => data.chance_of_rain);

        setRainData({ timestamps, chances });

      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchForecast();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData || rainData.timestamps.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <WeatherComponent weatherData={weatherData} />
      <div className="my-10 w-[80%] mx-auto">
        <RainChanceGraph rainData={rainData} />
      </div>
    </div>
  );
}

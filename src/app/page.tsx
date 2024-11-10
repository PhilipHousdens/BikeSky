"use client";

import React, { useEffect, useState } from 'react';
import RainChanceGraph from './compnents/RainChangeGraph';
import { WeatherComponent } from './compnents/WeatherComponent';
import { TempTable } from './compnents/TempTable';
import { Alert } from './compnents/Alert';

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
      }>;
    }>;
  };
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [rainData, setRainData] = useState<{ timestamps: string[]; chances: number[] }>({ timestamps: [], chances: [] });
  const [tempData, setTempData] = useState<{timestamps: string[]; temp_c: number[] }>({timestamps: [], temp_c: []})
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
  
        // Extract hourly temps from the forecast data
        const hourlyTempData = data.forecast.forecastday[0].hour.map((hour: any) => ({
          time: hour.time,
          temp_c: hour.temp_c,
        }));
  
        const temp_c = hourlyTempData.map((data: any) => data.temp_c);
  
        setTempData({ timestamps, temp_c });
  
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

  if (!weatherData || tempData.timestamps.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <WeatherComponent weatherData={weatherData} />
    </div>
  );
}

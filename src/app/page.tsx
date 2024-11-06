"use client"; // Add this line at the top

import React, { useEffect, useState } from 'react';

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
  };
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather');
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchWeather();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-lg mx-auto mt-10">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <img 
            src={weatherData.current.condition.icon} 
            alt="Weather icon" 
            className="w-16 h-16 object-contain"
          />
          <div>
            <h1 className="text-2xl font-semibold">
              Weather in {weatherData.location.name}, {weatherData.location.country}
            </h1>
          </div>
        </div>

        <div className="flex flex-col space-y-4 text-center">
          <p className="text-xl font-bold">Temperature: {weatherData.current.temp_c}°C</p>
          <p className="text-lg text-gray-600">Condition: {weatherData.current.condition.text}</p>
          <p className="text-lg text-gray-600">Humidity: {weatherData.current.humidity}%</p>
        </div>
      </div>
    </div>

  );
}

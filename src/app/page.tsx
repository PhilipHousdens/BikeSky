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
    <div>
      <h1>Weather in {weatherData.location.name}, {weatherData.location.country}</h1>
      <p>Temperature: {weatherData.current.temp_c}°C</p>
      <p>Condition: {weatherData.current.condition.text}</p>
      <img src={weatherData.current.condition.icon} alt="Weather icon" />
      <p>Humidity: {weatherData.current.humidity}%</p>
    </div>
  );
}

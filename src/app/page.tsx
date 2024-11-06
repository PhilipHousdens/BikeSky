"use client"; // Add this line at the top

import React, { useEffect, useState } from 'react';

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
}

const WeatherComponent = ({ weatherData }: { weatherData: WeatherData }) => {
  // Define background classes based on condition
  const getBackgroundClass = (condition: string) => {
    const conditionLower = condition.toLowerCase().trim();
  
    if (conditionLower.includes('rain')) {
      return 'bg-[url("/images/raining.jpg")] bg-cover bg-center'; // Rainy
    }
    if (conditionLower.includes('fog')) {
      return 'bg-[url("/images/fog.jpg")] bg-cover bg-center'; // Foggy
    }
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return 'bg-[url("/images/clear.jpg")] bg-cover bg-center'; // Sunny or Clear sky
    }
    if (conditionLower.includes('mist')) {
      return 'bg-[url("/images/fog.jpg")] bg-cover bg-center'; // Misty
    }
    if (conditionLower.includes('thunder')) {
      return 'bg-[url("/images/cloudy.jpg")] bg-cover bg-center'; // Thunderstorm
    }
    if (conditionLower.includes('cloudy')) {
      return 'bg-[url("/images/cloudy.jpg")] bg-cover bg-center'; // Thunderstorm
    }
    if (conditionLower.includes('snow')) {
      return 'bg-[url("/images/snow.jpg")] bg-cover bg-center'; // Snowy
    }
    if (conditionLower.includes('shower')) {
      return 'bg-[url("/images/raining.jpg")] bg-cover bg-center'; // Shower
    }
    if (conditionLower.includes('blizzard')) {
      return 'bg-[url("/images/snow.jpg")] bg-cover bg-center'; // Blizzard
    }
  
    return 'bg-gray-300'; // Default fallback
  };
  

  const backgroundClass = getBackgroundClass(weatherData.current.condition.text);

  return (
    <div className={`w-full ${backgroundClass} bg-cover relative py-10`}>
      <div className="w-full max-w-2xl mx-auto p-6 bg-black rounded-lg shadow-lg bg-opacity-50 text-white z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex justify-center items-center">
            <img
              src={weatherData.current.condition.icon}
              alt="Weather icon"
              className="w-20 h-20 object-contain"
            />
            <p className="text-md ">{weatherData.current.condition.text}</p>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">
              {weatherData.location.name}, {weatherData.location.country}
            </h1>
            <p className="text-lg ">Humidity: {weatherData.current.humidity}%</p>
          </div>
        </div>

        <div className="flex justify-between text-center px-2">
          <p className="text-xl font-bold">{weatherData.current.temp_c}°C</p>
          <p className="text-xl font-bold">{weatherData.location.localtime}</p>
        </div>
      </div>
    </div>

  );  
};

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return <WeatherComponent weatherData={weatherData} />;
}

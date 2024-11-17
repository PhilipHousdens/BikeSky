"use client";

import React, { useEffect, useState } from "react";
import { WeatherComponent } from "./compnents/WeatherComponent";

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
        };
      }>;
    }>;
  };
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<{ lat: number | null; lon: number | null }>({
    lat: null,
    lon: null,
  });
  const [error, setError] = useState<string | null>(null);

  // Fetch current location and weather data
  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      // Get user's location
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });

          // Fetch weather data using location
          fetchWeather(lat, lon);
        },
        (err) => {
          setError("Failed to get your location: " + err.message);
        }
      );
    };

    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}&type=current`);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchLocationAndWeather();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {weatherData ? (
        <WeatherComponent weatherData={weatherData} />
      ) : (
        <div>Loading your weather information...</div>
      )}
    </div>
  );
}

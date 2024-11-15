/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

interface HourlyCondition {
  icon: string;
  text: string;
}

interface RainData {
  timestamps: string[];
  chances: number[];
  conditions: HourlyCondition[];
}

export const HourlyForecast = () => {
  // Initialize state
  const [rainData, setRainData] = useState<RainData>({
    timestamps: [],
    chances: [],
    conditions: [],
  });
  const [error, setError] = useState<string | null>(null);

  // Fetch weather data
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch("/api/weather?type=forecast");
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const data = await response.json();

        const currentDateTime = new Date();
        const currentHour = currentDateTime.getHours();

        const hourlyRainData = data.forecast.forecastday[0].hour
          .filter((hour: any) => {
            const hourDate = new Date(hour.time);
            return hourDate.getHours() > currentHour || hourDate.getDate() > currentDateTime.getDate();
          })
          .slice(0, 5) // Get only the next 5 hours
          .map((hour: any) => ({
            time: hour.time,
            chance_of_rain: hour.chance_of_rain,
            condition: {
              icon: `https:${hour.condition.icon}`, // Ensure the icon URL is correct
              text: hour.condition.text,
            },
          }));

        setRainData({
          timestamps: hourlyRainData.map((entry: any) => entry.time),
          chances: hourlyRainData.map((entry: any) => entry.chance_of_rain),
          conditions: hourlyRainData.map((entry: any) => entry.condition),
        });
      } catch (error: unknown) {
        if (error instanceof Error) setError(error.message);
      }
    };

    fetchForecast();
  }, []);

  // Render loading, error, or data
  if (error) return <div>Error: {error}</div>;
  if (!rainData || rainData.timestamps.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-start justify-center w-[100%] space-y-10 font-teko">
        <div className="bg-black bg-opacity-50 p-10 rounded-tr-lg rounded-br-lg">
            <p className="text-3xl mb-5 text-center text-white ">Chance of Rain</p>
            {rainData.timestamps.map((timestamp, index) => (
                <div key={index} className="flex items-center gap-4">
                
                <img
                    src={rainData.conditions[index]?.icon || ""}
                    alt={rainData.conditions[index]?.text || "Weather condition"}
                />
                <p className="text-2xl text-white">
                    {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
                <p className="text-2xl text-white">{rainData.chances[index]}% Rain</p>
                </div>
            ))}
        </div>
    </div>
  );
};

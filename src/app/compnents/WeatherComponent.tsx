import React from "react";

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

export const WeatherComponent = ({ weatherData }: { weatherData: WeatherData }) => {
    const getBackgroundClass = (condition: string) => {
      const conditionLower = condition.toLowerCase().trim();
  
      if (conditionLower.includes('rain')) return 'bg-[url("/images/raining.jpg")] bg-cover bg-center';
      if (conditionLower.includes('fog') || conditionLower.includes('mist')) return 'bg-[url("/images/fog.jpg")] bg-cover bg-center';
      if (conditionLower.includes('clear') || conditionLower.includes('sunny')) return 'bg-[url("/images/clear.jpg")] bg-cover bg-center';
      if (conditionLower.includes('thunder') || conditionLower.includes('cloudy')) return 'bg-[url("/images/cloudy.jpg")] bg-cover bg-center';
      if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) return 'bg-[url("/images/snow.jpg")] bg-cover bg-center';
  
      return 'bg-gray-300';
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
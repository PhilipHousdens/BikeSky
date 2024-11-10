import React from "react";
import { Alert } from "./Alert";


export const WeatherComponent = ({ weatherData }: { weatherData: any }) => {
    const getBackgroundClass = (condition: string) => {
      const conditionLower = condition.toLowerCase().trim();

      if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('thunder')) return 'bg-[url("/images/raining.jpg")]';
      if (conditionLower.includes('fog') || conditionLower.includes('mist')) return 'bg-[url("/images/fog.jpg")]';
      if (conditionLower.includes('clear') || conditionLower.includes('sunny')) return 'bg-[url("/images/clear.jpg")]';
      if (conditionLower.includes('cloudy')) return 'bg-[url("/images/cloudy.png")]';
      if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) return 'bg-[url("/images/snow.jpg")]';

      return 'bg-gray-300';
    };

    const backgroundClass = getBackgroundClass(weatherData.current.condition.text);
    
    // Extract only the time part from localtime (assuming format "YYYY-MM-DD HH:MM")
    const localTime = weatherData.location.localtime.split(" ")[1];

    function amPm(time: number) {
      if (time >= 12) {
        return "PM"
      } else {
        return "AM"
      }
    }

    return (
      <div className={`w-full h-screen relative overflow-hidden ${backgroundClass} bg-cover bg-center`}>
        {/* Blurred Background Overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>

        {/* Foreground Content Centered */}
        <div className="relative z-10 h-full pb-20">
          {/* Alert */}
          <div className="absolute top-5 left-0">
            <Alert weatherData={weatherData}/>
          </div>
          
          {/* Display only the time */}
          <p className="text-7xl text-white text-center m-5 font-bold">{localTime} <span className="text-5xl">{amPm(parseInt(localTime))}</span></p>

          {/* Display current weather */}
          <div className="flex justify-center items-center h-1/2 flex-col">
            {/* Display city and country */}
            <p className="text-5xl text-white text-center m-5 font-bold">{weatherData.location.name}, {weatherData.location.country}</p>

            {/* Display weather details */}
            <div className="space-y-5">
              <div className="grid-cols-2 flex space-x-2 mt-10">
                <div>
                  <img src={weatherData.current.condition.icon} alt="Weather Icon" className="w-20"/>
                </div>
                <div>
                  <p className="text-3xl text-white">{weatherData.current.humidity}% Humidity</p>
                  <p className="text-2xl text-white">{weatherData.current.condition.text}</p>
                </div>
              </div>

              {/* Display Humidity */}
              <div className="h-full flex justify-center items-center">
                <p className="text-5xl text-white">{weatherData.current.temp_c}&deg;C </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

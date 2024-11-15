import React from "react";
import { Alert } from "./Alert";
import { HourlyForecast } from "./Hourly";

export const WeatherComponent = ({ weatherData }: { weatherData: any }) => {
    if (!weatherData) {
        return <div>Loading weather data...</div>; // Display while waiting for data
    }

    const getBackgroundClass = (condition: string) => {
        const conditionLower = condition.toLowerCase().trim();
        if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('thunder')) return 'bg-[url("/images/raining.jpg")]';
        if (conditionLower.includes('fog') || conditionLower.includes('mist')) return 'bg-[url("/images/fog.jpg")]';
        if (conditionLower.includes('clear') || conditionLower.includes('sunny')) return 'bg-[url("/images/clear.jpg")]';
        if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) return 'bg-[url("/images/cloudy.png")]';
        if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) return 'bg-[url("/images/snow.jpg")]';

        return 'bg-gray-300';
    };

    const backgroundClass = getBackgroundClass(weatherData.current.condition.text);
    const localTime = weatherData.location.localtime.split(" ")[1];

    function amPm(time: number) {
        return time >= 12 ? "PM" : "AM";
    }

    function ridingScore() {
      const temp = weatherData.current.temp_c;
      const windSpeed = weatherData.current.wind_kph;
      const uvIndex = weatherData.current.uv;
      const condition = weatherData.current.condition.text;

  
      let score = 0;
  
      // Temperature Score: Ideal range is 10°C to 25°C
      if (temp >= 10 && temp <= 25) {
          score += 10; // Ideal temperature range
      } else if (temp > 25 && temp <= 30) {
          score += 8; // Slightly warmer but acceptable
      } else if (temp < 10) {
          score += 3; // Cooler than ideal
          if (temp < 3) {
              score += 0; // Very cold, even less ideal
          }
      } else {
          score += 5; // Too hot
      }
  
      // Wind Speed Score: Ideal is 0-20 km/h, unsuitable above 40 km/h
      if (windSpeed <= 20) {
          score += 10; // Low wind speed, ideal
      } else if (windSpeed > 20 && windSpeed <= 40) {
          score += 8; // Moderate wind, acceptable
      } else {
          score += 3; // Strong wind, unsuitable
      }
  
      // UV Index Score: Low (1-3) is best, higher is worse
      if (uvIndex <= 3) {
          score += 10; // Low UV index, ideal for outdoor activities
      } else if (uvIndex > 3 && uvIndex <= 6) {
          score += 8; // Moderate UV index
      } else {
          score += 2; // High UV, less suitable
      }

      const conditionLower = condition.toLowerCase().trim();
        if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('thunder')) score += 4;
        if (conditionLower.includes('fog') || conditionLower.includes('mist')) score += 4;
        if (conditionLower.includes('clear') || conditionLower.includes('sunny')) score += 10;
        if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) score += 8;
        if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) score += 1;

  
      // Normalize the score to be out of 10
      const maxScore = 40; // Maximum possible score (10 + 10 + 10 + 10)
      const normalizedScore = (score / maxScore) * 10;
  
      // Return the final score (0-10)
      return Math.min(Math.max(normalizedScore, 0), 10); // Ensure score stays within 0-10
  }  

    const score = ridingScore();

  function faceScore(score: number) {
    if (score >= 8) {
      return 'images/score/good.png'; // Assuming this is a good score image
    } else if (score >= 3) {
      return 'images/score/okay.png'; // Assuming this is an okay score image
    } else {
      return 'images/score/bad.png'; // Assuming this is a bad score image
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
                  <Alert weatherData={weatherData} />
              </div>
              
              {/* Display only the time */}
              <p className="text-7xl text-white text-stroke font-quantico text-center m-5 font-bold">{localTime} <span className="text-5xl">{amPm(parseInt(localTime))}</span></p>

              {/* Display current weather */}
              <div className="flex justify-center items-center h-1/2 flex-col">
                  <p className="text-5xl font-orbitron text-white m-5 font-bold">{weatherData.location.name}, {weatherData.location.country}</p>

                  {/* Display weather details */}
                  <div className="space-y-5">
                      <div className="grid-cols-2 flex space-x-2 mt-10">
                          <div>
                              <img src={weatherData.current.condition.icon} alt="Weather Icon" />
                          </div>
                          <div>
                              <p className="text-3xl font-orbitron text-white">{weatherData.current.humidity}% Humidity</p>
                              <p className="text-2xl font-orbitron text-white">{weatherData.current.condition.text}</p>
                          </div>
                      </div>
                      <div className="h-full flex justify-center items-center">
                          <p className="text-5xl text-white font-orbitron">{weatherData.current.temp_c}&deg;C </p>
                      </div>
                  </div>
              </div>
              <div className=" absolute left-0 bottom-28 ">
                <HourlyForecast />
              </div>
              <div className="absolute right-5 bottom-28 bg-black bg-opacity-50 font-teko text-white p-5 rounded-xl">
                <p className="text text-3xl mb-5 text-center">Biker Suitability Index</p>
                <div className="flex items-center justify-center bg-black p-2 bg-opacity-80 rounded-lg space-x-10">
                  {/* For Image Icons */}
                  <div>
                    <img src={faceScore(score)} alt="Biker Suitability" className=""/>
                  </div>
                  <div className="text-3xl font-quantico">
                    {score}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-10 mt-5 font-quantico">
                    <div className="bg-black p-2 bg-opacity-80 rounded-lg">
                      <div>
                        <img src="/images/score/wind.png" alt="wind" className="w-[60px]" />
                      </div>
                      <div>
                        <p className="text-center">{weatherData.current.wind_kph} KM/H</p>
                      </div>
                    </div>
                    <div className="bg-black p-2 bg-opacity-80 rounded-lg">
                      <div>
                        <img src="/images/score/temp.png" alt="temp" className="w-[60px]" />
                      </div>
                      <div>
                        <p className="text-center">{weatherData.current.temp_c}&deg;C </p>
                      </div>
                    </div>
                    <div className="bg-black p-2 bg-opacity-80 rounded-lg">
                      <div>
                        <img src="/images/score/uv.png" alt="uv icons" className="w-[60px]" />
                      </div>
                      <div>
                        <p className="text-center">{weatherData.current.uv}</p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
};

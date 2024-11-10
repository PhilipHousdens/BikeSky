import React from "react";

export const Alert = ({ weatherData }: { weatherData: any }) => {
    const getConditionAlert = (condition: string) => {
        const conditionLower = condition.toLowerCase().trim();
  
        if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) return 'Be careful of the rain!';
        if (conditionLower.includes('fog') || conditionLower.includes('mist')) return 'Ride slowly, maybe bad visibility';
        if (conditionLower.includes('clear') || conditionLower.includes('sunny')) return 'Have fun riding today!';
        if (conditionLower.includes('thunder') || conditionLower.includes('cloudy')) return 'Look out for the rain, bring your raincoat';
        if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) return 'Maybe, when summer comes?';
    } 
    const warningMessage = getConditionAlert(weatherData.current.condition.text);
    return (
        <div>
            <div className="w-fit mx-auto flex items-center justify-center space-x-2 bg-black px-5 py-3 rounded-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-bikeOrange">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                </div>
                <div className="text-white">
                    {warningMessage}
                </div>
            </div>
        </div>
    )
}

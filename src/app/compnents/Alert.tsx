import React from "react";

export const Alert = ({ weatherData }: { weatherData: any }) => {
    const getConditionAlert = (condition: string) => {
        const conditionLower = condition.toLowerCase().trim();
  
        if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) return 'Be careful of the rain!';
        if (conditionLower.includes('fog') || conditionLower.includes('mist')) return 'Ride slowly, maybe bad visibility.';
        if (conditionLower.includes('clear') || conditionLower.includes('sunny')) return 'Have fun riding today!';
        if (conditionLower.includes('thunder') || conditionLower.includes('cloudy')) return 'Look out for the rain, bring your raincoat.';
        if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) return 'Maybe, when summer comes?';
    } 
    const warningMessage = getConditionAlert(weatherData.current.condition.text);

    const getTempAlert = (temp_c: number) => {
        if (temp_c <= 10) return 'Make sure to stay warm durring your ride.'
    }
    const tempMessage = getTempAlert(weatherData.current.temp_c);
    return (
        <div>
            <div className="w-fit mx-auto flex items-center justify-center space-x-2 bg-black px-5 py-3 rounded-br-lg rounded-tr-lg">
                <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-bikeOrange rounded-full animate-glow">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                </div>
                <div className="text-white">
                    {warningMessage} {tempMessage}
                </div>
            </div>
        </div>
    )
}

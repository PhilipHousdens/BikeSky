import React from 'react';


export const TempTable = ({ weatherData }: { weatherData: { timestamps: string[]; temp_c: number[] } }) => {
    
  return (
    <div >
      <h2 className='text-xl mb-2 text-white'>Temperature Throughout the Day</h2>
      <div className=' text-white'>
        <table className="table-auto w-full text-left border-collapse">
            <thead>
            <tr>
                <th className="px-4 py-2 border-b text-orange-400">Hour</th>
                <th className="px-4 py-2 border-b ">Temperature (°C)</th>
            </tr>
            </thead>
            <tbody>
            {/* Map over the data to generate rows */}
            {weatherData.timestamps.map((time, index) => (
                <tr key={index} className="border-b">
                <td className="px-4 py-2 ">{time}</td>
                <td className="px-4 py-2">{weatherData.temp_c[index]}°C</td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

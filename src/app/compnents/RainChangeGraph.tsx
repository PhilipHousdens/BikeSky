import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { useEffect, useState } from 'react';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, TimeScale, Tooltip, Legend, PointElement, LineElement);

const RainChanceGraph = ({ rainData }: { rainData: { timestamps: string[]; chances: number[] } }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Format the timestamps to show only the hour and minute
    const formattedTimestamps = rainData.timestamps.map((timestamp) => {
      const date = new Date(timestamp); // Convert the timestamp string to a Date object
      const hours = date.getHours().toString().padStart(2, '0'); // Get hours and format with leading zero
      const minutes = date.getMinutes().toString().padStart(2, '0'); // Get minutes and format with leading zero
      return `${hours}:${minutes}`; // Return the formatted "HH:mm" time
    });

    setData({
      labels: formattedTimestamps, // Use the formatted timestamps as labels
      datasets: [
        {
          label: 'Rain Chance',
          data: rainData.chances,
          fill: false,
          borderColor: 'orange',
          backgroundColor: 'white',
          tension: 0.1,
        },
      ],
    });
  }, [rainData]);

  const options = {
        responsive: true,
        plugins: {
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // Set the background color of the tooltip
              titleColor: 'white', // Set the tooltip title color
              bodyColor: 'white', // Set the tooltip body color
              footerColor: 'white', // Optional: set the color of the tooltip footer
              callbacks: {
                label: (tooltipItem: any) => `${tooltipItem.raw}%`, // Display percentage in the tooltip
              },
            },
          },
        scales: {
            x: {
                title: {
                display: true,
                text: 'Time of Day',
                color: 'white'
                },
                ticks: {
                    color: 'white', // Axis ticks color
                },
                grid: {
                    color: 'white'
                }
            },
            y: {
                min: 0,
                max: 100,
                title: {
                display: true,
                text: 'Chance of Rain (%)',
                color: 'white'
                },
                ticks: {
                    color: 'white', // Axis ticks color
                },
                grid: {
                    color: 'white'
                }
            },
        },
    };

  return data ? <Line data={data} options={options} /> : <div>Loading...</div>;
};

export default RainChanceGraph;

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ChartData, ChartOptions } from 'chart.js';

ChartJS.register(
  CategoryScale, // Register the category scale for the x-axis
  LinearScale, // Register the linear scale for the y-axis
  PointElement,
  LineElement
);

interface RainData {
  timestamps: string[]; // Array of hourly timestamps (e.g., ['10 AM', '11 AM', '12 PM'])
  chances: number[];    // Array of rain chances (e.g., [20, 35, 50])
}

interface RainChanceGraphProps {
  rainData: RainData;
}

const RainChanceGraph: React.FC<RainChanceGraphProps> = ({ rainData }) => {
  const data: ChartData<'line'> = {
    labels: rainData.timestamps,
    datasets: [
      {
        label: 'Chance of Rain (%)',
        data: rainData.chances,
        backgroundColor: 'rgba(135, 206, 250, 0.3)',
        borderColor: 'rgba(30, 144, 255, 1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'category',
        title: { display: true, text: 'Time' },
      },
      y: {
        title: { display: true, text: 'Rain Probability (%)' },
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      tooltip: { enabled: true },
      legend: { display: true },
    },
  };

  return <Line data={data} options={options} />;
};

export default RainChanceGraph;

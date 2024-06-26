import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { faker } from '@faker-js/faker';

export default function SalesChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales',
      },
    },
  };
  
  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Monthly Sales',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
        borderRadius: '5',
      },
    ],
  };
  
  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <div style={{ width: '600px', height: '300px' }}>
        {data ? <Bar data={data} options={options} /> : <div>Loading...</div>}
      </div>
    </div>
  );
}

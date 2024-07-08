import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesChart({ dashboardData }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Yearly Sales (${new Date().getFullYear()})`,
      },
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    },
  };

  const data = {
    labels: months.slice(0, new Date().getMonth() + 1),
    datasets: [
      {
        label: `Monthly Sales (${new Date().getMonth() + 1} Months)`,
        data: dashboardData?.yearlySale.map(month => month.totalAmount),
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
        borderRadius: '5',
      },
    ],
  };

  return (
    <div className="flex justify-center p-1 bg-white rounded-md shadow-md border-2">
      <div
        style={{ width: '600px', height: '300px' }}
      >
        {data ? <Bar data={data} options={options} /> : <div>Loading...</div>}
      </div>
    </div>
  );
}

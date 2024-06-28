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

import { faker } from '@faker-js/faker'
import { useBooking } from '../../../contexts/booking-context';

export default function SalesChart() {
  const {totalPaymentPerMonth, currentMonth, currentYear} = useBooking()
  const months = [
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
  const totalPayment = totalPaymentPerMonth
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Yearly Sales (${currentYear})`,
      },
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    },
  };

  const data = {
    labels : months.slice(0,currentMonth),
    datasets: [
      {
        label: `Monthly Sales (${currentMonth} Months)`,
        data: totalPayment,
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
        borderRadius: '5',
      },
    ],
  };

  return (
    <div className="flex justify-center p-4 bg-white rounded-md shadow-md">
      <div style={{ width: '600px', height: '300px' }}>
        {data ? <Bar data={data} options={options} /> : <div>Loading...</div>}
      </div>
    </div>
  );
}

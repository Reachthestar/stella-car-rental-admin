import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useBooking } from '../../../contexts/booking-context';

ChartJS.register(ArcElement, Tooltip, Legend);
export default function PopularCarsChart() {
  const { bookingBrand } = useBooking();
  const data = {

    labels: bookingBrand?.map(item => item.brand),
    datasets: [
      {
        label: 'Popular Cars',
        data: bookingBrand?.map(item => item.count),

        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-2 bg-white rounded-md shadow-md">
      <h1 className="text-center">Popular Cars</h1>
      <div style={{ width: '500px', height: '500px' }}>
        <Doughnut data={data} />
      </div>
    </div>
  );
}

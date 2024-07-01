import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { useBooking } from '../../../contexts/booking-context';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Popular Locations',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Popular Locations',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function PopularLocations() {
  const { allBooking } = useBooking();

  return (
    <div className="flex flex-col gap-3 border border-gray-300 rounded-md p-3">
      <div className="bg-white rounded-md shadow-md p-4">
        <h1 className="text-center text-2xl font-semibold">
          Popular Locations
        </h1>

        <form className="flex gap-2">
          <select
            name="pickDrop"
            id="pickDropSelect"
            className="w-full border border-gray-300 rounded-md py-1.5 px-2 focus:outline-none"
          >
            <option value="pickUp">Pick-up</option>
            <option value="dropOff">Drop-off</option>
          </select>

          <select
            name="category"
            id="category-select"
            className="w-full border border-gray-300 rounded-md py-1.5 px-2 focus:outline-none"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </form>
      </div>

      <div className="flex flex-col gap-4 h-[400px] overflow-auto">
        <div className="bg-gray-100 rounded-lg p-5 shadow-md w-full">
          <div className="grid grid-cols-5 text-center font-bold">
            <div className="p-2">Car ID</div>
            <div className="p-2">Car</div>
            <div className="p-2">Plate</div>
            <div className="p-2">Pick-up</div>
            <div className="p-2">Drop-off</div>
          </div>
        </div>

        {allBooking?.map((booking) => (
          <div
            key={booking?.carModelId}
            className="bg-white rounded-lg p-5 shadow-md w-full"
          >
            <div className="grid grid-cols-5 text-center">
              <div className="p-2">{booking?.carModelId}</div>
              <div className="p-2">{booking?.car}</div>
              <div className="p-2">{booking?.plate}</div>
              <div className="p-2">{booking?.pickup}</div>
              <div className="p-2">{booking?.dropoff}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-md shadow-md p-4 w-full flex justify-center">
        <div style={{ width: '700px', height: '350px' }}>
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

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
import { useCars } from '../../../contexts/car-context';

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
      text: 'Cars Status',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Cars Status',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function CarsStatus() {
  const { allCar } = useCars();

  return (
    <div className="flex flex-col gap-3 ">
      <div className="bg-white rounded-md shadow-md p-4">
        <h1 className="text-center text-2xl font-semibold">Cars Status</h1>

        <form>
          <select
            name="status"
            id="statusSelect"
            className="w-full border border-gray-300 rounded-md py-1.5 px-2 focus:outline-none"
          >
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </form>
      </div>

      <div className="flex flex-col gap-4 h-[400px] overflow-auto">
        <div className="bg-gray-100 rounded-lg p-5 shadow-md w-full">
          <div className="grid grid-cols-5 text-center font-bold">
            <div className="p-2">Car ID</div>
            <div className="p-2">Plate</div>
            <div className="p-2">Model</div>
            <div className="p-2">color</div>
            <div className="p-2">Status</div>
          </div>
        </div>

        {allCar?.map((car,index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-5 shadow-md w-full"
          >
            <div className="grid grid-cols-5 text-center">
              <div className="p-2">{car?.id}</div>
              <div className="p-2">{car?.plate}</div>
              <div className="p-2">
                {car?.model}, {car?.brand}
              </div>
              <div className="p-2">{car?.color}</div>
              <div className="p-2">
                <p
                  className={`font-bold rounded-full ${
                    car?.status === 'Available'
                      ? 'text-green-600 bg-green-100'
                      : car?.status === 'Maintenance'
                      ? 'text-red-400 bg-red-100'
                      : 'text-indigo-400 bg-indigo-100'
                  } `}
                >
                  {car?.status}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div>
          <div className="bg-gray-200 rounded-lg p-5 shadow-md w-full">
            <div className="grid grid-cols-5 text-center font-bold text-lg">
              <div className="p-2">Total</div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2">{allCar?.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-md p-4 w-full flex justify-center">
        <div style={{ width: '700px', height: '350px' }}>
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

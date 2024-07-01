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
import { usePayment } from '../../../contexts/payment-context';

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
      text: 'Income',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Income',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function Income() {
  const { allPayment } = usePayment();
  console.log(allPayment);

  return (
    <div className="flex flex-col gap-3 ">
      <div className="bg-white rounded-md shadow-md p-4">
        <h1 className="text-center text-2xl font-semibold">Income</h1>

        <form>
          <select
            name="category"
            id="categorySelect"
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
            <div className="p-2">Booking ID</div>
            <div className="p-2">Payment ID</div>
            <div className="p-2">Customer</div>
            <div className="p-2">Payment Date</div>
            <div className="p-2">Amount</div>
          </div>
        </div>

        {allPayment?.map((payment) => (
          <div
            key={payment?.paymentId}
            className="bg-white rounded-lg p-5 shadow-md w-full"
          >
            <div className="grid grid-cols-5 text-center">
              <div className="p-2">{payment?.bookingId}</div>
              <div className="p-2">{payment?.paymentId}</div>
              <div className="p-2">{payment?.customer}</div>
              <div className="p-2">{payment?.paymentDate}</div>
              <div className="p-2">{payment?.amount}</div>
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
              <div className="p-2">&#3647;100,000</div>
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

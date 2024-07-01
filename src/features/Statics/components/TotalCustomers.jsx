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
import { useCustomer } from '../../../contexts/customer-context';

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
      text: 'Total Customers',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Total Customers',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function TotalCustomers() {
  const { allCustomer } = useCustomer();

  return (
    <div className="flex flex-col gap-3 ">
      <div className="bg-white rounded-md shadow-md p-4">
        <h1 className="text-center text-2xl font-semibold">Total Customers</h1>

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
          <div className="grid grid-cols-6 text-center font-bold">
            <div className="p-2">Customer ID</div>
            <div className="p-2">Name</div>
            <div className="p-2">Email</div>
            <div className="p-2">Phone</div>
            <div className="p-2">Address</div>
            <div className="p-2">Driver License</div>
          </div>
        </div>

        {allCustomer?.map((customer) => (
          <div
            key={customer?.customerId}
            className="bg-white rounded-lg p-5 shadow-md w-full"
          >
            <div className="grid grid-cols-6 text-center">
              <div className="p-2">{customer?.customerId}</div>
              <div className="p-2">
                {customer?.firstName} {customer?.lastName}
              </div>
              <div className="p-2">{customer?.email}</div>
              <div className="p-2">{customer?.phone}</div>
              <div className="p-2">{customer?.address}</div>
              <div className="p-2">{customer?.driverLicense}</div>
            </div>
          </div>
        ))}

        <div>
          <div className="bg-gray-200 rounded-lg p-5 shadow-md w-full">
            <div className="grid grid-cols-6 text-center font-bold text-lg">
              <div className="p-2">Total customers</div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2">{allCustomer?.length}</div>
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

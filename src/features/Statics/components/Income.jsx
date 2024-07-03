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
import { useBooking } from '../../../contexts/booking-context';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Income() {
  const { allPayment, monthlyPayments, yearlyPayment, dailyPayment } =
    usePayment();
  const { totalPaymentPerMonth, currentMonth, currentYear } = useBooking();
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectIncome, setSelectIncome] = useState('yearly');

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const handleSelect = (e) => {
    setSelectIncome(e.target.value);
  };

  useEffect(() => {
    if (selectIncome === 'yearly') {
      const sum = yearlyPayment?.reduce((acc, item) => {
        return (acc += item.amount);
      }, 0);
      setTotalAmount(sum);
    }
    if (selectIncome === 'monthly') {
      const sum = monthlyPayments?.reduce((acc, item) => {
        return (acc += item.amount);
      }, 0);
      setTotalAmount(sum);
    }
  }, [allPayment, selectIncome]);
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
  const totalPayment = totalPaymentPerMonth;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text:
          selectIncome === 'yearly'
            ? `Yearly Sales (${currentYear})`
            : `Monthly Sales (${months[month]})`,
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const data = {
    labels:
      selectIncome === 'yearly' ? months.slice(0, currentMonth) : daysArray,
    datasets: [
      {
        label: `Monthly Sales`,
        data:
          selectIncome === 'yearly'
            ? totalPayment
            : dailyPayment.map((item) => item.totalAmount),
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
        borderRadius: '5',
      },
    ],
  };

  return (
    <div className="flex flex-col gap-3 border border-gray-300 rounded-md p-3">
      <div className="bg-white rounded-md shadow-md p-4">
        <h1 className="text-center text-2xl font-semibold">Income</h1>
        <form onChange={handleSelect}>
          <select
            name="category"
            id="categorySelect"
            className="w-full border border-gray-300 rounded-md py-1.5 px-2 focus:outline-none"
          >
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
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

        {selectIncome === 'yearly' ? (
          <>
            {yearlyPayment?.map((payment, index) => (
              <div
                key={index}
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
                  <div className="p-2">&#3647;{totalAmount}</div>
                </div>
              </div>
            </div>
          </>
        ) : selectIncome === 'monthly' ? (
          <>
            {monthlyPayments?.map((payment, index) => (
              <div
                key={index}
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
                  <div className="p-2">&#3647;{totalAmount}</div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="bg-white rounded-md shadow-md p-4 w-full flex justify-center">
        <div style={{ width: '700px', height: '350px' }}>
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

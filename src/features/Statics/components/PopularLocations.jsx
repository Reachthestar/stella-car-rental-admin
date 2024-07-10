import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useBooking } from '../../../contexts/booking-context';
import { useState } from 'react';
import dayjs from 'dayjs';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PopularLocations() {
  const {
    allBooking,
    pickupByBranchPerYear,
    pickupByBranchPerMonth,
    dropOffByBranchPerYear,
    dropOffByBranchPerMonth,
    currentYear,
  } = useBooking();
  const [selectPickOrDrop, setSelectPickOrDrop] = useState('pickUp');
  const [selectYearOrMonth, setSelectYearOrMonth] = useState('yearly');

  const handleSelectPickOrDrop = (e) => {
    setSelectPickOrDrop(e.target.value);
  };

  const handleSelectYearOrMonth = (e) => {
    setSelectYearOrMonth(e.target.value);
  };

  const data = {
    labels:
      selectPickOrDrop === 'pickUp' && selectYearOrMonth === 'yearly'
        ? pickupByBranchPerYear?.map((item) => item.branch)
        : selectPickOrDrop === 'pickUp' && selectYearOrMonth === 'monthly'
        ? pickupByBranchPerMonth?.map((item) => item.branch)
        : selectPickOrDrop === 'dropOff' && selectYearOrMonth === 'yearly'
        ? dropOffByBranchPerYear?.map((item) => item.branch)
        : selectPickOrDrop === 'dropOff' && selectYearOrMonth === 'monthly'
        ? dropOffByBranchPerMonth?.map((item) => item.branch)
        : null,
    datasets: [
      {
        label: 'Popular Cars',
        data:
          selectPickOrDrop === 'pickUp' && selectYearOrMonth === 'yearly'
            ? pickupByBranchPerYear?.map((item) => item.bookingTimes)
            : selectPickOrDrop === 'pickUp' && selectYearOrMonth === 'monthly'
            ? pickupByBranchPerMonth?.map((item) => item.bookingTimes)
            : selectPickOrDrop === 'dropOff' && selectYearOrMonth === 'yearly'
            ? dropOffByBranchPerYear?.map((item) => item.dropTimes)
            : selectPickOrDrop === 'dropOff' && selectYearOrMonth === 'monthly'
            ? dropOffByBranchPerMonth?.map((item) => item.dropTimes)
            : null,
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

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const data = tooltipItem.dataset.data;
            const currentValue = data[tooltipItem.dataIndex];
            const total = data.reduce((a, b) => a + b, 0);
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return `${percentage}%`;
          },
        },
      },
      title: {
        display: true,
        text:
          selectYearOrMonth === 'yearly'
            ? `Popular Cars (${currentYear})`
            : selectYearOrMonth === 'monthly'
            ? `Popular Cars (${dayjs().format('MMM')})`
            : null,
      },
    },
  };

  return (
    <div className="flex flex-col gap-3 border border-gray-300 rounded-md p-3">
      <div className="flex flex-col gap-3 bg-card-01-bg rounded-md shadow-md p-4">
        <h1 className="text-center text-white text-2xl font-semibold">
          Popular Locations
        </h1>

        <form className="flex gap-2">
          <select
            name="pickDrop"
            id="pickDropSelect"
            className="w-full border bg-gray-100 rounded-md py-1.5 px-2 focus:outline-none"
            onChange={handleSelectPickOrDrop}
          >
            <option value="pickUp">Pick-up</option>
            <option value="dropOff">Drop-off</option>
          </select>

          <select
            name="category"
            id="category-select"
            className="w-full border bg-gray-100 rounded-md py-1.5 px-2 focus:outline-none"
            onChange={handleSelectYearOrMonth}
          >
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
          </select>
        </form>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-4 h-[540px] overflow-auto flex-1">
          <div className="bg-gray-500 text-white rounded-lg p-5 shadow-md w-full">
            <div className="flex justify-around text-center font-bold">
              <div className="p-2 flex-1">No.</div>
              <div className="p-2 flex-1">
                {selectPickOrDrop === 'pickUp'
                  ? 'Pick-up Branch'
                  : selectPickOrDrop === 'dropOff'
                  ? 'Drop-off Branch'
                  : ''}
              </div>
              <div className="p-2 flex-1">
                {selectPickOrDrop === 'pickUp'
                  ? 'Pick-up Times'
                  : selectPickOrDrop === 'dropOff'
                  ? 'Drop-off Times'
                  : ''}
              </div>
            </div>
          </div>
          {selectPickOrDrop === 'pickUp' && selectYearOrMonth === 'yearly'
            ? pickupByBranchPerYear?.map((booking, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-1 h-[70px] shadow-md w-full"
                >
                  <div className="flex justify-around text-center">
                    <div className="p-2 flex-1">{index + 1}</div>
                    <div className="p-2 flex-1 break-words">{booking.branch}</div>
                    <div className="p-2 flex-1 break-words">{booking.bookingTimes}</div>
                  </div>
                </div>
              ))
            : selectPickOrDrop === 'pickUp' && selectYearOrMonth === 'monthly'
            ? pickupByBranchPerMonth?.map((booking, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-1 h-[70px] shadow-md w-full"
                >
                  <div className="flex justify-around text-center">
                    <div className="p-2 flex-1 break-words">{index + 1}</div>
                    <div className="p-2 flex-1 break-words">{booking.branch}</div>
                    <div className="p-2 flex-1 break-words">{booking.bookingTimes}</div>
                  </div>
                </div>
              ))
            : selectPickOrDrop === 'dropOff' && selectYearOrMonth === 'yearly'
            ? dropOffByBranchPerYear?.map((booking, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-1 h-[70px] shadow-md w-full"
                >
                  <div className="flex justify-around text-center">
                    <div className="p-2 flex-1 break-words">{index + 1}</div>
                    <div className="p-2 flex-1 break-words">{booking.branch}</div>
                    <div className="p-2 flex-1 break-words">{booking.dropTimes}</div>
                  </div>
                </div>
              ))
            : selectPickOrDrop === 'dropOff' && selectYearOrMonth === 'monthly'
            ? dropOffByBranchPerMonth?.map((booking, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-1 h-[70px] shadow-md w-full"
                >
                  <div className="flex justify-around text-center">
                    <div className="p-2 flex-1 break-words">{index + 1}</div>
                    <div className="p-2 flex-1 break-words">{booking.branch}</div>
                    <div className="p-2 flex-1 break-words">{booking.dropTimes}</div>
                  </div>
                </div>
              ))
            : null}
        </div>

        <div className="p-1 bg-white rounded-md shadow-md h-full flex-1">
          <div
            style={{ height: '500px' }}
            className="flex items-center justify-center"
          >
            <Doughnut data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

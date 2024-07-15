import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { usePayment } from "../../../contexts/payment-context";
import { useBooking } from "../../../contexts/booking-context";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import Header from "../../../components/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const dummyDailyPayment = [
  { date: '2024-07-01', totalAmount: 40000 },
  { date: '2024-07-02', totalAmount: 30000 },
  { date: '2024-07-03', totalAmount: 20000 },
  { date: '2024-07-04', totalAmount: 40000 },
  { date: '2024-07-05', totalAmount: 50000 },
  { date: '2024-07-06', totalAmount: 140000 },
  { date: '2024-07-07', totalAmount: 60000 },
  { date: '2024-07-08', totalAmount: 10000 },
  { date: '2024-07-09', totalAmount: 20000 },
  { date: '2024-07-10', totalAmount: 143400 },
  { date: '2024-07-11', totalAmount: 30000 },
  { date: '2024-07-12', totalAmount: 40000 },
  { date: '2024-07-13', totalAmount: 10000 },
  { date: '2024-07-14', totalAmount: 80000 },
  { date: '2024-07-15', totalAmount: 40000 },
  { date: '2024-07-16', totalAmount: 30000 },
  { date: '2024-07-17', totalAmount: 20000 },
  { date: '2024-07-18', totalAmount: 10000 },
  { date: '2024-07-19', totalAmount: 30000 },
  { date: '2024-07-20', totalAmount: 40000 },
  { date: '2024-07-21', totalAmount: 50000 },
  { date: '2024-07-22', totalAmount: 40000 },
  { date: '2024-07-23', totalAmount: 10000 },
  { date: '2024-07-24', totalAmount: 90000 },
  { date: '2024-07-25', totalAmount: 70000 },
  { date: '2024-07-26', totalAmount: 40000 },
  { date: '2024-07-27', totalAmount: 50000 },
  { date: '2024-07-28', totalAmount: 100000 },
  { date: '2024-07-29', totalAmount: 50000 },
  { date: '2024-07-30', totalAmount: 40000 },
  { date: '2024-07-31', totalAmount: 60000 }
]

export default function Income() {
  const { allPayment, monthlyPayments, yearlyPayment, dailyPayment, totalPaymentPerMonth } = usePayment();
  const { currentMonth, currentYear, currentDate } = useBooking();
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectIncome, setSelectIncome] = useState("monthly");
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 5;
  const scrollRef = useRef(null);

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
    setCurrentPage(1);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (selectIncome === "yearly") {
      const sum = yearlyPayment?.reduce((acc, item) => {
        return (acc += item.amount);
      }, 0);
      setTotalAmount(sum);
    }
    if (selectIncome === "monthly") {
      const sum = monthlyPayments?.reduce((acc, item) => {
        return (acc += item.amount);
      }, 0);
      setTotalAmount(sum);
    }
  }, [allPayment, selectIncome]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const totalPayment = totalPaymentPerMonth;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          selectIncome === "yearly"
            ? `Yearly Sales (${currentYear})`
            : selectIncome === "monthly"
              ? `Monthly Sales (${months[month]})`
              : null,
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
      selectIncome === "yearly"
        ? months.slice(0, currentMonth)
        : selectIncome === "monthly"
          ? daysArray.slice(0, currentDate)
          : null,
    datasets: [
      {
        label:
          selectIncome === "yearly"
            ? `Monthly Sales`
            : selectIncome === "monthly"
              ? "Daily Sales"
              : null,
        data:
          selectIncome === "yearly"
            ? totalPayment
            : selectIncome === "monthly"
              // ? dailyPayment?.map((item) => item.totalAmount)
              ? dummyDailyPayment?.map((item) => item.totalAmount)
              : null,
        backgroundColor: "rgba(53, 162, 235, 0.8)",
        borderRadius: "5",
      },
    ],
  };

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments =
    selectIncome === "yearly"
      ? yearlyPayment?.slice(indexOfFirstPayment, indexOfLastPayment)
      : monthlyPayments?.slice(indexOfFirstPayment, indexOfLastPayment);

  const totalPage = Math.ceil(
    (selectIncome === "yearly"
      ? yearlyPayment?.length
      : monthlyPayments?.length) / paymentsPerPage
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPage <= 10) {
      for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pageNumbers.push(1, 2, 3, 4, 5, "...", totalPage);
      } else if (currentPage > 4 && currentPage < totalPage - 3) {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPage
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          totalPage - 4,
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
          totalPage
        );
      }
    }

    return pageNumbers.map((number, index) => (
      <li key={index} className="mx-1">
        {number === "..." ? (
          <span className="px-3 py-1">...</span>
        ) : (
          <button
            type="button"
            className={`px-3 py-1 border rounded-full ${number === currentPage ? "bg-gray-300" : ""
              }`}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        )}
      </li>
    ));
  };

  return (
    <div className="flex flex-col gap-3 border border-gray-300 rounded-md p-3">
      <div className="flex flex-col gap-3 bg-card-02-bg rounded-md shadow-md p-4">
        <h1 className="text-center text-2xl text-white font-semibold">
          Income
        </h1>
        <form onChange={handleSelect}>
          <select
            name="category"
            id="categorySelect"
            className="w-full border bg-gray-100 rounded-md py-1.5 px-2 focus:outline-none"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </form>
      </div>

      <div
        className="flex flex-col gap-4 h-[400px] overflow-auto"
        ref={scrollRef}
      >
        <Header
          columns={[
            "Booking ID",
            "Payment ID",
            "Customer",
            "Payment Date",
            "Amount",
          ]}
        />
        {currentPayments?.map((payment, index) => {
          const paymentDate = dayjs(payment?.paymentDate).format("DD/MM/YYYY");
          return (
            <div
              key={index}
              className="bg-white rounded-lg p-5 shadow-md w-full"
            >
              <div className="grid grid-cols-5 text-center">
                <div className="p-2">{payment?.bookingId}</div>
                <div className="p-2">{payment?.paymentId}</div>
                <div className="p-2">{payment?.customer}</div>
                <div className="p-2">{paymentDate}</div>
                <div className="p-2">
                  &#3647; {payment?.amount.toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
        <div>
          <div className="bg-gray-500 text-white rounded-lg p-5 shadow-md w-full">
            <div className="grid grid-cols-5 text-center font-bold text-lg">
              <div className="p-2">Total</div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2">&#3647; {totalAmount?.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <ul className="flex list-none my-4 justify-center">
        {currentPage > 1 && (
          <li className="mx-1">
            <button
              type="button"
              className="px-3 py-1 border rounded-full"
              onClick={() => paginate(currentPage - 1)}
            >
              Prev
            </button>
          </li>
        )}
        {renderPageNumbers()}
        {currentPage < totalPage && (
          <li className="mx-1">
            <button
              type="button"
              className="px-3 py-1 border rounded-full"
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </li>
        )}
      </ul>

      <div className="bg-white rounded-md shadow-md p-4 w-full flex justify-center">
        <div style={{ width: "700px", height: "350px" }}>
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

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
import { useCustomer } from "../../../contexts/customer-context";
import { useRef, useState, useEffect } from "react";
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

export default function TotalCustomers() {
  const {
    allCustomer,
    yearlyCustomer,
    monthlyCustomer,
    currentYear,
    currentMonth,
  } = useCustomer();
  const [selectTotalCus, setSelectTotalCus] = useState("monthly");
  const [totalAmount, setTotalAmount] = useState(0);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;
  const scrollRef = useRef();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const handleCategoryChange = (event) => {
    setSelectTotalCus(event.target.value);
    setCurrentPage(1);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    let labels = [];
    let data = [];

    if (selectTotalCus === "yearly") {
      setTotalAmount(yearlyCustomer.length);
    } else if (selectTotalCus === "monthly") {
      setTotalAmount(monthlyCustomer.length);
    }

    if (selectTotalCus === "yearly") {
      labels = Array.from({ length: 12 }, (_, i) =>
        dayjs().month(i).format("MMM")
      );
      data = labels.map(
        (_, month) =>
          yearlyCustomer.filter(
            (customer) => dayjs(customer.createdAt).month() === month
          ).length
      );
    } else {
      labels = daysArray;
      data = labels.map(
        (day) =>
          monthlyCustomer.filter(
            (customer) => dayjs(customer.createdAt).date() === day
          ).length
      );
    }

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

    setChartData({
      labels:
        selectTotalCus === "yearly"
          ? months.slice(0, currentMonth)
          : selectTotalCus === "monthly"
          ? daysArray
          : null,
      datasets: [
        {
          label:
            selectTotalCus === "yearly"
              ? `Total Customers (${currentYear})`
              : `Total Customers (${dayjs().format("MMM")})`,
          data,
          backgroundColor: "rgba(53, 162, 235, 0.8)",
          borderRadius: 5,
        },
      ],
    });
  }, [allCustomer, selectTotalCus, yearlyCustomer, monthlyCustomer]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          selectTotalCus === "yearly"
            ? `Yearly Customers (${currentYear})`
            : `Monthly Customers (${dayjs().format("MMM")})`,
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers =
    selectTotalCus === "yearly"
      ? yearlyCustomer?.slice(indexOfFirstCustomer, indexOfLastCustomer)
      : monthlyCustomer?.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const totalPage = Math.ceil(
    (selectTotalCus === "yearly"
      ? yearlyCustomer?.length
      : monthlyCustomer?.length) / customersPerPage
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
            className={`px-3 py-1 border rounded-full ${
              number === currentPage ? "bg-gray-300" : ""
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
      <div className="flex flex-col gap-3 bg-card-03-bg rounded-md shadow-md p-4">
        <h1 className="text-center text-2xl text-white font-semibold">
          Total Customers
        </h1>

        <form>
          <select
            name="category"
            id="categorySelect"
            className="w-full border bg-gray-100 rounded-md py-1.5 px-2 focus:outline-none"
            onChange={handleCategoryChange}
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
            "Customer ID",
            "Name",
            "Email",
            "Phone",
            "Address",
            "Created Date",
            "Driver License",
          ]}
        />
        {currentCustomers?.map((customer, index) => {
          const createDate = dayjs(customer?.createdAt).format("DD/MM/YYYY");
          return (
            <div
              key={index}
              className="bg-white rounded-lg p-5 shadow-md w-full"
            >
              <div className="grid grid-cols-7 text-center">
                <div className="p-2 border-2">{customer?.customerId}</div>
                <div className="p-2 border-2">
                  {customer?.firstName} {customer?.lastName}
                </div>
                <div className="p-2 border-2">{customer?.email}</div>
                <div className="p-2 border-2">{customer?.phone}</div>
                <div className="p-2 border-2">{customer?.address}</div>
                <div className="p-2 border-2">{createDate}</div>
                <div className="p-2 border-2">{customer?.driverLicense}</div>
              </div>
            </div>
          );
        })}
        <div>
          <div className="bg-gray-500 text-white rounded-lg p-5 shadow-md w-full">
            <div className="grid grid-cols-7 text-center font-bold text-lg">
              <div className="p-2">Total customers</div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2">{totalAmount}</div>
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
          <Bar options={options} data={chartData} />
        </div>
      </div>
    </div>
  );
}

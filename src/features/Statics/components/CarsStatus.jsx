import { useRef, useState, useEffect } from "react";
import { useCars } from "../../../contexts/car-context";
import Header from "../../../components/Header";

export default function CarsStatus() {
  const [selectedStatus, setSelectedStatus] = useState("Available");
  const [currentPage, setCurrentPage] = useState(1);
  const { allCar } = useCars();
  const scrollRef = useRef();
  const carsPerPage = 5;

  const handleSelectChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const filterCarsStatus = allCar?.filter(
    (car) => car.status === selectedStatus
  );

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filterCarsStatus?.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPage = Math.ceil(filterCarsStatus?.length / carsPerPage);

  return (
    <div className="flex flex-col gap-3 border border-gray-300 rounded-md p-3">
      <div className="flex flex-col gap-3 bg-card-01-bg rounded-md shadow-md p-4">
        <h1 className="text-center text-2xl text-white font-semibold">
          Cars Status
        </h1>

        <form>
          <select
            name="status"
            id="statusSelect"
            className="w-full border bg-gray-100 rounded-md py-1.5 px-2 focus:outline-none"
            onChange={handleSelectChange}
          >
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </form>
      </div>

      <div
        className="flex flex-col gap-4 h-[400px] overflow-auto"
        ref={scrollRef}
      >
        <Header
          addClass="grid-cols-5"
          columns={["Car ID", "Plate", "Model", "color", "Status"]}
        />
        {currentCars?.map((car, index) => (
          <div key={index} className="bg-white rounded-lg p-5 shadow-md w-full">
            <div className="grid grid-cols-5 text-center">
              <div className="p-2 break-words">{car?.id}</div>
              <div className="p-2 break-words">{car?.plate}</div>
              <div className="p-2 break-words">{car?.model}, {car?.brand}</div>
              <div className="p-2 break-words">{car?.color}</div>
              <div className="p-2 break-words">
                <p
                  className={`font-bold rounded-full ${
                    car?.status === "Available"
                      ? "text-success-status-text bg-success-status-bg"
                      : car?.status === "Maintenance"
                      ? "text-fail-status-text bg-fail-status-bg"
                      : "text-process-status-text bg-process-status-bg"
                  } `}
                >
                  {car?.status}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div>
          <div className="bg-gray-500 text-white rounded-lg p-5 shadow-md w-full">
            <div className="grid grid-cols-5 text-center font-bold text-lg">
              <div className="p-2">Total</div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2">{filterCarsStatus?.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

// Pagination component
const Pagination = ({ currentPage, totalPage, paginate }) => {
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

  return (
    <ul className="flex list-none">
      {currentPage > 1 && (
        <li className="mx-1">
          <button
            className="px-3 py-1 border rounded-full"
            onClick={() => paginate(currentPage - 1)}
          >
            Prev
          </button>
        </li>
      )}
      {pageNumbers.map((number, index) => (
        <li key={index} className="mx-1">
          {number === "..." ? (
            <span className="px-3 py-1">...</span>
          ) : (
            <button
              className={`px-3 py-1 border rounded-full ${
                number === currentPage ? "bg-gray-300" : ""
              }`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          )}
        </li>
      ))}
      {currentPage < totalPage && (
        <li className="mx-1">
          <button
            className="px-3 py-1 border rounded-full"
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </button>
        </li>
      )}
    </ul>
  );
};

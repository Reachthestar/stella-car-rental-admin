import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useCars } from '../contexts/car-context';
import carsApi from '../apis/cars';
import { Bin } from '../assets/icons';
import { AxiosError } from 'axios';

function CarsCards() {
  const { allCar, fetchCars } = useCars();
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const cardPerPage = 10;
  useEffect(() => {
    setCurrentPage(1); // Reset to the first page on search or sort
  }, [searchTerm, sortKey]);

  const handleMaintenance = (carId) => {
    Swal.fire({
      text: 'Status',
      title: `Are you sure you want to put this car under maintenance?`,
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const run = async () => {
          try {
            await carsApi.updateCar(carId, { status: 'maintenance' });
          } catch (error) {
            console.log(error);
          } finally {
            fetchCars();
          }
        };
        run();
      }
    });
  };

  const handleMakeAvailable = (carId) => {
    Swal.fire({
      text: 'Status',
      title: `Are you sure you want to mark this car as available?`,
      icon: 'info',
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const run = async () => {
          try {
            await carsApi.updateCar(carId, { status: 'available' });
          } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
              alert(error.response.data.message); //wait for toastify
            }
          } finally {
            fetchCars();
          }
        };
        run();
      }
    });
  };

  const handleDelete = (carId) => {
    Swal.fire({
      text: 'Remove ?',
      title: 'Are you sure you want to remove this car ?',
      icon: 'error',
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const run = async () => {
          try {
            console.log(carId);

            const res = await carsApi.deleteCar(carId);
            console.log(res.data.message);
          } catch (error) {
            console.log(error);
          } finally {
            fetchCars();
          }
        };
        run();
      }
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortKey(event.target.value);
  };

  const filteredCars = allCar.filter((car) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      car.brand.toLowerCase().includes(searchTermLower) ||
      car.model.toLowerCase().includes(searchTermLower) ||
      car.color.toLowerCase().includes(searchTermLower) ||
      car.plate.toLowerCase().includes(searchTermLower) ||
      car.region.toLowerCase().includes(searchTermLower) ||
      car.airport.toLowerCase().includes(searchTermLower) ||
      car.useDate.toLowerCase().includes(searchTermLower) ||
      car.updatedAt.toLowerCase().includes(searchTermLower) ||
      car.status.toLowerCase().includes(searchTermLower)
    );
  });

  const sortedCars = filteredCars.sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];

    if (sortKey === 'updatedAt') {
      return new Date(valueB) - new Date(valueA); // Sort by update date in descending order
    }

    if (sortKey === 'useDate') {
      return new Date(valueB) - new Date(valueA); // Sort by use date in descending order
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    }

    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  });

  const searchedCar = searchTerm === '' ? allCar : filteredCars; // Make pagination equal to searched car, not exceeding it
  const totalPage = Math.ceil(searchedCar.length / cardPerPage); // Have to declare here or cause initialization error
  const indexOfLastCarPerPage = currentPage * cardPerPage;
  const firstIndexOfCarPerPage = indexOfLastCarPerPage - cardPerPage;
  const currentCarPerPage = sortedCars.slice(
    firstIndexOfCarPerPage,
    indexOfLastCarPerPage
  );

  const handleChangePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const goToNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-xl font-bold text-decoration-line: underline">
        Cars
      </h1>
      <div className="flex justify-between w-full mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <select
          value={sortKey}
          onChange={handleSort}
          className="ml-4 shadow text-center appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Sort by</option>
          <option value="brand">Brand</option>
          <option value="model">Model</option>
          <option value="color">Color</option>
          <option value="plate">License Plate</option>
          <option value="region">Region</option>
          <option value="airport">Airport</option>
          <option value="useDate">Use Date</option>
          <option value="updatedAt">Updated At</option>
          <option value="status">Status</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="bg-gray-100 rounded-lg p-5 shadow-lg w-full sticky top-0">
          <div className="grid grid-cols-9 text-center font-bold">
            <div className="p-2">Car Brand</div>
            <div className="p-2">Car Model</div>
            <div className="p-2">Color</div>
            <div className="p-2">License Plate</div>
            <div className="p-2">Region</div>
            <div className="p-2">Airport</div>
            <div className="p-2">Use Date</div>
            <div className="p-2">Updated At</div>
            <div className="p-2">Status</div>
          </div>
        </div>

        {currentCarPerPage?.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-lg p-5 shadow-lg w-full"
          >
            <div className="grid grid-cols-9 text-center">
              <div className="p-2">{car.brand}</div>
              <div className="p-2">{car.model}</div>
              <div className="p-2">{car.color}</div>
              <div className="p-2">{car.plate}</div>
              <div className="p-2">{car.region}</div>
              <div className="p-2">{car.airport}</div>
              <div className="p-2">{car.useDate}</div>
              <div className="p-2">{car.updatedAt}</div>
              <div className="p-2 flex flex-col items-center justify-center gap-2">
                <p
                  className={`px-4 font-bold rounded-full ${
                    car?.status === 'Available'
                      ? 'text-success-status-text bg-success-status-bg'
                      : car?.status === 'Maintenance'
                      ? 'text-fail-status-text bg-fail-status-bg'
                      : 'text-process-status-text bg-process-status-bg'
                  }`}
                >
                  {car.status}
                </p>
                <div className="flex space-x-2">
                  {car.status === 'Available' && (
                    <button
                      onClick={() => handleMaintenance(car.id)}
                      className="bg-red-500 text-white rounded-full w-6 h-6"
                    >
                      <i className="ri-close-fill"></i>
                    </button>
                  )}
                  {car.status === 'Maintenance' && (
                    <button
                      onClick={() => handleMakeAvailable(car.id)}
                      className="bg-green-500 text-white rounded-full w-6 h-6"
                    >
                      <i className="ri-check-fill"></i>
                    </button>
                  )}

                  {car.status === 'Rented' && (
                    <button
                      onClick={() => handleMakeAvailable(car.id)}
                      className="bg-green-500 text-white rounded-full w-6 h-6"
                    >
                      <i className="ri-check-fill"></i>
                    </button>
                  )}
                  {car.status !== 'Rented' && (
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="px-2 w-10"
                    >
                      <Bin className=" w-full" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 flex gap-2">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="hover:text-orange-500"
        >
          prev
        </button>

        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleChangePage(index + 1)}
            className={`w-10 h-10 rounded-full ${
              currentPage === index + 1
                ? 'bg-black text-white'
                : 'bg-gray-200 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPage}
          className=" hover:text-orange-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CarsCards;

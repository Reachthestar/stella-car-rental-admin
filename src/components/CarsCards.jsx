import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useCars } from "../contexts/car-context";
import carsApi from "../apis/cars";
import { Bin } from "../assets/icons";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import Pagination from "./Pagination";
import Header from "./Header";
import Filter from "./Filter";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { useFilter } from '../contexts/filter-context';

function CarsCards() {
  const { fetchCars } = useCars();
  const {
    searchTerm,
    sortKey,
    handleSearch,
    handleSort,
    currentItemPerPage,
    pagination,
  } = useFilter()

  const handleMaintenance = async (carId) => {
    const result = await Swal.fire({
      text: "Status",
      title: `Are you sure you want to put this car under maintenance?`,
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
    });

    if (result.isConfirmed) {
      try {
        await carsApi.updateCar(carId, { status: "maintenance" });
      } catch (error) {
        console.log(error);
      } finally {
        fetchCars();
      }
    }
  };

  const handleMakeAvailable = async (carId) => {
    const result = await Swal.fire({
      text: "Status",
      title: `Are you sure you want to mark this car as available?`,
      icon: "info",
      showCancelButton: true,
      showConfirmButton: true,
    });

    if (result.isConfirmed) {
      try {
        await carsApi.updateCar(carId, { status: "available" });
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          alert(error.response.data.message);
        }
      } finally {
        fetchCars();
      }
    }
  };

  const handleDelete = async (carId) => {
    const result = await Swal.fire({
      text: "Remove ?",
      title: "Are you sure you want to remove this car ?",
      icon: "error",
      showCancelButton: true,
      showConfirmButton: true,
    });

    if (result.isConfirmed) {
      try {
        await carsApi.deleteCar(carId);
      } catch (error) {
        console.log(error);
      } finally {
        fetchCars();
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-semibold">Cars</h1>
      <Filter
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        sortKey={sortKey}
        handleSort={handleSort}
        filterItem={[
          { value: "brand", text: "Brand" },
          { value: "model", text: "Model" },
          { value: "color", text: "Color" },
          { value: "plate", text: "License Plate" },
          { value: "region", text: "Region" },
          { value: "airport", text: "Airport" },
          { value: "useDate", text: "Use Date" },
          { value: "updatedAt", text: "Updated At" },
          { value: "status", text: "Status" },
        ]}
      />
      <div className="grid grid-cols-1 gap-4 w-full">
        <Header
          columns={[
            'Car Brand',
            'Car Model',
            'Color',
            'License',
            'Region',
            'Airport',
            'Use Date',
            'Updated At',
            'Status'
          ]} />
        {currentItemPerPage?.map((car) => {
          const updatedAt = dayjs(car.updatedAt).format('DD/MM/YYYY');

          return (
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
                <div className="p-2">{updatedAt}</div>
                <div className="p-2 flex flex-col items-center justify-center gap-2">
                  <p
                    className={`px-4 font-bold rounded-full ${
                      car?.status === "Available"
                        ? "text-success-status-text bg-success-status-bg"
                        : car?.status === "Maintenance"
                        ? "text-fail-status-text bg-fail-status-bg"
                        : "text-process-status-text bg-process-status-bg"
                    }`}
                  >
                    {car.status}
                  </p>
                  <div className="flex space-x-2">
                    {car.status === "Available" && (
                      <button
                        onClick={() => handleMaintenance(car.id)}
                        className="bg-red-500 text-white rounded-full w-6 h-6 p-1"
                      >
                        <HiOutlineWrenchScrewdriver />
                      </button>
                    )}
                    {car.status === "Maintenance" && (
                      <button
                        onClick={() => handleMakeAvailable(car.id)}
                        className="bg-green-500 text-white rounded-full w-6 h-6"
                      >
                        <i className="ri-check-fill"></i>
                      </button>
                    )}
                    {car.status === "Rented" && (
                      <button
                        onClick={() => handleMakeAvailable(car.id)}
                        className="bg-green-500 text-white rounded-full w-6 h-6"
                      >
                        <i className="ri-check-fill"></i>
                      </button>
                    )}
                    {car.status !== "Rented" && (
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="px-2 w-10"
                      >
                        <FaRegTrashAlt size={22} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {pagination()}
    </div>
  );
}

export default CarsCards;

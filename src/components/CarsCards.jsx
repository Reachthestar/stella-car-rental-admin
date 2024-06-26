import React from "react";
import Swal from "sweetalert2";
import { useCars } from "../contexts/car-context";
import carsApi from "../apis/cars";

function CarsCards() {
  const { allCar, fetchCars } = useCars()

  const handleMaintenance = (carId) => {
    Swal.fire({
      text: "Status",
      title: `Are you sure you want to put this car under maintenance?`,
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const run = async () => {
          try {
            await carsApi.updateCar(carId, { status: 'maintenance' })
          } catch (error) {
            console.log(error)
          } finally {
            fetchCars();
          }
        }
        run()
      }
    })
  };

  const handleMakeAvailable = (carId) => {
    Swal.fire({
      text: "Status",
      title: `Are you sure you want to mark this car as available?`,
      icon: "info",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const run = async () => {
          try {
            await carsApi.updateCar(carId, { status: 'available' })
          } catch (error) {
            console.log(error)
          } finally {
            fetchCars();
          }
        }
        run();
      }
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-xl font-bold text-decoration-line: underline">
        Cars
      </h1>
      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="bg-gray-100 rounded-lg p-5 shadow-lg w-full">
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

        {allCar?.map((car) => (

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
                {car.status}
                <div className="flex space-x-2">
                  {car.status === "Available" && (
                    <button
                      onClick={() => handleMaintenance(car.id)}
                      className="bg-red-500 text-white rounded-full px-2"
                    >
                      X
                    </button>
                  )}
                  {car.status === "Maintenance" && (
                    <button
                      onClick={() => handleMakeAvailable(car.id)}
                      className="bg-green-500 text-white rounded-full px-2"
                    >
                      <i className="ri-check-double-line"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarsCards;

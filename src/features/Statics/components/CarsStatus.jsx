import { useState } from 'react';
import { useCars } from '../../../contexts/car-context';

export default function CarsStatus() {
  const [selectedStatus, setSelectedStatus] = useState('Available');
  const { allCar } = useCars();

  const handleSelectChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filterCarsStatus = allCar?.filter(
    (car) => car.status === selectedStatus
  );

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

      <div className="flex flex-col gap-4 h-[400px] overflow-auto">
        <div className="bg-gray-500 text-white rounded-lg p-5 shadow-md w-full">
          <div className="grid grid-cols-5 text-center font-bold">
            <div className="p-2">Car ID</div>
            <div className="p-2">Plate</div>
            <div className="p-2">Model</div>
            <div className="p-2">color</div>
            <div className="p-2">Status</div>
          </div>
        </div>

        {filterCarsStatus?.map((car, index) => (
          <div key={index} className="bg-white rounded-lg p-5 shadow-md w-full">
            <div className="grid grid-cols-5 text-center">
              <div className="p-2">{car?.id}</div>
              <div className="p-2">{car?.plate}</div>
              <div className="p-2">
                {car?.model}, {car?.brand}
              </div>
              <div className="p-2">{car?.color}</div>
              <div className="p-2">
                <p
                  className={`font-bold rounded-full ${
                    car?.status === 'Available'
                      ? 'text-success-status-text bg-success-status-bg'
                      : car?.status === 'Maintenance'
                      ? 'text-fail-status-text bg-fail-status-bg'
                      : 'text-process-status-text bg-process-status-bg'
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
    </div>
  );
}

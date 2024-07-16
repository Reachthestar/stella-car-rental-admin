import { useRef, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useBooking } from '../contexts/booking-context';
import CarsStatus from '../features/Statics/components/CarsStatus';
import Income from '../features/Statics/components/Income';
import PopularCars from '../features/Statics/components/PopularCars';
import PopularLocations from '../features/Statics/components/PopularLocations';
import TotalCustomers from '../features/Statics/components/TotalCustomers';

export default function Statistics() {
  const { isAllPaymentLoading } = useBooking();
  const [selectedNavigate, setSelectedNavigate] = useState('CarsStatus');

  const handleNavigate = (e) => {
    setSelectedNavigate(e.target.name);
  };

  return (
    <div className="flex flex-col gap-4">
      {isAllPaymentLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex gap-2">
          <div className="flex flex-col pr-3 gap-4 w-[200px]">
            <button
              name="CarsStatus"
              className="bg-card-01-bg text-white rounded-md font-semibold py-2"
              onClick={handleNavigate}
            >
              Car Status
            </button>
            <button
              name="Income"
              className="bg-card-02-bg text-white rounded-md font-semibold py-2"
              onClick={handleNavigate}
            >
              Income
            </button>
            <button
              name="TotalCustomers"
              className="bg-card-03-bg text-white rounded-md font-semibold py-2"
              onClick={handleNavigate}
            >
              Total Customers
            </button>
            <button
              name="PopularCars"
              className="bg-card-04-bg text-white rounded-md font-semibold py-2"
              onClick={handleNavigate}
            >
              Popular Cars
            </button>
            <button
              name="PopularLocations"
              className="bg-card-01-bg text-white rounded-md font-semibold py-2"
              onClick={handleNavigate}
            >
              Popular Locations
            </button>
          </div>

          <div className="flex flex-col gap-4 left-[200px] flex-1">
            {selectedNavigate === 'CarsStatus' && <CarsStatus />}
            {selectedNavigate === 'Income' && <Income />}
            {selectedNavigate === 'TotalCustomers' && <TotalCustomers />}
            {selectedNavigate === 'PopularCars' && <PopularCars />}
            {selectedNavigate === 'PopularLocations' && <PopularLocations />}
          </div>
        </div>
      )}
    </div>
  );
}

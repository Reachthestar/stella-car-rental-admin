import { useRef } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useBooking } from '../contexts/booking-context';
import CarsStatus from '../features/Statics/components/CarsStatus';
import Income from '../features/Statics/components/Income';
import PopularCars from '../features/Statics/components/PopularCars';
import PopularLocations from '../features/Statics/components/PopularLocations';
import TotalCustomers from '../features/Statics/components/TotalCustomers';

export default function Statistics() {
  const { isAllPaymentLoading } = useBooking();

  const carsStatusRef = useRef(null);
  const incomeRef = useRef(null);
  const totalCustomersRef = useRef(null);
  const popularCarsRef = useRef(null);
  const popularLocationsRef = useRef(null);

  // Function to scroll to the ref
  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-4">
      {isAllPaymentLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex gap-4 relative">
          <div className="flex flex-col pr-3 gap-4 py-3 w-[200px] h-screen fixed top-0">
            <button
              className="bg-card-01-bg text-white rounded-md py-2"
              onClick={() => scrollToRef(carsStatusRef)}
            >
              Car Status
            </button>
            <button
              className="bg-card-02-bg text-white rounded-md py-2"
              onClick={() => scrollToRef(incomeRef)}
            >
              Income
            </button>
            <button
              className="bg-card-03-bg text-white rounded-md py-2"
              onClick={() => scrollToRef(totalCustomersRef)}
            >
              Total Customers
            </button>
            <button
              className="bg-card-04-bg text-white rounded-md py-2"
              onClick={() => scrollToRef(popularCarsRef)}
            >
              Popular Cars
            </button>
            <button
              className="bg-card-01-bg text-white rounded-md py-2"
              onClick={() => scrollToRef(popularLocationsRef)}
            >
              Popular Locations
            </button>
          </div>

          <div className="flex flex-col gap-4 absolute left-[200px]">
            <div ref={carsStatusRef}>
              <CarsStatus />
            </div>
            <div ref={incomeRef}>
              <Income />
            </div>
            <div ref={totalCustomersRef}>
              <TotalCustomers />
            </div>
            <div ref={popularCarsRef}>
              <PopularCars />
            </div>
            <div ref={popularLocationsRef}>
              <PopularLocations />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

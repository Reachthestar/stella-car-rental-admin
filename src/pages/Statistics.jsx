import CarsStatus from '../features/Statics/components/CarsStatus';
import Income from '../features/Statics/components/Income';
import PopularCars from '../features/Statics/components/PopularCars';
import PopularLocations from '../features/Statics/components/PopularLocations';
import TotalCustomers from '../features/Statics/components/TotalCustomers';

export default function Statistics() {
  return (
    <div className="flex flex-col gap-4">
      <CarsStatus />
      <Income />
      <TotalCustomers />
      <PopularCars />
      <PopularLocations />
    </div>
  );
}

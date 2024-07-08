import LoadingSpinner from '../components/LoadingSpinner';
import { useBooking } from '../contexts/booking-context';
import { useCars } from '../contexts/car-context';
import { useCustomer } from '../contexts/customer-context';
import { usePayment } from '../contexts/payment-context';
import CarsStatus from '../features/Statics/components/CarsStatus';
import Income from '../features/Statics/components/Income';
import PopularCars from '../features/Statics/components/PopularCars';
import PopularLocations from '../features/Statics/components/PopularLocations';
import TotalCustomers from '../features/Statics/components/TotalCustomers';

export default function Statistics() {
  const { isAllBookingLoading } = useBooking();
  const { isAllCarLoading } = useCars();
  const { isAllPaymentLoading } = usePayment();
  const { isAllCustomerLoading } = useCustomer()
  return (
    <div className='flex flex-col gap-4 h-full'>
      {isAllBookingLoading || isAllCarLoading || isAllPaymentLoading || isAllCustomerLoading ?
        <div className='h-full flex items-center'>
          <LoadingSpinner />
        </div>
        :
        <>
          <CarsStatus />
          <Income />
          <TotalCustomers />
          <PopularCars />
          <PopularLocations />
        </>
      }
    </div>
  );
}

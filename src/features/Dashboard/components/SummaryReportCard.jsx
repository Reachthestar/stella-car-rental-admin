import { useEffect, useState } from 'react';
import { useBooking } from '../../../contexts/booking-context';
import { useCars } from '../../../contexts/car-context';
import { useCustomer } from '../../../contexts/customer-context';
import { usePayment } from '../../../contexts/payment-context';

export default function SummaryReportCard() {
  const { carAvailable, isAllCarLoading } = useCars();
  const { allCustomer, isAllCustomerLoading } = useCustomer();
  const { monthlyBookings, isAllBookingLoading } = useBooking();
  const { monthlyPayments, isAllPaymentLoading } = usePayment();
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(isAllCarLoading || isAllCustomerLoading || isAllBookingLoading || isAllPaymentLoading)
  }, [isAllCarLoading, isAllCustomerLoading, isAllBookingLoading, isAllPaymentLoading])


  return (
    <div className="grid grid-rows-2 grid-cols-2 w-full h-full gap-4 text-white">
      <div className="bg-card-01-bg w-full h-full rounded-md p-4 shadow-md">
        <p>Available Cars</p>
        <p className="font-semibold text-2xl">{isLoading ? 'loading...' : carAvailable?.length}</p>
      </div>
      <div className="bg-card-02-bg w-full h-full rounded-md p-4 shadow-md">
        <p>Monthly Payments</p>
        <p className="font-semibold text-2xl">{isLoading ? 'loading...' : monthlyPayments?.length}</p>
      </div>
      <div className="bg-card-03-bg w-full h-full rounded-md p-4 shadow-md">
        <p>Monthly Bookings</p>
        <p className="font-semibold text-2xl">{isLoading ? 'loading...' : monthlyBookings?.length}</p>
      </div>
      <div className="bg-card-04-bg w-full h-full rounded-md p-4 shadow-md">
        <p>Total Customers</p>
        <p className="font-semibold text-2xl">{isLoading ? 'loading...' : allCustomer?.length}</p>
      </div>
    </div>
  );
}

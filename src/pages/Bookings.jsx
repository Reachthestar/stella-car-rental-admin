import { useBooking } from "../contexts/booking-context";
import BookingCards from "../components/BookingCards";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Bookings() {
  const { isAllBookingLoading } = useBooking()
  return (
    <>
      {isAllBookingLoading ?
        <div className='h-full flex items-center'>
          <LoadingSpinner />
        </div>
        :
        <BookingCards />
        }
    </>
  );
}

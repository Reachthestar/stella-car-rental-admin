import { useBooking } from "../contexts/booking-context";
import BookingCards from "../components/BookingCards";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Bookings() {
  const { isAllBookingLoading } = useBooking()
  return (
    <div>
      {isAllBookingLoading ? <LoadingSpinner /> : <BookingCards />}
    </div>
  );
}

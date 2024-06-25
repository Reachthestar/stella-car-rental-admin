import { useBooking } from "../contexts/booking-context";
import BookingCards from "../components/BookingCards";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Bookings() {
  const { isAllBookingLoading } = useBooking()
  return (
    <div>
      {isAllBookingLoading ?
        <div className="pt-5">
          <LoadingSpinner />
        </div>
        :
        <BookingCards />}
    </div>
  );
}

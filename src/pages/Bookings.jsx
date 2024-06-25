import { useBooking } from "../contexts/booking-context";
import BookingCards from "../components/BookingCards";

export default function Bookings() {
  const { isAllBookingLoading } = useBooking()
  return (
    <div>
      {isAllBookingLoading ? <div className="border-2 text-center">Loading...</div> : <BookingCards/>}
    </div>
  );
}

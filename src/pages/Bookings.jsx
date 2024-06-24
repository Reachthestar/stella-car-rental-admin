import Cards from "../components/Cards";
import { useBooking } from "../contexts/booking-context";

export default function Bookings() {
  const { isAllBookingLoading } = useBooking()
  return (
    <div>
      {isAllBookingLoading ? <div className="border-2 text-center">Loading...</div> : <Cards />}
    </div>
  );
}

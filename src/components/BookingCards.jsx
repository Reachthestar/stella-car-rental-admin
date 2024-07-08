import Swal from 'sweetalert2';
import bookingApi from '../apis/booking';
import paymentApi from '../apis/payment';
import { usePayment } from '../contexts/payment-context';
import dayjs from 'dayjs';
import Header from './Header';
import Filter from './Filter';
import { useFilter } from '../contexts/filter-context';
import { useBooking } from '../contexts/booking-context';

function BookingCards() {
  const { fetchBooking } = useBooking();
  const { fetchPayment } = usePayment();
  const {
    searchTerm,
    sortKey,
    handleSearch,
    handleSort,
    currentItemPerPage,
    pagination,
  } = useFilter()

  const handleCancel = async (bookingId) => {
    try {
      const result = Swal.fire({
        text: 'Status',
        title: `Are you sure you want to cancel this booking?`,
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
      });
      if ((await result).isConfirmed) {
        await bookingApi.updateBookingStatus(bookingId, 'cancelled');
        await paymentApi.deletePayment(bookingId);
        fetchBooking();
        fetchPayment();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-semibold">Bookings</h1>
      <Filter
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        sortKey={sortKey}
        handleSort={handleSort}
        filterItem={[
          { value: 'id', text: 'ID' },
          { value: 'customer', text: 'Customer' },
          { value: 'car', text: 'Car' },
          { value: 'plate', text: 'License Plate' },
          { value: 'startDate', text: 'Start Date' },
          { value: 'endDate', text: 'End Date' },
          { value: 'amount', text: 'Total Amount' },
          { value: 'pickup', text: 'Pickup Location' },
          { value: 'dropoff', text: 'Drop-Off Location' },
          { value: 'time', text: 'Pickup & Drop-Off Time' },
          { value: 'status', text: 'Status' },
        ]} />
      <div className="grid grid-cols-1 gap-4 w-full">
        <Header
          columns={[
            'Booking ID',
            'Customer',
            'Car',
            'Plate',
            'Start Date',
            'End Date',
            'Amount',
            'Pickup',
            'Drop-Off',
            'Time',
            'Status'
          ]} />
        {currentItemPerPage?.map((booking) => {
          const startDate = dayjs(booking.startDate).format('DD/MM/YYYY');
          const endDate = dayjs(booking.endDate).format('DD/MM/YYYY');
          return (
            <div
              key={booking.id}
              className="bg-white rounded-lg p-5 shadow-lg w-full"
            >
              <div className="grid grid-cols-11 text-center items-center">
                <div className="p-2 h-fit">{booking.id}</div>
                <div className="p-2 h-fit">{booking.customer}</div>
                <div className="p-2 h-fit">{booking.car}</div>
                <div className="p-2 h-fit">{booking.plate}</div>
                <div className="p-2 h-fit">{startDate}</div>
                <div className="p-2 h-fit">{endDate}</div>
                <div className="p-2 h-fit">
                  &#3647; {booking.amount.toLocaleString()}
                </div>
                <div className="p-2 h-fit">{booking.pickup}</div>
                <div className="p-2 h-fit">{booking.dropoff}</div>
                <div className="p-2 h-fit">{booking.time}</div>

                <div className="p-2 flex flex-col items-center justify-center gap-2">
                  <p
                    className={`px-4 font-bold rounded-full ${booking.status === 'Cancelled'
                      ? 'text-fail-status-text bg-fail-status-bg'
                      : 'text-success-status-text bg-success-status-bg'
                      }`}
                  >
                    {booking.status}
                  </p>

                  {booking.status === 'Confirmed' ? (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="bg-red-500 text-white rounded-full px-2 w-6 h-6 flex justify-center"
                    >
                      <i className="ri-close-fill"></i>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {pagination()}
    </div>
  );
}

export default BookingCards;

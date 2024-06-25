import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useBooking } from '../contexts/booking-context';
import bookingApi from '../apis/booking';

function BookingCards() {
  const { allBooking, fetchBooking } = useBooking();

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
        fetchBooking();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="bg-gray-100 rounded-lg p-5 shadow-lg w-full">
          <div className="grid grid-cols-11 text-center font-bold">
            <div className="p-2">Booking ID</div>
            <div className="p-2">Customer</div>
            <div className="p-2">Car</div>
            <div className="p-2">License Plate</div>
            <div className="p-2">Start Date</div>
            <div className="p-2">End Date</div>
            <div className="p-2">Total Amount</div>
            <div className="p-2">Pickup Location</div>
            <div className="p-2">Drop-Off Location</div>
            <div className="p-2">Pickup & Drop-Off Time</div>
            <div className="p-2">Status</div>
          </div>
        </div>
        {allBooking?.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg p-5 shadow-lg w-full"
          >
            <div className="grid grid-cols-11 text-center">
              <div className="p-2">{booking.id}</div>
              <div className="p-2">{booking.customer}</div>
              <div className="p-2">{booking.car}</div>
              <div className="p-2">{booking.plate}</div>
              <div className="p-2">{booking.startDate}</div>
              <div className="p-2">{booking.endDate}</div>
              <div className="p-2">{booking.amount}</div>
              <div className="p-2">{booking.pickup}</div>
              <div className="p-2">{booking.dropoff}</div>
              <div className="p-2">{booking.time}</div>
              <div className="p-2 flex flex-col items-center justify-center gap-2">
                {booking.status}
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="ml-2 bg-red-500 text-white rounded-full px-2"
                >
                  X
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingCards;

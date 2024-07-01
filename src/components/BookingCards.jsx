import React, { useState } from "react";
import Swal from "sweetalert2";
import { useBooking } from "../contexts/booking-context";
import bookingApi from "../apis/booking";
import paymentApi from "../apis/payment";
import { usePayment } from "../contexts/payment-context";

function BookingCards() {
  const { allBooking, fetchBooking } = useBooking();
  const { fetchPayment } = usePayment()
  const [currentPage , setCurrentPage] = useState(1)
  const cardPerPage = 10
  const totalPage = Math.ceil(allBooking.length / cardPerPage)
  const indexOfLastBookingPerPage = currentPage * cardPerPage
  const firstIndexOfBookingPerPage = indexOfLastBookingPerPage - cardPerPage
  const currentBookingPerPage = allBooking.slice(
    firstIndexOfBookingPerPage,
    indexOfLastBookingPerPage
  )

  const handleChangePage = (page) => {
    setCurrentPage(page)
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }

  const goToNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1)
      window.scrollTo({
        top:0,
        behavior:'smooth'
      })
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
      window.scrollTo({
        top:0,
        behavior:'smooth'
      })
    }
  }



  const handleCancel = async (bookingId) => {
    try {
      const result = Swal.fire({
        text: "Status",
        title: `Are you sure you want to cancel this booking?`,
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
      });
      if ((await result).isConfirmed) {
        await bookingApi.updateBookingStatus(bookingId, "cancelled");
        await paymentApi.deletePayment(bookingId)
        fetchBooking();
        fetchPayment();
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
        {currentBookingPerPage?.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg p-5 shadow-lg w-full"
          >
            <div className="grid grid-cols-11 text-center items-center">
              <div className="p-2 h-fit">{booking.id}</div>
              <div className="p-2 h-fit">{booking.customer}</div>
              <div className="p-2 h-fit">{booking.car}</div>
              <div className="p-2 h-fit">{booking.plate}</div>
              <div className="p-2 h-fit">{booking.startDate}</div>
              <div className="p-2 h-fit">{booking.endDate}</div>
              <div className="p-2 h-fit">{booking.amount}</div>
              <div className="p-2 h-fit">{booking.pickup}</div>
              <div className="p-2 h-fit">{booking.dropoff}</div>
              <div className="p-2 h-fit">{booking.time}</div>
              <div className={`p-2 flex flex-col items-center justify-center gap-2 ${booking.status === 'Cancelled' ? ' text-red-500' : 'text-green-600'}`}>
                {booking.status}
                {booking.status === 'Confirmed' ?
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="ml-2 bg-red-500 text-white rounded-full px-2"
                  >
                    X
                  </button>
                  :
                  null
                }
              </div>
            </div>
          </div>
        ))}
      </div>
      


      <div className='p-2 flex gap-2'>
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className='hover:text-orange-500'
        >
          prev
        </button>

        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleChangePage(index + 1)}
            className={`w-10 h-10 rounded-full ${currentPage === index + 1
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-700 hover:text-white"
              }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPage}
          className=' hover:text-orange-500'
        >
          Next
        </button>
      </div>



    </div>
  );
}

export default BookingCards;

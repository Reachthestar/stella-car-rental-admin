import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useBooking } from "../contexts/booking-context";
import bookingApi from "../apis/booking";
import paymentApi from "../apis/payment";
import { usePayment } from "../contexts/payment-context";

function BookingCards() {
  const { allBooking, fetchBooking } = useBooking();
  const { fetchPayment } = usePayment();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const cardPerPage = 10;

  console.log(window.scrollY)

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page on search or sort
  }, [searchTerm, sortKey]);

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

        await paymentApi.deletePayment(bookingId);
        fetchBooking();
        fetchPayment();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortKey(event.target.value);
  };

  const filteredBookings = allBooking.filter((booking) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      booking.id.toString().includes(searchTermLower) ||
      booking.customer.toLowerCase().includes(searchTermLower) ||
      booking.car.toLowerCase().includes(searchTermLower) ||
      booking.plate.toLowerCase().includes(searchTermLower) ||
      booking.startDate.toLowerCase().includes(searchTermLower) ||
      booking.endDate.toLowerCase().includes(searchTermLower) ||
      booking.amount.toString().includes(searchTermLower) ||
      booking.pickup.toLowerCase().includes(searchTermLower) ||
      booking.dropoff.toLowerCase().includes(searchTermLower) ||
      booking.time.toLowerCase().includes(searchTermLower) ||
      booking.status.toLowerCase().includes(searchTermLower)
    );
  });

  const sortedBookings = filteredBookings.sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];

    if (sortKey === "startDate" || sortKey === "endDate") {
      return new Date(valueB) - new Date(valueA); // Sorty Start and End Date by Descending Order
    }

    if (sortKey === "amount") {
      return new Date(valueB) - new Date(valueA); // Sort by amount in descending order
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return valueA - valueB;
    }

    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  });

  const searchedBookings = searchTerm === "" ? allBooking : filteredBookings;
  const totalPage = Math.ceil(searchedBookings.length / cardPerPage);
  const indexOfLastBookingPerPage = currentPage * cardPerPage;
  const firstIndexOfBookingPerPage = indexOfLastBookingPerPage - cardPerPage;
  const currentBookingPerPage = sortedBookings.slice(
    firstIndexOfBookingPerPage,
    indexOfLastBookingPerPage
  );

  const handleChangePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goToNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-between w-full mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <select
          value={sortKey}
          onChange={handleSort}
          className="ml-4 text-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Sort by</option>
          <option value="id">ID</option>
          <option value="customer">Customer</option>
          <option value="car">Car</option>
          <option value="plate">License Plate</option>
          <option value="startDate">Start Date</option>
          <option value="endDate">End Date</option>
          <option value="amount">Total Amount</option>
          <option value="pickup">Pickup Location</option>
          <option value="dropoff">Drop-Off Location</option>
          <option value="time">Pickup & Drop-Off Time</option>
          <option value="status">Status</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="bg-gray-100 rounded-lg p-5 shadow-lg w-full sticky top-0">
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

              <div className="p-2 flex flex-col items-center justify-center gap-2">
                <p
                  className={`px-4 font-bold rounded-full ${
                    booking.status === "Cancelled"
                      ? "text-fail-status-text bg-fail-status-bg"
                      : "text-success-status-text bg-success-status-bg"
                  }`}
                >
                  {booking.status}
                </p>

                {booking.status === "Confirmed" ? (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="ml-2 bg-red-500 text-white rounded-full px-2"
                  >
                    X
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 flex gap-2">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="hover:text-orange-500"
        >
          prev
        </button>

        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleChangePage(index + 1)}
            className={`w-10 h-10 rounded-full ${
              currentPage === index + 1
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
          className=" hover:text-orange-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BookingCards;

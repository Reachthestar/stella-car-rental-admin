import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useBooking } from '../contexts/booking-context';
import bookingApi from '../apis/booking';
import paymentApi from '../apis/payment';
import { usePayment } from '../contexts/payment-context';
import dayjs from 'dayjs';
import Pagination from './Pagination';
import Header from './Header';
import Filter from './Filter';

function BookingCards() {
  const { allBooking, fetchBooking } = useBooking();
  const { fetchPayment } = usePayment();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const cardPerPage = 10;


  useEffect(() => {
    setCurrentPage(1); // Reset to the first page on search or sort
  }, [searchTerm, sortKey]);

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

    if (sortKey === 'startDate' || sortKey === 'endDate') {
      return new Date(valueB) - new Date(valueA); // Sorty Start and End Date by Descending Order
    }

    if (sortKey === 'amount') {
      return new Date(valueB) - new Date(valueA); // Sort by amount in descending order
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    }

    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  });

  const searchedBookings = searchTerm === '' ? allBooking : filteredBookings;
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
      behavior: 'smooth',
    });
  };

  const goToNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
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
        {value:'id',text:'ID'},
        {value:'customer',text:'Customer'},
        {value:'car',text:'Car'},
        {value:'plate',text:'License Plate'},
        {value:'startDate',text:'Start Date'},
        {value:'endDate',text:'End Date'},
        {value:'amount',text:'Total Amount'},
        {value:'pickup',text:'Pickup Location'},
        {value:'dropoff',text:'Drop-Off Location'},
        {value:'time',text:'Pickup & Drop-Off Time'},
        {value:'status',text:'Status'},
      ]
      }
      />
      <div className="grid grid-cols-1 gap-4 w-full">
        <Header 
        addClass='grid-cols-11'
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
        ]}/>
        {currentBookingPerPage?.map((booking) => {
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
                    className={`px-4 font-bold rounded-full ${
                      booking.status === 'Cancelled'
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
      <Pagination
      goToPrevPage={goToPrevPage} 
      goToNextPage={goToNextPage} 
      currentPage={currentPage} 
      totalPage={totalPage} 
      handleChangePage={handleChangePage}
      />
    </div>
  );
}

export default BookingCards;

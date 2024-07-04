import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { usePayment } from '../contexts/payment-context';
import dayjs from 'dayjs';

function PaymentsCards() {
  const { allPaymentComplete } = usePayment();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const cardPerPage = 10;

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page on search or sort
  }, [searchTerm, sortKey]);

  const handleComplete = (paymentId) => {
    Swal.fire({
      text: 'Status',
      title: `Are you sure you want to mark this payment as complete?`,
      icon: 'info',
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Implement the logic to mark the payment as complete here
        console.log(`Payment ID ${paymentId} marked as complete.`);
      }
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortKey(event.target.value);
  };

  const filteredPayments = allPaymentComplete.filter((payment) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      payment.bookingId.toString().includes(searchTermLower) ||
      payment.paymentId.toString().includes(searchTermLower) ||
      payment.customer.toLowerCase().includes(searchTermLower) ||
      payment.paymentDate.toLowerCase().includes(searchTermLower) ||
      payment.amount.toString().includes(searchTermLower) ||
      payment.status.toLowerCase().includes(searchTermLower)
    );
  });

  const sortedPayments = filteredPayments.sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];

    if (sortKey === 'paymentDate') {
      return new Date(valueB) - new Date(valueA); // Sort by payment date in descending order
    }

    if (sortKey === 'amount') {
      return valueB - valueA; // Sort by amount in descending order
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    }

    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  });

  const searchedPayments =
    searchTerm === '' ? allPaymentComplete : filteredPayments; // Make pagination equal to searched payments, not exceeding it
  const totalPage = Math.ceil(searchedPayments.length / cardPerPage); // Have to declare here or cause initialization error
  const indexOfLastPaymentPerPage = currentPage * cardPerPage;
  const firstIndexOfPaymentPerPage = indexOfLastPaymentPerPage - cardPerPage;
  const currentPaymentPerPage = sortedPayments.slice(
    firstIndexOfPaymentPerPage,
    indexOfLastPaymentPerPage
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
      <h1 className="text-2xl font-semibold">Payments</h1>
      <div className="flex justify-between w-full">
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
          className="ml-4 shadow text-center appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Sort by</option>
          <option value="bookingId">Booking ID</option>
          <option value="paymentId">Payment ID</option>
          <option value="customer">Customer</option>
          <option value="paymentDate">Payment Date</option>
          <option value="amount">Amount</option>
          <option value="status">Status</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="bg-gray-500 text-white rounded-lg p-5 shadow-lg w-full sticky top-0">
          <div className="grid grid-cols-6 text-center font-bold">
            <div className="p-2">Booking ID</div>
            <div className="p-2">Payment ID</div>
            <div className="p-2">Customer</div>
            <div className="p-2">Payment Date</div>
            <div className="p-2">Amount</div>
            <div className="p-2">Status</div>
          </div>
        </div>
        {currentPaymentPerPage?.map((payment) => {
          const paymentDate = dayjs(payment.paymentDate).format('DD/MM/YYYY');
          return (
            <div
              key={payment.paymentId}
              className="bg-white rounded-lg p-5 shadow-lg w-full"
            >
              <div className="grid grid-cols-6 text-center">
                <div className="p-2">{payment.bookingId}</div>
                <div className="p-2">{payment.paymentId}</div>
                <div className="p-2">{payment.customer}</div>
                <div className="p-2">{paymentDate}</div>
                <div className="p-2">
                  &#3647; {payment.amount.toLocaleString()}
                </div>
                <div className="p-2 flex flex-col items-center justify-center gap-2">
                  <p
                    className={`px-4 font-bold rounded-full ${
                      payment.status === 'Complete'
                        ? 'text-success-status-text bg-success-status-bg'
                        : 'text-fail-status-text bg-fail-status-bg'
                    }`}
                  >
                    {payment.status}
                  </p>
                  {payment.status === 'Open' && (
                    <button
                      onClick={() => handleComplete(payment.paymentId)}
                      className="bg-green-500 text-white rounded-full px-2"
                    >
                      <i className="ri-check-double-line"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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
                ? 'bg-black text-white'
                : 'bg-gray-200 hover:bg-gray-700 hover:text-white'
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

export default PaymentsCards;

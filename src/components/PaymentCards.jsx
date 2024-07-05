import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { usePayment } from '../contexts/payment-context';
import dayjs from 'dayjs';
import Pagination from './Pagination';
import Header from './Header';
import Filter from './Filter';

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
      <Filter
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        sortKey={sortKey}
        handleSort={handleSort}
        filterItem={[
          { value: "bookingId", text: "Booking ID" },
          { value: "paymentId", text: "Payment ID" },
          { value: "customer", text: "Customer" },
          { value: "paymentDate", text: "Payment Date" },
          { value: "amount", text: "Amount" },
          { value: "status", text: "Status" },
        ]
        }
      />
      <div className="grid grid-cols-1 gap-4 w-full">
        <Header
          addClass='grid-cols-6'
          columns={[
            'Booking ID',
            'Payment ID',
            'Customer',
            'Payment Date',
            'Amount',
            'Status',
          ]}
        />
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
                    className={`px-4 font-bold rounded-full ${payment.status === 'Complete'
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

export default PaymentsCards;

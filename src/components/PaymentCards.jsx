import React, { useState } from "react";
import Swal from "sweetalert2";
import { usePayment } from "../contexts/payment-context";

function PaymentsCards() {
  const { allPaymentComplete } = usePayment()
  const [currentPage, setCurrentPage] = useState(1)
  const cardPerPage = 10
  const totalPage = Math.ceil(allPaymentComplete.length / cardPerPage)
  const indexOfLastPaymentPerPage = currentPage * cardPerPage
  const firstIndexOfPaymentPerPage = indexOfLastPaymentPerPage - cardPerPage
  const currentPaymentPerPage = allPaymentComplete.slice(
    firstIndexOfPaymentPerPage,
    indexOfLastPaymentPerPage
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


  const handleComplete = (paymentId) => {
    Swal.fire({
      text: "Status",
      title: `Are you sure you want to mark this payment as complete?`,
      icon: "info",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Implement the logic to mark the payment as complete here
        console.log(`Payment ID ${paymentId} marked as complete.`);
      }
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-xl font-bold text-decoration-line: underline">
        Payment
      </h1>
      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="bg-gray-100 rounded-lg p-5 shadow-lg w-full">
          <div className="grid grid-cols-6 text-center font-bold">
            <div className="p-2">Booking ID</div>
            <div className="p-2">Payment ID</div>
            <div className="p-2">Customer</div>
            <div className="p-2">Payment Date</div>
            <div className="p-2">Amount</div>
            <div className="p-2">Status</div>
          </div>
        </div>
        {currentPaymentPerPage?.map((payment) => (
          <div
            key={payment.paymentId}
            className="bg-white rounded-lg p-5 shadow-lg w-full"
          >
            <div className="grid grid-cols-6 text-center">
              <div className="p-2">{payment.bookingId}</div>
              <div className="p-2">{payment.paymentId}</div>
              <div className="p-2">{payment.customer}</div>
              <div className="p-2">{payment.paymentDate}</div>
              <div className="p-2">{payment.amount}</div>
              <div className="p-2 flex flex-col items-center justify-center gap-2">
                {payment.status}
                {payment.status === "Open" && (
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

export default PaymentsCards;

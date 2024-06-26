import React from "react";
import Swal from "sweetalert2";
import { usePayment } from "../contexts/payment-context";

function PaymentsCards() {
  const { allPayment } = usePayment()
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
        {allPayment?.map((payment) => (
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
    </div>
  );
}

export default PaymentsCards;

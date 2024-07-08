import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import Header from './Header';
import Filter from './Filter';
import { useFilter } from '../contexts/filter-context';

function PaymentsCards() {
  const {
    searchTerm,
    sortKey,
    handleSearch,
    handleSort,
    currentItemPerPage,
    pagination,
  } = useFilter()

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
        ]} />
      <div className="grid grid-cols-1 gap-4 w-full">
        <Header
          columns={[
            'Booking ID',
            'Payment ID',
            'Customer',
            'Payment Date',
            'Amount',
            'Status',
          ]}
        />
        {currentItemPerPage?.map((payment) => {
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
      {pagination()}
    </div>
  );
}

export default PaymentsCards;

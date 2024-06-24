import React from "react";
import Swal from "sweetalert2";

function Cards() {
  const handleCancel = (bookingId) => {
    Swal.fire({
      text: "Status",
      title: `Are you sure you want to cancel this booking?`,
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
    });
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
        {[
          {
            id: 1,
            customer: "John",
            car: "Toyota Prius",
            plate: "กส 1111",
            startDate: "24/6/2024",
            endDate: "25/6/2024",
            amount: "฿1000",
            pickup: "Suvarnabhumi Airport",
            dropoff: "Had Yai Airport",
            time: "10:00 AM",
            status: "Confirmed",
          },
          {
            id: 2,
            customer: "Jane",
            car: "Honda Civic",
            plate: "ลส 7798",
            startDate: "23/6/2024",
            endDate: "24/6/2024",
            amount: "฿1200",
            pickup: "Don Mueang Airport",
            dropoff: "Phuket Airport",
            time: "9:00 AM",
            status: "Confirmed",
          },
          {
            id: 3,
            customer: "Mike",
            car: "Ford Focus",
            plate: "จส 4421",
            startDate: "22/6/2024",
            endDate: "23/6/2024",
            amount: "฿900",
            pickup: "Chiang Mai Airport",
            dropoff: "Udon Thani Airport",
            time: "8:00 AM",
            status: "Confirmed",
          },
        ].map((booking) => (
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

export default Cards;

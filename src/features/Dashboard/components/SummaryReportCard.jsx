export default function SummaryReportCard({ dashboardData }) {
  return (
    <div className="grid grid-rows-2 grid-cols-2 w-full h-full gap-4 text-white">
      <div className="bg-card-01-bg w-full h-full rounded-md p-4 shadow-md">
        <p>Available Cars</p>
        <p className="font-semibold text-2xl">{dashboardData?.summaryReportCard.countCarAvailable}</p>
      </div>
      <div className="bg-card-02-bg w-full h-full rounded-md p-4 shadow-md">
        <p>Monthly Payments</p>
        <p className="font-semibold text-2xl">{dashboardData?.summaryReportCard.countCurrentMonthPayment}</p>
      </div>
      <div className="bg-card-03-bg w-full h-full rounded-md p-4 shadow-md">
        <p>Monthly Bookings</p>
        <p className="font-semibold text-2xl">{dashboardData?.summaryReportCard.countCurrentMonthBooking}</p>
      </div>
      <div className="bg-card-04-bg w-full h-full rounded-md p-4 shadow-md">
        <p>Total Customers</p>
        <p className="font-semibold text-2xl">{dashboardData?.summaryReportCard.allCustomerCount}</p>
      </div>
    </div>
  );
}

import LoadingSpinner from '../components/LoadingSpinner';
import { useBooking } from '../contexts/booking-context';
import PopularCarsChart from '../features/Dashboard/components/PopularCarsChart';
import SalesChart from '../features/Dashboard/components/SalesChart';
import ShowCarsCard from '../features/Dashboard/components/ShowCarsCard';
import SummaryReportCard from '../features/Dashboard/components/SummaryReportCard';

export default function Dashboard() {
  const { isAllBookingLoading } = useBooking();
  return (
    <>
      {isAllBookingLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-4 h-fit">
            <div className="flex flex-col gap-4 w-2/3">
              <SummaryReportCard />
              <SalesChart />
            </div>
            <div className="flex-1 justify-between items-center w-1/3 h-[100%]">
              <PopularCarsChart />
            </div>
          </div>
          <div className="w-full">
            <ShowCarsCard />
          </div>
        </div>
      )}
    </>
  );
}

// flex flex-col gap-4

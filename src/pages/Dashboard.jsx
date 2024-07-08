import LoadingSpinner from '../components/LoadingSpinner';
import { useDashboard } from '../contexts/dashboard-context';
import PopularCarsChart from '../features/Dashboard/components/PopularCarsChart';
import SalesChart from '../features/Dashboard/components/SalesChart';
import ShowCarsCard from '../features/Dashboard/components/ShowCarsCard';
import SummaryReportCard from '../features/Dashboard/components/SummaryReportCard';

export default function Dashboard() {
  const { dashboardData, isDashboardDataLoading } = useDashboard()
  return (
    <>
      {isDashboardDataLoading ?
        <div className='h-full flex items-center'>
          <LoadingSpinner />
        </div>
        :
        <div className="flex flex-col gap-4 p-3">
          <div className="flex w-full gap-4 h-fit">
            <div className="flex flex-col gap-4 w-2/3">
              <SummaryReportCard
                dashboardData={dashboardData}
              />
              <SalesChart
                dashboardData={dashboardData}
              />
            </div>
            <div className="flex-1 justify-between items-center w-1/3 h-[100%]">
              <PopularCarsChart
                dashboardData={dashboardData}
              />
            </div>
          </div>
          <div className="w-full">
            <ShowCarsCard
              dashboardData={dashboardData}
            />
          </div>
        </div>
      }
    </>
  );
}
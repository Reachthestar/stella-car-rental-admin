import PopularCarsChart from '../features/Dashboard/components/PopularCarsChart';
import SalesChart from '../features/Dashboard/components/SalesChart';
import ShowCarsCard from '../features/Dashboard/components/ShowCarsCard';
import SummaryReportCard from '../features/Dashboard/components/SummaryReportCard';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full gap-4">
        <div className=" h-[200px] flex flex-col gap-4 w-2/3">
          <SummaryReportCard />
          <SalesChart />
        </div>
        <div className="flex justify-between items-center w-1/3">
          <PopularCarsChart />
        </div>
      </div>

      <div className="w-full">
        <ShowCarsCard />
      </div>
    </div>
  );
}

// flex flex-col gap-4

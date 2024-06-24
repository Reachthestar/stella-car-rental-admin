import PopularCarsChart from '../features/Dashboard/components/PopularCarsChart';
import SalesChart from '../features/Dashboard/components/SalesChart';
import SummaryReportCard from '../features/Dashboard/components/SummaryReportCard';

export default function Dashboard() {
  return (
    <div className="flex w-full gap-4">
      <div className=" h-[200px] flex flex-col gap-4 w-full">
        <SummaryReportCard />
        <SalesChart />
      </div>
      <div className="flex justify-between items-center w-full">
        <PopularCarsChart />
      </div>
    </div>
  );
}

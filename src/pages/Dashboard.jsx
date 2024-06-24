import PopularCarsChart from '../features/Dashboard/components/PopularCarsChart';
import SalesChart from '../features/Dashboard/components/SalesChart';

export default function Dashboard() {
  return (
    <>
      <div className="w-full h-[200px]">Block</div>
      <div className="flex justify-between items-center w-full">
        <SalesChart />
        <PopularCarsChart />
      </div>
    </>
  );
}

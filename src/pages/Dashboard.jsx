import PopularCarsChart from '../features/Dashboard/components/PopularCarsChart';
import SalesChart from '../features/Dashboard/components/SalesChart';

export default function Dashboard() {
  return (
    <>
      <div>
        <div className="w-full h-[200px] border border-green-400">Block</div>
        <div className="flex justify-between items-center w-full border border-blue-400">
          <SalesChart />
          <PopularCarsChart />
        </div>
      </div>
    </>
  );
}

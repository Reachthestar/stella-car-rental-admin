import CarItem from './CarItem';

export default function ShowCarsCard({ dashboardData }) {
  return (
    <div className="grid grid-cols-4 gap-x-20 gap-y-4">
      {dashboardData?.allCarModel.map((car, index) => (
        <div key={index}>
          <CarItem car={car} />
        </div>
      ))}
    </div>
  );
}

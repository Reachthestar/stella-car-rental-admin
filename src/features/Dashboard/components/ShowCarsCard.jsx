import recommendCars from '../../../assets/dummy-data/recommendCars';
import CarItem from './CarItem';

export default function ShowCarsCard() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {recommendCars.map((car) => (
        <div key={car.id}>
          <CarItem car={car} />
        </div>
      ))}
    </div>
  );
}

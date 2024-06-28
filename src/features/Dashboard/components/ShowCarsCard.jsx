import { useCars } from '../../../contexts/car-context';
import CarItem from './CarItem';

export default function ShowCarsCard() {
  const { allCarModel } = useCars();
  return (
    <div className="grid grid-cols-4 gap-x-20 gap-y-4">
      {allCarModel?.map((car) => (
        <div key={car.carModelId}>
          <CarItem car={car} />
        </div>
      ))}
    </div>
  );
}

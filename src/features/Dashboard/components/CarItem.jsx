import carImage from '../../../assets/images/mini-car-01.png'

export default function CarItem({ car }) {
  return (

    <div className="w-[370px] bg-white p-4 rounded-md shadow-m flex flex-col items-center shadow-md">
      <h1>{`${car.brand} ${car.model} (${car.color})`}</h1>
      <img src={carImage} alt={car.carName} />

    </div>
  );
}

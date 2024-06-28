import carImage from '../../../assets/images/mini-car-01.png'

export default function CarItem({ car }) {
  return (
    <div className="min-w-fit w-[200px] bg-white p-4 rounded-md shadow-m flex flex-col items-center shadow-md">
      <h1>{`${car.brand} ${car.model} (${car.color})`}</h1>
      <img className='w-[100%]' src={carImage} alt={car.carName} />
    </div>
  );
}

export default function CarItem({ car }) {
  return (
    <div className="w-[370px] bg-white p-4 rounded-md shadow-m flex flex-col items-center shadow-md">
      <h1>{car.carName}</h1>
      <img src={car.imgUrl} alt={car.carName} />
    </div>
  );
}

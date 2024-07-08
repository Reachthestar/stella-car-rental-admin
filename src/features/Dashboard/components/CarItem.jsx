
export default function CarItem({ car }) {
  return (
    <div className="w-[100%] h-[200px] bg-white p-4 rounded-md shadow-m flex flex-col items-center shadow-md ">
      <h1>{car.car}</h1>
      <img
        className="w-full h-full min-h-0 object-contain"
        src={car.image}
        alt={car.car}
      />
    </div>
  );
}

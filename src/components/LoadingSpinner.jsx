
const LoadingSpinner = ({w='w-12',h='h-12'}) => {
  return (
    <div className="flex justify-center items-center w-fit mx-auto">
      <div className={`${w} ${h} border-[6px] border-dashed rounded-full animate-spin border-blue-500`}></div>
    </div>
  );
};

export default LoadingSpinner;

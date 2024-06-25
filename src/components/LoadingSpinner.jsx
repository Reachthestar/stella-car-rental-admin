
const LoadingSpinner = ({w='w-10',h='h-10'}) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`${w} ${h} border-4 border-dashed rounded-full animate-spin border-blue-500`}></div>
    </div>
  );
};

export default LoadingSpinner;

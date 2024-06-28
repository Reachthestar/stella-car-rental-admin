export default function Statistics() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-md shadow-md p-4">
        <form className="flex gap-2 w-full">
          <input
            type="text"
            placeholder="Searching"
            className="flex-1 border border-gray-300 px-2 py-1.5 rounded-md focus:outline-none"
          />
          <button className=" bg-primary-color px-7 py-1.5 rounded-md text-white">
            Search
          </button>
        </form>
      </div>
      <div className="bg-white rounded-md shadow-md p-4">chart</div>
    </div>
  );
}

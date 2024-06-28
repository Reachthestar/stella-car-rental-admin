export default function Input({ placeholder, name, onChange, error }) {
  return (
    <>
      <div>
        <input
          className="border-2 border-gray-300 rounded-md outline-none w-full p-2 focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
        />
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    </>
  );
}

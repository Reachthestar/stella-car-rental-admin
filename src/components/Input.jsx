
export default function Input({ placeholder, name, onChange }) {

  return (
    <>
      <div>
        <input

          className="border-2 outline-none w-full flex-1 px-2 py-1.5 rounded-md"

          placeholder={placeholder}
          name={name}
          onChange={onChange}
        />

      </div>
    </>
  );
}

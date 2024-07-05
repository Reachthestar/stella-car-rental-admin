
export default function Input({
    placeholder,
          name,
          value,
          onChange,
          error,
          className,
}) {
  return (
    <>
    <input placeholder={placeholder} className={className} name={name} value={value} onChange={onChange}/>
    <div className="text-red-500 text-sm mt-1 text-center">{error}</div>
    </>
  )
}

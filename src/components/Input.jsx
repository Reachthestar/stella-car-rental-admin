
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
    <input placeholder={placeholder} className={className} name={name} value={value} onChange={onChange} maxLength={13}/>
    <div className="text-red-500 text-sm mt-1 text-center">{error}</div>
    </>
  )
}

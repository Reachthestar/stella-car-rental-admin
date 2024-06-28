
export default function Input({
    placeholder,
    name,
    onChange,
    error
}) {
    return (
        <>
            <div>
                <input className="border-2 outline-none w-full px-1" placeholder={placeholder} name={name} onChange={onChange} />
                <div className="text-red-500 text-sm">{error}</div>
            </div>
        </>
    )
}

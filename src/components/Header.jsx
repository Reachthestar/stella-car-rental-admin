
export default function Header({columns , addClass}) {
    return (
        <div className="bg-gray-500 text-white rounded-lg p-5 shadow-lg w-full sticky top-0">
            <div className={`grid ${addClass} text-center font-bold`}>
                {columns.map((column,index) => <div key={index} className="p-2">{column}</div>)}
            </div>
        </div>
    )
}

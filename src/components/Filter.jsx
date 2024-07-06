
export default function Filter({
    searchTerm,
    handleSearch,
    sortKey,
    handleSort,
    filterItem
}) {
    return (
        <div className="flex justify-between w-full">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <select
                value={sortKey}
                onChange={handleSort}
                className="ml-4 text-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >   
                <option value=''>Sort by</option>
                {filterItem.map((item,index) => <option key={index} value={item.value}>{item.text}</option>)}
            </select>
        </div>
    )
}

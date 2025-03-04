import React from 'react'
import { useParams } from 'react-router-dom';

export default function Pagination({
    goToPrevPage,
    goToNextPage,
    currentPage,
    totalPage,
    handleChangePage,
})
{
    return (
        <div className="p-2 flex gap-2">
            <button onClick={goToPrevPage} hidden={currentPage === 1} className=' hover:text-primary-color'>
                Prev
            </button>
            {Array.from({ length: totalPage }, (_, index) => {
                const pageNumber = index + 1;
                return pageNumber === 1 || pageNumber === totalPage || (pageNumber >= currentPage - 4 && pageNumber <= currentPage + 4) ? (
                    <button
                        key={pageNumber}
                        onClick={() => handleChangePage(pageNumber)}
                        className={`${currentPage === pageNumber ? 'active' : ''} w-10 h-10 rounded-full ${currentPage === index + 1
                                ? 'bg-black text-white'
                                : 'bg-gray-200 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        {pageNumber}
                    </button>
                ) : (
                    pageNumber === currentPage - 5 || pageNumber === currentPage + 5 ? (
                        <button key={`more-${pageNumber}`} className='pointer-events-none'>...</button>
                    ) : null                 
                );
            })}
            <button onClick={goToNextPage} hidden={currentPage === totalPage} className=' hover:text-primary-color'>
                Next
            </button>
        </div>
    )
}

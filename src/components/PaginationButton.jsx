import React from 'react'

function PaginationButton({ index, children, isActualPage, setCurrentPage }) {
    const changePage = () => {
        setCurrentPage(index);
    };
    return (
        <li>
            <button
                onClick={changePage}
                className={
                    (isActualPage ? "bg-teal-200 " : "bg-white ") +
                    " h-10 px-2 sm:px-5 text-indigo-600 transition-colors duration-150  border border-r-0 border-indigo-400 focus:shadow-outline hover:bg-indigo-100"
                }
            >
                {children}
            </button>
        </li>
    );
}

export default PaginationButton
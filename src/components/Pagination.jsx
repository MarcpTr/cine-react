import { useEffect, useState } from "react";
import PaginationButton from "./PaginationButton";
import "../styles/Pagination.css"
function Pagination({
    totalPages,
    maxPages,
    firstPage,
    paginationPage,
    onChange,
}) {
    const [currentPage, setCurrentPage] = useState(null);
    const nextPage = () => {
        if (currentPage < pages.length) setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage > firstPage) setCurrentPage(currentPage - 1);
    };
    const pages = Array.from(
        { length: Math.min(totalPages, maxPages) },
        (_, i) => (
            <PaginationButton
                key={i + firstPage}
                setCurrentPage={setCurrentPage}
                index={i + firstPage}
                isActualPage={i + firstPage == currentPage ? true : false}
            >
                {i + firstPage}
            </PaginationButton>
        )
    );
    useEffect(() => {
        onChange(currentPage);
    }, [currentPage]);
    useEffect(() => {
        setCurrentPage(1);
    }, [totalPages]);
    return (
        <>
            {totalPages == 0 ? (
                <></>
            ) : (
        <div className="pagination-container">
                    <nav  className="pagination">
                            <button key="prev"
                                onClick={prevPage}
                                 className="arrow"
                            >
                                <svg
                                    className="w-4 h-4 fill-current"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        {pages}
                            <button key="next"
                                onClick={nextPage}
                                 className="arrow"
                            >
                                <svg
                                    className="w-4 h-4 fill-current"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                    </nav>
                </div>
            )}
        </>
    );
}

export default Pagination;

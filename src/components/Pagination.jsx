import { useEffect, useState } from "react";
import PaginationButton from "./PaginationButton";

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
        console.log(
            "Pagination -> useEffect -> currentPage [] -> " + currentPage
        );
        onChange(currentPage);
    }, [currentPage]);
    useEffect(() => {
        console.log("Pagination -> useEffect -> [] -> " + paginationPage);
        setCurrentPage(1);
    }, [totalPages]);
    return (
        <>
            {totalPages == 0 ? (
                <></>
            ) : (
                <div className="flex justify-center pt-4">
                    <ul className="inline-flex">
                        <li key="prev">
                            <button
                                onClick={prevPage}
                                className="h-10 px-1 sm:px-5  text-indigo-600 transition-colors duration-150 bg-white border border-r-0 border-indigo-600 rounded-l-lg focus:shadow-outline hover:bg-indigo-100 active:bg-indigo-300"
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
                        </li>

                        {pages}
                        <li key="next">
                            <button
                                onClick={nextPage}
                                className="h-10 px-1 sm:px-5 text-indigo-600 transition-colors duration-150 bg-white border border-indigo-600 rounded-r-lg focus:shadow-outline hover:bg-indigo-100 active:bg-indigo-300"
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
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default Pagination;

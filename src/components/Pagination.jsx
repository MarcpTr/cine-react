import "../styles/Pagination.css";

function Pagination({
    totalPages = 0,
    maxPages = 10,
    firstPage = 1,
    paginationPage = 1,
    onChange,
}) {
    const currentPage =
        Number(paginationPage) || firstPage;

    if (totalPages <= 0) {
        return null;
    }

    const lastPage =
        Math.min(
            totalPages,
            firstPage + maxPages - 1
        );

    const pages = Array.from(
        {
            length:
                lastPage - firstPage + 1,
        },
        (_, index) =>
            firstPage + index
    );

    const goToPage = (page) => {
        if (
            page < firstPage ||
            page > totalPages ||
            page === currentPage
        ) {
            return;
        }

        onChange(page);
    };

    const previousPage = () => {
        goToPage(
            currentPage - 1
        );
    };

    const nextPage = () => {
        goToPage(
            currentPage + 1
        );
    };

    return (
        <div className="pagination-container">
            <nav
                className="pagination"
                aria-label="Paginación"
            >
                <button
                    type="button"
                    onClick={previousPage}
                    className="arrow"
                    disabled={
                        currentPage <= firstPage
                    }
                    aria-label="Página anterior"
                >
                    <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                    >
                        <path
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                        />
                    </svg>
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        type="button"
                        onClick={() =>
                            goToPage(page)
                        }
                        className={
                            page === currentPage
                                ? "active"
                                : ""
                        }
                        aria-current={
                            page === currentPage
                                ? "page"
                                : undefined
                        }
                    >
                        {page}
                    </button>
                ))}

                <button
                    type="button"
                    onClick={nextPage}
                    className="arrow"
                    disabled={
                        currentPage >= totalPages
                    }
                    aria-label="Página siguiente"
                >
                    <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                    >
                        <path
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 011.414 0l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                        />
                    </svg>
                </button>
            </nav>
        </div>
    );
}

export default Pagination;
import PaginationButton from "./PaginationButton";
import "../styles/Pagination.css";

function Pagination({
    totalPages = 0,
    maxPages = 10,
    firstPage = 1,
    paginationPage = firstPage,
    onChange,
}) {
    if (totalPages <= 0) {
        return null;
    }

    const currentPage = Math.min(
        Math.max(
            Number(paginationPage) || firstPage,
            firstPage
        ),
        totalPages
    );

    let startPage =
        Math.floor(
            (currentPage - firstPage) / maxPages
        ) *
            maxPages +
        firstPage;

    let endPage = Math.min(
        startPage + maxPages - 1,
        totalPages
    );

    if (
        endPage - startPage + 1 < maxPages
    ) {
        startPage = Math.max(
            firstPage,
            endPage - maxPages + 1
        );
    }

    const pages = Array.from(
        {
            length:
                endPage - startPage + 1,
        },
        (_, index) => {
            const page =
                startPage + index;

            return (
                <PaginationButton
                    key={page}
                    index={page}
                    isActualPage={
                        page === currentPage
                    }
                    onChange={onChange}
                >
                    {page}
                </PaginationButton>
            );
        }
    );

    const goToPreviousPage = () => {
        if (currentPage > firstPage) {
            onChange(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            onChange(currentPage + 1);
        }
    };

    return (
        <div className="pagination-container">
            <nav
                className="pagination"
                aria-label="Paginación"
            >
                <button
                    type="button"
                    onClick={goToPreviousPage}
                    disabled={
                        currentPage === firstPage
                    }
                    className="arrow"
                    aria-label="Página anterior"
                >
                    <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                    >
                        <path
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        />
                    </svg>
                </button>

                {pages}

                <button
                    type="button"
                    onClick={goToNextPage}
                    disabled={
                        currentPage === totalPages
                    }
                    className="arrow"
                    aria-label="Página siguiente"
                >
                    <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                    >
                        <path
                            d="M7.293 14.707a1 1 0 010 1.414L10.586 10l-3.293 3.293a1 1 0 01-1.414 1.414l4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        />
                    </svg>
                </button>
            </nav>
        </div>
    );
}

export default Pagination;
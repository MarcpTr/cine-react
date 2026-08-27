function PaginationButton({
    index,
    children,
    isActualPage,
    onChange,
}) {
    return (
        <button
            type="button"
            onClick={() => onChange(index)}
            className={isActualPage ? "active" : ""}
            aria-current={
                isActualPage ? "page" : undefined
            }
        >
            {children}
        </button>
    );
}

export default PaginationButton;
import React from "react";
import "../styles/Pagination.css"

function PaginationButton({ index, children, isActualPage, setCurrentPage }) {
  const changePage = () => {
    setCurrentPage(index);
  };
  return (
    <button
      onClick={changePage}
      className={(isActualPage ? "  active " : " ")}
    >
      {children}
    </button>
  );
}
export default PaginationButton;

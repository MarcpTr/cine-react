import React from "react";
function PaginationButton({ index, children, isActualPage, setCurrentPage }) {
  const changePage = () => {
    setCurrentPage(index);
  };
  return (
    <button
      onClick={changePage}
      className={(isActualPage ? " bg-gray-850 " : "bg-gray-800 ") + " px-4 py-2  hover:bg-gray-700" 
      }
    >
      {children}
    </button>
  );
}
export default PaginationButton;

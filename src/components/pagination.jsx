import React from "react";

const Pagination = ({ currentPage, totalPages, onNext, onPrevious }) => {
  return (
    <div className="pagination">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        style={{ backgroundColor: "rgb(165, 137, 103)", color: "black" }}
      >
        Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        style={{ backgroundColor: "rgb(165, 137, 103)", color: "black" }}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;

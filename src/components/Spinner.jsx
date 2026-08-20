import React from "react";
import "../styles/Spinner.css"
function Spinner() {
    return (
        <div className="loading-container" role="status" aria-label="Cargando">
            <div className="loading-spinner"></div>
            <span>Cargando...</span>
        </div>
    );
}

export default Spinner;

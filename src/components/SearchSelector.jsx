import { useState, useEffect, useRef } from "react";
import "../styles/Search.css"
function SearchSelector({ handleSearch }) {
    const inputRef = useRef(null);

    const getValue = () => {
        return inputRef.current.value;
    };

    const buscar = () => {
        console.log("searchSelector -> buscar");
        const value = getValue();
        console.log("value: " + value)
        handleSearch(value);
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            console.log("searchSelector -> handleKeyDown -> enter");
            const value = getValue();

            handleSearch(value);
        }
    };
    return (
        <div class="search-container">
            <label for="default-search" class="search-label">
                Buscar
            </label>
            <div class="search-box">
                <div class="search-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                        <path d="m20.7 19.3-4.2-4.2a7.5 7.5 0 1 0-1.4 1.4l4.2 4.2a1 1 0 0 0 1.4-1.4ZM5 10.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Z"></path>
                    </svg>
                </div>
                <input
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                    type="search"
                    class="search-input"
                    placeholder="Buscar..."
                    required
                />
                <button
                    type="button"
                    onClick={buscar}
                    class="search-button">
                    Buscar
                </button>
            </div>
        </div>
    );
}

export default SearchSelector;

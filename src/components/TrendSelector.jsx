import { useState, useEffect } from "react";
import "../styles/TrendSelector.css"
function TrendSelector({ onChange }) {
    const [timeWindow, setTimeWindow] = useState("day");
    const [timeText, setTimeText] = useState("del dia");


    const day = () => {
        setTimeWindow("day");
        setTimeText("del dia");
        onChange("day");
    }
    const week = () => {
        setTimeWindow("week");
        setTimeText("de la semana");
        onChange("week");
    }
    return (
        <>
            <section className="movies-header">
                <h1>Los más populares {timeText}</h1>
                <p>
                    Descubre las películas que están destacando actualmente.
                </p>
                <div className="filters">
                    <button onClick={day} className={`filter-button ${timeWindow === "day" ? "active" : ""}`}>
                        Películas del Día
                    </button>
                    <button onClick={week} className={`filter-button ${timeWindow === "week" ? "active" : ""}`}>
                        Películas de la Semana
                    </button>
                </div>
            </section>
        </>
    );
}

export default TrendSelector;

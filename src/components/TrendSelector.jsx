import { useState, useEffect } from "react";

function TrendSelector({ onChange }) {
    const [timeWindow, setTimeWindow] = useState("day");
    const [timeText, setTimeText] = useState("del dia");

    const handleChange = (event) => {
        setTimeWindow(event.target.value);
        if (event.target.value == "day") setTimeText("del dia");
        else setTimeText("de la semana");
        onChange(event.target.value);
    };

    return (
        <div className="ml-8">
            <h1>Los mas popular {timeText}</h1>
            <div>
                <div className="space-x-2">
                    <input
                        onChange={handleChange}
                        defaultChecked={true}
                        type="radio"
                        name="time_window"
                        value="day"
                        id="dayRadio"
                    />
                    <label htmlFor="dayRadio">dia</label>
                </div>
                <div className="space-x-2">
                    <input
                        onChange={handleChange}
                        type="radio"
                        name="time_window"
                        value="week"
                        id="weekRadio"
                    />
                    <label htmlFor="weekRadio">semana</label>
                </div>
            </div>
        </div>
    );
}

export default TrendSelector;

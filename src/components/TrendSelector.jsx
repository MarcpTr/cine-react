import { useState, useEffect } from "react";

function TrendSelector({ onChange }) {
    const [timeWindow, setTimeWindow] = useState("day");
    const [timeText, setTimeText] = useState("del dia");

   
    const day=()=>{
        setTimeWindow("day");
        setTimeText("del dia");
        onChange("day");
    }
    const week=()=>{
        setTimeWindow("week");
        setTimeText("de la semana");
        onChange("week");
    }
    return (
        <>
         <div class="mb-6">
            <h1 class="text-2xl font-semibold">Los mas popular {timeText}</h1>
            <div class="flex space-x-4 mt-4">
            <button onClick={day} class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full">Películas del Día</button>
            <button onClick={week}class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full">Películas de la Semana</button>
          </div>
        </div>
        </>
    );
}

export default TrendSelector;

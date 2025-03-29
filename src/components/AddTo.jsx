import React from "react";
import { watched, liked, watchlist } from "../firebase";
function AddTo({id, posterPath, title}) {

    function likeMovie() {
        liked(id, posterPath, title);
    }function watchedMovie() {
        watched(id, posterPath, title);
    }function watchlistMovie() {
        watchlist(id, posterPath, title);
    }
    return (
        <div className="flex justify-center space-x-8">
            <button
                onClick={likeMovie}
                className="py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-gray-600 "
            >
                me gusta
            </button>
            <button
                onClick={watchedMovie}
                className="py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-gray-600"
            >
                vista
            </button>
            <button
                onClick={watchlistMovie}
                className="py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-gray-600"
            >
                pendiente
            </button>
        </div>
    );
}
export default AddTo;

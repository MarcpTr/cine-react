import React from "react";
import { watched, liked, watchlist } from "../firebase";
import "../styles/AddTo.css"
function AddTo({ id, posterPath, title, release_date }) {

    function likeMovie() {
        liked(id, posterPath, title, release_date);
    } function watchedMovie() {
        watched(id, posterPath, title, release_date);
    } function watchlistMovie() {
        watchlist(id, posterPath, title, release_date);
    }
    return (
        <div class="actions">
            <button onClick={likeMovie}>
                me gusta
            </button>
            <button onClick={watchedMovie} >
                vista
            </button>
            <button onClick={watchlistMovie} >
                pendiente
            </button>
        </div>
    );
}
export default AddTo;

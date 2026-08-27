import { Link } from 'react-router-dom';
import '../styles/MovieCard.css'

function Card({ title, releaseDate, posterPath, movieId }) {
    console.log( title, releaseDate, posterPath, movieId)
    return (
        <article className="movie-card">
            <Link
                to={`/info/${movieId}`}
                className="movie-poster"
            >
                <img
                    src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + posterPath}
                    alt={title}
                    loading="lazy"
                />
            </Link>

            <div className="movie-content">
                <h2 className="movie-title">
                    <Link to={`/info/${movieId}`}>
                        {title}
                    </Link>
                </h2>

                <p className="movie-date">
                    {releaseDate
                        ? "Estreno: " + releaseDate.split("-").reverse().join("-")
                        : ""}
                </p>
            </div>
        </article>
    );
}

export default Card;

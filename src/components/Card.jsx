import { Link } from 'react-router-dom';
import '../styles/MovieCard.css'

function Card({ name, release_date, poster_path, movie_id }) {
    return (
        <article className="movie-card">
            <Link
                to={`/info/${movie_id}`}
                className="movie-poster"
            >
                <img
                    src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + poster_path}
                    alt={name}
                    loading="lazy"
                />
            </Link>

            <div className="movie-content">
                <h2 className="movie-title">
                    <Link to={`/info/${movie_id}`}>
                        {name}
                    </Link>
                </h2>

                <p className="movie-date">
                    {release_date
                        ? "Estreno: " + release_date.split("-").reverse().join("-")
                        : ""}
                </p>
            </div>
        </article>
    );
}

export default Card;

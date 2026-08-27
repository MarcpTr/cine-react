import Card from "./Card";
import "../styles/Gallery.css";

function Gallery({ movies = [] }) {
   
    return (
        <section className="movies-grid">
            {movies.map((movie) => (
                <Card
                    key={movie.id}
                    posterPath={
                        movie.poster_path ||
                        movie.posterPath
                    }
                    releaseDate={
                        movie.release_date
                    }
                    movieId={movie.id}
                    title={movie.title}
                />
            ))}
        </section>
    );
}

export default Gallery;
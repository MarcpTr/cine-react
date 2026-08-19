import Card from "./Card";
import "../styles/Gallery.css"
function Gallery({ movies }) {
    return (
       <section class="movies-grid">
            {movies.map((movie, i) => 
                <Card
                    key={i}
                    poster_path={movie.poster_path || movie.posterPath}
                    release_date={movie.release_date}
                    movie_id={movie.id}
                    name={movie.title}
                >
                </Card>
            )}
        </section>
    );
}
export default Gallery;


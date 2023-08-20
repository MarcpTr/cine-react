import Card from "./Card";

function Gallery({ movies }) {
    return (
        <div className="m-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:place-items-center">
            {movies.map((movie, i) => (
                <Card
                    key={i}
                    poster_path={movie.poster_path}
                    release_date={movie.release_date}
                    movie_id={movie.id}
                >
                    {movie.title}
                </Card>
            ))}
        </div>
    );
}

export default Gallery;

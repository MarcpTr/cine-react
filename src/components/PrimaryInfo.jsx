import AddTo from "./AddTo";
import "../styles/Info.css";

function PrimaryInfo({ primaryInfo }) {
    const movie = primaryInfo;

    if (!movie) {
        return null;
    }

    const titleParts =
        movie.title?.split(":");

    return (
        <div className="movie">
            {movie.trailer && (
                <div className="video-container">
                    <iframe
                        title={`Tráiler de ${movie.title}`}
                        allow="fullscreen"
                        src={
                            `https://www.youtube.com/embed/${movie.trailer}` +
                            "?rel=0&controls=1"
                        }
                    />
                </div>
            )}

            <div className="movie-info">
                <h1>
                    {titleParts?.length > 1 ? (
                        <>
                            {titleParts[0]}:
                            <span className="subtitle">
                                {titleParts
                                    .slice(1)
                                    .join(":")}
                            </span>
                        </>
                    ) : (
                        movie.title
                    )}
                </h1>

                <AddTo
                    id={movie.id}
                    posterPath={
                        movie.poster_path
                    }
                    title={movie.title}
                    releaseDate={
                        movie.release_date
                    }
                />

                {movie.overview && (
                    <p className="description">
                        {movie.overview}
                    </p>
                )}
            </div>
        </div>
    );
}

export default PrimaryInfo;
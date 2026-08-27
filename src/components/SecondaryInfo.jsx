import notFound from "../assets/notFound.png";
import "../styles/Info.css";

function formatBudget(budget) {
    if (!budget || budget <= 0) {
        return "No disponible";
    }

    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(budget);
}

function SecondaryInfo({ secondaryInfo }) {
    if (!secondaryInfo) {
        return null;
    }

    const {
        title,
        videos,
        length,
        budget,
        genres = [],
        producers = [],
        cast = [],
    } = secondaryInfo;

    const videoResults =
        videos?.results || [];

    const youtubeVideos =
        videoResults.filter(
            (video) =>
                video.site === "YouTube" &&
                video.key
        );

    return (
        <>
            <section className="section">
                <div className="section-title">
                    <h2>Información</h2>
                </div>

                <div className="details">
                    <div className="detail-card">
                        <div className="detail-row">
                            <span className="detail-label">
                                Título original
                            </span>

                            <span className="detail-value">
                                {title ||
                                    "No disponible"}
                            </span>
                        </div>

                        <div className="detail-row">
                            <span className="detail-label">
                                Duración
                            </span>

                            <span className="detail-value">
                                {length > 0
                                    ? `${length} minutos`
                                    : "No disponible"}
                            </span>
                        </div>

                        <div className="detail-row">
                            <span className="detail-label">
                                Presupuesto
                            </span>

                            <span className="detail-value">
                                {formatBudget(
                                    budget
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="detail-card">
                        <div className="detail-row">
                            <span className="detail-label">
                                Géneros
                            </span>

                            <div className="tags">
                                {genres.length > 0 ? (
                                    genres.map(
                                        (genre) => (
                                            <span
                                                className="tag"
                                                key={
                                                    genre.id
                                                }
                                            >
                                                {
                                                    genre.name
                                                }
                                            </span>
                                        )
                                    )
                                ) : (
                                    <span className="detail-value">
                                        No disponible
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="detail-row">
                            <span className="detail-label">
                                Productoras
                            </span>

                            <div className="tags">
                                {producers.length >
                                0 ? (
                                    producers.map(
                                        (
                                            producer
                                        ) => (
                                            <span
                                                className="tag"
                                                key={
                                                    producer.id
                                                }
                                            >
                                                {
                                                    producer.name
                                                }
                                            </span>
                                        )
                                    )
                                ) : (
                                    <span className="detail-value">
                                        No disponible
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {cast.length > 0 && (
                <section className="section">
                    <div className="section-title">
                        <h2>
                            Reparto principal
                        </h2>
                    </div>

                    <div className="cast">
                        {cast.map((actor) => (
                            <div
                                key={actor.id}
                                className="actor"
                            >
                                <img
                                    className="actor-image"
                                    src={
                                        actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                            : notFound
                                    }
                                    alt={
                                        actor.name
                                            ? `Foto de ${actor.name}`
                                            : "Actor"
                                    }
                                    loading="lazy"
                                    onError={(
                                        event
                                    ) => {
                                        event.currentTarget.src =
                                            notFound;
                                    }}
                                />

                                <strong>
                                    {actor.name}
                                </strong>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {youtubeVideos.length > 0 && (
                <section className="section">
                    <div className="section-title">
                        <h2>Vídeos</h2>
                    </div>

                    <div className="trailers">
                        {youtubeVideos.map(
                            (video) => (
                                <div
                                    key={video.id}
                                    className="trailer"
                                >
                                    <iframe
                                        title={
                                            video.name ||
                                            "Vídeo de la película"
                                        }
                                        allow="fullscreen"
                                        loading="lazy"
                                        src={`https://www.youtube.com/embed/${video.key}?rel=0&controls=1`}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </section>
            )}
        </>
    );
}

export default SecondaryInfo;
import PrimaryInfo from "../components/PrimaryInfo";
import SecondaryInfo from "../components/SecondaryInfo";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Spinner from "../components/Spinner";
import {
    getMovie,
} from "../services/api";
function Info({ title }) {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [primaryInfo, setPrimaryInfo] = useState(null);
    const [secondaryInfo, setSecondaryInfo] = useState(null);


    useEffect(() => {
        let cancelled = false;

        async function loadMovie() {
            setIsLoading(true);
            setIsError(false);

            try {
                const data =
                    await getMovie(
                        params.movieid
                    );

                if (cancelled) {
                    return;
                }

                const movie =
                    data?.content;

                if (!movie) {
                    throw new Error(
                        "La respuesta no contiene información de la película."
                    );
                }

                const trailer =
                    getTrailer(
                        movie.videos
                    );

                setPrimaryInfo({
                    title: movie.title,
                    trailer,
                    overview: movie.overview,
                    backdrop_path:
                        movie.backdrop_path,
                    poster_path:
                        movie.poster_path,
                    id: movie.id,
                    release_date:
                        movie.release_date,
                });

                setSecondaryInfo({
                    title:
                        movie.original_title,
                    videos:
                        movie.videos,
                    length:
                        movie.runtime,
                    lenguage:
                        movie.original_language,
                    budget:
                        movie.budget,
                    genres:
                        movie.genres || [],
                    producers:
                        movie.production_companies ||
                        [],
                    cast:
                        movie.credits?.cast ||
                        [],
                });
            } catch (error) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Error cargando película:",
                    error
                );

                setIsError(true);
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        loadMovie();

        return () => {
            cancelled = true;
        };
    }, [params.movieid]);
    document.title = title;

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : isError ? (
                <PageNotFound />
            ) : (
                <>
                    <PrimaryInfo primaryInfo={primaryInfo}></PrimaryInfo>
                    <SecondaryInfo
                        secondaryInfo={secondaryInfo}
                    ></SecondaryInfo>
                </>
            )}
        </>
    );
}

export default Info;
function getTrailer(videos) {
    const results =
        videos?.results || [];

    const officialTrailer =
        results.find(
            (video) =>
                video.site === "YouTube" &&
                video.type === "Trailer" &&
                video.official === true
        );

    if (officialTrailer) {
        return officialTrailer.key;
    }

    const trailer =
        results.find(
            (video) =>
                video.site === "YouTube" &&
                video.type === "Trailer"
        );

    return trailer?.key || null;
}
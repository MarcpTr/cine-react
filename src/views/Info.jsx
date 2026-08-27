import PrimaryInfo from "../components/PrimaryInfo";
import SecondaryInfo from "../components/SecondaryInfo";
import Spinner from "../components/Spinner";
import PageNotFound from "./PageNotFound";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovie } from "../services/api";

function getTrailer(videos) {
    const results = videos?.results || [];

    const officialTrailer = results.find(
        (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official === true
    );

    if (officialTrailer) {
        return officialTrailer.key;
    }

    const trailer = results.find(
        (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
    );

    return trailer?.key || null;
}

function Info({ title }) {
    const { movieid } = useParams();

    const [primaryInfo, setPrimaryInfo] =
        useState(null);

    const [secondaryInfo, setSecondaryInfo] =
        useState(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const [isError, setIsError] =
        useState(false);

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        let cancelled = false;

        async function loadMovie() {
            setIsLoading(true);
            setIsError(false);

            try {
                const data =
                    await getMovie(movieid);

                if (cancelled) {
                    return;
                }

                const movie = data?.content;

                if (!movie) {
                    throw new Error(
                        "La respuesta no contiene información de la película."
                    );
                }

                setPrimaryInfo({
                    title: movie.title,
                    trailer: getTrailer(
                        movie.videos
                    ),
                    overview:
                        movie.overview,
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
                        movie.videos || {
                            results: [],
                        },
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

                setPrimaryInfo(null);
                setSecondaryInfo(null);
                setIsError(true);
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        if (!movieid) {
            setIsLoading(false);
            setIsError(true);
            return;
        }

        loadMovie();

        return () => {
            cancelled = true;
        };
    }, [movieid]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <PageNotFound />;
    }

    return (
        <>
            <PrimaryInfo
                primaryInfo={primaryInfo}
            />

            <SecondaryInfo
                secondaryInfo={secondaryInfo}
            />
        </>
    );
}

export default Info;
import PrimaryInfo from "../components/PrimaryInfo";
import SecondaryInfo from "../components/SecondaryInfo";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Spinner from "../components/Spinner";
function Info({ title }) {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [primaryInfo, setPrimaryInfo] = useState(null);
    const [secondaryInfo, setSecondaryInfo] = useState(null);

    const api_key = "b7048181b82a3678ad874fa00559a427";
    const language = "es-Es";
    const url = `https://api.themoviedb.org/3/movie/${params.movieid}?api_key=${api_key}&language=${language}&append_to_response=videos,credits`;
    let movie;
    const fetchData = () => {
        fetch(url)
            .then((response) => response.json())
            .then((data_movies) => {
                if (data_movies.status_code == 34) {
                    setIsLoading(false);
                    setIsError(true);
                }
                movie = data_movies;

                const key = getTrailer(movie.videos);


                setPrimaryInfo({
                    title: movie.title,
                    trailer: key,
                    overview: movie.overview,
                    backdrop_path: movie.backdrop_path,
                    poster_path: movie.poster_path,
                    id: movie.id,
                    release_date: movie.release_date,
                });

                setSecondaryInfo({
                    title: movie.original_title,
                    videos: movie.videos,
                    length: movie.runtime,
                    lenguage: movie.original_language,
                    budget: movie.budget,
                    genres: movie.genres,
                    producers: movie.production_companies,
                    cast: movie.credits.cast,
                });
                setIsLoading(false);
            })
            .catch((e) => console.log("Error: " + e));
    };
    useEffect(() => {
        fetchData();
    }, []);
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
    if (!videos?.results) {
        return null;
    }

    const trailer = videos.results.find(
        (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official === true
    );

    if (trailer) {
        return trailer.key;
    }

    const fallback = videos.results.find(
        (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
    );

    return fallback?.key || null;
}
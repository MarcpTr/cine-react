import PrimaryInfo from "../components/PrimaryInfo";
import SecondaryInfo from "../components/SecondaryInfo";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Spinner from "../components/Spinner";
function Info({title}) {
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
                console.log(movie);

                let key = movie.videos.results[0]
                    ? movie.videos.results[0].key
                    : null;

                console.log(key);
                setPrimaryInfo({
                    title: movie.title,
                    trailer: key,
                    overview: movie.overview,
                    backdrop_path: movie.backdrop_path,
                    id: movie.id
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
                console.log(primaryInfo);
                setIsLoading(false);
                console.log("not loading");
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

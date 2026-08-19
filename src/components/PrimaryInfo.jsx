import React from "react";
import AddTo from "./AddTo"
import "../styles/Info.css"
function PrimaryInfo({ primaryInfo }) {
    const i = primaryInfo;
    const bg = {
        backgroundImage:
            "url('https://image.tmdb.org/t/p/original" + i.backdrop_path + "'",
    };
    return (
        <div className="movie" >
            {i.trailer ? (
                <div className="video-container">
                    <iframe
                        allow="fullscreen"
                        src={
                            "https://www.youtube.com/embed/" +
                            i.trailer +
                            "?rel=0&amp;amp;controls=1&amp;amp;showinfo=0"
                        }
                    ></iframe>
                </div>
            ) : (
                <></>
            )}
            <div className="movie-info">
                <h1>
                    {i.title.includes(':') ? (
                        <>
                            {i.title.split(':')[0]}:
                            <span className="subtitle" >
                                {i.title.split(':').slice(1).join(':')}
                            </span>
                        </>
                    ) : (
                        i.title
                    )}
                </h1>
                <AddTo
                    id={i.id}
                    posterPath={i.backdrop_path}
                    title={i.title}
                    release_date={i.release_date}
                ></AddTo>
                <p className="description">{i.overview}</p>
            </div>
        </div>
    );
}

export default PrimaryInfo;

import AddTo from "./AddTo"
import "../styles/Info.css"
function PrimaryInfo({ primaryInfo }) {
    const i = primaryInfo;
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
                            {i.title.substring(0, i.title.indexOf(':'))}:
                            <span className="subtitle">
                                {i.title.substring(i.title.indexOf(':') + 1)}
                            </span>
                        </>
                    ) : (
                        i.title
                    )}
                </h1>
                <AddTo
                    id={i.id}
                    posterPath={i.poster_path}
                    title={i.title}
                    release_date={i.release_date}
                />
                <p className="description">{i.overview}</p>
            </div>
        </div>
    );
}
export default PrimaryInfo;


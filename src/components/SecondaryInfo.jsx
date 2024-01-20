import notFound from "../assets/notFound.png";

function SecondaryInfo({ secondaryInfo }) {
    const i = secondaryInfo;
    console.log(i);
    return (
        <div className="flex flex-col sm:flex-row ">
            <div className=" flex flex-row sm:flex-col justify-around sm:justify-normal  p-4 sm:w-1/3 md:w-1/4 lg:w-1/5">
                <div className="space-y-1">
                    <h1 className="font-semibold">Título original</h1>
                    <p>{i.title}</p>
                    <h1 className="font-semibold">Duración</h1>
                    <p>{i.length} minutos</p>
                    <h1 className="font-semibold">Presupuesto</h1>
                    <p>{i.budget}$</p>
                </div>
                <div>
                    <h1 className="font-semibold">Géneros</h1>
                    {i.genres.map((genre, i) => (
                        <p key={i}>{genre.name}</p>
                    ))}
                    <h1 className="font-semibold">Productoras</h1>
                    {i.producers.map((producer, i) => (
                        <p key={i}>{producer.name}</p>
                    ))}
                </div>
            </div>
            <div className=" p-4 sm:w-2/3 md:w-3/4 lg:w-4/5">
                <div className="flex flex-col">
                    <div className="overflow-x-auto flex">
                        {i.cast.map((actor, i) => (
                            <div
                                key={i}
                                className="flex-none py-2 px-3 first:pl-6 last:pr-6"
                            >
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <img
                                        className="w-18 h-18 rounded-lg"
                                        src={
                                            "https://image.tmdb.org/t/p/w185" +
                                            actor.profile_path
                                        }
                                        onError={(e) => {
                                            e.target.src = notFound;
                                            e.target.onError = null;
                                        }}
                                    />
                                    <strong className=" text-xs font-medium ">
                                        {actor.name}
                                    </strong>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="overflow-x-auto flex py-2 px-3">
                        {i.videos.results.map((video, i) => (
                            <div key={i} className="mx-4">
                                <iframe
                                    allow="fullscreen"
                                    src={
                                        "https://www.youtube.com/embed/" +
                                        video.key +
                                        "?rel=0&amp;amp;controls=1&amp;amp;showinfo=0"
                                    }
                                ></iframe>
                            </div>
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SecondaryInfo;

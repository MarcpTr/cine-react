import React from "react";

function PrimaryInfo({ primaryInfo }) {
    const i = primaryInfo;
    console.log(i);
    const bg = {
        backgroundImage:
            "url('https://image.tmdb.org/t/p/original" + i.backdrop_path + "'",
    };
    return (
        <div
            style={bg}
            className="bg-cover bg-center grid gap-8 place-content-center "
        >
            {i.trailer ? (
                <div className=" aspect-w-16 aspect-h-9 mt-8">
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

            <div className="bg-teal-500 bg-opacity-75 max-w-3xl mx-4 mt-8 md:mx-auto p-8 mb-8 rounded-lg font-semibold">
                <h1 className="text-center pb-8 underline">{i.title}</h1>
                <p>{i.overview}</p>
            </div>
        </div>
    );
}

export default PrimaryInfo;

function Card({ children, release_date, poster_path, movie_id}) {
    return (
        <div className="rounded-lg shadow-md   shadow-gray-800   flex flex-col content-center space-y-2 lg:max-w-xs ">
            <a href={"/info/" + movie_id}>
                <img
                    className="rounded-t-lg "
                    src={
                        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" +
                        poster_path
                    }
                    alt=""
                />
            </a>

            <h1 className="px-2 font-semibold">
                <a href={"/" + movie_id}>{children}</a>
            </h1>
            <p className="px-2 pb-2">
                {release_date.split("-").reverse().join("-")}
            </p>
        </div>
    );
}

export default Card;

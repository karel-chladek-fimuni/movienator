import { useMovies } from "../stores/MovieStore";
import { MovieWindow } from "../components";
export const MovieSearch = () => {
    const movies = useMovies();
    uploat_movies(movies);
    return (
        <div>
            {movies.length > 0
                ? <>
                    {
                    movies.slice(1,30).map(
                        (m) => (<MovieWindow key={m.id} movie={m} />)
                    )
                    }
                </>
                : <>
                    empty_movies
                </>
            }
        </div>
    )
}
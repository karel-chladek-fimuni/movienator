import { useEffect, useState } from "react";
import { Movie } from "../types";


const loadMovies: () => Promise<Movie[]> = async () => {
    return []
}
export const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            setMovies(await loadMovies());
        };
        fetchData();
    }, [])
    return movies;
} 
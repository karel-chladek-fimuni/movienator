import { useEffect, useState } from "react";
import { Movie } from "../types";


const loadMovies: () => Promise<Movie[]> = async () => {
    // const data : any = await fetch("https://yts.mx/api/v2/list_movies.json?limit=50").then((response)=>(response.json())).catch((err)=>{
    //     console.log(err);
    // });
    // console.log(data);
    // return data["data"]["movies"]; 
    return ([
        {
            id: 1,
            title: "Marvel",
            title_long: "Marvel CU"
        }
    ])
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
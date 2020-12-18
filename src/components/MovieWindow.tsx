import React, { FC } from "react";
import {Movie} from "../types";

type Props={
    movie:Movie
}
export const MovieWindow:FC<Props> = ({movie})=>{
    return (
        <div className = "movie_container">
            {movie.title}
        </div>
    )
} 
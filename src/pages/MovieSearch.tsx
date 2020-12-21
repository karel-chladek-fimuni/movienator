import React, { useEffect, useState } from "react";
import { Filters, MovieQueue } from "../components";
import { fetchMovieIds } from "../stores/MovieStore";


export const MovieSearch = () => {
  const [filter, setFilter] = useState({});
  const [movies, setMovies] = useState<number[]|undefined>([]);

  useEffect(() => {
    setMovies(undefined);
    const runEffect = async () => {
      setMovies(await fetchMovieIds(filter));
    };
    runEffect();
  }, [filter]);

  return (
    <div>
      {/* <SearchInput value={searchString} onClear={handleClickClear} onChange={handleChangeSearchValue}/> */}

      <Filters
        onSubmit={setFilter}
      ></Filters>

      <MovieQueue movies={movies} />
    </div>
  );
};

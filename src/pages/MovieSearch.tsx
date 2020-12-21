import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Filters, MovieQueue } from "../components";
import { Genre, years, language_list, genre_list } from "../types";

const useStyles = makeStyles((theme) => ({}));

export const MovieSearch = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState({});
  const [yearValue, setYearValue] = React.useState<number[]>([
    years.min,
    years.max,
  ]); //zmenit na minmax year
  const [ratingValue, setRatingValue] = React.useState<number[]>([0, 5]);
  const [genFilter, setGenreFilters] = useState<string[]>([]);
  const [languageFilter, setLanguageFilters] = useState<string[]>([]);

  return (
    <div>
      {/* <SearchInput value={searchString} onClear={handleClickClear} onChange={handleChangeSearchValue}/> */}

      <Filters
        onSubmit={setFilter}
      ></Filters>
      {console.log(genFilter)}
      {console.log(ratingValue)}
      {console.log(yearValue)}
      {console.log(languageFilter)}

      <MovieQueue filter={filter} />
    </div>
  );
};
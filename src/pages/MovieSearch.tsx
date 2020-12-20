import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Filters, MovieQueue } from "../components";
import { Genre, years, language_list, genre_list } from "../types";

const useStyles = makeStyles((theme) => ({}));

export const MovieSearch = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState({});
  return (
    <div>
      {/* <SearchInput value={searchString} onClear={handleClickClear} onChange={handleChangeSearchValue}/> */}

      <Filters
        onSubmit={setFilter}
      ></Filters>

      <MovieQueue filter={filter} />
    </div>
  );
};

import React, { useState } from "react";
import { Filters, MovieQueue } from "../components";


export const MovieSearch = () => {
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

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Filters,MovieQueue} from "../components"
import {Genre, years, language, genres} from "../types"

const useStyles = makeStyles((theme) => ({
    
  }));

export const MovieSearch = () => {

    const classes = useStyles();

    const [yearValue, setYearValue] = React.useState<number[]>([years.min, years.max]); //zmenit na minmax year
    const [ratingValue, setRatingValue] = React.useState<number[]>([0, 5]);
    const [genFilter, setGenreFilters] = useState<string[]>([]);
    const [languageFilter, setLanguageFilters] = useState<string[]>([]);

    

    return (
        <div>
            {/* <SearchInput value={searchString} onClear={handleClickClear} onChange={handleChangeSearchValue}/> */}
            
            <Filters 
                onSetGenre = {setGenreFilters} 
                onSetRating = {setRatingValue} 
                onSetYears = {setYearValue} 
                onSetLanguage = {setLanguageFilters}></Filters>
            {console.log(genFilter)}
            {console.log(ratingValue)}
            {console.log(yearValue)}
            {console.log(languageFilter)}
            
            <MovieQueue filter={{
                year_filter:{
                    min:2020,
                    max:2020
                },
                genre_filter:{
                    needed:["Horror","Comedy"],
                    forbiden:[]
                }
            }}/>
        </div>
        
        
    );
  } else {
    selectGenre = undefined;
  }

  if (formats.indexOf("year") > -1) {
    selectYear = (
      <Slider
        min={1990}
        step={1}
        max={2020}
        value={yearValue}
        onChange={handleYearChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    );
  } else {
    selectYear = undefined;
  }

  if (formats.indexOf("rating") > -1) {
    selectRating = (
      <Slider
        min={0}
        step={0.1}
        max={5}
        value={ratingValue}
        onChange={handleRatingChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    );
  } else {
    selectRating = undefined;
  }

  return (
    <div>
      <SearchInput
        value={searchString}
        onClear={handleClickClear}
        onChange={handleChangeSearchValue}
      />
      <Grid item sm={12} md={6}>
        <div className={classes.toggleContainer}>
          <ToggleButtonGroup
            size="small"
            value={formats}
            onChange={handleFormat}
            aria-label="filters"
          >
            <ToggleButton value="genre" aria-label="genre">
              <PowerSettingsNew style={{ fontSize: "18px" }} />
              &nbsp; Genre
            </ToggleButton>
            <ToggleButton value="rating" aria-label="rating">
              <PowerSettingsNew style={{ fontSize: "18px" }} />
              &nbsp; Rating
            </ToggleButton>
            <ToggleButton value="year" aria-label="year">
              <PowerSettingsNew style={{ fontSize: "18px" }} />
              &nbsp; Year
            </ToggleButton>
            <ToggleButton value="language" aria-label="language">
              <PowerSettingsNew style={{ fontSize: "18px" }} />
              &nbsp; Language
            </ToggleButton>
          </ToggleButtonGroup>

          {selectGenre}
          {selectRating}
          {selectYear}
        </div>
      </Grid>
      {searchString.length > 3 ? "Yes, Zobraz film!" : "No results"}
      <MovieQueue
        filter={{
          rating_filter: {
            min: 8,
            max: 10,
          },
          genre_filter: {
            needed: [],
            forbiden: [],
          },
        }}
      />
    </div>
  );
};

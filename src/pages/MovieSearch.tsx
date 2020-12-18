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
}


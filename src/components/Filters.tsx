import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Genre, years, language_list, genre_list, Language, Filter, ratings} from "../types"

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Slider from '@material-ui/core/Slider';
import { spacing } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
    toggleContainer: {
      margin: theme.spacing(2, 0),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    wrapper: {
        minHeight: "5rem",
        maxHeight: "5rem",
    },
    margin: {
        margin: theme.spacing(1),
    },
  }));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type FilterProps = {
    onSubmit: (f:Filter)=>void
}

export const Filters: FC<FilterProps> = ({onSubmit}) => {
    const classes = useStyles();
    const [filter,setFilter] = useState<Filter>({
        genre_filter: {
            needed: [],
            forbiden: []
        },
        rating_filter: ratings,
        year_filter: years,
        language_filter: {
            possible: []
        }
    });
    const [formats, setFormats] = useState(() => ['']);
    
    let selectGenre = undefined;
    let selectYear = undefined;
    let selectRating = undefined;
    let selectLanguage = undefined;

    const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
        if (newFormats.length) {
          setFormats(newFormats);
        }
    };
    
    const handleRatingChange = (event: any, nw: number|number[]) => {
        const newValue:number[] = nw as number[];
        setFilter({...filter,rating_filter:{min:newValue[0],max:newValue[1]}});
    };

    const handleYearChange = (event: any, nw: number|number[]) => {
        const newValue:number[] = nw as number[];
        setFilter({...filter,year_filter:{min:newValue[0],max:newValue[1]}});
    };

    function valuetext(value: number) {
        return `${value}`;
    }

    let gen:string[]=[]
    
    const genres:Genre[]=[...genre_list];
    const language:Language[] = [...language_list];
    if(formats.indexOf("genre")>-1){
        selectGenre = <Autocomplete
                            multiple
                            id="checkboxes-tags"
                            size="small"
                            options={genres}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            renderOption={(option, { selected }) => (
                                <React.Fragment>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option}
                                </React.Fragment>
                            )}
                            onChange={(event, val) => {
                                setFilter({...filter,genre_filter:{...filter.genre_filter,needed:val}});
                            }}
                            style={{ width: "auto" }}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" placeholder="Genres" />
                            )}
                        />
    }else{
        selectGenre = undefined;
    }

    if(formats.indexOf("year")>-1){
        selectYear = <Slider
            min={years.min}
            step={1}
            max={years.max}
            value={[filter.year_filter!.min,filter.year_filter!.max]}
            onChange={handleYearChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
        />
    }else{
        selectYear = undefined;
    }

    if(formats.indexOf("rating")>-1){
        selectRating = <Slider
            min={ratings.min}
            step={0.1}
            max={ratings.max}
            value={[filter.rating_filter!.min,filter.rating_filter!.max]}
            onChange={handleRatingChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
        />
    }else{
        selectRating = undefined;
    }

    if(formats.indexOf("language")>-1){
        selectLanguage = <Autocomplete
                            multiple
                            id="checkboxes-tags"
                            size="small"
                            options={language}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            renderOption={(option, { selected }) => (
                                <React.Fragment>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option}
                                </React.Fragment>
                            )}
                            onChange={(event, val) => {
                                setFilter({...filter,language_filter:{...filter.language_filter,possible:val}});
                            }}
                            style={{ width: "auto" }}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" placeholder="Languages" />
                            )}
                        />
    }else{
        selectLanguage = undefined;
    }

    return(
        <div className={classes.toggleContainer}>
            {/* <Grid container spacing={0}> */}
                <ToggleButtonGroup style={{ marginLeft: 30 }} size="small" value={formats} onChange={handleFormat} aria-label="filters">
                    
                    {/* <Grid item xs> */}
                        <ToggleButton value="genre" aria-label="genre">
                        &nbsp; Genre
                        </ToggleButton>
                    {/* </Grid> */}
                    {/* <Grid item xs> */}
                        <ToggleButton value="rating" aria-label="rating">
                        &nbsp; Rating
                        </ToggleButton>
                    {/* </Grid> */}
                    {/* <Grid item xs> */}
                        <ToggleButton value="year" aria-label="year">
                        &nbsp; Year
                        </ToggleButton>
                    {/* </Grid> */}
                    {/* <Grid item xs> */}
                        <ToggleButton value="language" aria-label="language">
                            &nbsp; Language
                        </ToggleButton>
                    {/* </Grid> */}

                </ToggleButtonGroup>
                {/* <Button onClick={getFilters}>
                    Filter
                </Button> */}
                <Button className={classes.margin} variant="contained" color="primary" onClick={()=>{onSubmit(filter)}}>
                    Filter
                </Button>
            {/* </Grid> */}
            <Grid
                container
                direction="row"
                alignItems="stretch"
                justify="space-evenly"
                spacing={3}
                className={classes.wrapper}
                >
                <Grid item xs={4}>
                    {selectGenre}
                </Grid>
                <Grid item xs={2}>
                    {selectRating}
                </Grid>
                <Grid item xs={2}>
                    {selectYear}
                </Grid>
                <Grid item xs={4}>
                    {selectLanguage}
                </Grid>
            </Grid>
                

            </div>
    );
}
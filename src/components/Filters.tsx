import React, { useState } from 'react';
import { useMovies } from "../stores/MovieStore";
import { makeStyles } from '@material-ui/core/styles';
import SearchInput from "../components/SearchInput";
import { MovieWindow } from "../components";
import {Genre, years, language, genres} from "../types"

import { MenuItem } from "@material-ui/core";
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
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
  }));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const Filters = () => {
    const classes = useStyles();
    const [yearValue, setYearValue] = React.useState<number[]>([years.min, years.max]); //zmenit na minmax year
    const [ratingValue, setRatingValue] = React.useState<number[]>([0, 5]);
    const [formats, setFormats] = useState(() => ['']);
    const [genFilt, setGenreFilters] = useState<string[]>([]);

    var selectGenre = undefined;
    var selectYear = undefined;
    var selectRating = undefined;

    const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
        if (newFormats.length) {
          setFormats(newFormats);
        }
    };
    
    const handleRatingChange = (event: any, newValue: number | number[]) => {
        setRatingValue(newValue as number[]);
    };

    const handleYearChange = (event: any, newValue: number | number[]) => {
        setYearValue(newValue as number[]);
    };

    function valuetext(value: number) {
        return `${value}`;
    }
    let gen:string[]=[]
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
                                setGenreFilters(val)
                            }}
                            style={{ width: 400 }}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" placeholder="Genres" />
                            )}
                        />
    }else{
        selectGenre = undefined;
    }

    if(formats.indexOf("year")>-1){
        selectYear = <Slider
            min={1990}
            step={1}
            max={2020}
            value={yearValue}
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
            min={0}
            step={0.1}
            max={5}
            value={ratingValue}
            onChange={handleRatingChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
        />
    }else{
        selectRating = undefined;
    }

    
    const getFilters = () => {
        console.log(genFilt)
        console.log(yearValue)
        console.log(ratingValue)
    };

    return(
        <div className={classes.toggleContainer}>
            {/* <Grid container spacing={0}> */}
                <ToggleButtonGroup size="small" value={formats} onChange={handleFormat} aria-label="filters">
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
                    <Button onClick={getFilters}>
                        Filter
                    </Button>

                </ToggleButtonGroup>
            {/* </Grid> */}
            
            {selectGenre}
            {selectRating}
            {selectYear}

            </div>
    );
}
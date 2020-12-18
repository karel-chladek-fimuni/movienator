import React, { useState } from 'react';
import { useMovies } from "../stores/MovieStore";
import { makeStyles } from '@material-ui/core/styles';
import SearchInput from "../components/SearchInput";
import { MovieWindow } from "../components";
import {Genre} from "../types"

import { MenuItem } from "@material-ui/core";
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Grid from '@material-ui/core/Grid';
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

const genres = [
    "Fantasy" , "Adventure" , "Sci-Fi"
    , "Family" , "War" , "Horror"
    , "Musical" , "Animation" , "Music"
    , "Mystery" , "History" , "Comedy"
    , "Drama" , "Thriller" , "Action"
    , "Crime" , "Romance"]

export const MovieSearch = () => {

    const classes = useStyles();
    const search = new URLSearchParams()
    const searchString = search.get('q') || ''
    const [genreName, setGenre] = useState<Genre[]>([]);

    const [formats, setFormats] = useState(() => ['']);

    var selectGenre = undefined;
    if(formats.indexOf("genre")>-1){
        selectGenre = <Autocomplete
                            multiple
                            id="checkboxes-tags"
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
                                {console.log(formats)}
                                {/* {console.log(selected, option)} */}
                                </React.Fragment>
                            )}
                            style={{ width: 400 }}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" placeholder="Genres" />
                            )}
                        />
    }else{
        selectGenre = undefined;
    }

    const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
        if (newFormats.length) {
          setFormats(newFormats);
        }
      };
    

    const handleChangeSearchValue = (value: string) => {
        // history.replace(value ? `/?q=${value}` : '')
    }

    const handleClickClear = () => {
        // history.replace('')
    }

    return (
        <div>
            <SearchInput value={searchString} onClear={handleClickClear} onChange={handleChangeSearchValue}/>
            <Grid item sm={12} md={6}>
            <div className={classes.toggleContainer}>
            <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="filters">
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

            </div>


            </Grid>
            {searchString.length > 3 
                ? 'Yes, Zobraz film!'
                : 'No results'
            }
        </div>
        
        
    );
}


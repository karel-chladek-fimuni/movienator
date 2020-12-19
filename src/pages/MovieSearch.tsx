import React, { useState } from 'react';
import { useMovies } from "../stores/MovieStore";
import { makeStyles } from '@material-ui/core/styles';
import SearchInput from "../components/SearchInput";
import { MovieWindow } from "../components";
import {Genre, years, language, genres} from "../types"
import {Filters} from "../components/Filters"

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
import Slider from '@material-ui/core/Slider';

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

export const MovieSearch = () => {

    const classes = useStyles();
    const search = new URLSearchParams()
    const searchString = search.get('q') || ''
    const [genreName, setGenre] = useState<Genre[]>([]);
    

    const handleChangeSearchValue = (value: string) => {
        // history.replace(value ? `/?q=${value}` : '')
    }

    const handleClickClear = () => {
        // history.replace('')
    }

    

    return (
        <div>
            {/* <SearchInput value={searchString} onClear={handleClickClear} onChange={handleChangeSearchValue}/> */}
            
            <Filters></Filters>

            
            {/* {searchString.length > 3 
                ? 'Yes, Zobraz film!'
                : 'No results'
            } */}
        </div>
        
        
    );
}


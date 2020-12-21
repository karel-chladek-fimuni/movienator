import React, { FC, useState } from "react";
import {
  Genre,
  years,
  language_list,
  genre_list,
  Language,
  Filter,
  ratings,
} from "../types";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Slider from "@material-ui/core/Slider";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type FilterProps = {
  onSubmit: (f: Filter) => void;
};

const base_filter = {
  genre_filter: {
    needed: [],
    forbiden: [],
  },
  rating_filter: ratings,
  year_filter: years,
  language_filter: {
    possible: [],
  },
};

const selectKeys = ["genre", "rating", "year", "language"] as const;
type selectKey = typeof selectKeys[number];

type ToggleGroup = Record<selectKey, boolean>;

export const Filters: FC<FilterProps> = ({ onSubmit }) => {
  const [filter, setFilter] = useState<Filter>({ ...base_filter });
  const [filterToggles, setFilterToggles] = useState<ToggleGroup>({
    genre: false,
    rating: false,
    year: false,
    language: false,
  });

  const handleRatingChange = (event: any, nw: number | number[]) => {
    const newValue: number[] = nw as number[];
    setFilter({
      ...filter,
      rating_filter: { min: newValue[0], max: newValue[1] },
    });
  };

  const handleYearChange = (event: any, nw: number | number[]) => {
    const newValue: number[] = nw as number[];
    setFilter({
      ...filter,
      year_filter: { min: newValue[0], max: newValue[1] },
    });
  };

  function valuetext(value: number) {
    return `${value}`;
  }

  const genres: Genre[] = [...genre_list];
  const language: Language[] = [...language_list];
  let selectGenre = (
    <Autocomplete
      multiple
      id="checkboxes-tags"
      size="small"
      options={genres}
      disableCloseOnSelect
      limitTags={2}
      style={{margin:0}}
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
        setFilter({
          ...filter,
          genre_filter: { ...filter.genre_filter, needed: val },
        });
      }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" placeholder="Genres" />
      )}
    />
  );
  let selectYear = (
    <Slider
      min={years.min}
      step={1}
      max={years.max}
      value={[filter.year_filter!.min, filter.year_filter!.max]}
      onChange={handleYearChange}
      style={{margin:0}}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
      getAriaValueText={valuetext}
    />
  );
  let selectRating = (
    <Slider
      min={ratings.min}
      step={0.1}
      max={ratings.max}
      value={[filter.rating_filter!.min, filter.rating_filter!.max]}
      onChange={handleRatingChange}
      valueLabelDisplay="auto"
      style={{margin:0}}
      aria-labelledby="range-slider"
      getAriaValueText={valuetext}
    />
  );
  let selectLanguage = (
    <Autocomplete
      multiple
      id="checkboxes-tags"
      size="small"
      options={language}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      style={{margin:0}}
      limitTags={2}
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
        setFilter({
          ...filter,
          language_filter: { ...filter.language_filter, possible: val },
        });
      }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" placeholder="Languages" />
      )}
    />
  );

  const select_arr = {
    genre: selectGenre,
    rating: selectRating,
    year: selectYear,
    language: selectLanguage,
  };
  const select_labels: Record<selectKey, string> = {
    genre: "Genre",
    rating: "Rating",
    year: "Year",
    language: "Language",
  };

  const render_value = (key: selectKey, label: string, i: number) => {
    const styling = {
      width: "100%",
      height: "100%",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderLeftWidth: 0,
    };
    if (i === 0) {
      styling["borderTopLeftRadius"] = 5;
      styling["borderBottomLeftRadius"] = 5;
      styling["borderLeftWidth"] = 1;
    } else if (i === selectKeys.length - 1) {
      styling["borderTopRightRadius"] = 5;
      styling["borderBottomRightRadius"] = 5;
    }
    return (
      <Grid container spacing={1} justify="space-evenly" alignItems="center">
        <Grid item xs={12}>
          <ToggleButton
            onClick={() => {
              const new_toggle = { ...filterToggles };
              new_toggle[key] = !filterToggles[key];
              setFilterToggles(new_toggle);
            }}
            style={styling}
            size="small"
            value={filterToggles[key]}
            selected={filterToggles[key]}
          >
            {" "}
            {label}{" "}
          </ToggleButton>
        </Grid>
        <Grid
          style={
            filterToggles[key] ? {} : { pointerEvents: "none", opacity: "0.4" }
          }
          item
          xs={key==="genre" || key==="language"? 12 : 9}
        >
          {select_arr[key]}
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container spacing={2} style={{ marginTop: "1rem" }}>
      <Grid item container justify="space-around">
        {selectKeys.map((key: selectKey, idx: number) => (
          <Grid key={idx} item xs={3}>
            {render_value(key, select_labels[key], idx)}
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Button
          style={{ width: "100%", height: "100%" }}
          variant="contained"
          color="primary"
          onClick={() => {
            const newFilter: Filter = { ...base_filter };
            if (filterToggles["genre"]) {
              newFilter.genre_filter = filter.genre_filter;
            }
            if (filterToggles["rating"]) {
              newFilter.rating_filter = filter.rating_filter;
            }
            if (filterToggles["year"]) {
              newFilter.year_filter = filter.year_filter;
            }
            if (filterToggles["language"]) {
              newFilter.language_filter = filter.language_filter;
            }
            onSubmit({ ...newFilter });
          }}
        >
          Filter
        </Button>
      </Grid>
    </Grid>
  );
};

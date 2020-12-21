import { useState, useEffect } from "react";
import { FC } from "react";
import { Filter } from "../types";
import { MovieWindow } from "./MovieWindow";
import { LoadingMovie } from "./LoadingMovie";
import { fetchMovieIds } from "../stores/MovieStore";
import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { EmptyMovie } from "./EmptyMovie";

type Props = {
  movies: number[] | undefined;
  is_in_list:boolean;
  refresh_function?:()=>void;
};

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    minHeight: "5rem",
    maxHeight: "5rem",
  },
}));

export const MovieQueue: FC<Props> = ({ movies,is_in_list,refresh_function}) => {
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    setIndex(0);
  }, [movies]);
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      alignItems="stretch"
      justify="space-evenly"
      spacing={3}
      className={classes.wrapper}
    >
      <Grid item xs={1}>
        <Button
          className={classes.button}
          color="primary"
          disabled={typeof movies == "undefined" || index < 1}
          onClick={() => {
            setIndex(index - 1);
          }}
        >
          <ArrowBackIosIcon />
        </Button>
      </Grid>
      <Grid item xs={10}>
        {typeof movies == "undefined" ? (
          <LoadingMovie />
        ) : movies.length !== 0 ? (
          <MovieWindow refresh_function={refresh_function} is_added={is_in_list} movie={{ id: movies[index] }} />
        ) : (
          <EmptyMovie />
        )}
      </Grid>
      <Grid item xs={1}>
        <Button
          className={classes.button}
          color="primary"
          disabled={typeof movies == "undefined" || index >= movies.length - 1}
          onClick={() => {
            setIndex(index + 1);
          }}
        >
          <ArrowForwardIosIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

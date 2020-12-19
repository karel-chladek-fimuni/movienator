import { useState, useEffect } from "react";
import { FC } from "react";
import { Filter, Movie } from "../types";
import { MovieWindow } from "./MovieWindow";
import { fetchMovieIds } from "../stores/MovieStore";
import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

type Props = {
  filter: Filter;
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

export const MovieQueue: FC<Props> = ({ filter }) => {
  const [index, setIndex] = useState<number>(0);
  const [movies, setMovies] = useState<number[]>([]);

  useEffect(() => {
    const runEffect = async () => {
      setMovies(await fetchMovieIds(filter));
    };
    runEffect();
  }, [filter]);
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
          color="secondary"
          disabled={index < 1}
          onClick={() => {
            setIndex(index - 1);
          }}
        >
          <ArrowBackIosIcon />
        </Button>
      </Grid>
      <Grid item xs={10}>
        {index < movies.length && index >= 0 ? (
          <MovieWindow movie={{ id: movies[index] }} />
        ) : (
          <MovieWindow />
        )}
      </Grid>
      <Grid item xs={1}>
        <Button
          className={classes.button}
          color="secondary"
          disabled={index >= movies.length - 1}
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

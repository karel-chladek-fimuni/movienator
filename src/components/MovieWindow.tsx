import React, { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Movie } from "../types";
import { fetchMovie } from "../stores/MovieStore";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  StylesProvider,
  makeStyles,
  CardMedia,
  CardActionArea,
  CardHeader,
} from "@material-ui/core";

type Props = {
  movie?: Movie;
};
type PossibleMovie = {
  get?: Movie;
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100%",
  },
  media: {},
}));

export const MovieWindow: FC<Props> = (props) => {
  const classes = useStyles();
  const [movie, setMovie] = useState<PossibleMovie>({});
  useEffect(() => {
    const runEffect = async () => {
      if (typeof props.movie != "undefined") {
        setMovie({ get: await fetchMovie(props.movie!.id) });
      }
    };
    runEffect();
  }, [props]);

  if (typeof props.movie == "undefined") {
    return <div>Empty movie</div>;
  }
  if (typeof movie.get == "undefined") {
    return <div>Loading</div>;
  }
  console.log(movie.get!.medium_cover_image!);
  return (
    <Card className={classes.wrapper}>
      <CardHeader
        title={movie.get!.title}
        titleTypographyProps={{ align: "center" }}
      ></CardHeader>
      <CardContent>
        <Grid container>
          <Grid item lg={6}>
            <CardMedia
              src={movie.get!.large_cover_image!}
              component="img"
            ></CardMedia>
          </Grid>
          <Grid item lg={6}>
            <Grid container alignItems="stretch">
              <Grid item lg={12}>
                <Typography align="center">{movie.get!.title_long}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

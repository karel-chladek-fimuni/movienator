import React, { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Movie } from "../types";
import { fetchMovie } from "../stores/MovieStore";
import ReactPlayer from "react-player";
import Rating from "@material-ui/lab/Rating";

import {
  Grid,
  Card,
  Typography,
  CircularProgress,
  CardContent,
  makeStyles,
  CardMedia,
  CardHeader,
  Paper,
  Link,
} from "@material-ui/core";
import { Torrent } from '../types/Torrent';

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

  if (typeof props.movie == "undefined" || typeof movie.get == "undefined") {
    return (
      <Card className={classes.wrapper}>
        <CardContent className={classes.wrapper}>
          <Grid
            className={classes.wrapper}
            container
            alignContent="space-around"
            justify="space-around"
          >
            <Grid item>
              <CircularProgress color="secondary" size={100} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
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
          <Grid item xs={6}>
            <CardMedia
              src={movie.get!.medium_cover_image}
              component="img"
            ></CardMedia>
          </Grid>
          <Grid item xs={6}>
            <Grid container alignItems="stretch" direction="column">
              <Grid item>
                <Grid container alignItems="stretch" direction="column">
                  <Grid item xs={12}>
                    <Typography align="center">
                      {movie.get!.title_long}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Rating
                      readOnly
                      precision={0.1}
                      value={movie.get!.rating}
                    />
                    <Typography>Year: {movie.get!.year}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <Link href={movie.get.torrents![0].url}>Download</Link>
                      <Link href={`https://www.netflix.com/search?q=${movie.get!.title}`} rel="noopener noreferrer" target="_blank">Netflix</Link>
                      <Link href={`https://hbogo.cz/search/${movie.get!.title}`.replace(" ","-")} rel="noopener noreferrer" target="_blank">HBOGO</Link>
                  </Grid>
                  <Grid item xs={12}>
                      <Typography align="center">
                        {movie.get.description_full}
                      </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <ReactPlayer
                    controls
                    width="100%"
                    hight="100%"
                    url={`https://youtu.be/${movie.get!.yt_trailer_code}`}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

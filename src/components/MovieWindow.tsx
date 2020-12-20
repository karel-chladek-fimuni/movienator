import React, { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Movie } from "../types";
import { fetchMovie } from "../stores/MovieStore";
import ReactPlayer from "react-player";
import Rating from "@material-ui/lab/Rating";
import styles from "../styles/MovieWidow.module.css";

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
import { Torrent } from "../types/Torrent";

type Props = {
  movie?: Movie;
};
type PossibleMovie = {
  get?: Movie;
};

const useStyles = makeStyles((theme) => ({
  rating: {
      marginLeft:"1rem"
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

  if (typeof props.movie == "undefined"){
    return (
      <Card>
        <CardContent >
          <Grid
            container
            alignContent="space-around"
            justify="space-around"
          >
            <Grid item>
              <Typography > No result found</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
  if (typeof movie.get == "undefined") {
    return (
      <Card>
        <CardContent >
          <Grid
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
  return (
    <Card>
      <CardHeader
        title={movie.get!.title}
        titleTypographyProps={{ align: "center" }}
      ></CardHeader>
      <CardContent>
        <div className={styles.grid_container}>
          <div className={styles.poster}>
            <img className={styles.poster_img}
              src={movie.get!.medium_cover_image}
            />
          </div>
          <div className={styles.year}>
            <Typography>Year: {movie.get!.year}</Typography>
          </div>
          <div className={styles.rating}>
            <Typography>{"Rating:"}</Typography>
            <Rating className={classes.rating} readOnly precision={0.1} value={movie.get!.rating!/2.0} />
            <Typography>{`(${movie.get!.rating})`}</Typography>
          </div>
          <div className={styles.download_netflix}>
            <Link href={movie.get.torrents![0].url}>Download</Link>
            <Link
              href={`https://www.netflix.com/search?q=${movie.get!.title}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Netflix
            </Link>
            <Link
              href={`https://hbogo.cz/search/${movie.get!.title}`.replaceAll(
                " ",
                "-"
              )}
              rel="noopener noreferrer"
              target="_blank"
            >
              HBOGO
            </Link>
          </div>
          <div className={styles.description}>
            <Typography align="center">{movie.get.description_full}</Typography>
          </div>
          <div className={styles.yt_trailer}>
            <ReactPlayer
              controls
              width="100%"
              hight="100%"
              url={`https://youtu.be/${movie.get!.yt_trailer_code}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

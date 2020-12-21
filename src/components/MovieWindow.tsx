import React, { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Genre, Movie } from "../types";
import { fetchMovie } from "../stores/MovieStore";
import ReactPlayer from "react-player";
import Rating from "@material-ui/lab/Rating";
import styles from "../styles/MovieWidow.module.css";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  Grid,
  Card,
  Typography,
  CardContent,
  makeStyles,
  Link,
  Button,
} from "@material-ui/core";
import { LoadingMovie } from "./LoadingMovie";
import { EmptyMovie } from "./EmptyMovie";
import { useLoggedInUser, myListCollection } from "../utils/firebase";

type Props = {
  movie?: Movie;
  is_added: boolean;
  refresh_function?:()=>void;
};
type PossibleMovie = {
  get?: Movie;
};

const useStyles = makeStyles((theme) => ({
  rating: {
    marginLeft: "1rem",
  },
  media: {},
}));

export const MovieWindow: FC<Props> = (props) => {
  const classes = useStyles();
  const [movie, setMovie] = useState<PossibleMovie>({});
  const [canBeAdded, setCanBeAdded] = useState(true);
  const user = useLoggedInUser();
  useEffect(() => {
    const runEffect = async () => {
      if (typeof(props.movie) != "undefined") {
        setMovie({ get: await fetchMovie(props.movie!.id) });
      }
    };
    runEffect();
  }, [props]);
  useEffect(() => {
    if (user && typeof(movie) != "undefined" && typeof(movie.get) != "undefined") {
      (async () => {
        let new_can = true;
        const item_list = await myListCollection
          .where("user_id", "==", user.uid)
          .get();
        item_list.forEach((doc) => {
          if (movie.get!.id === doc.data().movie_id) {
            new_can = false;
          }
        });
        setCanBeAdded(new_can);
      })();
    }
  }, [user,movie]);
  const removeMovie = () => {
    if (user && typeof(movie) != "undefined" && typeof(movie.get) != "undefined") {
      (async () => {
        const item_list = await myListCollection
          .where("user_id", "==", user.uid)
          .get();

        item_list.forEach((doc) => {
          if (movie.get!.id === doc.data().movie_id) {
            myListCollection.doc(doc.id).delete();
          }
        });
        (props.refresh_function!)();
      })();
    }
  };
  const addMovie = () => {
    myListCollection.doc().set({ user_id: user!.uid, movie_id: movie.get!.id });
    setCanBeAdded(false);
  };
  if (typeof props.movie == "undefined") {
    return <EmptyMovie />;
  }
  if (typeof movie.get == "undefined") {
    return <LoadingMovie />;
  }
  return (
    <Card style={{ width: "100%" }}>
      <Grid
        container
        style={{ width: "100%", height: "100%" }}
        direction="column"
      >
        <Grid item container direction="row" style={{ padding: "1rem" }}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Typography variant="h4" align="center">
              {movie.get!.title}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            {user &&
              ((props.is_added && !canBeAdded) ||
                (!props.is_added && canBeAdded)) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={props.is_added ? removeMovie : addMovie}
                >
                  {props.is_added ? <DeleteIcon /> : <AddIcon />}
                </Button>
              )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CardContent>
            <Grid container style={{width:"100%"}} spacing={3}>
              <Grid item md={6} xs={12}>
                <img
                  className={styles.poster_img}
                  alt=""
                  src={movie.get!.medium_cover_image}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={styles.grid_container}>
                  <div className={styles.year}>
                    <Typography>Year: {movie.get!.year}</Typography>
                  </div>
                  <div className={styles.rating}>
                    <Typography>{"Rating:"}</Typography>
                    <Rating
                      className={classes.rating}
                      readOnly
                      precision={0.1}
                      value={movie.get!.rating! / 2.0}
                    />
                    <Typography>{`(${movie.get!.rating})`}</Typography>
                  </div>
                  <div className={styles.download_netflix}>
                    <Link href={movie.get.torrents![0].url}>Download</Link>
                    <Link
                      href={`https://www.netflix.com/search?q=${
                        movie.get!.title
                      }`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Netflix
                    </Link>
                    <Link
                      href={`https://hbogo.cz/search/${
                        movie.get!.title
                      }`.replaceAll(" ", "-")}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      HBOGO
                    </Link>
                  </div>
                  <div className={styles.genres}>
                    <Typography>Genres: </Typography>
                    {movie.get.genres?.map((g: Genre,idx:number) => (
                      <Typography key={idx}>{g}</Typography>
                    ))}
                  </div>
                  <div className={styles.description}>
                    <Typography align="center">
                      {movie.get.description_full}
                    </Typography>
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
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

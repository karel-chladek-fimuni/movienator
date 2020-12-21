import { Grid } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { MovieQueue } from "../components";
import { myListCollection, useLoggedInUser } from "../utils/firebase";

export const MyList = () => {
  const [movies, setMovies] = useState<number[]>([]);
  const user = useLoggedInUser();
  const refresh_function = useMemo(() => 
    (async () => {
      if (user && typeof user != "undefined") {
        const item_list = await myListCollection
          .where("user_id", "==", user.uid)
          .get();
        const m: number[] = [];
        item_list.forEach((doc) => {
          m.push(doc.data().movie_id);
        });
        setMovies([...m]);
      }
    }), [user]);
  useEffect(() => {
    refresh_function();
  }, [user, refresh_function]);
  return (
    <Grid container style={{ marginTop: "5rem" }}>
      <Grid item xs={12}>
        <MovieQueue
          is_in_list={true}
          movies={movies}
          refresh_function={refresh_function}
        />
      </Grid>
    </Grid>
  );
};

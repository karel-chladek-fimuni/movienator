import { Card, CardContent, CircularProgress, Grid } from "@material-ui/core";
import React from "react";

export const LoadingMovie=()=>{
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
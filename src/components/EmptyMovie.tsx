import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";

export const EmptyMovie=()=>(
    <Card>
        <CardContent>
          <Grid container alignContent="space-around" justify="space-around">
            <Grid item>
              <Typography> No result found</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
)
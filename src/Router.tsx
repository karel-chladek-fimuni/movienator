import React from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import { route } from "./routes";
import { Home, MovieSearch, Notfound, Login } from "./pages";
import { AppBar, Tabs, Tab, Typography, Grid } from "@material-ui/core";
import { Face } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: { display: "flex", justifyContent: "space-between" },
  menuButton: { marginRight: theme.spacing(2) },
  link: { textDecoration: "none" },
  fab: { size: "medium" },
}));

const routeIndices = ["Logo", route.home, route.movie_search, "lists", "login"];

export const Router = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(
    routeIndices.indexOf(useLocation().pathname)
  );

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar color="transparent" position="static">
        <Grid container spacing={5}>
          <Grid item xs={2}>
            <Typography variant="h4"> Movienator </Typography>
          </Grid>
          <Grid item xs={9}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="disabled tabs example"
            >
              <Tab label="Home" to={route.home} component={Link} />
              <Tab label="Movies" to={route.movie_search} component={Link} />
              <Tab label="My List" />
            </Tabs>
          </Grid>
          <Grid item container justify="flex-end" xs={1}>
            <Grid item>
              <Fab className={classes.fab} to={route.login} component={Link}>
                <Face />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>

      <Switch>
        <Route path={route.home} exact component={Home} />
        <Route path={route.movie_search} exact component={MovieSearch} />
        <Route path={route.login} exact component={Login} />
        <Route component={Notfound} />
      </Switch>
    </>
  );
};

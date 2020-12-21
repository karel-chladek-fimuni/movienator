import React from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import { route } from "./routes";
import { Home, MovieSearch, Notfound, Login } from "./pages";
import { AppBar, Tabs, Tab, Typography, Grid } from "@material-ui/core";
import { Face } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import { signOut, useLoggedInUser } from "./utils/firebase";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  toolbar: { display: "flex", justifyContent: "space-between" },
  menuButton: { marginRight: theme.spacing(2) },
  link: { textDecoration: "none" },
  fab: { size: "medium" },
}));

const routeIndices = [route.home, route.movie_search, "lists"];

export const Router = () => {
  const classes = useStyles();
  const user = useLoggedInUser();
  const [value, setValue] = React.useState(
    routeIndices.indexOf(useLocation().pathname)
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseAndSignOut = () => {
    setAnchorEl(null);
    signOut();
  };

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
          <Grid item lg={7} sm={7} md={7} xs={6} style={{marginLeft:"60px"}}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              // variant="fullWidth"
              centered
              onChange={handleChange}
            >
              <Tab label="Home" to={route.home} component={Link} />
              <Tab label="Movies" to={route.movie_search} component={Link} />
              {user && <Tab label="My List" />}
            </Tabs>
          </Grid>
          <Grid item xs={1} container justify="flex-end" style={{marginLeft:"38px"}}>
            <Grid item>
              {/* {console.log(user)} */}
              {user === null ? (
                
                <Fab className={classes.fab} to={route.login} component={Link}>
                  <Face />
                </Fab>
                ):(
                  
                <div>
                  {/* {console.log(user)} */}
                <Fab  color="primary" className={classes.fab} onClick={handleClick}>
                  <Face />
                </Fab>
                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <Box m={2} ml={1}>
                  <Typography>Are you sure you want to sign out?</Typography>
                    <MenuItem onClick={handleCloseAndSignOut}>
                      <Button variant="contained"
                              color="primary">
                                Sign out
                      </Button>
                    </MenuItem>
                  </Box>
                </Menu>
                </div>
              )}
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

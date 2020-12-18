import React from "react";
import {
    BrowserRouter,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import {route} from "./routes";
import { Home,MovieSearch,Notfound } from './pages';
import { AppBar, Tabs, Tab, Typography } from "@material-ui/core";
import { Face } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';
import {red} from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    toolbar: { display: "flex", justifyContent: "space-between" },
    menuButton: { marginRight: theme.spacing(2) },
    link: { textDecoration: "none" },
    fab: { size: "medium",position: 'absolute', right: theme.spacing(1),}
}));

export const Router = () => {
    console.log(route.movie_search);
    const classes = useStyles();
    const [value, setValue] = React.useState(2);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };


    return (
        <div>
        <BrowserRouter>
            <AppBar color="transparent" position="static">
                <Tabs
                value={value}
                indicatorColor="secondary"
                textColor="secondary"
                onChange={handleChange}
                aria-label="disabled tabs example">
                    <Typography variant="h5"> Movienator </Typography>
                    <Tab label='Home'  to={route.home} component={Link} />
                    <Tab label='Movies'  to={route.movie_search} component={Link} />
                    <Tab label = 'My List'/>
                    <Fab className={classes.fab}>
                        <Face />
                    </Fab>
                </Tabs>
            
            </AppBar>
        
            <Switch>
                <Route path={route.home} exact component={Home} />
                <Route path={route.movie_search} exact component={MovieSearch} />
                <Route component={Notfound} />
            </Switch>
        </BrowserRouter>
        </div>
    );
}
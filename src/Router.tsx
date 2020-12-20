import React from "react";
import {
    BrowserRouter,
    Route,
    Switch,
    Link,
    useLocation
} from 'react-router-dom';
import {route} from "./routes";
import { Home,MovieSearch,Notfound, Login } from './pages';
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

const routeIndices=["Logo",route.home,route.movie_search,"lists","login"];

export const Router = () => {
    
    
    const classes = useStyles();
    
    const [value, setValue] = React.useState(routeIndices.indexOf(useLocation().pathname));

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };


    return (
        <>
            <AppBar color="transparent" position="static">
                <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example">
                    <Typography variant="h4"> Movienator </Typography>
                    <Tab label='Home'  to={route.home} component={Link} />
                    <Tab label='Movies'  to={route.movie_search} component={Link} />
                    <Tab label = 'My List'/>
                    <Fab className={classes.fab} to={route.login} component={Link}>
                        <Face />
                    </Fab>
                </Tabs>
            
            </AppBar>
        
            <Switch>
                <Route path={route.home} exact component={Home} />
                <Route path={route.movie_search} exact component={MovieSearch} />
                <Route path={route.login} exact component={Login} />
                <Route component={Notfound} />
            </Switch>
        </>
    );
}
import React from "react";
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';
import {route} from "./routes";
import { Home,MovieSearch,Notfound } from './pages';

export const Router = () => {
    console.log(route.movie_search);
    return (
        <BrowserRouter>
            <Switch>
                <Route path={route.home} exact component={Home} />
                <Route path={route.movie_search} exact component={MovieSearch} />
                <Route component={Notfound} />
            </Switch>
        </BrowserRouter>
    );
}
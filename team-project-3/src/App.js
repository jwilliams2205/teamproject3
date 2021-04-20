import React from "react";
// import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from './Register'
import Login from './Login'
import GamePage from './GamePage'

export default function App(){
    return(
        <div>
        <Router>
            <Switch>
                <Route path = "/login"><Login/></Route>
                <Route path = "/game"><GamePage/></Route>
                <Route path = "/"><Register/></Route>
                {/* <Redirect from="/" to="/game" />
                {/* <Route exact path = "/game"><GamePage/></Route> */}
            </Switch>
        </Router>
        </div>
    )
} 
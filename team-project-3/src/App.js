import React from "react";
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
                </Switch>
        </Router>
        </div>
    )
}
import React, {useState} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from './pages/New';

//O React Router Dom não faz uma verificação de igualdade e sim de conter,
// por isso é necessário colocar a palavra reservada exact
export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/new" component={New} />
            </Switch>
        </BrowserRouter>
    );
}
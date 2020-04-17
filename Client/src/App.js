import React from 'react';
import {Route, Switch, Router } from 'react-router-dom';
import HomePage from "./components/HomePage";
import MainLogin from "./components/login/MainLogin";
import Registration from "./components/login/RegistrationForm";
import CustomLogin from "./components/login/CustomLogin";
import history from "./services/History";

// Check how to send username param in the root link
// Check if we can work on the history link
class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    {/* <Route path="*(/:username)" component={HomePage} /> */}
                    <Route path="/homeNologin" component={MainLogin} />
                    <Route path="/profile/:username" component={HomePage} />
                    <Route path="/createGroup" component={HomePage} />
                    <Route path="/search/:name" component={HomePage} />
                    <Route path="/register" component={Registration} />
                    <Route exact path="/customLogin" component={CustomLogin} />
                    <Route path="/googleLogin" component={CustomLogin} />
                </Switch>
            </Router>
        );
    }
}

export default App;
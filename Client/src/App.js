import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";

//Pages
import MainPage from "./pages/index";
import BreweryPage from "./pages/brewery"
import LoginRegisterPage from "./pages/login-register"
import NotFoundPage from "./pages/404"
import BeerPage from "./pages/beer"
import MessagePage from "./pages/message"
import ViewMessagePage from "./pages/message-view";
import AdminComponent from "./components/AdminComponent";

class App extends React.Component {
    render() {
        return (
            <div>
                Hello world
            </div>
        )
    }
}

export default App;
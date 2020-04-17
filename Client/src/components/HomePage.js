import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import * as sessionMgmt from '../services/SessionHandler';
import { Redirect } from 'react-router-dom';
import TopBar from "./TopBar";

export default class HomePage extends Component {
    render() {
        console.log("Hey")
        if (!sessionMgmt.anyValidSession())
            return <Redirect to="/homeNologin" />
            
        return (
            <Container>
                <TopBar userName={this.props.username} showSearch={true}/>
                <h2>Welcom {this.props.username} !!!</h2>
            </Container>
        );
    }
}
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import * as sessionMgmt from '../services/SessionHandler';
import { Redirect } from 'react-router-dom';
import TopBar from "./TopBar";
import ChatComponent from "./chat/ChatComponent";

export default class HomePage extends Component {
    render() {
        if (!sessionMgmt.anyValidSession())
            return <Redirect to="/homeNologin" />
            
        return (
            <Container>
                <TopBar userName={sessionMgmt.getUserName()} showSearch={true}/>
                <h2>Welcom {sessionMgmt.getUserName()} !!!</h2>

                <ChatComponent selectedUserName={this.props.match.params.username || ""} userName="MainUser"/>
            </Container>
        );
    }
}
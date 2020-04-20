import React, { Component } from "react";
import { Container } from "react-bootstrap";
import * as sessionMgmt from "../services/SessionHandler";
import { Redirect } from "react-router-dom";
import TopBar from "./TopBar";
import ChatComponent from "./chat/ChatComponent";

export default class HomePage extends Component {
  render() {
    if (!sessionMgmt.anyValidSession()) return <Redirect to="/homeNologin" />;

    return (
      <Container>
        <TopBar userName={sessionMgmt.getUserName()} showSearch={true} />
        <h2>Welcome {sessionMgmt.getUserName()} !!!</h2>

        <ChatComponent
          chatId={this.props.match.params.chatId || ""}
          chatType={this.props.match.params.chatType || ""}
          userName="MainUser"
        />
      </Container>
    );
  }
}

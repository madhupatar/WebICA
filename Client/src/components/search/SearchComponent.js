import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import history from "../../services/History";
import * as sessionMgmt from "../../services/SessionHandler";

export default class SearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfUserNames: ["User1"],
    };
  }

  componentDidMount() {
    let self = this;
    fetch("http://localhost:4000/search/" + this.props.match.params.keyword, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        self.setState({ listOfUserNames: resp });
      });
  }

  fetchChatDetails = (toUserName) => {
    const convObj = {
      message: [],
      fromUser: sessionMgmt.getUserName(),
      toUser: toUserName
    }

    fetch('http://localhost:4000/conversations', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(convObj)
    })
    .then((res) => res.json())
    .then((res) => history.push("/conversation/Individual/" + res._id))
  };

  render() {
    let searchCards = [];
    this.state.listOfUserNames.forEach((user) => {
      searchCards.push(
        <Card style={{ width: "28rem" }}>
          <Card.Body>
            <Card.Text>UserName: {user}</Card.Text>
            <Button variant="primary" onClick={() => this.fetchChatDetails(user)}>
              Private Chat
            </Button>
            <Button
              className="ml-3"
              variant="primary"
              onClick={() => history.push("/profile/" + user)}
            >
              View Profile
            </Button>
          </Card.Body>
        </Card>
      );
    });

    return <div>{searchCards}</div>;
  }
}

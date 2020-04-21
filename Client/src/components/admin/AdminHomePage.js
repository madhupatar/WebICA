import React, { Component } from "react";
import { Container, Table, Button } from "react-bootstrap";
import history from "../../services/History";
import TopBar from "../TopBar";
import * as sessionMgmt from "../../services/SessionHandler";

export default class AdminHomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coversationObj: [],
            userList: []
        }
    }

    componentDidMount() {
        let self = this
        fetch('https://cs5200-sp2020-server.herokuapp.com/conversations/', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
      .then((res) => res.json())
      .then((res) => self.setState({coversationObj: res}))
      
        fetch('https://cs5200-sp2020-server.herokuapp.com/users/', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
      .then((res) => res.json())
      .then((res) => self.setState({userList: res}))
    }

    deleteConversation = (conversatonId) => {
        let self = this
        fetch('https://cs5200-sp2020-server.herokuapp.com/conversations/' + conversatonId, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
      .then((res) => {
        let convObj = self.state.coversationObj.find( element => element._id === conversatonId)
        let indexOfConv = self.state.coversationObj.indexOf(convObj);
        let convArray = self.state.coversationObj;
        convArray.splice(indexOfConv, 1);
        self.setState({coversationObj: convArray})
    })
    }

    deleteUser = (userId) => {
        let self = this;
        fetch('https://cs5200-sp2020-server.herokuapp.com/users/' + userId, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
      .then(res => {
        let userObj = self.state.userList.find( element => element._id === userId)
        let indexOfUser = self.state.userList.indexOf(userObj);
        let userArr = self.state.userList;
        userArr.splice(indexOfUser, 1);
        self.setState({userList: userArr})
      })
    }

    render() {
        const content = this.state.coversationObj.map(convObj => 
            <tr>
                <td>{convObj._id}</td>
                <td>{convObj.fromUser}</td>
                <td>{convObj.toUser}</td>
                <td>{convObj.convoType}</td>
                <td>
                    <Button variant="primary" onClick={() => this.deleteConversation(convObj._id)}>Delete</Button>
                    <Button variant="primary" onClick={() => history.push("/conversation/" + convObj.convoType + "/" + convObj._id)}>Open</Button>
                    {
                        convObj.conversationType === "group" ? <Button variant="primary" onClick={() => history.push("/groupInfo/" + convObj.to)}>Edit Group Info</Button> : null
                    }
                </td>
            </tr>
        );

        let filteredList = this.state.userList.filter(userObj => userObj.userName !== sessionMgmt.getUserName())
        const userContent = filteredList.map(userObj => 
            <tr>
                <td>{userObj._id}</td>
                <td>{userObj.firstName}</td>
                <td>{userObj.lastName}</td>
                <td>{userObj.userName}</td>
                <td>
                    <Button variant="primary" onClick={() => this.deleteUser(userObj._id)}>Delete User</Button>
                </td>
            </tr>
        );
        return (
            <Container>
                <TopBar userName={sessionMgmt.getUserName()} showSearch={true}/>
                <h2>Welcome  {sessionMgmt.getUserName()} !!!</h2>

                <Button variant="primary" onClick={() => history.push("/createConversation")}>Add Conversation</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Conversation Id</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Is a Group</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </Table>
                <Button variant="primary" onClick={() => history.push("/register")}>Create User</Button>
                <Table striped bordered hove>
                    <thead>
                        <th>User Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User Name</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {userContent}
                    </tbody>
                </Table>
            </Container>
        );
    }
}
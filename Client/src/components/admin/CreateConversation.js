import React, { Component } from "react";
import {Container, Form, FormGroup, FormLabel, FormControl, Button, FormText} from "react-bootstrap";
import history from "../../services/History";

export default class CreateConversation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            displayGroupNameField: false
        }

        this.user1Text = React.createRef();
        this.user2Text = React.createRef();
        this.groupNameText = React.createRef();
        this.isGroup = React.createRef();
    }

    createConversation = () => {
        let self = this
        if (!this.isGroup.checked) {
            fetch('http://localhost:4000/conversations/', {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
                body: JSON.stringify({fromUser: this.user1Text.value, toUser: this.user2Text.value, convoType: "Individual"})
            })
            .then((res) => {
                history.push("/adminHome");
            })
        }
        else {
            fetch('http://localhost:4000/conversations/group', {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
                body: JSON.stringify({moderator: this.user1Text.value, userList: [this.user2Text.value], name: this.groupNameText.value})
            })
            .then((res) => res.json())
            .then((res) => {
                fetch('http://localhost:4000/conversations/', {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
                body: JSON.stringify({fromUser: self.user1Text.value, toUser: "", convoType: "Group", groupId: res._id})
                })
                .then((res) => {
                    history.push("/adminHome");
                })
            })
        }
    }

    handleToggle = (e) => {
        this.setState({displayGroupNameField: e.target.checked})
    }

    render() {
        return (
            <Container>
                <Form>
                    <FormGroup controlId="username 1">
                        <FormLabel>Conversation User 1</FormLabel>
                        <FormControl ref={ref => {this.user1Text = ref;}} type="email" placeholder="Enter user name 1" />
                        <FormText className="text-muted">
                            In case of this conversation being a group, this user would be considered moderator.
                        </FormText>
                    </FormGroup>
                    <FormGroup controlId="username 2">
                        <FormLabel>Conversation User 2</FormLabel>
                        <FormControl ref={ref => {this.user2Text = ref;}} type="email" placeholder="Enter user name 2" />
                    </FormGroup>
                    <Form.Group controlId="isGroup">
                        <Form.Check ref={ref => {this.isGroup = ref;}} onChange={(e) => this.handleToggle(e)} type="checkbox" label="Is it group"/>
                    </Form.Group>
                    {
                        this.state.displayGroupNameField ? <FormGroup controlId="group name">
                            <FormLabel>Group Name</FormLabel>
                            <FormControl ref={ref => {this.groupNameText = ref;}} type="text" placeholder="Enter name of the group" />
                        </FormGroup> : null
                    }
                    <Button variant="primary" onClick={this.createConversation}>Create</Button>
                </Form>
            </Container>
        );
    }
}
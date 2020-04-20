import React, { Component } from "react";
import {Container, Form, FormGroup, FormLabel, FormControl, Button, FormText} from "react-bootstrap";
import history from "../../services/History";

export default class CreateConversation extends Component {

    constructor(props) {
        super(props);
        this.user1Text = React.createRef();
        this.user2Text = React.createRef();
        this.isGroup = React.createRef();
    }

    createConversation = () => {

        if (!this.isGroup.checked) {
            fetch('http://localhost:4000/conversations/', {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
                body: JSON.stringify({fromUser: this.user1Text.value, toUser: this.user2Text.value, convoType: "Individual"})
            })
            .then((res) => res.json())
        }
        else {
            // message: [],
            // fromUser: req.body.fromUser,
            // toUser: req.body.toUser,
            // convoType: req.body.convoType
        }
        history.push("/adminHome");
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
                        <Form.Check ref={ref => {this.isGroup = ref;}} type="checkbox" label="Is it group"/>
                    </Form.Group>
                    <Button variant="primary" onClick={this.createConversation}>Create</Button>
                </Form>
            </Container>
        );
    }
}
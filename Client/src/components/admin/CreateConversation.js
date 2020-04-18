import React, { Component } from "react";
import {Container, Form, FormGroup, FormLabel, FormControl, Button, FormText} from "react-bootstrap";
import history from "../../services/History";

export default class CreateConversation extends Component {
    createConversation = () => {
        // api call to create a conversation
        history.push("/adminHome");
    }

    render() {
        return (
            <Container>
                <Form>
                    <FormGroup controlId="username 1">
                        <FormLabel>Conversation User 1</FormLabel>
                        <FormControl type="email" placeholder="Enter user name 1" />
                        <FormText className="text-muted">
                            In case of this conversation being a group, this user would be considered moderator.
                        </FormText>
                    </FormGroup>
                    <FormGroup controlId="username 2">
                        <FormLabel>Conversation User 2</FormLabel>
                        <FormControl type="email" placeholder="Enter user name 2" />
                    </FormGroup>
                    <Form.Group controlId="isGroup">
                        <Form.Check type="checkbox" label="Is it group"/>
                    </Form.Group>
                    <Button variant="primary" onClick={this.createConversation}>Create</Button>
                </Form>
            </Container>
        );
    }
}
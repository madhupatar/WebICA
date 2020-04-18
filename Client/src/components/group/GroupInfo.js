import React, { Component } from "react";
import { Container, Form, FormGroup, FormLabel, FormControl, Button} from "react-bootstrap";

export default class GroupInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupName: "",
            groupMembers: []
        }
    }

    componentDidMount() {
        // api call to load the info of group
    }

    addGroupMember = () =>  {

    }

    removeGroupMember = () => {

    }

    updateGroupInfo = () => {

    }

    render() {
        const options = this.state.groupMembers.map(name => <option>{name}</option>)
        return (
            <Container>
                <Form>
                    <FormGroup>
                        <FormLabel>Group name</FormLabel>
                        <FormControl type="text" placeholder={this.state.groupName} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Add Group Members</FormLabel>
                        <FormControl type="select">
                            {options}
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Member name</FormLabel>
                        <FormControl type="text" placeHolder="Enter a username" />
                        <Button variant="primary" onClick={this.addGroupMember}>Add member</Button>
                        <Button variant="primary" onClick={this.removeGroupMember}>Remove member</Button>
                    </FormGroup>
                    <Button variant="primary" onClick={this.updateGroupInfo}>Update Group Info</Button>
                </Form>
            </Container>
        )
    }
}
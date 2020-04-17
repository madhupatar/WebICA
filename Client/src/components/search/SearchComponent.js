import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap';
import history from "../../services/History";

export default class SearchComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listOfUserNames: ["haha", "wow"]
        }
    }

    componentDidMount() {
        let self = this;
        fetch('apiUrl' + this.props.match.params.keyword, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }})
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp);
            // self.setState({listOfUserNames: resp});
        });
    }

    render() {
        let searchCards = [];
        this.state.listOfUserNames.forEach(user => {
            searchCards.push(
            <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Text>
                    UserName: {user}
                </Card.Text>
                <Button variant="primary" onClick={() => history.push("/conversation/" + user)}>Private Chat</Button>
            </Card.Body>
            </Card>
            );
        });

        return (
            <div>
                {searchCards}
            </div>
        );
    }
}
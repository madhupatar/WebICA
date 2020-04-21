import React, { Component } from "react";
import {
  Container,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";

export default class GroupInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupInfo: null
    };

    this.msgRef = React.createRef();
    this.userRef = React.createRef();
    this.delUserRef = React.createRef();
  }

  componentDidMount() {
    let self = this
    fetch('https://cs5200-sp2020-server.herokuapp.com/conversations/group/' + this.props.match.params.groupId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
    .then((res) => res.json())
    .then((groupRes) => {
      self.setState({groupInfo: groupRes})
    })
  }

  addGroupMember = () => {
    this.updateGroup({
      moderator: this.state.groupInfo.moderator,
        userList: [this.userRef.current.value].concat(this.state.groupInfo.userList),
        name: this.state.groupInfo.name
    })
  };

  removeGroupMember = () => {
    let indexToRemove = this.state.groupInfo.userList.indexOf(this.delUserRef.current.value)
    let newUsers = this.state.groupInfo.userList
    newUsers.splice(indexToRemove,1)

    this.updateGroup({
      moderator: this.state.groupInfo.moderator,
      userList: newUsers,
      name: this.state.groupInfo.name
    })
  };

  updateGroupInfo = () => {
    this.updateGroup({
      moderator: this.state.groupInfo.moderator,
      userList: this.state.groupInfo.userList,
      name: this.msgRef.current.value
    })
  };

  updateGroup = (groupObj) => {
    let self = this
    fetch('https://cs5200-sp2020-server.herokuapp.com/conversations/group/' + this.props.match.params.groupId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groupObj)
    })
    .then((res) => res.json())
    .then((groupRes) => {
      self.setState({groupInfo: groupObj})
    })
  }

  render() {
    if (this.state.groupInfo === null) {
      return (<div></div>)
    }
    const options = this.state.groupInfo.userList.map( user => <option>{user}</option>);
    return (
      <Container>
        <Form>
          <FormGroup>
            <FormLabel>Group name</FormLabel>
            <FormControl type="text" placeholder={this.state.groupInfo.name} ref={this.msgRef}/>
            <Button variant="primary" onClick={this.updateGroupInfo}>
            Update Group Info
            </Button>
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Member name</FormLabel>
            <FormControl as="select" placeholder={this.state.groupInfo.name} ref={this.delUserRef}>
              {options}
            </FormControl>
            <Button variant="primary" onClick={this.removeGroupMember}>
              Remove member
            </Button>
          </FormGroup>

          <FormGroup>
            <FormControl type="text" placeHolder="Enter a username" ref={this.userRef}/>
            <Button variant="primary" onClick={this.addGroupMember}>
              Add member
            </Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

import React, {Component} from 'react';
import './UserProfile.css';
import history from "../../services/History";
import * as sessionMgmt from '../../services/SessionHandler';
import {Alert} from "react-bootstrap";

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            userName: props.match.params.userName,
            password: "",
            following: [],
            showAlert: false,
            showFollow: true,
            userType: "User"
        }

        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.usertNameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    componentDidMount() {
        let self = this;
        fetch('http://localhost:4000/users/' + this.state.userName, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            self.setState({...resp})
        })
        .catch(() => self.setState({showAlert: true}));
    }

    updateBackend = () => {
        let self = this;
        const userInfo = (({ userName, firstName, lastName, following, userType }) => ({ userName, firstName, lastName, following, userType }))(this.state);
        fetch('http://localhost:4000/users/' + this.state.userName, {
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo)
        })
        .then(resp => resp.json())
        .then(resp => {
            self.setState({...resp})
        })
        .catch(() => self.setState({showAlert: true}));
    }
    handleSave = () => {
        const userName = this.usertNameRef.current === null || this.usertNameRef.current.value === "" ? this.state.userName : this.usertNameRef.current.value;
        const firstName = this.firstNameRef.current === null || this.firstNameRef.current.value === "" ? this.state.firstName : this.firstNameRef.current.value;
        const lastName = this.lastNameRef.current === null || this.lastNameRef.current.value === "" ? this.state.lastName : this.lastNameRef.current.value;
        const password = this.passwordRef.current === null || this.passwordRef.current.value === "" ? this.state.password : this.passwordRef.current.value;

        this.setState({
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            password: password
        }, this.updateBackend)
    }

    handleFollowRequest = () => {
        let self = this;
        const signedUserName = sessionMgmt.getUserName()
        const signedUserFollowingList = sessionMgmt.getUserInfo("following");
        signedUserFollowingList.push(this.state.userName);
        sessionMgmt.saveUserInfo("following", signedUserFollowingList);

        const userInfo = {
            following: signedUserFollowingList
        }
        fetch('http://localhost:4000/users/' + signedUserName, {
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo)
        })
        .then(resp => resp.json())
        .then(resp => {
            self.setState({showFollow: false})
        })
        .catch(() => self.setState({showAlert: true}));
    }

    render() {
        const isOwner = sessionMgmt.getUserName() === this.props.match.params.userName;
        const followingList = this.state.following.map((val) => <span>{val}</span>)
        var self = this;
        console.log(this.props.match.params.userName)
        console.log(isOwner)
        return (
            <div className="user-profile-container">
                {
                    this.state.showAlert ? <Alert variant="danger" onClose={() => self.setState({showAlert: false})} dismissible>
                                                <Alert.Heading>Unable to get User details</Alert.Heading>
                                            </Alert> : null
                }

                <div className="details-container">
                    <span className="label">First Name: </span>
                    <input className="profile-value" type="text" readOnly={!isOwner} placeholder={this.state.firstName}
                    ref={this.firstNameRef}/>
                </div>
                <div className="details-container">
                    <span className="label">Last Name: </span>
                    <input className="profile-value" type="text" readOnly={!isOwner} placeholder={this.state.lastName}
                    ref={this.lastNameRef}/>
                </div>
                <div className="details-container">
                    <span className="label">User Name: </span>
                    <input className="profile-value" type="text" readOnly={true} placeholder={this.state.userName}
                    ref={this.userNameRef}/>
                </div>
                <div className="details-container">
                    <span className="label">Password: </span>
                    <input className="profile-value" type="text" readOnly={!isOwner} placeholder={this.state.password}
                    ref={this.passwordRef}/>
                </div>
                <div className="details-container">
                    <span className="label">Following: </span><br></br>
                    {followingList}
                </div>
                {
                    isOwner ? <button type="submit" className="btn btn-primary" onClick={this.handleSave}>Save Changes</button> : this.state.showFollow ? <button type="submit" className="btn btn-primary" onClick={this.handleFollowRequest}>Follow</button> : null
                }

                <button type="button" className="btn btn-primary" onClick={() => history.goBack()}>Back</button>
            </div>
        );
    }
}
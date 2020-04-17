import React, {Component} from 'react';
import './UserProfile.css';
import history from "../../services/History";
import * as sessionMgmt from '../../services/SessionHandler';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            userName: sessionMgmt.getUserName(),
            password: "",
            following: []
        }

        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.usertNameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    componentDidMount() {
        // get the profile info for the current user
    }

    handleSave = () => {
        // make a post call to sync the current state to the backend
    }

    handleFollowRequest = () => {
        // Add the user name to the current user's list of following user
    }

    render() {
        const isOwner = this.state.userName === this.props.match.params.userName;
        const followingList = this.state.following.map((val) => <span>{val}</span>)
        var self = this;
        console.log(this.props.match.params.userName)
        console.log(isOwner)
        return (
            <div className="user-profile-container">
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
                    {followingList}
                </div>
                {
                    isOwner ? <button type="submit" className="btn btn-primary" onClick={this.handleSave}>Save Changes</button> : <button type="submit" className="btn btn-primary" onClick={this.handleFollowRequest}>Follow</button>
                }

                <button type="button" className="btn btn-primary" onClick={() => history.goBack()}>Back</button>
            </div>
        );
    }
}
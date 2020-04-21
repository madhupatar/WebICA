import React, { Component } from "react";
import history from "../../services/History";
import * as sessionMgmt from '../../services/SessionHandler';
import {Alert} from "react-bootstrap";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userType: "User",
            showAlert: false
        }

        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.userNameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    handleClickForSignUp = () => {
        var self = this;
        let newuser = {};
        newuser.firstName = this.firstNameRef.current.value;
        newuser.lastName = this.lastNameRef.current.value;
        newuser.userName = this.userNameRef.current.value;
        newuser.password = this.passwordRef.current.value;
        newuser.userType = this.state.userType;

        fetch('https://cs5200-sp2020-server.herokuapp.com/users', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newuser)
        })
        .then(resp => resp.json())
        .then(resp => {
            sessionMgmt.loginUser(newuser.userName, resp)
            history.push("/adminHome")
        })
        .catch(() => self.setState({showAlert: true}));
    }

    handleUserTypeSelection = (e) => {
        this.setState({userType: e.target.value});
    }

    render() {
        let self = this;
        return (
            <div className="container">
                {
                    this.state.showAlert ? <Alert variant="danger" onClose={() => self.setState({showAlert: false})} dismissible>
                                                <Alert.Heading>Unable to register. Check the details</Alert.Heading>
                                            </Alert> : null
                }
                <div className="form-group">
                    <h1>Register Here</h1>
                </div>
                <div className="row form-group">
                    <div className="col">
                        <label htmlFor="fname"
                               className="control-label">
                            First Name
                        </label>
                    </div>
                    <div className="col-10">
                        <input type="text"
                               className="form-control"
                               ref={this.firstNameRef}
                               id="firstName"
                               placeholder="First Name"
                               required/>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col">
                        <label htmlFor="lname"
                               className="control-label">
                            Last Name
                        </label>
                    </div>
                    <div className="col-10">
                        <input type="text"
                               className="form-control"
                               ref={this.lastNameRef}
                               id="lastName"
                               placeholder="Last Name"
                               required/>
                    </div>
                </div>


                <div className="row form-group">
                    <div className="col">
                        <label htmlFor="username"
                               className="control-label">
                            Username
                        </label>
                    </div>
                    <div className="col-10">
                        <input type="text"
                               className="form-control"
                               id="username"
                               ref={this.userNameRef}
                               placeholder="Your User Name"
                               required/>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col">
                        <label htmlFor="password"
                               className="control-label">
                            Password
                        </label>
                    </div>
                    <div className="col-10">
                        <input type="password"
                               className="form-control"
                               id="password"
                               ref={this.passwordRef}
                               placeholder="Your Password"
                               required/>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col">
                        <label htmlFor="fname"
                               className="control-label">
                            Select Type of User
                        </label>
                    </div>
                    <div className="col-10">
                        <select id="userType" value={this.state.userType} onChange={this.handleUserTypeSelection}>
                            <option value="Admin">Admin</option>
                            <option value="Moderator">Moderator</option>
                            <option value="User">User</option>
                        </select>
                    </div>
                </div>

                <div className="row justify-content-between">
                    <div className="col">
                        <button className="btn btn-primary" onClick={() => this.handleClickForSignUp()}>
                            Sign Up
                        </button>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={() => history.goBack()}>
                             Back
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
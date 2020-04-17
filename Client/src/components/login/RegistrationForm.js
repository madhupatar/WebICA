import React, { Component } from "react";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.handleClickForSignUp = this.handleClickForSignUp.bind(this); 
        // this.handleClickForBack = this.handleClickForBack.bind(this);
        this.state = {
            fullName: '',
            userName: '',
            password: '',
        }
    }

    inputFieldChange = (event) => {
        this.setState({[event.target.id.toString()]: event.target.value});
    };

    handleClickForSignUp() {
        var self = this;
        let newuser = {};
        newuser.fullName = this.state.fullName
        newuser.userName = this.state.userName;
        newuser.password = this.state.password;
        newuser.visibility = true;
        newuser.status = true;

        fetch('http://localhost:8080/prattle/rest/user/create', {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newuser)
                })
                .then(resp => resp.json())
                .then(x => {
                    if (x)
                        self.props.onComplete("signup", newuser.userName);
                    else 
                        // throw an error
                        console.log("error");
                });
    }

    render() {
        return (
            <div className="container">
                <div className="form-group">
                    <h1>Register Here</h1>
                </div>
                <div className="row form-group">
                    <div className="col">
                        <label htmlFor="fname"
                               className="control-label">
                            Full Name
                        </label>
                    </div>
                    <div className="col-10">
                        <input type="text"
                               className="form-control"
                               onChange={this.inputFieldChange}
                               id="FullName"
                               placeholder="FullName"
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
                               onChange={this.inputFieldChange}
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
                               onChange={this.inputFieldChange}
                               placeholder="Your Password"
                               required/>
                    </div>
                </div>

                <div className="row justify-content-between">
                    <div className="col">
                        <button className="btn btn-primary" onClick={() => this.handleClickForSignUp()}>
                            Sign Up
                        </button>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={() => this.props.onComplete("signUpToLogin")}>
                             Back
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
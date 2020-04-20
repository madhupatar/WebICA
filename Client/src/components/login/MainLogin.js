import React, { Component } from "react";
import {Container} from "react-bootstrap";
import history from "../../services/History";
import * as sessionMgmt from '../../services/SessionHandler';

export default class MainLogin extends Component {
    loadGapi = () => {
        window.gapi.load('client:auth2',  {
            callback: function() {
            // Initialize client & auth libraries
            window.gapi.client.init({
                apiKey: 'AIzaSyC8AKACexxpIfpPGkaN20eijzueMhvTLQk',
                clientId: '219237558445-nmg1htphuftsjh4hj7m7l7h5len50sci.apps.googleusercontent.com',
                scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
            }).then(
                function(success) {
                    // Libraries are initialized successfully
                    // You can now make API calls
                }, 
                function(error) {
                // Error occurred
                // console.log(error) to find the reason
                }
            );
            },
            onerror: function() {
            // Failed to load libraries
            }
        });
        }

    componentDidMount() {
        this.loadGapi();
    }

    handleGoogleLogin = () => {
        var self = this;
        window.gapi.auth2.getAuthInstance().signIn().then(
            function(success) {
            // Login API call is successful	
            window.gapi.client.request({ path: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json'}).then(
                function(success) {
                // API call is successful

                var user_info = JSON.parse(success.body);
                let data = {};

                data.firstName = user_info.given_name;
                data.lastName = user_info.family_name;
                data.userName = user_info.email;

                // user profile information
                fetch('http://localhost:4000/users/' + data.userName, {
                    method: 'GET',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    }
                })
                .then(resp => resp.json())
                .then(resp => {
                    sessionMgmt.loginUser(data.userName, resp[0])
                    if (sessionMgmt.getUserRole() == "Admin") {
                        history.push("/adminHome")
                    }
                    else {
                        history.push("/")
                    }
                })
                .catch(() => {
                    fetch('http://localhost:4000/users', {
                        method: 'POST',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    })
                    .then(resp => resp.json())
                    .then(resp => {
                        sessionMgmt.loginUser(data.userName, resp)
                        if (sessionMgmt.getUserRole() == "Admin") {
                            history.push("/adminHome")
                        }
                        else {
                            history.push("/")
                        }
                    })
                })
            },
            function(error) {
                // Error occurred
                console.log(error);
            })
        },
        function(error) {
            // Error occurred
            // console.log(error) to find the reason
        })
    }

    render() {
        return (
            <Container>
                <h2>Welcome to chat application. Login to proceed further</h2>
                <button className="btn btn-link form-group" onClick={() => history.push("/customLogin")}>
                    <u>
                    Login with credentials
                    </u>
                </button>
                <button className="btn btn-link form-group" onClick={this.handleGoogleLogin}>
                    <u>
                    Login with Google
                    </u>
                </button>
                <button className="btn btn-link form-group" onClick={() => history.push("/register")}>
                    <u>
                    Sign up
                    </u>
                </button>
            </Container>
            // Render google login component here
        )
    }
}
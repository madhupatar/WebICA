import React, { Component } from "react";
import {Container} from "react-bootstrap";
import history from "../../services/History";

export default class MainLogin extends Component {
    render() {
        return (
            <Container>
                <h2>Welcome to chat application. Login to proceed further</h2>
                <button className="btn btn-link form-group" onClick={() => history.push("/customLogin")}>
                    <u>
                    Login with credentials
                    </u>
                </button>
                <button className="btn btn-link form-group" onClick={() => history.push("/googleLogin")}>
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
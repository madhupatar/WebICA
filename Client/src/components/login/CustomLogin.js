import React from 'react';

export default class CustomLogin extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            userName: '',
            password: '',
            currentUser: {}
        };
    }

    updateUsername = event =>
        this.setState({
            userName: event.target.value
        });

    updatePassword = event =>
        this.setState({
            password: event.target.value
        });

    handleClick() {
        if(this.state.userName != null || this.state.password != null) {
            this.state.currentUser.userName = this.state.userName;
            this.state.currentUser.password = this.state.password;
            

            var self = this;
            fetch('http://localhost:8080/prattle/rest/user/customLogin', {
                        method: 'POST',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(self.state.currentUser)
                    }).then(resp => self.props.onComplete("login", self.state.userName));
                    console.log(self.state.currentUser);
       }
       else {
           alert("Enter some valid information !!!");
       }
    }

    render() {
        return (
            <div className="container">
                <div className="form-group mt-4">
                    <h3>Log In </h3>
                </div>
                <div className="form-group">
                    <label htmlFor="username"
                            className="control-label">
                        Username
                    </label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa fa-user"/>
                            </div>
                        </div>
                        <input className="form-control"
                                onChange={this.updateUsername}
                                type="text"
                                id="username"
                                placeholder="Username"
                                required/>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="password"
                            className="control-label">
                        Password
                    </label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa fa-key"/>
                            </div>
                        </div>
                        <input className="form-control"
                                onChange={this.updatePassword}
                                type="password"
                                id="password"
                                placeholder="*****"
                                required/>
                    </div>
                </div>
                <div className="row form-group justify-content-between">
                    <div className="col">
                        <button className="btn btn-primary form-group"
                                onClick={() => this.handleClick()}>
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        )
    }
};

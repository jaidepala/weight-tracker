import React, { Component, useContext, useEffect } from "react";
import { withRouter } from 'react-router-dom'
// import axios from "axios";
// import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

// Services
    import LoginButton from './loginbutton';

class Login extends Component {

    constructor(props) {

        super(props);

        this.state = {
            
            username: '',
            password: ''
        };
        
        this.loginClick             = this.loginClick.bind(this);
        this.updateUserName         = this.updateUserName.bind(this);
        this.updatePassword         = this.updatePassword.bind(this);
    };

    componentDidMount() {
    };

    componentWillUnmount() {
    };

    loginClick() {
        // this.setState({ 

        //     userName: event.target.value 
        // });
        this.props.history.push('/create-profile')
    };

    updateUserName( evt ) {

        this.setState({
            username: evt.target.value
        });
    };

    updatePassword( evt ) {

        this.setState({
            password: evt.target.value
        });
    };

    render() {

        return (
            <div className="login-container">
                
                <form noValidate autoComplete="off">
                    <FormControl className="login-form-component">
                        <TextField
                            id="login-email"
                            label="Enter Email"
                            onChange={this.updateUserName}
                            value={this.state.username}
                            margin="normal"
                        />
                    </FormControl>
                    <FormControl className="login-form-component">
                        <TextField
                            id="login-password"
                            label="Enter Password"
                            onChange={this.updatePassword}
                            type="password"
                            value={this.state.password}
                            autoComplete="current-password"
                            margin="normal"
                        />
                    </FormControl>
                    <LoginButton
    
                        props={ this }
                    />
                </form>
            </div>
        );
    };
}

export default Login;

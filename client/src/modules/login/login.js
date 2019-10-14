import React, { Component, useContext, useEffect } from "react";
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
            
            userName: '',
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
        let { userName, password } = this.state;

        if( !userName || !password )
        {
            return false;
        };
    };

    updateUserName( evt ) {

        this.setState({
            userName: evt.target.value
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
                            value={this.state.userName}
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
    
                        props={ this.props }
                        username={ this.state.userName } 
                        password={ this.state.password } 
                    />
                </form>
            </div>
        );
    };
}

export default Login;

import React, { Component, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
// import clsx from 'clsx';
import WtSnackbar from '../shared/components/snackbar';
import SpinnerLoader from '../shared/components/spinner.loader';
import { Utils } from '../../services/util';
    
// Services
    import AuthContext from '../../services/util';

import FormControl from '@material-ui/core/FormControl';

/* 
    !   Dialog
    *   
    *   REF: https://material-ui.com/components/dialogs/
*/
    import Button from '@material-ui/core/Button';
    import Dialog from '@material-ui/core/Dialog';
    import DialogActions from '@material-ui/core/DialogActions';
    import DialogContent from '@material-ui/core/DialogContent';
    import DialogContentText from '@material-ui/core/DialogContentText';
    import DialogTitle from '@material-ui/core/DialogTitle';
    import MenuItem from '@material-ui/core/MenuItem';
    import TextField from '@material-ui/core/TextField';

class Login extends Component {

    constructor(props) {

        super(props);

        this.state = {

            snackbar: {
                open: false,
                duration: null,
                message: '',
                action: ''
            },
            username: '',
            password: '',
            startLoading: false,
            popUpOpen: false,
            popUpMessage: ''
        };
        
        this.loginClick             = this.loginClick.bind(this);
        this.closePopUp             = this.closePopUp.bind(this);
        this.updateUserName         = this.updateUserName.bind(this);
        this.updatePassword         = this.updatePassword.bind(this);
    };

    componentDidMount() {
    };

    componentWillUnmount() {
    };

    closePopUp() {

        this.setState({
            popUpOpen: false,
            popUpMessage: ''
        });
    };

    loginClick(setLoggedIn) {

        let { username, password } = this.state;

        if (!username || !password) {
            
            let msg = '';

            if (!password)
                msg = 'Please enter password.';
            if (!username)
                msg = 'Please enter username.';

            this.setState({
                popUpOpen: true,
                popUpMessage: msg
            });

            return false;
        };

        this.setState({
            startLoading: true
        });

        axios.post("api/login/", {
            username: username,
            password: password
        })
        .then(res => {

            this.setState({
                startLoading: false
            });

            if (res && res.data && res.data.success) {

                Utils.setLoggedInUser(res.data.data);

                this.props.history.push('/create-profile');

                console.log('setLoggedIn', this.props);
                
                // this.props.setLoggedIn(true);
            };
        })
        .catch(err => {

                // this.setState({
                //     snackbar: {
                //         open: true,
                //         message: 'Welcome User!',
                //         icon: 'info',
                //         duration: 5000,
                //         close: () => {
                //             this.setState({
                //                 snackbar: {
                //                     open: false
                //                 }
                //             })
                //         }
                //     }
                // });

            let msg = (err && err.message) || 'Could not verify login.';

            this.setState({
                startLoading: false,
                popUpOpen: true,
                popUpMessage: (err && err.message) || msg
            });

            console.error('err', err);
        });
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

            <AuthContext.Consumer>
                {({ loggedIn, setLoggedIn }) => (
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
                            <Button
                                className="login-form-component"
                                variant="contained"
                                size="large"
                                color="primary"
                                onClick={this.loginClick}>

                                Login
                            </Button>
                        </form>
                        <Dialog
                            open={this.state.popUpOpen}
                            onClose={this.closePopUp}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">

                            <DialogTitle id="alert-dialog-title">
                                Oops!
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {this.state.popUpMessage}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.closePopUp} color="primary" autoFocus>
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <WtSnackbar snackbarConfig={this.state.snackbar} />
                        <SpinnerLoader
                            startLoading={this.state.startLoading}
                        />
                    </div>
                )}
            </AuthContext.Consumer>
        );
    };
}

export default Login;

import React from 'react';
import { Route } from "react-router-dom";    

import CreateProfile from '../create-profile/create-profile';
import SpinnerLoader from '../shared/components/spinner.loader';
import axios from "axios";

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

export default function LoginButton( props ) {
    const [open, setOpen] = React.useState(false);
    const [startLoading, setStartLoading] = React.useState(false);
    // let [startLoading] = React.useStat/e(false);

    // console.log('props', props);

    const ReturnErrorMessage = () => {
        let { username, password } = props;
        
        if( !username || !password )
        {
            let msg = '';

            if( !password )
                msg = 'Please enter password.';
            if( !username )
                msg = 'Please enter username.';

          return (<span>
              { msg }
          </span>);
        }
        else
        {
            return (<span>
                Something went wrong! <br />
                Try again.
            </span>);
        }
    };

    function getDetails() {
        
        let { username, password } = props;

        if(!username || !password)
        {
            setOpen(true);
            return false;
        };

        setStartLoading(true);
        
        axios.post("api/login/get", {
            username: username,
            password: password
        })
        .then(res => {

            setStartLoading(false);
            
            if (res && res.data && res.data.success && res.data.data) {
                
                // console.log('redirecting', props);

                props.props.history.push('/create-profile');
            };

            setOpen(true);
        })
        .catch(err => {

            setStartLoading(false);

            console.log('err', err);
            
            setOpen(true);
        });
    };

    function handleClickOpen() {
        // setOpen(true);

        getDetails();

        // let { username, password } = props;

        // axios.post("api/login/save", {
        //     username: username,
        //     password: password
        // })
        // .then(res => {

        //     if (res && res != null) {
        //         getDetails();
        //     }
        // })
        // .catch(err => {

        //     console.log('err', err);
        // });
    };

    function handleClose() {
        setOpen(false);
    };

    return (
        <div>
            <Button 
                className="login-form-component"
                variant="contained" 
                size="large" 
                color="primary" 
                onClick={handleClickOpen}>
                
                Login
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                    <DialogTitle id="alert-dialog-title">
                        {"Invalid login credentials"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <ReturnErrorMessage />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
            </Dialog>
            <SpinnerLoader
                startLoading={startLoading}
            />
        </div>
    );
}
import React from 'react';

/* 
Dialog
REF: https://material-ui.com/components/dialogs/
*/
    import Button from '@material-ui/core/Button';
    import Dialog from '@material-ui/core/Dialog';
    import DialogActions from '@material-ui/core/DialogActions';
    import DialogContent from '@material-ui/core/DialogContent';
    import DialogContentText from '@material-ui/core/DialogContentText';
    import DialogTitle from '@material-ui/core/DialogTitle';

export default function LoginButton( props ) {
    const [open, setOpen] = React.useState(false);

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
                Valid Form!
            </span>);
        }
    };

    function handleClickOpen() {
        setOpen(true);
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
        </div>
    );
}
/* 
    !   How To Create Service
    *   
    *   REF
    *   https://stackoverflow.com/a/52924068
*/
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    close: {
        padding: theme.spacing(0.5),
    },
})
);

class SnackBarElement extends React.Component {

    handleClose() {
        console.log('CLOSED!')
    };

    render() {
        // const classes = useStyles();

        return (<div className="snackbar-container">
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.props.open}
                autoHideDuration={this.props.duration || 5000}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.props.message}</span>}
                action={[
                    <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                        {this.props.action}
                    </Button>,
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={this.handleClose}>

                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </div>);
    };
};

export class Utils {

    static isLoggedIn = () => {

        return localStorage.getItem('user') && localStorage.getItem('user') != null;
    };

    static setLoggedInUser = ( userData ) => {
        localStorage.setItem('user', userData.id);
    };

    static removeLoggedInUser = () => {
        localStorage.removeItem('user');
    };

    static getLoggedInUser = () => {
        return localStorage.getItem('user');
    };

    static ShowSnackBar = ( snackbarConfig ) => {

        let handleClose = () => {
            console.log('close');

            this.ShowSnackBar({
                open: false
            });
        };

        // let classes = useStyles();

        return (
            <SnackBarElement
                duration={snackbarConfig.duration }
                open={snackbarConfig.open}
                message={snackbarConfig.message}
                action={snackbarConfig.action}
            />
        );
    };

};

/* 
    !   REF
    *   https://stackoverflow.com/a/56192225
*/
const AuthContext = React.createContext(null);

export default AuthContext;

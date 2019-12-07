import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles, fade, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
// import clsx from 'clsx';
import WtSnackbar from '../shared/components/snackbar';
import SpinnerLoader from '../shared/components/spinner.loader';
import { Utils } from '../../services/util';
    
// Services
import AuthContext from '../../services/util';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import PaymentIcon from '@material-ui/icons/Payment';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    listroot: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
});


class Settings extends Component {

    constructor(props) {

        super(props);

        this.state = {

        };

        this.redirectTo = this.redirectTo.bind(this);
    };

    componentDidMount() {

    };

    redirectTo( url ) {
        
        this.props.history.push(url)
    };

    render() {

        const { classes } = this.props;
        
        return (

            <AuthContext.Consumer>
                {({ loggedIn, setLoggedIn }) => (
                    <Paper className={classes.root}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={3}>
                                <Paper className={classes.paper}>

                                    <div className="profile-sidebar">
                                        <div className="profile-userpic">
                                            <span className="profile-edit">
                                                <Button>
                                                    <EditIcon />
                                                </Button>
                                            </span>
                                            <img src="http://placehold.jp/200x200.png" className="img-responsive" alt="" />
                                        </div>
                                        <div className="profile-usertitle">
                                            <div className="profile-usertitle-name">
                                                Jay Depala
                                            </div>
                                            <div className="profile-usertitle-job">
                                                Developer
                                            </div>
                                        </div>
                                    </div>

                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Paper className={classes.paper}>
                                    <div className={classes.listroot}>

                                        <List component="nav" aria-label="profile list links">
                                            <ListItem onClick={this.redirectTo.bind(this, '/create-profile')} button>
                                                <ListItemIcon>
                                                    <PersonIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Profile" />
                                            </ListItem>
                                            <ListItem onClick={this.redirectTo.bind(this, '/dashboard')} button>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Inbox" />
                                            </ListItem>
                                            <ListItem onClick={this.redirectTo.bind(this, '/pay')} button>
                                                <ListItemIcon>
                                                    <PaymentIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Payment" />
                                            </ListItem>
                                        </List>
                                        <Divider />
                                    </div>

                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
            </AuthContext.Consumer>
        );
    };
};

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(useStyles, { withTheme: true })(Settings);
// export default Settings;
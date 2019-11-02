import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, fade, makeStyles } from '@material-ui/core/styles';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Header
	import AppBar from '@material-ui/core/AppBar';
	import Toolbar from '@material-ui/core/Toolbar';
	import IconButton from '@material-ui/core/IconButton';
	import Typography from '@material-ui/core/Typography';
	import InputBase from '@material-ui/core/InputBase';
	import Badge from '@material-ui/core/Badge';
	import MenuItem from '@material-ui/core/MenuItem';
	import Menu from '@material-ui/core/Menu';

// Drawer
	import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
	import Button from '@material-ui/core/Button';
	import List from '@material-ui/core/List';
	import Divider from '@material-ui/core/Divider';
	import ListItem from '@material-ui/core/ListItem';
	import ListItemIcon from '@material-ui/core/ListItemIcon';
	import ListItemText from '@material-ui/core/ListItemText';

// Content
    import GridList from '@material-ui/core/GridList';
    import GridListTile from '@material-ui/core/GridListTile';
    import tileData from './tileData';

// Icons
	import HomeIcon from '@material-ui/icons/Home';
	import AccountCircle from '@material-ui/icons/AccountCircle';
	import InboxIcon from '@material-ui/icons/MoveToInbox';
	import MailIcon from '@material-ui/icons/Mail';
	import MoreIcon from '@material-ui/icons/MoreVert';
	import MenuIcon from '@material-ui/icons/Menu';
	import NotificationsIcon from '@material-ui/icons/Notifications';
    import SearchIcon from '@material-ui/icons/Search';
    import SettingsIcon from '@material-ui/icons/Settings';
    
// Services
    import AuthContext from '../../../services/util';

const useStyles = makeStyles(theme => ({
	
	// Header
		grow: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			display: 'none',
			[theme.breakpoints.up('sm')]: {
				display: 'block',
			},
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
				'&:hover': {
					backgroundColor: fade(theme.palette.common.white, 0.25),
			},
			marginRight: theme.spacing(2),
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(3),
				width: 'auto',
			},
		},
		searchIcon: {
			width: theme.spacing(7),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		inputRoot: {
			color: 'inherit',
		},
		inputInput: {
			padding: theme.spacing(1, 1, 1, 7),
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('md')]: {
				width: 200,
			},
		},
		sectionDesktop: {
			display: 'none',
			[theme.breakpoints.up('md')]: {
				display: 'flex',
			},
		},
		sectionMobile: {
			display: 'flex',
			[theme.breakpoints.up('md')]: {
				display: 'none',
			},
		},
	// Drawer
		list: {
			width: 250,
		},
		fullList: {
			width: 'auto',
        },    
    // content
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: 500,
            height: 450,
        },
}));

class NeHeader extends Component {

    constructor( props ) {

        super(props);

        this.state = {
            sideMenuDirection: 'right',
            sideMenuToggle: false
        };

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.sideList = this.sideList.bind(this);
        this.linkClick = this.linkClick.bind(this);
        this.renderMobileMenu = this.renderMobileMenu.bind(this);
        this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
    };

    linkClick(link, props) {

        // props.history.push('/create-profile');

        this.toggleDrawer(true)
    };

    handleMobileMenuClose() {
        console.log('called...');
        
        // setMobileMoreAnchorEl(null);
    };

    renderMobileMenu() {

        const mobileMenuId = 'primary-search-account-menu-mobile';

        return (
            <Menu
                // anchorEl={true}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={this.state.sideMenuToggle}
                onClose={this.handleMobileMenuClose}>
    
                <MenuItem>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <p>
                        Messages
                    </p>
                </MenuItem>
                <MenuItem>
                    <IconButton aria-label="show 11 new notifications" color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>
                        Notifications
                    </p>
                </MenuItem>
                <MenuItem>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit">
    
                        <AccountCircle />
                    </IconButton>
                    <p>
                        Profile
                    </p>
                </MenuItem>
            </Menu>
        );
    };

    sideList() {

        let props = this.props;

        const sideListMenu = [
            {
                displayName: 'Dashboard',
                url: 'dashboard',
                icon: <HomeIcon />
            }
        ];

        return (
            <div
                role="presentation"
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}>

                {sideListMenu.map((sideMenu, index) => (
                    <ListItem button key={sideMenu.displayName} onClick={this.linkClick('/create-profile', props)}>
                        <ListItemIcon>
                            {sideMenu.icon}
                        </ListItemIcon>
                        <ListItemText primary={sideMenu.displayName} />
                    </ListItem>
                ))}
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </div>
        );
    };

    toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        };

        this.setState({ ...this.state, sideMenuToggle: open });
    };

    render() {

        return (

            <AuthContext.Consumer>
                {({ loggedIn, setLoggedIn }) => (
                    <div className="wt-header">
                        <SwipeableDrawer
                            open={this.state.sideMenuToggle}
                            onClose={this.toggleDrawer(false)}
                            onOpen={this.toggleDrawer(true)}>
                            
                            {this.sideList()}
                        </SwipeableDrawer>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    onClick={this.toggleDrawer(true)}
                                    color="inherit"
                                    aria-label="open drawer">

                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6" noWrap>
                                    Weight Tracker
                                </Typography>
                            </Toolbar>
                            {
                                loggedIn && (
                                    <div>
                                        Logged In!
                                    </div>
                                )
                            }
                            {
                                !loggedIn && (
                                    <div>
                                        Not logged In!
                                    </div>
                                )
                            }
                        </AppBar>
                    </div>
                )}
            </AuthContext.Consumer>
        );
    };
};

NeHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(useStyles, { withTheme: true })(NeHeader);
// export default NeHeader;

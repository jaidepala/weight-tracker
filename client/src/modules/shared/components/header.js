import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
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

export default function Header() {
    const classes = useStyles();
	const [state, setState] = React.useState({
	  top: false,
	  left: false,
	  bottom: false,
	  right: false,
	});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
    const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	
	const sideListMenu = [
		{
			displayName: 'Dashboard',
			url: 'dashboard',
			icon: <HomeIcon />
		}
	];

	const sideList = side => (
	  	<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(side, false)}
			onKeyDown={toggleDrawer(side, false)}>

            {sideListMenu.map((sideMenu, index) => (
                <ListItem button key={sideMenu.displayName}>
                    <ListItemIcon>
                        { sideMenu.icon }
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

    const toggleDrawer = (side, open) => event => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
      	}

      	setState({ ...state, [side]: open });
    };
    
    function redirectTo(url) {
        console.log(url);
        
        // this.props.history.push( url );
    };
  
    function handleProfileMenuOpen(event) {
		setAnchorEl(event.currentTarget);
    };
  
    function handleMobileMenuClose() {
		setMobileMoreAnchorEl(null);
    };
  
    function handleMenuClose() {
      	setAnchorEl(null);
      	handleMobileMenuClose();
    };
  
    function handleMobileMenuOpen(event) {
      	setMobileMoreAnchorEl(event.currentTarget);
    };
  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      	<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}>
        	
			<MenuItem onClick={handleMenuClose}>
				Profile
			</MenuItem>
        	<MenuItem onClick={handleMenuClose}>
				My account
			</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      	<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
        	
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
        	<MenuItem onClick={handleProfileMenuOpen}>
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

    const content = (
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {tileData.map(tile => (
                <GridListTile key={tile.title} cols={tile.cols || 1}>
                    <img src={tile.img} alt={tile.title} />
                </GridListTile>
            ))}
        </GridList>
    );

    return (
      	<div className={classes.grow}>
			<SwipeableDrawer
				open={state.left}
				onClose={toggleDrawer('left', false)}
				onOpen={toggleDrawer('left', true)}>
				
				{sideList('left')}
			</SwipeableDrawer>
        	<AppBar position="static">
          		<Toolbar>
            		<IconButton
						edge="start"
						onClick={toggleDrawer('left', true)}
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer">
              			
						  <MenuIcon />
            		</IconButton>
					<Typography className={classes.title} variant="h6" noWrap>
						Weight Tracker
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
            		</div>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<IconButton aria-label="show 4 new mails" color="inherit">
							<Badge badgeContent={4} color="secondary">
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton aria-label="show 17 new notifications" color="inherit">
							<Badge badgeContent={17} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit">
							
							<AccountCircle />
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit">
							
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
            {renderMenu}
		</div>
    );
}

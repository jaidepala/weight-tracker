import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { withRouter } from 'react-router-dom';

import './App.css';

// Services
    import { Utils } from './services/util';

// Components
    import Header from './modules/shared/components/header';
    import Login from './modules/login/login';
    import Dashboard from './modules/dashboard/dashboard';
    import CreateProfile from './modules/create-profile/create-profile';

class App extends Component {

    constructor( props ) {

        super(props);
    };

    render() {

        const isLoggedIn = localStorage.getItem('user') != null;

        return (
            <div className="App">
                
                <Router>
                    <div id="weight-mgmt-header">
                        <Route component={() => <Header isloggedin={isLoggedIn} />}  />
                    </div>
                    <div className="link-container">
                        <Link
                            component="button"
                            variant="body2"
                            to="/dashboard">

                            Dashboard
                        </Link>
                        {
                            !isLoggedIn && (<Link
                                component="button"
                                variant="body2"
                                to="/login">
                                Login
                            </Link>)
                        }                        
                        <Link
                            component="button"
                            variant="body2"
                            to="/create-profile">
                            Create Profile
                        </Link>
                    </div>
                    
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/login" component={Login} />
                    <Route path="/create-profile" component={CreateProfile} />
                </Router>
            </div>
        );
    }
}

export default App;
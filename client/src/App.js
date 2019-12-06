import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { withRouter } from 'react-router-dom';

import './App.css';

// Services
    import AuthContext from './services/util';

// Components
    import Header from './modules/shared/components/header';
    import NeHeader from './modules/shared/components/neHeader';
    import Login from './modules/login/login';
    import Dashboard from './modules/dashboard/dashboard';
    import Settings from './modules/settings/settings';
    import CreateProfile from './modules/create-profile/create-profile';
    import Payment from './modules/add-card/add-card';

class App extends Component {

    constructor( props ) {

        super(props);

        this.state = {};
    };

    render() {
        // const TheHead = withStyles(<NeHeader />);

        return (
            <div className="App">

                <AuthContext.Consumer>
                    {({ loggedIn, setLoggedIn }) => (
                        <Router>
                            <div id="weight-mgmt-header">
                                {
                                    <NeHeader />
                                }
                                {/* <Route component={() => (
                                        <TheHead loggedIn= { loggedIn }
                                        setLoggedIn={setLoggedIn} />
                                    )}
                                />  */}
                                {/* <Route component={() => (<Header
                                        loggedIn={loggedIn}
                                        setLoggedIn={setLoggedIn} />
                                    )}  
                                /> */}
                            </div>
                            <div className="link-container">
                                <Link
                                    component="button"
                                    variant="body2"
                                    to="/settings">

                                    Dashboard
                                </Link>
                                {
                                    !loggedIn && (

                                        <Link
                                            component="button"
                                            variant="body2"
                                            to="/login">
                                            Login
                                        </Link>                  
                                    )
                                }
                                <Link
                                    component="button"
                                    variant="body2"
                                    to="/create-profile">
                                    Create Profile
                                </Link>
                            </div>
                            
                            
                            <Route exact path="/" render={(routeProps) => (
                                <Dashboard 
                                    {...this.props} 
                                    {...routeProps}
                                    loggedIn={loggedIn}
                                    setLoggedIn={setLoggedIn}
                                />
                            )} />
                            
                            <Route path="/dashboard" render={(routeProps) => (
                                <Dashboard 
                                    {...this.props} 
                                    {...routeProps}
                                    loggedIn={loggedIn}
                                    setLoggedIn={setLoggedIn}
                                />
                            )} />
                            
                            <Route path="/login" render={(routeProps) => (
                                <Login 
                                    {...this.props} 
                                    {...routeProps}
                                    loggedIn={loggedIn}
                                    setLoggedIn={setLoggedIn}
                                />
                            )} />
                            
                            <Route path="/create-profile" render={(routeProps) => (
                                <CreateProfile 
                                    {...this.props} 
                                    {...routeProps}
                                    loggedIn={loggedIn}
                                    setLoggedIn={setLoggedIn}
                                />
                            )} />

                            <Route path="/pay" render={(routeProps) => (
                                <Payment 
                                    {...this.props} 
                                    {...routeProps}
                                    loggedIn={loggedIn}
                                    setLoggedIn={setLoggedIn}
                                />
                            )} />
                            
                            <Route path="/settings" render={(routeProps) => (
                                <Settings 
                                    {...this.props} 
                                    {...routeProps}
                                    loggedIn={loggedIn}
                                    setLoggedIn={setLoggedIn}
                                />
                            )} />

                        </Router>
                    )}
                </AuthContext.Consumer>
            </div>
        );
    }
}

export default App;
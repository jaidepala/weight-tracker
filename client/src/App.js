import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { withRouter } from 'react-router-dom';

import './App.css';

// Services

// Components
    import Header from './modules/shared/components/header';
    import Login from './modules/login/login';
    import Dashboard from './modules/dashboard/dashboard';

class App extends Component {

    render() {

        return (
            <div className="App">
                
                <Router>
                    <div id="header">
                        <Route component={Header} />
                    </div>
                    <ul>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                    
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/login" component={Login} />
                </Router>
            </div>
        );
    }
}

export default App;
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Services
import AuthContext from './services/util';

const AppWrapper = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            <App />
        </AuthContext.Provider>
    )
}

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<AppWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import AuthContext from './util';

const withAuthProps = (Component) => {
    return (props) => (
        <AuthContext.Consumer>
            {({ loggedIn, setLoggedIn }) => (
                <Component
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    {...props}
                />
            )}
        </AuthContext.Consumer>
    )
}

export default withAuthProps;

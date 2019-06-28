import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import setAuthToken from './components/uri/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import App from './App';

// Check for token
if(localStorage.ProductivityToken) {
    // Set auth token header auth
    setAuthToken(localStorage.ProductivityToken);
    // Decode token and get user info and exp
    // const decoded = jwt_decode(localStorage.ProductivityToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(localStorage.ProductivityToken));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if(localStorage.ProductivityToken.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // TODO: Clear current Profile
        
        // Redirect to login
        window.location.href = '/';
    }
}

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));

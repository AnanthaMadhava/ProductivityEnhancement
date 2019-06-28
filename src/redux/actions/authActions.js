import axios from 'axios';
import setAuthToken from '../../components/uri/setAuthToken';
// import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Login - Get User Token
export const loginUser = userData => dispatch => {
    // console.log(userData);
    axios.post('/auth/signin', userData)
        .then(res => {
            // console.log(res.data.accessToken);
            // Save to localStorage
            const token = "Bearer " + res.data.accessToken;
            // console.log(token)
            // Set token to ls
            localStorage.setItem('ProductivityToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            // const decoded = jwt_decode(token);
            // Set Current user
            dispatch(setCurrentUser(token));
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })  
        );
}

// Set logged in user
export const setCurrentUser = token => dispatch => {
    // return {
    //     type: SET_CURRENT_USER,
    //     payload: decoded
    // }
    if(token === localStorage.ProductivityToken){
        // console.log(token);
        const headers = {
            'Authorization': token
        }
        axios.get('/user/me',{headers})
            .then(res => 
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: res.data
                })
            )
            .catch(err => { 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            });
    } else {
        // console.log('Logout');
        dispatch ({
            type: SET_CURRENT_USER,
            payload: {}
        })
    }
    
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('ProductivityToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}
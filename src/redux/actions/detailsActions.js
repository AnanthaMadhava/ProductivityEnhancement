import axios from 'axios';

import { GET_ERRORS, DETAILS_LOADING, GET_DATABASE_DETAILS, GET_LEARNER_DETAILS, GET_MENTOR_DETAILS } from './types';

// Get Database Details
export const databaseDetails = () => dispatch => {
    dispatch(getDetailsLoding());
    const headers = {
        'Authorization': localStorage.ProductivityToken
    }
    axios.get('/user/me/dbs/all',{headers})
        .then(res => 
            dispatch({
                type: GET_DATABASE_DETAILS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Get Learner Details
export const learnerDetails = () => dispatch => {
    dispatch(getDetailsLoding());
    const headers = {
        'Authorization': localStorage.ProductivityToken
    }
    axios.get('/users/list/learner',{headers})
        .then(res => 
            dispatch({
                type: GET_LEARNER_DETAILS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Get Learner Details
export const mentorDetails = () => dispatch => {
    dispatch(getDetailsLoding());
    const headers = {
        'Authorization': localStorage.ProductivityToken
    }
    axios.get('/users/list/mentor',{headers})
        .then(res => 
            dispatch({
                type: GET_MENTOR_DETAILS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Loading Details
export const getDetailsLoding = () => {
    return {
        type: DETAILS_LOADING
    }
}
import axios from 'axios';

import { GET_ERRORS } from './types';

// AddDatabase
export const addDatabase = (DbInfo) => dispatch => {
    const headers = {
        'Authorization': localStorage.ProductivityToken
    }
    axios.post('/db/saveDbConfig',DbInfo,{headers})
        .then(res => alert("Database Added Success"))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })  
        );
}

// Add Learner and Mentor Signup
export const addLearnerOrMentor = (LearnerOrMentor, history) => dispatch => {
    // console.log(Signup.userType);
    if(LearnerOrMentor.userType === "learner"){
        axios.post('/auth/signup',LearnerOrMentor)
        .then(res => {
            alert(res.data.message)
            history.push('/')
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })  
        );
    } else if(LearnerOrMentor.userType === "mentor"){
        const headers = {
            'Authorization': localStorage.ProductivityToken
        }
        axios.post('/auth/signup',LearnerOrMentor,{headers})
        .then(res => alert(res.data.message))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })  
        );
    }
}
import axios from 'axios';

import { CONNECT_DATABASE_LOADING } from './types';

export const connectDatabase = (db_INFO) => dispatch => {
    console.log(db_INFO)
    dispatch(getConnectDatabaseLoding());
    const headers = {
        'Authorization': localStorage.ProductivityToken
    }
    axios.post('/api/db/connect',db_INFO,{headers})
        .then(res => 
            console.log(res.data)    
        )
        .catch(err => 
            console.log(err)  
        );
}

// Loading Details
export const getConnectDatabaseLoding = () => {
    return {
        type: CONNECT_DATABASE_LOADING
    }
}
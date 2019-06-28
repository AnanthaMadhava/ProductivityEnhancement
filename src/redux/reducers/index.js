import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import detailsReducer from './detailsReducer';
import connectDatabaseReducer from './connectDatabaseReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    details: detailsReducer,
    connect : connectDatabaseReducer
});
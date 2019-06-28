import { DETAILS_LOADING, GET_DATABASE_DETAILS, GET_LEARNER_DETAILS, GET_MENTOR_DETAILS } from '../actions/types';

const initialState = {
    loading: false,
    databaseDetails: null,
    learnerDetails: null,
    mentorDetails: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case DETAILS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_DATABASE_DETAILS:
            return {
                ...state,
                databaseDetails: action.payload,
                loading: false
            }
        case GET_LEARNER_DETAILS:
            return {
                ...state,
                learnerDetails: action.payload,
                loading: false
            }
        case GET_MENTOR_DETAILS:
            return {
                ...state,
                mentorDetails: action.payload,
                loading: false
            }
        default:
            return state;
    }
}
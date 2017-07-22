import { COMPLAINTS_SUCCESS } from '../constants';
import initialState from './initialState';

export default function complaintsReducer(state = initialState.complaints, action) {
    switch (action.type) {
        case COMPLAINTS_SUCCESS:
            return action.response.data;
        default:
            return state;
    }
}
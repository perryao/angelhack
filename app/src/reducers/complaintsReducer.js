import { COMPLAINTS_SUCCESS, CLEAR_COMPLAINT } from '../constants';
import initialState from './initialState';
import _ from 'lodash';

export default function complaintsReducer(state = initialState.complaints, action) {
    switch (action.type) {
        case COMPLAINTS_SUCCESS:
            return action.response.data;
        case CLEAR_COMPLAINT:
            return state.filter(x => {
                return !_.isEqual(x, action.complaint);
            });
        default:
            return state;
    }
}
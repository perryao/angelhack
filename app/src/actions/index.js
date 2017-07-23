import * as actionTypes from '../constants';
import { CALL_API } from '../middleware/api';

export function clearComplaint(complaint) {
    return {
        type: actionTypes.CLEAR_COMPLAINT,
        complaint
    }
}

export function selectComplaint(complaint) {
    return {
        type: actionTypes.SELECT_COMPLAINT,
        complaint,
    };
}
console.log(actionTypes);
/** API Actions */
const { COMPLAINTS_REQUEST, COMPLAINTS_SUCCESS, COMPLAINTS_FAILURE } = actionTypes;
export const fetchComplaints = () => ({
    [CALL_API]: {
        types: [COMPLAINTS_REQUEST, COMPLAINTS_SUCCESS, COMPLAINTS_FAILURE],
        method: 'GET',
        endpoint: 'complaints',
    }
});
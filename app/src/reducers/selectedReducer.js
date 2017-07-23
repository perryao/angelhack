import { SELECT_COMPLAINT, CLEAR_COMPLAINT } from '../constants';
export default function selected(state = null, action) {
    switch(action.type) {
        case SELECT_COMPLAINT:
            return action.complaint;
        case CLEAR_COMPLAINT:
            return null;
        default: 
            return state;
    }
}
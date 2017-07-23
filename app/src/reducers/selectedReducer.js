import { SELECT_COMPLAINT } from '../constants';
export default function selected(state = null, action) {
    switch(action.type) {
        case SELECT_COMPLAINT:
            return action.complaint;
        default: 
            return state;
    }
}
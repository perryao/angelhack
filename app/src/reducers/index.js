// Set up your root reducer here...
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import complaintsReducer from './complaintsReducer';
import selectedReducer from './selectedReducer';

 const rootReducer = combineReducers({
     complaints: complaintsReducer,
     selected: selectedReducer,
     routing: routerReducer
 });

 export default rootReducer;
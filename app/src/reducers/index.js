// Set up your root reducer here...
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import complaintsReducer from './complaintsReducer';

 const rootReducer = combineReducers({
     complaints: complaintsReducer,
     routing: routerReducer
 });

 export default rootReducer;
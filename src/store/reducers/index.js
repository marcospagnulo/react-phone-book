import { combineReducers } from 'redux';
import profile from './profile.reducer';
import contacts from './contacts.reducer';
import { routerReducer } from 'react-router-redux';

// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
    profile,
    contacts,
    routing: routerReducer
});

export default rootReducer;
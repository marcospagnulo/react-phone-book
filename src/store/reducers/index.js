import { combineReducers } from 'redux';
import profile from './profile.reducer';
import contacts from './contacts.reducer';
import messages from './messages.reducer';
import { routerReducer } from 'react-router-redux';

// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
    profile,
    contacts,
    messages,
    routing: routerReducer
});

export default rootReducer;
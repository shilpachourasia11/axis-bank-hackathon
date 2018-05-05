import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    homeReducer
});

export default rootReducer;

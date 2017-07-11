import { applyMiddleware, combineReducers, createStore } from 'redux';
import axios from 'axios';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';

const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USERS_PENDING':
            return {
              ...state,
              fetching: true
            };
            break;
        case 'FETCH_USERS_REJECTED':
            return {
              ...state,
              fetching: false,
              error: action.payload
            };
            break;
        case 'FETCH_USERS_FULFILLED':
            return {
              ...state,
              fetching: false,
              fetched: true,
              users: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};

const reducers = combineReducers({
    user: userReducer
});

const middleware = applyMiddleware(promise(), logger);

const store = createStore(reducers, middleware);

store.dispatch({
    type: 'FETCH_USERS',
    payload: axios.get('')
});

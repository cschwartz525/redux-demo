import { applyMiddleware, combineReducers, createStore } from 'redux';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_NAME':
            state = { ...state, name: action.payload };
            break;
        case 'CHANGE_AGE':
            state = { ...state, age: action.payload };
            break;
        case 'ERROR':
            throw new Error('ERROR!');
            break;
        default:
            break;
    }
    return state;
};

const tweetsReducer = (state = [], action) => {
    return state;
};

const reducers = combineReducers({
    user: userReducer,
    tweets: tweetsReducer
});

const logger = (store) => (next) => (action) => {
    console.log('action fired', action);
    next(action);
};

const error = (store) => (next) => (action) => {
    try {
        next(action);
    } catch (error) {
        console.error(error);
    }
};


const middleware = applyMiddleware(logger, error);

const store = createStore(reducers, middleware);

store.subscribe(() => {
    console.log('store changed', store.getState());
});

store.dispatch({type: 'CHANGE_NAME', payload: 'Craig'});
store.dispatch({type: 'CHANGE_AGE', payload: 26});
store.dispatch({type: 'CHANGE_AGE', payload: 27});
store.dispatch({type: 'ERROR', payload: 'error'});

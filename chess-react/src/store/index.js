import websocketReducer from './websocketReducer'
import { createStore, combineReducers } from 'redux';
import userReducer from './userReducer'

const reducers = combineReducers({
    websocketReducer,
    userReducer
})

const store = createStore(reducers)

export default store
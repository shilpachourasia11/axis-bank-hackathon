import {createStore,combineReducers,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'
import homeReducer from './reducer/homeReducer'
import {routerReducer} from 'react-router-redux'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

const middleware = routerMiddleware(history)

export default createStore(
    combineReducers({
    	homeReducer,
      routing: routerReducer,
  	}),
    {},
    applyMiddleware(thunkMiddleware, promise())
)

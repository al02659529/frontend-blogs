import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import passwordReducer from "./reducers/passwordReducer";
import usernameReducer from "./reducers/usernameReducer";
import errorReducer from "./reducers/errorReducer";
import blogsReducer from "./reducers/blogsReducer";
import successReducer from "./reducers/successReducer";
import submittedReducer from "./reducers/submittedReducer";
import pageReducer from "./reducers/pageReducer";
import sortReducer from "./reducers/sortReducer";

const combinedStore = combineReducers({
    user: userReducer, username: usernameReducer, password: passwordReducer, error: errorReducer,
    blogs: blogsReducer, success: successReducer, isSubmitted: submittedReducer, page: pageReducer,
    sortBy: sortReducer} )

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25})

const store = createStore( combinedStore, composeEnhancers(  applyMiddleware(thunk) ) )

export default store
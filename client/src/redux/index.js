// STORE
// ==============================

// IMPORTS 
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// IMPORT FROM FILE -- REDUCERS
import auth from "./reducers/auth-reducer"
import awards from "./reducers/awards-reducer"
import categories from "./reducers/categories-reducer"
import nominees from "./reducers/nominees-reducer"
import ballots from "./reducers/ballots-reducer"
// import ballots from "./reducers/ballots-reducer"


// CREATE STORE/COMBINE REDUCERS
let reducer = combineReducers( {auth, awards, categories, nominees, ballots} )

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

// EXPORT
export default store

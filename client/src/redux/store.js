import { createStore, applyMiddleware, compose } from "redux";
//legacy_createStore as createStore
import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer, 
    composeEnhancer(applyMiddleware(thunkMiddleware))   //thunkMiddleware permite hacer los requests
);

export default store;


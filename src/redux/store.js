import {combineReducers, compose, configureStore} from "@reduxjs/toolkit";
import tableReducer from "./tableReducer";

let rootReducer = combineReducers({
    table: tableReducer
})

export const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = configureStore({
    reducer: rootReducer,
    defaultEnhancers: composeEnhancers()
});

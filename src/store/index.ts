import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import asynkThunk from 'redux-thunk';
import { configureStore } from "@reduxjs/toolkit";

import reducers from 'store/reducers';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers(reducers);
const middlewares = [asynkThunk];

export const setupStore = () => createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
// export const store = setupStore();

export const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(state.repo.repoInfo.id.toString(), serializedState);
    } catch (err) { }
};

setupStore().subscribe(() => {
    saveState(setupStore().getState());
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
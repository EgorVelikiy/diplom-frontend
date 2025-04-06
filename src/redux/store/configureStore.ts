import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from '../reducers/userReducer';
import fileReducer from '../reducers/FilesReducer'

const reducers = combineReducers({
    users: userReducer,
    files: fileReducer
})

const store = configureStore({
    reducer: { reducers }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
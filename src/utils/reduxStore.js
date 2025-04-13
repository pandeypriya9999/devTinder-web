import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducers from "./requestSlice";

const reduxStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducers
  }
});

export default reduxStore;
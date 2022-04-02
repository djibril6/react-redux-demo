import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "reducers";

import { configureStore } from "@reduxjs/toolkit";
// ...

// const store = configureStore({
//   reducer: {
//     posts: postsReducer,
//     comments: commentsReducer,
//     users: usersReducer,
//   },
// });

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

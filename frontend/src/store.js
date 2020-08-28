import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
} from "./reducers/productReducers";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { savedReducer } from "./reducers/savedReducers";
import Cookie from "js-cookie";
import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

// read the cookie named 'savedItems', set to savedItems variable
// If it does not exists, just set savedItems to empty array []
const savedItems = Cookie.getJSON("savedItems") || [];

// userInfo based on the data that we get from user
// If it does not exists, just set userInfo to null
const userInfo = Cookie.getJSON("userInfo") || null;

// Create initialState based on the item that comes from the Cookie
const initialState = {
  saved: { savedItems },
  userSignin: { userInfo },
};

// Reducer is just a function that describes how an action transforms the state into the next state
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  saved: savedReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  userUpdate: userUpdateReducer,
});

// Need this to use the redux chrome extension:
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store, pass in reducer (from combineReducers), initialState, and thunk middleware
// Thunk is a middleware for redux and allow async actions
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

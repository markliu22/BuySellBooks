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
const savedItems = Cookie.getJSON("savedItems") || []; // Set to 'savedItems' cookie, or [] if it does not exist
const userInfo = Cookie.getJSON("userInfo") || null; // Set to 'userInfo' cookie, or null if it does not exist

// Set initial state of app based on cookies
const initialState = {
  saved: { savedItems },
  userSignin: { userInfo },
};

// Combine all reducers
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

// ** Need this to use the redux chrome extension:
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store, reducer for update logic. thunk middleware allows async actions
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

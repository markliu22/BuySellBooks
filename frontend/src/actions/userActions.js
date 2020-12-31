import Axios from "axios";
import Cookie from "js-cookie";
import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_REQUEST,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

// Dispatch actions. Parameters: email, password
const signin = (email, password) => async (dispatch) => {
  // dispatch action
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: {
      email,
      password,
    },
  });
  // POST request to /api/users/signin, send the email and password to that endpoint
  const { data } = await Axios.post("/api/users/signin", { email, password });
  // got data, dispatch action
  dispatch({
    type: USER_SIGNIN_SUCCESS,
    payload: data,
  });
  // Save user data in "userInfo" cookie
  Cookie.set("userInfo", JSON.stringify(data));
};

// Dispatch actions. Parameters: N/A
const logout = () => (dispatch) => {
  // REMOVE "userInfo" COOKIE !!!
  Cookie.remove("userInfo");
  // dispatch action
  dispatch({ type: USER_LOGOUT });
};

// Dispatch actions. Parameters: name, email, phone, password
const register = (name, email, phone, password) => async (dispatch) => {
  // dispatch action
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { name, email, phone, password },
  });
  // POST request to /api/users/register, send the name, email, phone number, and password to that endpoint
  const { data } = await Axios.post("/api/users/register", {
    name,
    email,
    phone,
    password,
  });
  // got data, dispatch action
  dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  // Save user data in "userInfo" cookie
  Cookie.set("userInfo", JSON.stringify(data));
};

// Dispatch actions. Parameters: userId, name, email, phone, password
const update = ({ userId, name, email, phone, password }) => async (
  dispatch,
  getState
) => {
  const {
    userSignin: { userInfo },
  } = getState();
  // dispatch action
  dispatch({
    type: USER_UPDATE_REQUEST,
    payload: { userId, name, email, phone, password },
  });
  // POST request to /api/users/id_here, send name, email, phone, password to that endpoint
  const { data } = await Axios.put(
    "/api/users/" + userId,
    { name, email, phone, password },
    {
      headers: {
        Authorization: "Bearer " + userInfo.token, // token comes from getState
      },
    }
  );
  // got data, dispatch action
  dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  // Save user data in "userInfo" cookie
  Cookie.set("userInfo", JSON.stringify(data));
};

export { signin, register, logout, update };

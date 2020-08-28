import Axios from "axios";
import Cookie from "js-cookie";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_REQUEST,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";

// Function to dispatch actions (objects). Takes email and password as parameters
const signin = (email, password) => async (dispatch) => {
  // dispatch action (object)
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: {
      email,
      password,
    },
  });
  try {
    // Make a POST requets to /api/users/signin, sending the email and password to that endpoint, destructure data from it
    const { data } = await Axios.post("/api/users/signin", { email, password });
    // dispatch another action (object)
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    // Set Cookie to userInfo
    Cookie.set("userInfo", JSON.stringify(data)); // If you close the web application and open it again, the user data will be saved its cookie
  } catch (error) {
    // dispatch action (object) in case of error
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error.message,
    });
  }
};

// Function to dispatch actions (objects).
const logout = () => (dispatch) => {
  // Remove userInfo from Cookie
  Cookie.remove("userInfo");
  // dispatch action (object)
  dispatch({ type: USER_LOGOUT });
};

// Function to dispatch actions (objects). It takes name, email, phone number, and password as parameters
const register = (name, email, phone, password) => async (dispatch) => {
  // dispatch action (object)
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { name, email, phone, password },
  });
  try {
    // Make a POST requets to /api/users/register, sending the name, email, phone number, and password to that endpoint, destructure data from it
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      phone,
      password,
    });
    // dispatch another action (object)
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    // Set Cookie to userInfo
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    // dispatch action (object)
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.message,
    });
  }
};

// Function to dispatch actions (objects). Takes name, email, phone number, and password as parameters
const update = ({ userId, name, email, phone, password }) => async (
  dispatch,
  getState
) => {
  const {
    userSignin: { userInfo },
  } = getState();
  // getState Returns the current state tree of your application. It is equal to the last value returned by the store's reducer.
  // dispatch action (object)
  dispatch({
    type: USER_UPDATE_REQUEST,
    payload: { userId, name, email, phone, password },
  });
  try {
    // Make POST request to /api/users/idHere, deconstruct data from it
    const { data } = await Axios.put(
      "/api/users/" + userId,
      { name, email, phone, password },
      {
        headers: {
          Authorization: "Bearer " + userInfo.token, // token comes from getState
        },
      }
    );
    // dispatch action (object)
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    // Set Cookie to userInfo
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    // dispatch action (object)
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
};

export { signin, register, logout, update };

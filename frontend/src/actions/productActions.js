import axios from "axios";
import Axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from "../constants/productConstants";

// Function to dispatch actions (objects). Takes searchKeyword as parameter, default is empty string
const listProducts = (
  category = "",
  searchKeyword = "",
  sortOrder = ""
) => async (dispatch) => {
  try {
    // dispatch an action (object)
    dispatch({ type: PRODUCT_LIST_REQUEST }); // payload is optional
    // make GET request to /api/products
    // const { data } = await axios.get("/api/products"); < what it used to be before search keywords, categories, and sort orders were added
    // ? and & represent key value pairs that make up the Query String, which is a set of information sent to the server.
    // The query string starts after the "?" and each key value pair is seperated by a "&" EX: ?variable1=value1
    const { data } = await axios.get(
      "/api/products?category=" +
        category +
        "&searchKeyword=" +
        searchKeyword +
        "&sortOrder=" +
        sortOrder
    );
    // Now have data, dispatch ANOTHER action
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    // dispatch an action (object) in case of error
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

// Function to dispatch actions (objects). Takes product as parameter, so in ProductsScreen.js, need to pass in all that info
const saveProduct = (product) => async (dispatch, getState) => {
  try {
    // dispatch an action (object)
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    // Getting the userInfo from getState, which returns the current state tree of your application.
    const {
      userSignin: { userInfo },
    } = getState();
    //if there is no id, we make a POST request, else we make a PUT request and need to provide id of the product you want to update
    if (!product._id) {
      // Make a POST request to /api/products, pass the product and headers, destructure data from it
      const { data } = await Axios.post("/api/products", product, {
        headers: {
          Authorization: "Bearer " + userInfo.token, //the token comes from getState
        },
      });
      // If everything okay, we have data, dispatch ANOTHER action to the reducer
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
    // else, that means id already exists, we call PUT and need to add the product._id of the product we want to update.
    else {
      // Make a PUT requets to /api/products, pass the product._id and headers, destructure data from it
      const { data } = await Axios.put(
        "/api/products/" + product._id,
        product,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token, //the token comes from getState
          },
        }
      );
      // If everything okay, we have data, dispatch ANOTHER action to the reducer
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    // dispatch an action (object) in case of error
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

// Function to dispatch actions (objects). This one takes productId as parameter so in ProductScreen, in the useEffect, need to pass in an id
const detailsProduct = (productId) => async (dispatch) => {
  try {
    // dispatch an action (object)
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    // GET request to /api/products/whateverTheIdIsHere
    const { data } = await axios.get("/api/products/" + productId);
    // Now have data, dispatch ANOTHER action
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    // dispatch an action (object) in case of error
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

// Function to dispatch actions (objects). This one takes productId as parameter so in ProductScreen, in the useEffect, need to pass in an id
const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    // Getting the userInfo from getState, which returns the current state tree of your application.
    const {
      userSignin: { userInfo },
    } = getState();
    // dispatch an action (object)
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
      payload: productId,
    });
    // DELETE request to /api/products/idHere. Pass the headers. Destructure data from it
    const { data } = await axios.delete("/api/products/" + productId, {
      headers: {
        Authorization: "Bearer " + userInfo.token, //the token comes from getState
      },
    });
    // Now have data, dispatch ANOTHER action
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data,
      success: true,
    });
  } catch (error) {
    // dispatch an action (object) in case of error
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.message,
    });
  }
};

export { listProducts, detailsProduct, saveProduct, deleteProduct };

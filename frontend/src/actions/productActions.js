import axios from "axios";
import Axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
} from "../constants/productConstants";

// NOTE:
// ? and & represent key value pairs that make up the Query String, which is a set of information sent to the server.
// The query string starts after the "?" and each key value pair is seperated by a "&" EX: ?variable1=value1

// Dispatch actions. Parameters: category, searchKeyword, sortOrder.
const listProducts = (
  category = "",
  searchKeyword = "",
  sortOrder = ""
) => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST }); // dispatch action
  // GET request to /api/products with params
  const { data } = await axios.get(
    "/api/products?category=" +
      category +
      "&searchKeyword=" +
      searchKeyword +
      "&sortOrder=" +
      sortOrder
  );
  dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data }); // got data, dispatch action
};

// Dispatch actions. Parameters: product
const saveProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product }); // dispatch action
  const {
    userSignin: { userInfo }, // get userInfo from state
  } = getState();
  // If no id, POST request
  if (!product._id) {
    // Make a POST request to /api/products, get data
    const { data } = await Axios.post("/api/products", product, {
      headers: {
        Authorization: "Bearer " + userInfo.token, // token from state
      },
    });
    dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data }); // got data, dispatch action
  }
  // If id already exists, PUT request
  else {
    // PUT request to /api/products/id_of_product
    const { data } = await Axios.put("/api/products/" + product._id, product, {
      headers: {
        Authorization: "Bearer " + userInfo.token, // token from state
      },
    });
    dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data }); // got data, dispatch action
  }
};

// Dispatch actions. Parameters: productId
const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId }); // dispatch action
  // GET request to /api/products/id_of_product
  const { data } = await axios.get("/api/products/" + productId);
  dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data }); // got data, dispatch action
};

// Dispatch actions. Parameters: productId
const deleteProduct = (productId) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo }, // get userInfo
  } = getState();
  dispatch({
    type: PRODUCT_DELETE_REQUEST,
    payload: productId,
  });
  // DELETE request to /api/products/id_of_product
  const { data } = await axios.delete("/api/products/" + productId, {
    headers: {
      Authorization: "Bearer " + userInfo.token, // token from state
    },
  });
  // got data, dispatch action
  dispatch({
    type: PRODUCT_DELETE_SUCCESS,
    payload: data,
    success: true,
  });
};

export { listProducts, detailsProduct, saveProduct, deleteProduct };

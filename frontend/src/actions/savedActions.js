import Axios from "axios";
// If you add multiple things to favourites and refresh, only the most recent will remain, so need cookies:
import Cookie from "js-cookie";
import { SAVED_ADD_ITEM, SAVED_REMOVE_ITEM } from "../constants/savedConstants";

// Dispatch actions. Parameters: productId
const addToSaved = (productId) => async (dispatch, getState) => {
  // GET request to /api/products/id_of_product
  const { data } = await Axios.get("/api/products/" + productId);
  // got data, dispatch action
  dispatch({
    type: SAVED_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      description: data.description,
      sellerPhone: data.sellerPhone,
      sellerEmail: data.sellerEmail,
    },
  });
  // Get savedItems from state and save in "savedItems" cookie
  const {
    saved: { savedItems },
  } = getState();
  Cookie.set("savedItems", JSON.stringify(savedItems));
};

// Dispatch actions. Parameters: productId
const removeFromSaved = (productId) => async (dispatch, getState) => {
  // dispatch action
  dispatch({
    type: SAVED_REMOVE_ITEM,
    payload: productId,
  });
  // Get savedItems from state and save in "savedItems" cookie
  const {
    saved: { savedItems },
  } = getState();
  // This allows us to save the savedItems into the cookie
  Cookie.set("savedItems", JSON.stringify(savedItems));
};

export { addToSaved, removeFromSaved };

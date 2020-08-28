import Axios from "axios";
// If you add multiple things to "saved" and refresh, only the most recent will remain, so need cookies:
import Cookie from "js-cookie";
import { SAVED_ADD_ITEM, SAVED_REMOVE_ITEM } from "../constants/savedConstants";

// Function to dispatch actions (objects)
const addToSaved = (productId) => async (dispatch, getState) => {
  try {
    // GET request to /api/products/TheProductIdHere
    const { data } = await Axios.get("/api/products/" + productId);
    // Now have data, can add to saved by dispatching an action with payload as the data we got
    dispatch({
      type: SAVED_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        description: data.description,
        sellerPhone: data.sellerPhone,
        sellerEmail: data.sellerEmail, // Should be all
      },
    });
    // Get the savedItems and save them in the Cookie
    // after dispatching this action and adding this item to the saved, we can get access to the saved items using:
    const {
      saved: { savedItems },
    } = getState();
    // This allows us to save the savedItems into the cookie
    Cookie.set("savedItems", JSON.stringify(savedItems));
  } catch (error) {}
};

// Function to dispatch actions (objects)
const removeFromSaved = (productId) => async (dispatch, getState) => {
  // dispatch action (object)
  dispatch({
    type: SAVED_REMOVE_ITEM,
    payload: productId,
  });
  // Get the savedItems and save them in the Cookie
  // after dispatching this action and adding this item to the saved, we can get access to the saved items using:
  const {
    saved: { savedItems },
  } = getState();
  // This allows us to save the savedItems into the cookie
  Cookie.set("savedItems", JSON.stringify(savedItems));
};

export { addToSaved, removeFromSaved };

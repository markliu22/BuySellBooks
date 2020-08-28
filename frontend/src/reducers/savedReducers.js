import { SAVED_ADD_ITEM, SAVED_REMOVE_ITEM } from "../constants/savedConstants";

// Syntax: A reducer function is expressed as (state, action) => newState.
function savedReducer(state = { savedItems: [] }, action) {
  switch (action.type) {
    case SAVED_ADD_ITEM:
      // Get item (payload is the data that was sent from savedActions.js)
      const item = action.payload;
      // Search for the product in the state.savedItems
      // If x.product === item.product, it means this item exists
      // savedItems is one of the keys inside initialState inside store.js
      const product = state.savedItems.find((x) => x.product === item.product);
      // If this product exists, want to replace this 'product' with the items that come to the SAVED_ADD_ITEM
      if (product) {
        // product.product < The second "product" is the id of the product
        // 'x' means we keep the previous value of that item in the savedItems, so If user insert an item that exists in the cart, the new value for quantity is going to be applied
        // Keep the previous state and update the cart items
        return {
          cartItems: state.savedItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      // if product does not already exist, add to savedItems (which is one of the keys inside initialState inside store.js)
      return { savedItems: [...state.savedItems, item] };

    case SAVED_REMOVE_ITEM:
      // return the savedItems but only the ones who are not equal to the item sent from action.payload
      return {
        savedItems: state.savedItems.filter(
          (x) => x.product !== action.payload
        ),
      };

    default:
      return state;
  }
}

// export reducer
export { savedReducer };

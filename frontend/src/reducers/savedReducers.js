import { SAVED_ADD_ITEM, SAVED_REMOVE_ITEM } from "../constants/savedConstants";

// Reducer function to determine state of savedItems
function savedReducer(state = { savedItems: [] }, action) {
  switch (action.type) {
    case SAVED_ADD_ITEM:
      const item = action.payload;
      const product = state.savedItems.find((x) => x.product === item.product); // find product. If exists, update cart
      if (product) {
        return {
          cartItems: state.savedItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      return { savedItems: [...state.savedItems, item] }; // copy all savedItems, add item
    case SAVED_REMOVE_ITEM: // return savedItems but only the ones that are not from action.payload
      return {
        savedItems: state.savedItems.filter(
          (x) => x.product !== action.payload
        ),
      };
    default:
      return state;
  }
}

export { savedReducer };

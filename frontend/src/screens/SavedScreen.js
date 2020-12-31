import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToSaved, removeFromSaved } from "../actions/savedActions";
import { Link } from "react-router-dom";

function SavedScreen(props) {
  const saved = useSelector((state) => state.saved); // Get saved from state
  const { savedItems } = saved; // Get savedItems from saved
  const productId = props.match.params.id;
  const dispatch = useDispatch();
  const removeFromSavedHandler = (productId) => {
    dispatch(removeFromSaved(productId)); // dispatch action
  };

  // useEffect like componentDidMount
  useEffect(() => {
    // If productId exists
    if (productId) {
      // dispatch action
      dispatch(addToSaved(productId));
    }
  }, []); // input is empty so above will only run at componentDidMount

  return (
    <div className="saved">
      <div className="saved-list">
        <ul className="saved-list-container">
          <li>
            <h3>Saved Items:</h3>
          </li>
          {savedItems.length === 0 ? (
            <div>No Saved Items</div>
          ) : (
            savedItems.map((item) => (
              <li>
                <div className="saved-image">
                  <img src={item.image} alt="product" />
                </div>

                <div className="saved-name">
                  <div>
                    <Link to={"/product/" + item.product}>{item.name}</Link>
                  </div>
                  <button
                    type="button"
                    className="button"
                    onClick={() => removeFromSavedHandler(item.product)}
                  >
                    Delete
                  </button>
                </div>

                <div className="saved-price">${item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default SavedScreen;

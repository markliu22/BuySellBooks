import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToSaved, removeFromSaved } from "../actions/savedActions";
import { Link } from "react-router-dom";

function SavedScreen(props) {
  // We are taking the saved key from the initial state in the store
  const saved = useSelector((state) => state.saved);

  // destructuring savedItems from saved
  const { savedItems } = saved;

  // Get the productId from props
  const productId = props.match.params.id;

  const dispatch = useDispatch();

  // Function removeFromSavedHandler, takes productId as parameter, calls removeFromSaved ACTION from savedActions.js, passes productId as parameter
  const removeFromSavedHandler = (productId) => {
    // dispatch the removeFromSaved action, pass the productId as parameter
    dispatch(removeFromSaved(productId));
  };

  // useEffect is like componentDidMount. It tells React that your component needs to do something after render
  useEffect(() => {
    // If productId exists
    if (productId) {
      // dispatch the addToSaved action, pass the productId as parameter
      dispatch(addToSaved(productId));
    }
  }, []); // 'input' is an empty array which means the above code will only run at componentDidMount (when all the stuff rendered)
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

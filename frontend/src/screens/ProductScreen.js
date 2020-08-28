import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Need to npm i those 3 things and have to include these 2 things in order to use font awesome icons
import {
  faHeart, // heart icon
} from "@fortawesome/free-solid-svg-icons";

function ProductScreen(props) {
  // Get productDetails from the state
  const productDetails = useSelector((state) => state.productDetails);
  // Get products, loading, and error from productDetails
  const { product, loading, error } = productDetails;
  // To dispatch an action
  const dispatch = useDispatch();

  // useEffect is like componentDidMount. It tells React that your component needs to do something after render
  useEffect(() => {
    // dispatch the detailsProduct action
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, []); // 'input' is an empty array which means the above code will only run at componentDidMount (when all the stuff rendered)

  // Funtion to handle add to saved, redirects user their saved postings
  const handleAddToSaved = () => {
    props.history.push("/saved/" + props.match.params.id);
  };

  return (
    <div>
      <div className="back-to-home">
        {/* Link back to homepage */}
        <Link to="/">Back to Home Page</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="details">
          <div className="product-info">
            <h1>{product.name}</h1>
            <h4>{product.description}</h4>
            <button onClick={handleAddToSaved} className="save-button">
              <h4 className="save-text">Save</h4>
              <span>
                <FontAwesomeIcon icon={faHeart} />
              </span>
            </button>
            <h2>${product.price}</h2>
            <img
              className="product-image"
              src={product.image}
              alt="product"
            ></img>

            <h1>Contact the Seller:</h1>
            <h3>Seller's Phone: {product.sellerPhone}</h3>
            <h3>Seller's Email: {product.sellerEmail}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;

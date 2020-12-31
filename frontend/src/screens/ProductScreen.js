import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function ProductScreen(props) {
  const productDetails = useSelector((state) => state.productDetails); // Get productDetails from the state
  const { product, loading, error } = productDetails; // Get products, loading, and error from productDetails
  const dispatch = useDispatch();

  // useEffect like componentDidMount. Needs to execute after render
  useEffect(() => {
    // dispatch the detailsProduct action
    dispatch(detailsProduct(props.match.params.id));
    return () => {};
  }, []); // input is empty so above only runs at componentDidMount

  const handleAddToSaved = () => {
    props.history.push("/saved/" + props.match.params.id); // Redirect user
  };

  return (
    <div>
      <div className="back-to-home">
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

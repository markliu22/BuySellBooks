import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

function HomeScreen(props) {
  // const [state, setState] = useState(initialState);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = "textbooks";
  const productList = useSelector((state) => state.productList); // Get productList from the state
  const { products, loading, error } = productList; // Get products, loading, and error from productList
  const dispatch = useDispatch();

  // useEffect like componentDidMount. Needs to execute after render
  useEffect(() => {
    dispatch(listProducts(category)); // dispatch action
    return () => {};
  }, [category]); // above runs when category changes

  const submitHandler = (e) => {
    e.preventDefault(); // Don't refresh
    dispatch(listProducts(category, searchKeyword, sortOrder)); // dispatch action
  };

  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder)); // dispatch action
  };

  // Need to check if loading, then check if error bc of the "Can't read map of undefined" error
  return (
    <>
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{" "}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {
            // Display products
            products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <Link to={"/product/" + product._id}>
                    <img
                      className="product-image"
                      src={product.image}
                      alt="product"
                    ></img>
                  </Link>
                  <div className="product-name">
                    <Link to={"/product/" + product._id}>{product.name}</Link>
                  </div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-price">${product.price}</div>
                </div>
              </li>
            ))
          }
        </ul>
      )}
    </>
  );
}

export default HomeScreen;

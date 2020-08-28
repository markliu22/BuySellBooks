import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

function HomeScreen(props) {
  // The useState React HOOK Returns a stateful value, and a function to update it
  // SYNTAX: const [state, setState] = useState(initialState);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = "textbooks"; // Can set category to 'textbooks' since for now, that is the only category

  // Get productList from the state
  const productList = useSelector((state) => state.productList);
  // Get products, loading, and error from productList
  const { products, loading, error } = productList;
  // To dispatch an action
  const dispatch = useDispatch();

  // useEffect is like componentDidMount. It tells React that your component needs to do something after render
  useEffect(() => {
    // dispatch the listProducts action, pass in category
    dispatch(listProducts(category));
    // dispatch(listProducts());
    return () => {
      //
    };
  }, [category]); // 'input' is category which means the above code will run again when category changes

  // submitHandler function
  const submitHandler = (e) => {
    e.preventDefault(); // We don't want to refresh
    // dispatch the listProducts action, pass in category, searchKeyword, and sortOrder
    dispatch(listProducts(category, searchKeyword, sortOrder));
    // dispatch(listProducts()); < what is used to be before adding category, searchKeyword, and sortOrder
  };

  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    // dispatch the listProducts action, pass in category, searchKeyword, and sortOrder
    dispatch(listProducts(category, searchKeyword, sortOrder));
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
            // map through products (that we got from destructuring, each is going to be jsx)
            products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  {/* img is a Link to /product/iDhere */}
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

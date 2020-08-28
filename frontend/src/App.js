import React from "react";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import SavedScreen from "./screens/SavedScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ProfileScreen from "./screens/ProfileScreen";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Need to npm i those 3 things and have to include these 2 things in order to use font awesome icons
import {
  faUpload, // upload icon
  faHeart, // heart icon
  faUser, // user icon
} from "@fortawesome/free-solid-svg-icons";

function App() {
  // useSelector is a react-redux hook. It takes in a function argument that returns the part of the state that you want. We are taking the userSignin key from the initial state in the store
  const userSignin = useSelector((state) => state.userSignin);
  // state is an object(key-value pair). We taking the userInfo value from userSignin
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">BuySellBooks.com</Link>
          </div>
          <div className="header-links">
            <Link to="/products">
              <span>
                <FontAwesomeIcon icon={faUpload} />{" "}
              </span>
              Sell
            </Link>
            {"   "}
            <Link to="/saved">
              <span>
                <FontAwesomeIcon icon={faHeart} />{" "}
              </span>
              Favourites
            </Link>
            {"   "}
            {
              // if userInfo exists, show their name & a link to /profile, else show sign in button
              userInfo ? (
                <Link to="/profile">
                  <span>
                    <FontAwesomeIcon icon={faUser} />{" "}
                  </span>
                  {userInfo.name}
                </Link>
              ) : (
                <Link to="/signin">
                  <span>
                    <FontAwesomeIcon icon={faUser} />{" "}
                  </span>
                  Sign In
                </Link>
              )
            }
          </div>
        </header>
        <aside className="sidebar">
          <h3>Categories:</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            <li>
              <Link to="/category/textbooks">Textbooks</Link>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="content">
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/saved/:id?" component={SavedScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/category/:id" component={HomeScreen} />
          </div>
        </main>

        <footer className="footer">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

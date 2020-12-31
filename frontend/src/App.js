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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";

function App() {
  const userSignin = useSelector((state) => state.userSignin); // Get userSignin state. useSelector react-redux hook returns the part of the state that you want
  const { userInfo } = userSignin; // Get userInfo value from userSignin

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

        <footer className="footer">Mark Liu 2020.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

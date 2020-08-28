import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout, update } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

function ProfileScreen(props) {
  // The useState React HOOK Returns a stateful value, and a function to update it
  // SYNTAX: const [state, setState] = useState(initialState);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  // Take userSignin from the initial state of the store
  const userSignin = useSelector((state) => state.userSignin);
  // Get userInfo from userSisgnin
  const { userInfo } = userSignin;

  // Function for logging out
  const handleLogout = () => {
    // dispatch the logout action
    dispatch(logout());
    // Redirect to sign in screen
    props.history.push("/signin");
  };

  // Function for submitting an update
  const submitHandler = (e) => {
    e.preventDefault(); // Do not want to refresh the screen
    // Dispatch the update action, pass in userId, name, email, phone, and password
    dispatch(update({ userId: userInfo._id, name, email, phone, password }));
  };

  // Getting userUpdate from the initial state of the store
  const userUpdate = useSelector((state) => state.userUpdate);
  // Getting loading, success, and error from userUpdate
  const { loading, success, error } = userUpdate;

  // const myOrderList = useSelector((state) => state.myOrderList);
  // const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  useEffect(() => {
    // IF userInfo exists
    if (userInfo) {
      // Set name, email, phone, password
      console.log(userInfo.name);
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPhone(userInfo.phone);
      setPassword(userInfo.password);
    }
    // dispatch(listMyOrders());
    return () => {};
  }, [userInfo]); // Anytime userInfo changes, the above lines of code will re run

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>User Profile</h2>
              </li>
              <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {success && <div>Profile Saved Successfully.</div>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  value={name}
                  type="name"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="phone">Phone</label>
                <input
                  value={phone}
                  type="phone"
                  name="phone"
                  id="phone"
                  onChange={(e) => setPhone(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </li>

              <li>
                <button type="submit" className="button primary">
                  Update
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="button secondary full-width"
                >
                  Logout
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;

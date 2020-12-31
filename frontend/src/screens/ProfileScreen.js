import React, { useState, useEffect } from "react";
import { logout, update } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

function ProfileScreen(props) {
  // const [state, setState] = useState(initialState);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin); // Get userSignin from state
  const { userInfo } = userSignin; // Get userInfo from userSisgnin
  const handleLogout = () => {
    dispatch(logout()); // dispatch action
    props.history.push("/signin"); // redirect user
  };
  const submitHandler = (e) => {
    e.preventDefault(); // don't refresh
    dispatch(update({ userId: userInfo._id, name, email, phone, password })); // dispatch action
  };
  const userUpdate = useSelector((state) => state.userUpdate); // Get userUpdate from state
  const { loading, success, error } = userUpdate; // Getting loading, success, and error from userUpdate

  useEffect(() => {
    if (userInfo) {
      // Set info
      console.log(userInfo.name);
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPhone(userInfo.phone);
      setPassword(userInfo.password);
    }
    return () => {};
  }, [userInfo]); // Change in userInfo reruns above

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

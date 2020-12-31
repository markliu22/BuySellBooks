import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userActions";

function SigninScreen(props) {
  // const [state, setState] = useState(initialState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin); // get userSignin from state
  const { loading, userInfo, error } = userSignin; // get loading, userInfo, and error from userSignin
  const dispatch = useDispatch();

  // useEffect like componentDidMount
  useEffect(() => {
    // If userInfo exists, redirect user to homepage
    if (userInfo) {
      props.history.push("/");
    }
    return () => {};
  }, [userInfo]); // Changes in userInfo reruns above

  const submitHandler = (e) => {
    e.preventDefault(); // Don't refresh
    dispatch(signin(email, password)); // dispatch action
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h3>Sign-In</h3>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>
          <li>
            <button type="submit" className="button primary">
              Sign In
            </button>
          </li>
          <li>New to BuySellBooks?</li>
          <li>
            <Link to="/register" className="button secondary text-center">
              Create account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default SigninScreen;

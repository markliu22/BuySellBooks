import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userActions";

function SigninScreen(props) {
  // The useState React HOOK Returns a stateful value, and a function to update it
  // SYNTAX: const [state, setState] = useState(initialState);
  const [email, setEmail] = useState(""); //initial state is empty
  const [password, setPassword] = useState(""); //initial state is empty

  // Accessing the userSignin reducer from the initial state in the store
  const userSignin = useSelector((state) => state.userSignin);

  // Destrucutring loading, userInfo, and error from userSignin
  const { loading, userInfo, error } = userSignin;

  // To dispatch an action
  const dispatch = useDispatch();

  // useEffect is like componentDidMount. It tells React that your component needs to do something after render
  useEffect(() => {
    // If userInfo exists, just redirect user to the homepage
    if (userInfo) {
      props.history.push("/");
    }
    return () => {
      //
    };
  }, [userInfo]); // 'userInfo' means rerun the above lines of code if userInfo state changes

  // submitHandler function
  const submitHandler = (e) => {
    e.preventDefault(); // bc we not going to refresh screen
    // dispatch the signin action, pass email and password
    dispatch(signin(email, password));
  };

  // Return section has the sign in form
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
            {/* Before he just had this /register. If redirect is equal to the homepage, set link to register, else set to register redirect to redirect */}
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

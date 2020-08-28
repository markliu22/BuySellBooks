import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions";

function RegisterScreen(props) {
  // The useState React HOOK Returns a stateful value, and a function to update it
  // SYNTAX: const [state, setState] = useState(initialState);
  const [name, setName] = useState(""); //initial state is empty
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  // Accessing the userRegister reducer from the initial state in the store
  const userRegister = useSelector((state) => state.userRegister);

  // Destrucutring loading, userInfo, and error from userRegister
  const { loading, userInfo, error } = userRegister;

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
    // dispatch the register action, pass email and password
    console.log(phone);
    dispatch(register(name, email, phone, password));
  };

  // Return section has the sign in form
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create Account</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="phone"
              name="phone"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="rePassword">Re-Enter Password</label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
            ></input>
          </li>
          <li>
            <button type="submit" className="button primary">
              Register
            </button>
          </li>
          <li>
            Already have an account? <Link to="/signin">Sign-in</Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default RegisterScreen;

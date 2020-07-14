import jwt from "jsonwebtoken";
import config from "./config";

// Function to getToken, takes user as parameter
const getToken = (user) => {
  // JWTs can be signed using a secret. First parameter is payload, second is secret key. Also can add an expiresIn: key but I chose not to
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      idAdmin: user.isAdmin,
    },
    config.JWT_SECRET
  );
};

// isAuth and isAdmin functions will check the token
const isAuth = (req, res, next) => {
  // Get the token from req.headers.authorization
  const token = req.headers.authorization;
  // If the token exists
  if (token) {
    // get rid of the barier part, only the token part
    const onlyToken = token.slice(7, token.length);
    // jwt.verify(token, secretOrPublicKey, [options, callback])
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      // If error
      if (err) {
        return res.status(401).send({ msg: "Invalid Token" });
      }
      // At this point the token is correct, call next() for the next step
      // Set to decode bc we want to save the decoded data to the user
      req.user = decode;
      next();
      return;
    });
  }
  // If token does not exist
  else {
    return res.status(401).send({ msg: "Token is not supplied." });
  }
};

// isAuth and isAdmin funtions will check the token
const isAdmin = (req, res, next) => {
  // console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: "Admin Token is not valid." });
};

export { getToken, isAuth, isAdmin };

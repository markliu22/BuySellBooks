import jwt from "jsonwebtoken";
import config from "./config";

// Generates new token
const getToken = (user) => {
  // Send user as payload & secret
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

// Verify Token
const isAuth = (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization;
  // Token exists:
  if (token) {
    // Bearer Token: Bearer <access_token_here>
    // Get token (second part)
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: "Invalid Token" });
      }
      // decode going to be the user info: username, email, etc
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ msg: "Token not supplied." });
  }
};

// isAuth and isAdmin funtions will check the token
// const isAdmin = (req, res, next) => {
//   // console.log(req.user);
//   if (req.user && req.user.isAdmin) {
//     return next();
//   }
//   return res.status(401).send({ msg: "Admin Token not valid." });
// };

export { getToken, isAuth, isAdmin };

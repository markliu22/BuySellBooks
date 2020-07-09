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

export { getToken };

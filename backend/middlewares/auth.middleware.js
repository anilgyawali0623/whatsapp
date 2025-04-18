//  this middleware will check if the
// route is protected or not

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ message: "token is not provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    if (!decoded) {
      return res.status(401).json({ message: "unauthorized-invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    // its like sendning the user info for the next request so that user info can be used
    req.user = user;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ message: "error in the token and unprotected routing" });
  }
};

import jwt from 'jsonwebtoken'
import User from "../models/User.js";

export const authenticateUser = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    return res.status(401).json("Authentication Invalid");
  }
  try {
    const token = authHeaders.split(" ")[1];
    const isCustomeAuth = token.length < 500;
    if (token && isCustomeAuth) {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { userId: payload.userId };
    } else {
      const googleId = jwt.decode(token).toString();
      const user = await User.findOne({ googleId });
      req.user = { userId: user.userId };
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json("Authentication Invalid");
  }
};

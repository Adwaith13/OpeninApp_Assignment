const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateUser = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      status: "failed",
      message: "Token is required",
    });
  }
  try {
    const verifyToken = jwt.verify(token, process.env.JWT_KEY);
    const user_id = verifyToken.user_id;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }
    req.user_id = user_id;
    next();
  } catch (error) {
    console.error("Authentication failed", error);
    return res.status(401).json({
      status: "Failed",
      message: "Authentication failed",
    });
  }
};

module.exports = authenticateUser;

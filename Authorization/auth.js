const jwt = require("jsonwebtoken");
require('dotenv').config()

const protect = (req, res, next) => {
  console.log("Headers:", req.headers);
  
  const authHeader = req.header("Authorization");
  console.log("Auth Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No Authorization header provided." });
  }

  const token = authHeader.replace("Bearer ", "");
  console.log("Token:", token);
  
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(400).json({ message: "Invalid token.", error: err.message });
  }
};

module.exports = protect;
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization"); // "Bearer <token>"
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // { id: ... }
    req.token = token; // store token in request (useful for blacklisting later)
    next();
  } catch (e) {
    return res.status(401).json({ message: "Token invalid" });
  }
};

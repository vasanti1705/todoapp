const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader) {
      return res.status(401).json({ error: "Access denied: Token missing" });
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access denied: Token missing" });
    }

    const decoded = jwt.verify(token, "your_secret_key");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: "Access denied: Invalid token", token: null });
  }
}

module.exports = verifyToken;

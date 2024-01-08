const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authenticate");
// Protected route
router.get("/", verifyToken, (req, res) => {
  res
    .status(200)
    .json({ message: "Protected route accessed", userID: req.userID });
});

module.exports = router;

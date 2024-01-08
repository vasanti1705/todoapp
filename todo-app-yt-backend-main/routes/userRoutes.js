// const express = require("express");
// const router = express.Router();
// const User = require("../models/UserModel");
// const jwt = require("jsonwebtoken");

// // Register route
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if the email is already registered
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email already registered" });
//     }

//     // Create a new user
//     const user = new User({ name, email, password });
//     await user.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Login route
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: "User not found" });
//     }

//     // Check if the password is correct
//     const isPasswordValid = password === user.password;
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: "Incorrect password" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, "your_secret_key", {
//       expiresIn: "1h", // You can adjust the expiration time
//     });

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// // router.post("/login", loginUser);
// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Registration failed" });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed-email" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;

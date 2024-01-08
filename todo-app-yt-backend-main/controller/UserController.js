const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key";

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Issue a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create a new user
    const user = new User({ name, email, password });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    res.status(201).json({
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email, _id: { $ne: id } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Perform validation if needed

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

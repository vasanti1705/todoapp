const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const todoRoutes = require("./routes/ToDoRoutes");
const userRoutes = require("./routes/userRoutes");
const protectedRoute = require("./routes/protectedRoute");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

const corsOptions = {
  origin: "http://127.0.0.1:5173",
};

app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/todo", todoRoutes);
app.use("/user", userRoutes);
app.use("/protected", protectedRoute);
app.listen(PORT, () => console.log(`Listening at ${PORT}...`));

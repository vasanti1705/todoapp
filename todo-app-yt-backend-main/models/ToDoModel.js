const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  toDo: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming you have a User model
    required: true,
  },
});

const ToDo = mongoose.model("ToDo", toDoSchema);

module.exports = ToDo;

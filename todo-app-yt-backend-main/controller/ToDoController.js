const ToDoModel = require("../models/ToDoModel");

module.exports.getToDos = async (req, res) => {
  try {
    const toDos = await ToDoModel.find({ userId: req.userId });
    res.json(toDos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.saveToDo = (req, res) => {
  const { toDo } = req.body;
  const userId = req.userId;
  console.log(toDo, userId, "=====================================");
  ToDoModel.create({ toDo, userId })
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.updateToDo = (req, res) => {
  const { id } = req.params;
  const { toDo } = req.body;
  const userId = req.userId; // Assuming user ID is available in the request

  ToDoModel.findByIdAndUpdate(id, { toDo, userId })
    .then(() => {
      res.send("Updated Successfully....");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports.deleteToDo = (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  ToDoModel.findOneAndDelete({ userId: userId, _id: id })
    .then(() => {
      res.send("Deleted Successfully....");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

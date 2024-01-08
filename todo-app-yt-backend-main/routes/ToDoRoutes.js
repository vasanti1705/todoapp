const { Router } = require("express");
const {
  getToDos,
  saveToDo,
  updateToDo,
  deleteToDo,
} = require("../controller/ToDoController");
const verifyToken = require("../middleware/authenticate");

const router = Router();

// Apply authentication middleware to all ToDo routes

router.get("/get", verifyToken, getToDos);
router.post("/save", verifyToken, saveToDo);
router.put("/update/:id", verifyToken, updateToDo);
router.delete("/delete/:id", verifyToken, deleteToDo);

module.exports = router;

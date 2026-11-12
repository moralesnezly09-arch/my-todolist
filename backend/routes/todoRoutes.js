const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error getting todos" });
  }
});

router.post("/", async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
    });

    const savedTodo = await todo.save();

    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error adding todo" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        completed: req.body.completed,
      },
      {
        new: true,
      }
    );

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
});

module.exports = router;
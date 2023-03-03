const express = require("express");
const router = express.Router();
const {
  controllerGetTodo,
  controllerGetTodoById,
  controllerGetTodoByUser,
  controllerAddTodo,
  controllerUpdateTodo,
  controllerUpdateStatus,
  controllerDeleteTodo
} = require("./todo.controller");

router.get("/", controllerGetTodo);
router.get("/:id", controllerGetTodoById);
router.get("/user/:user", controllerGetTodoByUser);
router.post("/", controllerAddTodo);
router.put("/:id", controllerUpdateTodo);
router.patch("/:id", controllerUpdateStatus);
router.delete("/:id", controllerDeleteTodo);

module.exports = router;

import { Router } from "express";
import { Todo } from "../models/Todo";

const router = Router();

let todos: Array<Todo> = [];

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };
  todos.push(newTodo);
  res.status(201).json({ message: "created successfully", todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const tid = req.params.todoId;
  const todoIdx = todos.findIndex((item) => item.id === tid);
  if (todoIdx >= 0) {
    todos[todoIdx] = { id: todos[todoIdx].id, text: req.body.text };
    return res.status(200).json({ message: "updated", todos: todos });
  }
  res.status(404).json({ message: "Not Found" });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const tid = req.params.todoId;
  todos = todos.filter((it) => it.id !== tid);
  res.status(201).json({ message: `item ${tid} is deleted`, todos: todos });
});

export default router;

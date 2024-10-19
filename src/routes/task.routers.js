import express from "express";

import {
  createTask,
  getTasks,
  deleteTask,
} from "../controllers/task.controller.js";

import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

//routes
router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.delete("/:id", authMiddleware, deleteTask);

export default router;

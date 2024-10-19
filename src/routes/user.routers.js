import express from "express";

import { register, login } from "../controllers/user.controllers.js";

const router = express.Router();

//routes
router.post("/register", register);
router.post("/login", login);

export default router;

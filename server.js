import express from "express";
import dotenv from "dotenv";
import http from "http";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./src/config/db.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});

connectDB().then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// Routes
import userRoutes from "./src/routes/user.routers.js";
import taskRoutes from "./src/routes/task.routers.js";

app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);

// Socket.io setup for real-time updates
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
import { routes } from "./routes/index.js";
dotenv.config();

const PORT = process.env.PORT;

// DB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

// View engine setup
app.set("views", "./views");
app.set("view engine", "pug");

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files
app.use(express.static("./public"));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/api", routes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

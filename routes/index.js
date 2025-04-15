import { Router } from "express";
import { healthRouter } from "./health.js";
import chatRoutes from "./chat.routes.js";

export const routes = new Router();

routes.use("/health", healthRouter);
routes.use("/chats", chatRoutes);

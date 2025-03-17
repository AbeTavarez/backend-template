import { Router } from "express";
import { healthRouter } from "./health.js";

export const routes = new Router();

routes.use("/health", healthRouter);

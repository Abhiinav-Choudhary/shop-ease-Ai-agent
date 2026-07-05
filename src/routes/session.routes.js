import express from "express";

import {
  createSessionController,
  getHistoryController,
} from "../controllers/session.controller.js";

import { chatController } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", createSessionController);

router.get("/:id/history", getHistoryController);

router.post("/:id/chat", chatController);

export default router;
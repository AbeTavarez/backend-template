import express from "express";
import Chat from "../models/Chat.js";

const router = express.Router();

// Create a new chat
router.post("/", async (req, res, next) => {
  try {
    const { messages, title } = req.body;
    const chat = await Chat.create({
      messages,
      title,
    });
    res.status(201).json(chat);
  } catch (error) {
    next(error);
  }
});

// Get all chats
router.get("/", async (req, res, next) => {
  try {
    const chats = await Chat.find()
      .sort({ updatedAt: -1 })
      .select("-__v");
    res.json(chats);
  } catch (error) {
    next(error);
  }
});

// Get a specific chat
router.get("/:chatId", async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.chatId).select("-__v");
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.json(chat);
  } catch (error) {
    next(error);
  }
});

// Update a chat
router.patch("/:chatId", async (req, res, next) => {
  try {
    const { messages, title } = req.body;
    const chat = await Chat.findById(req.params.chatId);
    
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (messages) {
      chat.messages.push(...messages);
    }
    if (title) {
      chat.title = title;
    }

    await chat.save();
    res.json(chat);
  } catch (error) {
    next(error);
  }
});

// Delete a chat
router.delete("/:chatId", async (req, res, next) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;

import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    sendMessage,
    getMessages,
    deleteMessage,
    deleteConversation,
    getUsers
} from "../controllers/message.controller.js";

import upload from "../utils/multer.config.js";

const router = express.Router();

//routes
router.get("/allUsers", authMiddleware, getUsers);
router.post("/:receiverId", authMiddleware, sendMessage);
router.get("/:recieverId", authMiddleware, getMessages);
router.delete("/:messageId/:otherUserId", authMiddleware, deleteMessage);
router.delete("/conversation/:conversationId", authMiddleware, deleteConversation);

export { router as messageRouter };
import { Router } from "express";
import {
  getAllUserConversations,
  getUserById,
  getAllUsers,
  uploadAvatarImage,
} from "./user.controller";
import multer from "multer";
import { requireAuth } from "../../middleware";

const storage = multer.memoryStorage();
const uploads = multer({ storage });

export const user = Router();

user.get("/:id", requireAuth, getUserById);
user.get("/:id/conversations", requireAuth, getAllUserConversations);
user.get("/", requireAuth, getAllUsers);
user.post(
  "/:id/avatar",
  requireAuth,
  uploads.single("file"),
  uploadAvatarImage
);

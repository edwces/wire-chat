import { Router } from "express";
import {
  getAllUserConversations,
  getUserById,
  getAllUsers,
  uploadAvatarImage,
} from "./user.controller";
import multer from "multer";

const storage = multer.memoryStorage();
const uploads = multer({ storage });

export const user = Router();

user.get("/:id", getUserById);
user.get("/:id/conversations", getAllUserConversations);
user.get("/", getAllUsers);
user.post("/:id/avatar", uploads.single("file"), uploadAvatarImage);

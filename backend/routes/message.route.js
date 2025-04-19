import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getMessages,
  getUserFromSidebar,
  sendMessages,
} from "../controllers/message.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
getMessages;
const router = express.Router();
router.get("/users", protectRoute, getUserFromSidebar);
router.get("/:id", protectRoute, getMessages);
router.post(
  "/send/:id",
  protectRoute,
  upload.single("chatPicture"),
  sendMessages
);
export default router;

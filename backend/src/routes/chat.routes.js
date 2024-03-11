import express from "express";
import {
  accessChat,
  getChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} from "../controllers/chat.controllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = express.Router();

router.route("/").post(verifyJWT, accessChat).get(verifyJWT, getChats);
router.route("/group").post(verifyJWT, createGroupChat);
router.route("/rename").put(verifyJWT, renameGroup);
router.route("/groupremove").put(verifyJWT, removeFromGroup);
router.route("/groupadd").put(verifyJWT, addToGroup);

export default router;

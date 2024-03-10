import express from "express";
import { allUsers } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = express.Router();

router.route("/").get(verifyJWT, allUsers);

export default router;

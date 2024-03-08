import { Router } from "express";
import { uploadPicOnCloudinary, registerUser, loginUser, confirmEmail } from "../controllers/auth.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/confirmEmail/:id").get(confirmEmail);
router.route("/uploadPic").post(upload.fields([{ name: "pic", maxCount: 1 }]), uploadPicOnCloudinary);

export default router;

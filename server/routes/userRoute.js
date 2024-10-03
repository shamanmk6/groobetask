import express from "express";
const router = express.Router();
 import { login ,signup, logout} from "../controllers/userController.js";


router.route("/login").post(login);
router.route("/signup").post(signup)
router.route("/logout").post(logout)

export const UserRoute = router;

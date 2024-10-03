import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.get("/check", isAuthenticated, (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "Authenticated", user: req.user });
});

export const AuthenticationRoute = router;

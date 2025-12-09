import { Router } from "express";
import { login, logout, profile, register, verifyToken } from "../controller/authController.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", validateToken, profile);
router.get("/verify", verifyToken)

export default router;
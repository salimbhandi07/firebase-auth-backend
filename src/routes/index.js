import express from "express";
const router = express.Router();
import userRoutes from "./userRoutes/user.js";
import authRoutes from "./authRoutes/auth.js";

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;

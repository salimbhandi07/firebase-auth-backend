import express from "express";
const router = express.Router();
import userRoutes from "./userRoutes/user.js";
import authRoutes from "./authRoutes/auth.js";

router.use("/user", userRoutes);
router.use("/auth", authRoutes);

export default router;

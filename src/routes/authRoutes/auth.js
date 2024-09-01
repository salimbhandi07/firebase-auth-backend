import express from 'express';
import { getAllSignUpUsers, getSignUpUsers, signUpUser } from '../../controllers/authController.js';
const router = express.Router();

router.post("/signup", signUpUser);
router.get("/signup", getAllSignUpUsers);
router.get("/signup/:id", getSignUpUsers);

export default router;

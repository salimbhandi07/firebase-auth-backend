import express from "express";
import {
  generateUsersAndStore,
  getAllSignUpUsers,
  getSignUpUsers,
  getUsersAndCount,
  signUpUser,
  updateProfile,
} from "../../controllers/authController.js";
const router = express.Router();

router.post("/signup", signUpUser);
router.get("/signup", getAllSignUpUsers);
router.get("/signup/:id", getSignUpUsers);
router.put("/update/:firebaseId", updateProfile);
router.post("/generateUsersAndStore", generateUsersAndStore);
router.get("/getUsersAndCount", getUsersAndCount);

export default router;

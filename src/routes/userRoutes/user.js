import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/get-all-user', getAllUsers);
router.get('/get-user/:id', getUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;

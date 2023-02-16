import express from 'express';
const router = express.Router();

import { getAllUsers, getSingleUSer } from '../controllers/userController';
import { authenticateUser } from '../middleware/authentication';

router.get('/all', getAllUsers);
router.get('/', authenticateUser, getSingleUSer)

export default router;
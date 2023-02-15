import express from 'express';
const router = express.Router();

import { walletConnect, logout } from '../controllers/authController';
import { authenticateUser } from '../middleware/authentication';

router.post('/wallet-connect', walletConnect);
router.delete('/logout', authenticateUser, logout)

export default router;
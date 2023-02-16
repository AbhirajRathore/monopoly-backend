import express from 'express';
const router = express.Router();

import { getAllUsers, getSingleUSer, upload_avatar } from '../controllers/userController';
import { authenticateUser } from '../middleware/authentication';
import { imageUploadDisk } from '../middleware/image-upload';

router.get('/all', getAllUsers);
router.get('/', authenticateUser, getSingleUSer)
router.put('/',imageUploadDisk.fields([
    {
        name: "image",
        maxCount: 1,
    },
]),upload_avatar)

export default router;
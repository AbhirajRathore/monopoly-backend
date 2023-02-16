import express from 'express';
import { STATUS_CODES } from 'http';
import multer from 'multer';
import Users from '../models/Users';

const router = express.Router();
const upload = multer();

//all
export const getAllUsers = async (req:any, res:any) => {
  try {
    const users = await Users.find()
    if (users.length === 0) {
        throw new Error('No users entries found in the database');
    }
    res.status(STATUS_CODES.OK).json(users);
  } catch (error) {
    console.log(error)
  }
};

// '/'
export const getSingleUSer = async (req:any, res:any) => {
  try {
    const user = await Users.findOne({_id:req.user.userId})
    if (!user) {
        throw new Error('User not found in the database');
    }
    res.status(STATUS_CODES.OK).json(user);
  } catch (error) {
    res.status(STATUS_CODES.BadRequestError).json({})
  }
};

// router.put('/', upload.single('avatar'), async (req, res) => {
//   const user = await get_current_user(req);
//   const { username, score, balance } = req.body;
//   let avatarUrl;

//   const resolutions = ['image/png', 'image/jpg', 'image/jpeg'];

//   if (req.file) {
//     if (resolutions.includes(req.file.mimetype)) {
//       const fileType = req.file.originalname.split('.').pop().toLowerCase();
//       const fileName = `avatar/${user.id}-${generate_digits()}.${fileType}`;
//       upload_avatar(req.file.buffer, fileName);
//       avatarUrl = storage_base_url + fileName;
//     } else {
//       throw new Error('Available image extensions: .png, .jpg, .jpeg');
//     }
//   } else if (!user) {
//     throw new Error('User not found in the database');
//   }

//   const payload = new UpdateUser({
//     username,
//     score,
//     balance: balance && user.balance + balance,
//     avatar: avatarUrl,
//   }).toJSON();

//   if (Object.keys(payload).length > 0) {
//     await db.put(user, payload);
//   }

//   res.json({ ...user.toJSON(), ...payload });
// });


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

export const upload_avatar= async (req:any, res:any) => {
  try {
    const userId = req.user.userId;
    const baseUrl = process.env.SERVER_URL + '/images/'; 
    const { username, score, balance } = req.body;
    let avatarUrl = baseUrl + req.files?.image[0].filename;

    const payload = await Users.updateOne({_id:userId},{
      username,
      score,
      $inc: {balance: balance,},
      avatar: avatarUrl,
    })
    res.status(STATUS_CODES.OK).json({success:true, acknowledged: payload?.acknowledged,});
  } catch (error) {
    res.status(STATUS_CODES.BadRequestError).json({})
  }
}


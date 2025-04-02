
import express from 'express'
import { getAllUuser, getProfile, loginUser, registerUser, updateProfile } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';

const userRouter=express.Router()

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/get-profile',authUser,getProfile);
userRouter.post('/update-profile',authUser, upload.single('image') ,updateProfile)
userRouter.get('/get-all-user', authAdmin, getAllUuser)

export default userRouter
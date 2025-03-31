import express from 'express'
import { addBook, deleteBook, loginAdmin, updateBook } from '../controllers/adminController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';

const adminRouter=express.Router();

adminRouter.post('/login',loginAdmin)
adminRouter.post('/add-book',authAdmin,upload.single('image'), addBook)
adminRouter.put('/update-book/:id',authAdmin,upload.single('image'),updateBook)
adminRouter.delete('/delete-book/:id',authAdmin,deleteBook)


export default adminRouter
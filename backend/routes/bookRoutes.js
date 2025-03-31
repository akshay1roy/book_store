
import express from 'express'
import { getBookById, getBooks } from '../controllers/bookController.js';

const bookRouter=express.Router();


bookRouter.get('/get-all-books',getBooks)
bookRouter.get('/get-book/:id',getBookById)


export default bookRouter
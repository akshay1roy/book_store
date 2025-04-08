import express from 'express';
import { createOrder, verifyPayment,getOrdersByUser,adminGetALLorder } from '../controllers/orderController.js';
import authAdmin from '../middleware/authAdmin.js';

const orderRouter = express.Router();

// Route to create Razorpay order
orderRouter.post('/create', createOrder);

// Route to verify Razorpay payment
orderRouter.post('/verify', verifyPayment);  

orderRouter.get('/getallorders', authAdmin ,adminGetALLorder);


orderRouter.get('/user/:userId', getOrdersByUser);



export default orderRouter;

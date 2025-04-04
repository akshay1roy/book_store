import express from 'express';
import { createOrder, verifyPayment } from '../controllers/orderController.js';

const orderRouter = express.Router();

// Route to create Razorpay order
orderRouter.post('/create', createOrder);

// Route to verify Razorpay payment
orderRouter.post('/verify', verifyPayment);  // ✅ Add this

export default orderRouter;

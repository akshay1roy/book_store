import OrderModel from "../models/OrderModel.js";
import razorpay from '../config/razorpay.js'
import crypto from 'crypto';


export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      books,
      deliveryAddress,
      totalAmount,
    } = req.body;

    // 1. Create Razorpay order
    const options = {
      amount: totalAmount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // 2. Save order in DB with status pending
    const newOrder = new OrderModel({
      userId,
      books,
      deliveryAddress,
      totalAmount,
      paymentInfo: {
        razorpayOrderId: razorpayOrder.id,
        status: 'pending',
      },
    });

    await newOrder.save();

    res.json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });

  } catch (error) {
    console.error("Order creation failed", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




export const verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    // Generate expected signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpayOrderId + '|' + razorpayPaymentId)
      .digest('hex');

    // Compare signatures
    if (generatedSignature === razorpaySignature) {
      // Update order status to 'paid'
      const order = await OrderModel.findOneAndUpdate(
        { 'paymentInfo.razorpayOrderId': razorpayOrderId },
        {
          $set: {
            'paymentInfo.razorpayPaymentId': razorpayPaymentId,
            'paymentInfo.razorpaySignature': razorpaySignature,
            'paymentInfo.status': 'paid',
          },
        },
        { new: true }
      );

      res.json({ success: true, message: "Payment verified", order });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


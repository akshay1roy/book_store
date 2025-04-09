import OrderModel from "../models/OrderModel.js";
import razorpay from '../config/razorpay.js'
import crypto from 'crypto';
import UserModel from "../models/UserModel.js";
import sendEmail from "../utils/sendEmail.js";
// import sendEmail from '../utils/sendEmail.js';


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

      // fetch user info
      const user = await UserModel.findById(order.userId)

      // ✅ Send email
      const bookListHtml = order.books.map((b) => {
        const title = b.bookId?.title || "Unknown";
        const price = b.bookId?.price || 0;
        const qty = b.quantity || 1;
        return `<li>${title} - ₹${price} × ${qty} = ₹${price * qty}</li>`;
      }).join("");

      const html = `
        <h2>🧾 Payment Receipt</h2>
        <p>Hi ${user.name},</p>
        <p>Thank you for your purchase! Your payment was successful.</p>
        <hr />
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Payment ID:</strong> ${razorpayPaymentId}</p>
        <p><strong>Total:</strong> ₹${order.totalAmount}</p>
        <h3>📚 Books Purchased:</h3>
        <ul>${bookListHtml}</ul>
        <hr />
        <p>We'll deliver your books soon 📦</p>
        <p>Book Store Team</p>
      `;

      await sendEmail({
        to: user.email,
        subject: `🧾 Receipt for Order #${order._id}`,
        html,
      });



      res.json({ success: true, message: "Payment verified and receipt sent!", order });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getOrdersByUser = async (req, res) => {

  console.log("this is get user order backend")
  try {
    const { userId } = req.params;

    console.log(userId);
    const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const adminGetALLorder = async (req, res) => {
  try {
    const orders = await OrderModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
}

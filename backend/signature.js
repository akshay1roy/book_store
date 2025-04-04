import crypto from 'crypto';

const razorpayOrderId = "order_QF11QNblwnjd7D"; // Replace with your orderId
const razorpayPaymentId = "pay_QF12abcxyz1234"; // Simulate payment ID
const keySecret = "3ze5dSoCRtvvb6GJQRmQjgVF"; // Your actual Razorpay secret

const body = razorpayOrderId + "|" + razorpayPaymentId;

const expectedSignature = crypto
  .createHmac("sha256", keySecret)
  .update(body.toString())
  .digest("hex");

console.log("Signature:", expectedSignature);

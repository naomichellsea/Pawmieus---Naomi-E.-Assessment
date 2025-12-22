import Razorpay from "razorpay";

console.log("🔹 RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID || "Not Found");
console.log("🔹 RAZORPAY_SECRET_KEY:", process.env.RAZORPAY_SECRET_KEY ? "Loaded" : "Not Loaded");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export default razorpay;

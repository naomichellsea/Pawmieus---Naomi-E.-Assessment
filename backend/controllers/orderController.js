import Order from "../models/orderModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";


export const verifyPayment = async (req, res) => {
  try {
    console.log("🔹 Razorpay Response:", req.body);

    const { order_id, razorpay_payment_id, razorpay_signature, amount, items, address } = req.body;

    if (!order_id || !razorpay_payment_id || !razorpay_signature || !amount) {
      return res.status(400).json({ success: false, message: "Missing required payment details" });
    }

    const secret = process.env.RAZORPAY_SECRET_KEY;

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    console.log("✅ Payment Verified Successfully!");

    const newOrder = new Order({
      user: req.user._id,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      status: "Processing",
    });

    await newOrder.save();

    res.status(200).json({ success: true, message: "Payment verified & Order placed", order: newOrder });
  } catch (error) {
    console.error("🔴 Payment Verification Error:", error);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};


// ➡️ Place a New Order
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address, paymentMethod } = req.body;

    if (!items || !amount || !address || !paymentMethod) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newOrder = new Order({
      user: req.user._id,
      items,
      amount,
      address,
      paymentMethod,
      status: "Pending",
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
};

// ➡️ Fetch User Orders
export const getUserOrders = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
    }

    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// ➡️ Fetch All Orders (Admin Panel)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// ➡️ Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order status updated", data: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Failed to update order status" });
  }
};

// ➡️ Razorpay Order Creation (NEW)
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ success: false, message: "Amount and currency required" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const options = {
      amount: amount * 100, // Razorpay takes amount in paisa
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ success: false, message: "Payment initialization failed" });
  }
};

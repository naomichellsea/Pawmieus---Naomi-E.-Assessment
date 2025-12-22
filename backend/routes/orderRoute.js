import express from "express";
import { 
  placeOrder, 
  getUserOrders, 
  updateOrderStatus, 
  getAllOrders, 
  createRazorpayOrder 
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";
import { verifyPayment } from "../controllers/orderController.js";


const router = express.Router();

router.post("/place", authMiddleware, placeOrder); // ✅ Place Order
router.get("/userorders", authMiddleware, getUserOrders); // ✅ Fetch User Orders (Fixed)
router.get("/list", getAllOrders); // ✅ Fetch All Orders (Admin)
router.post("/status", authMiddleware, updateOrderStatus); // ✅ Update Order Status
router.post("/razorpay", authMiddleware, createRazorpayOrder); // ✅ Razorpay Order Creation (NEW)
router.post("/verify", authMiddleware, verifyPayment);  // ✅ Payment Verification API
export default router;

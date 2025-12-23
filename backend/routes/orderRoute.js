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

router.post("/place", authMiddleware, placeOrder); 
router.get("/userorders", authMiddleware, getUserOrders); 
router.get("/list", getAllOrders); 
router.post("/status", authMiddleware, updateOrderStatus); 
router.post("/razorpay", authMiddleware, createRazorpayOrder); 
router.post("/verify", authMiddleware, verifyPayment);  
export default router;

import express from "express";
import { 
  placeOrder, 
  getUserOrders, 
  updateOrderStatus, 
  getAllOrders
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.get("/userorders", authMiddleware, getUserOrders);
router.get("/list", authMiddleware, getAllOrders);
router.post("/status", authMiddleware, updateOrderStatus);

export default router;

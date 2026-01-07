import express from 'express';
import { loginUser,registerUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js'; 
import userModel from '../models/userModel.js';
const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/me", authMiddleware, async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id).select("-password");
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json({ success: true, user });
    } catch (err) {
      console.error("Error fetching current user:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

export default userRouter;
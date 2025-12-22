import userModel from "../models/userModel.js";

// Add to user cart  
const addToCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      if (!userData) {
         return res.status(404).json({ success: false, message: "User not found" });
      }

      let cartData = userData.cartData || {}; // Ensure cartData is initialized
      cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      res.json({ success: true, message: "Added To Cart" });
   } catch (error) {
      console.error("Error in addToCart:", error);
      res.status(500).json({ success: false, message: "Server error" });
   }
};

// Remove food from user cart
const removeFromCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      if (!userData) {
         return res.status(404).json({ success: false, message: "User not found" });
      }

      let cartData = userData.cartData || {}; // Ensure cartData is initialized
      if (cartData[req.body.itemId] > 0) {
         cartData[req.body.itemId] -= 1;
         if (cartData[req.body.itemId] === 0) {
            delete cartData[req.body.itemId]; // Remove item if quantity is 0
         }
      }

      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      res.json({ success: true, message: "Removed From Cart" });
   } catch (error) {
      console.error("Error in removeFromCart:", error);
      res.status(500).json({ success: false, message: "Server error" });
   }
};

// Get user cart
const getCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      if (!userData) {
         return res.status(404).json({ success: false, message: "User not found" });
      }

      let cartData = userData.cartData || {}; // Ensure cartData is initialized
      res.json({ success: true, cartData });
   } catch (error) {
      console.error("Error in getCart:", error);
      res.status(500).json({ success: false, message: "Server error" });
   }
};

export { addToCart, removeFromCart, getCart };

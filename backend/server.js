import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js"; // ✅ Order Routes
import appointmentRouter from "./routes/appointmentsRoute.js";
import detectBreedRouter from "./routes/detectBreedRouter.js";
import dotenv from "dotenv";
import session from "express-session";
import jwt from "jsonwebtoken";
import passport from "passport";
import "./passport-config.js";

dotenv.config();

// Debugging logs
console.log("🔹 RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("🔹 RAZORPAY_SECRET_KEY:", process.env.RAZORPAY_SECRET_KEY ? "Loaded" : "Not Loaded");
console.log("🔹 PORT:", process.env.PORT || 4000);

const app = express();
const port = process.env.PORT || 4000;
// Allow multiple localhost origins
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5180"];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow tools like Postman
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(express.json()); // parse JSON
// --- 2. ADD SESSION & PASSPORT MIDDLEWARE HERE ---
app.use(session({
  secret: process.env.SESSION_SECRET || "random_secret_string",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true only if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

connectDB();

// --- 3. GOOGLE AUTH ROUTES ---

// Trigger Login
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback (Where Google returns)
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173' }), 
  (req, res) => {
    // CRITICAL: The user is logged in via Passport, but your frontend uses JWT.
    // We must generate a JWT here and send it to the frontend.
    
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);

    // Redirect to frontend with the token as a URL parameter
    res.redirect(`http://localhost:5173/?token=${token}`);
  }
);

// API Routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/detect", detectBreedRouter);

// Test Route
app.get("/", (req, res) => {
  res.send("✅ API is working!");
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});



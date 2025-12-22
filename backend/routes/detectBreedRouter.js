import express from "express";
import multer from "multer";
import { detectBreed } from "../controllers/detectBreedController.js";

const router = express.Router();

// ✅ Multer setup for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");  // Image backend ke `uploads/` folder me save hogi
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// ✅ API to detect breed from image
router.post("/predict", upload.single("image"), detectBreed);

export default router;

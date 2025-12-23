import express from "express";
import multer from "multer";
import { detectBreed } from "../controllers/detectBreedController.js";

const router = express.Router();

//Multer setup for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");  
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post("/predict", upload.single("image"), detectBreed);

export default router;

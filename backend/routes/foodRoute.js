import express from 'express';
import { addFood, listFood, removeFood, getFoodByBreed } from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

// 📌 Image Storage Engine
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

foodRouter.get("/list", listFood);
foodRouter.post("/add", upload.single('image'), addFood);
foodRouter.post("/remove", removeFood);
foodRouter.get("/by-breed", getFoodByBreed);// ✅ New API to fetch products by breed

export default foodRouter;

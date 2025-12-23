import foodModel from "../models/foodModel.js";
import fs from "fs";

const listFood = async (req, res) => {
    try {
        const { category } = req.query; 
        const filter = category ? { category: { $in: ['Dogfood', 'Catfood'] } } : {};  
        const foods = await foodModel.find(filter);
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("Error fetching food items:", error);
        res.status(500).json({ success: false, message: "Error fetching food items." });
    }
};

const addFood = async (req, res) => {
    try {
        let image_filename = req.file.filename;

        const breeds = JSON.parse(req.body.breeds).map(breed => breed.toLowerCase()); 

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
            breeds: breeds  
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error("Error adding food item:", error);
        res.status(500).json({ success: false, message: "Error adding food item." });
    }
};

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found." });
        }

        fs.unlink(`uploads/${food.image}`, () => { });

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });

    } catch (error) {
        console.error("Error deleting food item:", error);
        res.status(500).json({ success: false, message: "Error deleting food item." });
    }
};

const getFoodByBreed = async (req, res) => {
  try {
      const { breeds } = req.query; 
      if (!breeds) {
          return res.status(400).json({ success: false, message: "No breeds provided" });
      }

      const breedArray = breeds.split(",").map(b => b.trim().toLowerCase());

      const foods = await foodModel.find({
          breeds: { $in: breedArray }
      });

      if (foods.length === 0) {
          return res.status(404).json({ success: false, message: "No products found for these breeds." });
      }

      res.json({ success: true, data: foods });
  } catch (error) {
      console.error("Error fetching food by breed:", error);
      res.status(500).json({ success: false, message: "Server error." });
  }
};

export { listFood, addFood, removeFood, getFoodByBreed };



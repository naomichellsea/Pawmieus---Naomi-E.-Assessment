import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    breeds: [{ type: String, required: true }]  
});

const foodModel = mongoose.models.Products || mongoose.model("Products", foodSchema);
export default foodModel;

// seedProducts.js
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import foodModel from "./models/foodModel.js"; // adjust path if needed

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");

    // ⚡ Clear existing products
    await foodModel.deleteMany({});
    console.log("Old products cleared");

    // ⚡ Seed products
    const products = [
      {
        name: "Royal Canin Puppy",
        description: "Good for small puppies",
        price: 1500,
        image: "royalcanin.jpg",
        category: "Dogfood",
        breeds: ["golden retriever", "bulldog"]
      },
      {
        name: "Hill's Puppy",
        description: "Nutritious",
        price: 1800,
        image: "hills.jpg",
        category: "Dogfood",
        breeds: ["labrador", "golden retriever"]
      },
      {
        name: "Pedigree Adult",
        description: "Daily adult dog food",
        price: 1200,
        image: "pedigree.jpg",
        category: "Dogfood",
        breeds: ["bulldog", "labrador"]
      },
      {
        name: "Whiskas Adult Cat",
        description: "Healthy food for adult cats",
        price: 800,
        image: "whiskas.jpg",
        category: "Catfood",
        breeds: ["persian", "siamese"]
      },
      {
        name: "Armitage GOOD BOY Deli Bites",
        description: "High-quality kibble for all dog breeds, rich in protein.",
        price: 120,
        image: "armitage_deli_bites.jpg",
        category: "Dogfood",
        breeds: ["beagle", "german shepherd", "poodle"]
      },
      {
        name: "Royal Canin CCN Digestive Care Wet Food",
        description: "Healthy, organic cat food for a shiny coat and strong muscles.",
        price: 140,
        image: "royalcanin_digestive_wet.jpg",
        category: "Catfood",
        breeds: ["persian", "siamese", "sphynx"]
      },
      {
        name: "Dog Fest Beef Meat Sticks for Adult Dogs",
        description: "Perfect mix for puppies, supports growth and digestion.",
        price: 160,
        image: "dogfest_beef_sticks.jpg",
        category: "DogTreats",
        breeds: ["labrador", "boxer", "bulldog"]
      },
      {
        name: "Tuna & Chicken with Scallop Recipe in Scallop Broth",
        description: "Tasty fish treats for cats, boosts energy and happiness.",
        price: 90,
        image: "tuna_chicken_scallop.jpg",
        category: "Catfood",
        breeds: ["maine coon", "ragdoll"]
      },
      {
        name: "Trixie Premio Mini Sticks Cat Treats",
        description: "Delicious jerky snacks, 100% natural chicken.",
        price: 110,
        image: "trixie_mini_sticks.jpg",
        category: "CatTreats",
        breeds: ["siamese", "bengal"]
      },
      {
        name: "Webbox Tasty Cat Sticks Chicken & Liver 30g",
        description: "Healthy, organic cat food for a shiny coat and strong muscles.",
        price: 140,
        image: "webbox_cat_sticks.jpg",
        category: "CatTreats",
        breeds: ["persian", "british shorthair"]
      },
      {
        name: "Dreamies Cat Treats with Delectable Duck, 60g Cat Treats",
        description: "Cat treats with delectable duck.",
        price: 160,
        image: "dreamies_duck.jpg",
        category: "CatTreats",
        breeds: ["ragdoll", "siamese"]
      },
      {
        name: "Whiskas Junior Tuna in Jelly, Wet Kitten Food Pack of 10+2 Freex80g Pouches",
        description: "Wet food for kittens, tuna in jelly.",
        price: 90,
        image: "whiskas_junior_tuna.jpg",
        category: "Catfood",
        breeds: ["maine coon", "persian"]
      }
    ];

    await foodModel.insertMany(products);
    console.log("Seed complete! Products added:", products.length);

    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seed();

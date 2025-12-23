import mongoose from "mongoose";

export const connectDB = async () => {
  //Check if the URL is loaded from .env
  if (!process.env.MONGO_URL) {
    console.error("MONGO_URL not found in .env. Cannot connect to database.");
    process.exit(1); 
  }
  
  try {
    await mongoose
      .connect(process.env.MONGO_URL) 
      .then(() => console.log("✅ DB Connected Successfully!"));
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    console.log("Please check your MONGO_URL, username, and password in the .env file.");
    process.exit(1); 
  }
};

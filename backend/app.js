import express from 'express';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import indexRouter from './routes/index.js'
import userRouter from './routes/users.js' 
import cors from 'cors';



dotenv.config();


const app = express();
const port = 3000;


export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/users');
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

connectDB();

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use ('/',userRouter)
app.use('/admin',indexRouter)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

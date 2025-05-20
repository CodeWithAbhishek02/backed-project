// import files 
import dotenv from "dotenv";
import connectDB from "./db/index.js";
 
// configration of .env
dotenv.config({
    path: './env'
})

// Datebase Connection
connectDB
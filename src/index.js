// import files 
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
 
// configration of .env
dotenv.config({
    path: './.env'
})

// Datebase Connection
connectDB()
.then(()=>{
  app.listen(process.env.PORT || 4000, ()=>{
    console.log(`server is running at port ${process.env.PORT}`);
  })
}).catch((error)=>{
    console.log("MongoDB connection failed ", error);
    process.exit(1)
})
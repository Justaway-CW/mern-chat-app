import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import {connectDB} from "./lib/db.js"
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
// import { app, server } from "./lib/socket.js";


dotenv.config()
const PORT = process.env.PORT;
const __dirname = path.resolve();
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// if(process.env.NODE_ENV==="production"){
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));
    
//     app.get("*", (req, res) =>{
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
//     })
// }

app.listen(PORT, () => {
    console.log('Server is running on Port : ' + PORT);
    
})
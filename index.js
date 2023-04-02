import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import cors from 'cors'
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const app = express();

app.listen(400, ()=>{
  console.log("connected");
})

app.use(cors());

app.get('/hi',(req,res)=>{
  res.json(process.env.MONGO);
})
dotenv.config();

// const connect = () => {
//   mongoose
//     .connect(process.env.MONGO)
//     .then(() => {
//       console.log("Connected to DB");
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

//middlewares
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,'./build')));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.get('*',(req,res)=>{
  res.sendFile(path.join(__filename,'./build/index.html'));
})

// //error handler

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to Server");
});



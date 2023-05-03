import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';

import userRoutes from './routes/users.js'
import videoRoutes from './routes/videos.js'
import commentRoutes from './routes/comments.js'
import authRoutes from './routes/auth.js'

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// routes
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/videos',videoRoutes);
app.use('/api/comments',commentRoutes);


app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went Wrong!";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.d8evjpw.mongodb.net/LummaoTube?retryWrites=true&w=majority`).then(()=>{
    app.listen(5500,()=>{
        console.log('connected to database and server running on port 5500');
    })
})
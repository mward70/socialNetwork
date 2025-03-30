import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db';

connectDB();
dotenv.config();

const app=express();
const PORT = process.env.PORT || 3001;

// express middleware lives between the incoming request and outgoing response.
// Middleware can be attached to the express application using the `app.use()` method.
// Several types of middleware are avaialble, and we can create out own custom versions as well.

//The `express.json()` middleware attaches incoming json data from requests to the `req.body` property.
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParsee: true,
    useUnifiedTopology: true
}). then (()=>{
    console.log('connected to mongoDB');
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
}). catch(err=>{
    console.error('MongoDB connection error:', err);
});
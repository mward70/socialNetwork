import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB');
        console.log('MongoDB connected');
        return mongoose.connection;
    } catch (err) {
        console.error(err.message);
        process.exit(1); //exit if failure
    }
};

export default connectDB;
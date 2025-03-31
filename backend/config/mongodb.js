
import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/BOOK`)
        console.log('Database connected');
    } catch (error) {
        console.log('Databae connection failed');
        process.exit(1);
    }
}

export default connectDB
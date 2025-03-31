import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
import bookRouter from './routes/bookRoutes.js';

dotenv.config();  // Load environment variables at the top

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (Ensure JSON parsing before URL-encoded parsing)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Database & Cloudinary
connectDB();
connectCloudinary();

// CORS Middleware
app.use(cors());

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/book',bookRouter)

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

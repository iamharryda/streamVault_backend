import express from 'express';
import connectDB from './config/db';

import dotenv from "dotenv";
import userRoutes from './routes/UserRoutes';

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json()); 

// Routes
app.use('/api', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
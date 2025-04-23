import express from 'express';
import db from './config/db';
import connectDB from './config/db';
import userRoutes from './routes/UserRoutes';

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
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager';

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('\n⚠️  MongoDB is not running!');
    console.log('📝 To fix this, you have two options:');
    console.log('   1. Install MongoDB locally: https://www.mongodb.com/try/download/community');
    console.log('   2. Use MongoDB Atlas (free cloud): https://www.mongodb.com/atlas/database');
    console.log('\n💡 The API server is running, but database operations will fail until MongoDB is connected.\n');
  });

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Task Manager API is running!' });
});

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;

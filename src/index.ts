import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import app from './app';

// Get data from .env file
dotenv.config();
const { DB_HOST, PORT = 8080 } = process.env;

// Create a server
const server = http.createServer(app);

// Connect to the database
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    server.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}/`);
    });
  })
  .catch((error: Error) => {
    console.log(error.message);
    process.exit(1);
  });

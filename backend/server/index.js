import express from 'express';
import path from 'path';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import message from '../routes/message.js';

dotenv.config();
const app = express();

// Env variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// DB setup
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

// App setup
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../build')));

// API endpoints
app.use('/api', message);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../build', 'index.html'));
});

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`***SERVER UP AT PORT: ${PORT}`);
});

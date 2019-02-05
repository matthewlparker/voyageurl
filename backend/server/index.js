import express from 'express';
import path from 'path';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import message from '../routes/message.js';
import URL from '../models/url';
import URLroute from '../routes/url';
import URLSroute from '../routes/urls';
import Counter from '../models/counter';
import metadataRoute from '../routes/metadata';
let promise;

dotenv.config();
const app = express();

// Env variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// DB setup
promise = mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

promise.then(db => {
  console.log('connected!');
  URL.deleteMany({}, () => {
    console.log('URL collection removed');
  });
  Counter.deleteOne({}, () => {
    console.log('Counter collection removed');
    let counter = new Counter({ _id: 'url_count', count: 0 });
    counter.save(err => {
      if (err) return console.error(err);
      console.log('counter inserted');
    });
  });
});

// App setup
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../build')));

// API endpoints
app.use('/api', message);
app.use('/urls', URLSroute);
app.use('/shorten', URLroute);
app.use('/metadata', metadataRoute);
app.get('/:hash', (req, res) => {
  let baseid = req.params.hash;
  let id = Buffer.from(baseid.toString(), 'base64').toString('binary');
  URL.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      res.redirect(doc.url);
    } else {
      res.redirect('/');
    }
  });
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../build', 'index.html'));
});

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`***SERVER UP AT PORT: ${PORT}`);
});

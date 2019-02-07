import express from 'express';
import path from 'path';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import URL from '../models/url';
import URLroute from '../routes/url';
import Counter from '../models/counter';
import metadataRoute from '../routes/metadata';
import base62 from 'base62/lib/ascii';
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

if (process.env.NODE_ENV === 'production') {
  promise.listCollections({ name: 'counters' }).next((err, collinfo) => {
    if (!collinfo) {
      let counter = new Counter({ _id: 'url_count' });
      counter.save(err => {
        if (err) return console.error(err);
      });
    }
  });
}

if (process.env.NODE_ENV !== 'production') {
  promise.then(db => {
    console.log('connected!');
    URL.deleteMany({}, () => {
      console.log('URL collection removed');
    });
    Counter.deleteOne({}, () => {
      console.log('Counter collection removed');
      let counter = new Counter({ _id: 'url_count' });
      counter.save(err => {
        if (err) return console.error(err);
        console.log('counter inserted');
      });
    });
  });
}

// App setup
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../build')));

// API endpoints
app.use('/shorten', URLroute);
app.use('/metadata', metadataRoute);
app.get('/:hash', (req, res) => {
  let baseid = req.params.hash;
  // let id = Buffer.from(baseid.toString(), 'base64').toString('binary');
  let id = base62.decode(baseid);
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

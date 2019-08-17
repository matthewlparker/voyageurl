import express from 'express';
import path from 'path';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import URL from '../models/url';
import bodyParser from 'body-parser';
import URLroute from '../routes/shorten';
import base62 from 'base62/lib/ascii';
import Counter from '../models/counter';
import authRoutes from '../routes/auth-routes';
import userRoutes from '../routes/user-routes';
import metadataRoute from '../routes/metadata';
import passportSetup from '../config/passport-setup';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';

dotenv.config();

const app = express();

// Env variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// DB setup
const db = mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

db.then(db => {
  db.connection.db.collection('counters', (err, collection) => {
    collection.find({}).toArray((err, data) => {
      if (data.length < 1) {
        let counter = new Counter({ _id: 'url_count' });
        counter.save(err => {
          if (err) return console.error(err);
          console.log('counter inserted');
        });
      }
    });
  });
});

// App setup
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}

// Cors options
const whitelist = [
  'http://localhost:3000',
  'http://localhost:5000',
  'https://lion.ly',
];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions = { credentials: true };
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions.origin = true;
  } else {
    corsOptions.origin = false;
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// set up express-session (required by passport-twitter)
const sess = {
  secret: process.env.REACT_APP_SECRET_KEY,
  cookie: {},
  resave: true,
  saveUninitialized: false,
};
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}
app.use(session(sess));

// initialize passport
app.use(passport.initialize());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../build')));

// API endpoints
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/shorten', URLroute);
app.use('/metadata', metadataRoute);
app.get('/:hash', (req, res) => {
  let baseid = req.params.hash;
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

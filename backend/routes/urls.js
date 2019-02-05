import express from 'express';
import URL from '../models/url';
const URLsroute = express.Router();

// Middleware
URLsroute.use('/', (req, res, next) => {
  URL.find({ title: 'Voyageurl MongoDB API' }, (err, URLroute) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.URLroute = URLroute;
    }
    next();
  });
});

URLsroute.route('/').post((req, res) => {
  const { urls } = req.body;
  const decodedURLs = urls.map(url =>
    Buffer.from(url.toString(), 'base64').toString('binary')
  );
  URL.find(
    {
      _id: {
        $in: decodedURLs,
      },
    },
    (err, doc) => {
      if (doc) {
        console.log('doc: ', doc);
        res.send({
          urls: doc,
          status: 200,
          statusTxt: 'OK',
        });
      } else {
        console.log('entries NOT found in db');
        res.status(404).send(err);
      }
    }
  );
});

module.exports = URLsroute;

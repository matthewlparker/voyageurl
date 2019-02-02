import express from 'express';
import URL from '../models/url';
const URLroute = express.Router();

// Middleware
URLroute.use('/', (req, res, next) => {
  URL.find({ title: 'Voyageurl MongoDB API' }, (err, URLroute) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.URLroute = URLroute;
    }
    next();
  });
});

URLroute.route('/').post((req, res) => {
  let urlData = req.body.url;
  URL.findOne({ url: urlData }, (err, doc) => {
    if (doc) {
      console.log('entry found in db');
      res.send({
        url: urlData,
        hash: Buffer.from(doc._id.toString(), 'binary').toString('base64'),
        status: 200,
        statusTxt: 'OK',
      });
    } else {
      console.log('entry NOT found in db, saving new');
      let url = new URL({
        url: urlData,
      });
      url.save(err => {
        if (err) return console.error(err);
        res.send({
          url: urlData,
          hash: Buffer.from(url._id.toString(), 'binary').toString('base64'),
          status: 200,
          statusTxt: 'OK',
        });
      });
    }
  });
});

module.exports = URLroute;

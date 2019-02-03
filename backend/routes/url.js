import express from 'express';
import URL from '../models/url';
const metascraper = require('metascraper')([
  require('metascraper-title')(),
  require('metascraper-description')(),
  require('metascraper-url')(),
  require('metascraper-image')(),
]);
const got = require('got');
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
  const { urlString } = req.body;

  //Fetch metadata of URL site
  (async () => {
    const { body: html, url } = await got(urlString);
    let metadata = await metascraper({ html, url });

    console.log('metadata: ', metadata);

    //URL shorten
    URL.findOne({ url: urlString }, (err, doc) => {
      if (doc) {
        console.log('entry found in db');
        res.send({
          url: urlString,
          hash: Buffer.from(doc._id.toString(), 'binary').toString('base64'),
          metadata,
          status: 200,
          statusTxt: 'OK',
        });
      } else {
        console.log('entry NOT found in db, saving new');
        let url = new URL({
          url: urlString,
        });
        url.save(err => {
          if (err) return console.error(err);
          res.send({
            url: urlString,
            hash: Buffer.from(url._id.toString(), 'binary').toString('base64'),
            metadata,
            status: 200,
            statusTxt: 'OK',
          });
        });
      }
    });
  })();
});

module.exports = URLroute;

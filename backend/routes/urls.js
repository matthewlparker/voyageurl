import express from 'express';
import URL from '../models/url';
import got from 'got';
const metascraper = require('metascraper')([
  require('metascraper-title')(),
  require('metascraper-description')(),
  require('metascraper-url')(),
  require('metascraper-image')(),
  require('metascraper-youtube')(),
]);
const URLsroute = express.Router();

// Middleware
URLsroute.use('/', (req, res, next) => {
  URL.find({ title: 'Lionly MongoDB API' }, (err, URLroute) => {
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

        const urlsMetadata = doc.map(async urlEntry => {
          const { body: html, url } = await got(urlEntry.url);
          let metadata = await metascraper({ html, url });
          metadata._id = urlEntry._id;
          metadata.url = urlEntry.url;
          return metadata;
        });
        (async () => {
          const urlsMetadataResolved = await Promise.all(urlsMetadata);
          console.log('urlsMetadataResolved: ', urlsMetadataResolved);
          res.send({
            urls: urlsMetadataResolved,
            status: 200,
            statusTxt: 'OK',
          });
        })();
      } else {
        console.log('entries NOT found in db');
        res.status(404).send(err);
      }
    }
  );
});

module.exports = URLsroute;

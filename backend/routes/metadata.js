import express from 'express';
const metadataRoute = express.Router();
const metascraper = require('metascraper')([
  require('metascraper-title')(),
  require('metascraper-description')(),
  require('metascraper-url')(),
  require('metascraper-image')(),
  require('metascraper-youtube')(),
]);
const got = require('got');

metadataRoute.route('/').post((req, res) => {
  const { urlString } = req.body;
  (async () => {
    const { body: html, url } = await got(urlString);
    let metadata = await metascraper({ html, url });
    res.send({
      metadata,
    });
  })().catch(error => {
    // construct metadata manually
    console.error('error: ', error);
    console.error('Sending custom url data object');
    res.send({
      metadata: {
        title: urlString,
        url: urlString,
      },
    });
  });
});

module.exports = metadataRoute;

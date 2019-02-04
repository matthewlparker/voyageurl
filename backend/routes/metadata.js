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

  //Fetch metadata of URL site
  (async () => {
    const { body: html, url } = await got(urlString);
    let metadata = await metascraper({ html, url });
    if (metadata) {
      console.log('metadata: ', metadata);
      res.send({
        metadata,
      });
    }
  })();
});

module.exports = metadataRoute;

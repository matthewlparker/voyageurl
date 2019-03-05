// import User from '../models/user-model';
import base62 from 'base62/lib/ascii';
import URL from '../models/url';
const router = require('express').Router();

router.post('/', (req, res) => {
  console.log('user-urls route');
  URL.find({ _id: { $in: req.body.urls } }, (err, urls) => {
    if (err) {
      console.log('No URLs found');
      res.send([]);
    }
    if (urls) {
      console.log('URLs found: ', urls);
      const urlsWithHash = urls.map(url => ({
        url: url.url,
        _id: url._id,
        hash: base62.encode(url._id),
      }));
      console.log('urlsWithHash: ', urlsWithHash);
      res.send(urlsWithHash);
    }
  });
});

module.exports = router;

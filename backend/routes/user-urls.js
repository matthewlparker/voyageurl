import base62 from 'base62/lib/ascii';
import URL from '../models/url';
import { verifyToken } from '../util';
const router = require('express').Router();

router.post('/', verifyToken, (req, res) => {
  URL.find({ _id: { $in: req.body.urls } }, (err, urls) => {
    if (err) {
      console.log('No URLs found');
      res.send([]);
    }
    if (urls) {
      const orderedURLs = urls.sort(
        (a, b) => req.body.urls.indexOf(a._id) - req.body.urls.indexOf(b._id)
      );
      const urlsWithHash = orderedURLs.map(url => ({
        url: url.url,
        _id: url._id,
        hash: base62.encode(url._id),
      }));
      res.send(urlsWithHash);
    }
  });
});

module.exports = router;

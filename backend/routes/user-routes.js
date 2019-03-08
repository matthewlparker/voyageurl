import User from '../models/user-model';
import URL from '../models/url';
import base62 from 'base62/lib/ascii';
import { verifyToken } from '../util';
const router = require('express').Router();

router.post('/', verifyToken, (req, res) => {
  User.findById(req.body.id, (err, doc) => {
    if (err) {
      console.log('findById err: ', err);
      res.send({ noUser: true });
    }
    if (doc) {
      console.log('user found: ', doc);
      res.send(doc);
    }
  });
});

router.post('/urls', verifyToken, (req, res) => {
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

router.post('/reorder-urls', verifyToken, (req, res) => {
  const { id, urls } = req.body;
  User.findOneAndUpdate(
    { _id: id },
    { $set: { urls } },
    {
      new: true,
      runValidators: true,
    }
  ).then(updatedUser => {
    console.log('updatedUser: ', updatedUser);
    res.send(updatedUser);
  });
});

router.post('/remove-url', verifyToken, (req, res) => {
  const { urlId, userId } = req.body;
  User.findOneAndUpdate(
    { _id: userId },
    { $pull: { urls: urlId } },
    { new: true, runValidators: true }
  ).then(updatedUser => {
    console.log('updatedUser: ', updatedUser);
    res.send(updatedUser);
  });
});

module.exports = router;

import User from '../models/user-model';
import URL from '../models/url';
import base62 from 'base62/lib/ascii';
import { verifyToken } from '../util';
const router = require('express').Router();

router.post('/', verifyToken, (req, res) => {
  User.findById(req.decodedToken.sub, (err, doc) => {
    if (err) {
      console.log('findById err: ', err);
      res.send({ noUser: true });
    }
    if (doc) {
      console.log('user found: ', doc);
      doc.password = undefined;
      res.send(doc);
    }
  });
});

router.post('/urls', verifyToken, async (req, res) => {
  const user = await User.findById(req.decodedToken.sub);
  if (user) {
    URL.find({ _id: { $in: user.urls } }, (err, urls) => {
      if (err) {
        console.log('No URLs found');
        res.send([]);
      }
      if (urls) {
        const orderedURLs = urls.sort(
          (a, b) => user.urls.indexOf(a._id) - user.urls.indexOf(b._id)
        );
        const urlsWithHash = orderedURLs.map(url => ({
          url: url.url,
          _id: url._id,
          hash: base62.encode(url._id),
        }));
        res.send(urlsWithHash);
      }
    });
  } else {
    res.send([]);
  }
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

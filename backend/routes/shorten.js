import express from 'express';
import URL from '../models/url';
import base62 from 'base62/lib/ascii';
import User from '../models/user-model';
const URLroute = express.Router();

// Middleware
URLroute.use('/', (req, res, next) => {
  URL.find({ title: 'Lionly MongoDB API' }, (err, URLroute) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.URLroute = URLroute;
    }
    next();
  });
});

URLroute.route('/').post((req, res) => {
  const { urlString, user } = req.body;

  URL.findOne({ url: urlString }, (err, doc) => {
    if (doc) {
      if (user) {
        addUrlIdToUser(user, doc._id);
      }
      console.log('entry found in db');
      res.send({
        url: doc.url,
        hash: base62.encode(doc._id),
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
        if (user) {
          addUrlIdToUser(user, url._id);
        }
        res.send({
          url: urlString,
          hash: base62.encode(url._id),
          status: 200,
          statusTxt: 'OK',
        });
      });
    }
  });
});

const addUrlIdToUser = (user, urlId) => {
  let userURLs = user.urls;
  userURLs.unshift(urlId);
  User.findOneAndUpdate(
    { _id: user._id },
    { $set: { urls: userURLs } },
    {
      new: true,
      runValidators: true,
    }
  ).then(updatedUser => {
    console.log('url added to user');
  });
  // User.findOneAndUpdate(
  //   { _id: user._id },
  //   { $addToSet: { urls: urlId } },
  //   {
  //     new: true,
  //     runValidators: true,
  //   }
  // ).then(updatedUser => console.log('updatedUser: ', updatedUser));
};

module.exports = URLroute;

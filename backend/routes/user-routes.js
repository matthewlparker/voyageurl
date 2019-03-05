import User from '../models/user-model';
const router = require('express').Router();

// Middleware
// router.use('/', (req, res, next) => {
//   URL.find({ title: 'Lionly MongoDB API' }, (err, URLroute) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       req.URLroute = URLroute;
//     }
//     next();
//   });
// });

// router.post('/', (req, res) => {
//   console.log('user post');
//   User.findOne({ _id: req.body.id }, (err, doc) => {
//     if (err) {
//       console.log('fetch user doc error: ', err);
//       res.send({ noUser: true, error: err });
//     }
//     if (doc) {
//       console.log('user doc found: ', doc);
//       res.send(doc);
//     } else {
//       console.log('user doc not found: ', doc);
//       res.send({ noUser: true });
//     }
//   }).catch(err => console.log('be findOne user error: ', err));
// });

router.post('/', (req, res) => {
  console.log('fetchUser v.2 test');
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

module.exports = router;

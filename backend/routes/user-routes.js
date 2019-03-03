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

router.post('/', (req, res) => {
  console.log('user post');
  User.findOne({ _id: req.body.id }, (err, doc) => {
    console.log('user route doc: ', doc);
    res.send(doc);
  });
});

module.exports = router;

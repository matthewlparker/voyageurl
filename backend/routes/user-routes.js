import User from '../models/user-model';
const router = require('express').Router();

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

router.post('/reorder-urls', (req, res) => {
  console.log('reorder-urls route');
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

module.exports = router;

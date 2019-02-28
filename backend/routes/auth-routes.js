import passport from 'passport';
const router = require('express').Router();

// auth login
router.get('/login', (req, res) => {
  // handle login route
});

// auth logout
router.get('/logout', (req, res) => {
  //handle with passport
  res.send('logging out');
});

// auth with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  console.log('req.user: ', req.user);
  res.redirect('/');
  // const { code } = req.user;
  // res.redirect('http://localhost:5000?token=' + code);
});

module.exports = router;

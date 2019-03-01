import passport from 'passport';
import jwt from 'jsonwebtoken';
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
router.get(
  '/google/redirect',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    const token = createJWTFromUserData(req.user);
    const htmlWithEmbeddedJWT = `
      <html>
        <script>
          window.localStorage.setItem('userToken', '${token}');
          window.location.href = '/';
        </script>
      </html>
    `;
    res.send(htmlWithEmbeddedJWT);
  }
);

const createJWTFromUserData = user => {
  return jwt.sign(user.toJSON(), process.env.REACT_APP_SECRET_KEY);
};

module.exports = router;

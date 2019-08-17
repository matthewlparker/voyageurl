import passport from 'passport';
import { signToken, secureCookieSettings } from '../util';
import UsersController from '../controllers/users.js';
import { schemas, validateBody } from '../helpers/routeHelpers';
const router = require('express').Router();
const passportSignIn = passport.authenticate('local', { session: false });

// auth with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

// callback route for google to redirect to
router.get(
  '/google/redirect',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const token = signToken(req.user);
    res.cookie('userToken', token, secureCookieSettings);
    res.redirect('/');
  }
);

// auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const token = signToken(req.user);
    res.cookie('userToken', token, secureCookieSettings);
    res.redirect('/');
  }
);

// auth with github
router.get('/github', passport.authenticate('github'));

router.get(
  '/github/redirect',
  passport.authenticate('github', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const token = signToken(req.user);
    res.cookie('userToken', token, secureCookieSettings);
    res.redirect('/');
  }
);

// auth with twitter
router.get('/twitter', passport.authenticate('twitter'));

router.get(
  '/twitter/redirect',
  passport.authenticate('twitter', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const token = signToken(req.user);
    res.cookie('userToken', token, secureCookieSettings);
    res.redirect('/');
  }
);

router
  .route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router
  .route('/signin')
  .post(
    validateBody(schemas.authSchema),
    passportSignIn,
    UsersController.signIn
  );

router.route('/signout').post(UsersController.signOut);
module.exports = router;

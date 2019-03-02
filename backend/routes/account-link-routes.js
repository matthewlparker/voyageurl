import passport from 'passport';
import { embeddHtmlWithJWT } from '../util';
const router = require('express').Router();

// link with google
router.get(
  '/google',
  passport.authenticate('google-link', {
    scope: ['profile'],
  })
);

// callback route for google to redirect to
router.get(
  '/google/redirect',
  passport.authenticate('google-link', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const htmlWithEmbeddedJWT = embeddHtmlWithJWT(req);
    res.send(htmlWithEmbeddedJWT);
  }
);

// link with facebook
router.get('/facebook', passport.authenticate('facebook-link'));

// callback route for facebook to redirect to
router.get(
  '/facebook/redirect',
  passport.authenticate('facebook-link', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const htmlWithEmbeddedJWT = embeddHtmlWithJWT(req);
    res.send(htmlWithEmbeddedJWT);
  }
);

// link with github
router.get('/github', passport.authenticate('github-link'));

// callback route for github to redirect to
router.get(
  '/github/redirect',
  passport.authenticate('github-link', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const htmlWithEmbeddedJWT = embeddHtmlWithJWT(req);
    res.send(htmlWithEmbeddedJWT);
  }
);

// link with twitter
router.get('/twitter', passport.authenticate('twitter-link'));

// callback route for twitter to redirect to
router.get(
  '/twitter/redirect',
  passport.authenticate('twitter-link', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const htmlWithEmbeddedJWT = embeddHtmlWithJWT(req);
    res.send(htmlWithEmbeddedJWT);
  }
);

import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/user-model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      callbackURL: '/auth/google/redirect',
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      const userCookie = req.cookies.userCookie;
      const user = jwt.verify(userCookie, process.env.REACT_APP_SECRET_KEY);
      // check if user already exists in our database
      User.findOne({ 'providers.googleId': profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          // if the user exists but does not have the google provider, add the google provider
          User.findOne({ _id: user._id }).then(currentUser => {
            if (currentUser) {
              User.findOneAndUpdate(
                { _id: currentUser._id },
                { $set: { 'providers.googleId': profile.id } },
                {
                  new: true,
                  runValidators: true,
                }
              ).then(updatedUser => {
                console.log('updatedUser: ', updatedUser);
                done(null, updatedUser);
              });
            } else {
              new User({
                username: profile.displayName,
                providers: { googleId: profile.id },
              })
                .save()
                .then(newUser => {
                  done(null, newUser);
                });
            }
          });
          // create user in our database
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/redirect',
      profileFields: ['id', 'displayName', 'email'],
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      const userCookie = req.cookies.userCookie;
      const user = jwt.verify(userCookie, process.env.REACT_APP_SECRET_KEY);

      User.findOne({ 'providers.facebookId': profile.id }).then(
        existingUser => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            // if the user exists but does not have the facebook provider, add the facebook provider
            User.findOne({ _id: user._id }).then(currentUser => {
              if (currentUser) {
                User.findOneAndUpdate(
                  { _id: currentUser._id },
                  { $set: { 'providers.facebookId': profile.id } },
                  {
                    new: true,
                    runValidators: true,
                  }
                ).then(updatedUser => {
                  console.log('updatedUser: ', updatedUser);
                  done(null, updatedUser);
                });
              } else {
                new User({
                  username: profile.displayName,
                  providers: { facebookId: profile.id },
                })
                  .save()
                  .then(newUser => {
                    done(null, newUser);
                  });
              }
            });
          }
        }
      );
    }
  )
);

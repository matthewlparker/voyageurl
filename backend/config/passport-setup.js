import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/user-model';
import GithubStrategy from 'passport-github';
import TwitterStrategy from 'passport-twitter';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';

dotenv.config();

passport.use(
  'google',
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
      if (!userCookie) {
        logInUser('googleId', profile, done);
      } else {
        linkAccounts('googleId', profile, userCookie, done);
      }
    }
  )
);

passport.use(
  'facebook',
  new FacebookStrategy(
    {
      // options for facebook strategy
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/redirect',
      profileFields: ['id', 'displayName', 'email'],
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      const userCookie = req.cookies.userCookie;
      if (!userCookie) {
        logInUser('facebookId', profile, done);
      } else {
        linkAccounts('facebookId', profile, userCookie, done);
      }
    }
  )
);

passport.use(
  'github',
  new GithubStrategy(
    {
      // options for github strategy
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/redirect',
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      const userCookie = req.cookies.userCookie;
      if (!userCookie) {
        logInUser('githubId', profile, done);
      } else {
        linkAccounts('githubId', profile, userCookie, done);
      }
    }
  )
);

passport.use(
  'twitter',
  new TwitterStrategy(
    {
      // options for twitter strategy
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: '/auth/twitter/redirect',
      passReqToCallback: true,
    },
    (req, token, tokenSecret, profile, done) => {
      const userCookie = req.cookies.userCookie;
      if (!userCookie) {
        logInUser('twitterId', profile, done);
      } else {
        linkAccounts('twitterId', profile, userCookie, done);
      }
    }
  )
);

const logInUser = (providerIdType, profile, done) => {
  const providerType = `providers.${providerIdType}`;
  User.findOne({ [providerType]: profile.id }).then(existingUser => {
    if (existingUser) {
      done(null, existingUser);
    } else {
      // if no account exists with the authorized providerId, create one
      new User({
        username: profile.displayName,
        providers: { [providerIdType]: profile.id },
      })
        .save()
        .then(newUser => {
          done(null, newUser);
        });
    }
  });
};

const linkAccounts = (providerIdType, profile, userCookie, done) => {
  // decode the logged in user from its cookie
  const user = jwt.verify(userCookie, process.env.REACT_APP_SECRET_KEY);
  const providerType = `providers.${providerIdType}`;
  // find all accounts that have the authorized provider's id; these accounts will later be deleted
  User.find({ [providerType]: profile.id }).then(existingAccounts => {
    if (existingAccounts && existingAccounts.length > 0) {
      // collect the ids of these accounts to be used as a condition of the deleteMany search query
      const accountsToDeleteIds = existingAccounts.map(
        existingAccount => existingAccount._id
      );
      // merge existing accounts' providers into a new provider object for the new User account we will create
      const mergedProviders = existingAccounts.reduce((acc, curr) => {
        for (let key in curr) {
          if (key === 'providers') {
            acc = curr[key];
          }
        }
        // add the currently logged in user's providers to this new provider object
        return Object.assign({}, acc, user.providers);
      }, {});
      // collect the urls arrays of these accounts to be merged into a single array
      const urlsToMerge = existingAccounts
        .map(existingAccount => existingAccount.urls)
        .concat(user.urls);
      // flatten array of url arrays
      const flattenedURLsToMerge = [].concat.apply([], urlsToMerge);
      // merge existing accounts' urls into a new urls array, removing duplicates, for the new User account we will create
      const mergedURLs = [...new Set(flattenedURLsToMerge)];
      // create and save the new User
      new User({
        username: user.username,
        providers: mergedProviders,
        urls: mergedURLs,
      })
        .save()
        .then(newUser => {
          // delete all accounts with ids stored in accountsToDeleteIds
          User.deleteMany({ _id: { $in: accountsToDeleteIds } }, err => {
            console.log('delete accounts error: ', err);
          });
          // delete the logged in user's old account
          User.deleteOne({ _id: user._id }, err => {
            console.log('delete account error: ', err);
          });
          // return the newly crated user with providers merged from every deleted account
          done(null, newUser);
        });
    } else {
      // if no accounts are found with the authorized provider id, add it to the current user's providers
      User.findOneAndUpdate(
        { _id: user._id },
        { $set: { [providerType]: profile.id } },
        {
          new: true,
          runValidators: true,
        }
      ).then(updatedUser => {
        done(null, updatedUser);
      });
    }
  });
};

import JWT from 'jsonwebtoken';

const signToken = user => {
  return JWT.sign(
    {
      iss: 'Lionly',
      // sub connects token with user using immutable data from user
      sub: user._id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 3650), // current time + days
    },
    process.env.REACT_APP_SECRET_KEY
  );
};

const verifyToken = (req, res, next) => {
  let token;
  try {
    token = req.cookies.userToken;
  } catch (error) {
    console.log('Verify token error: ', error);
  }
  if (token) {
    JWT.verify(token, process.env.REACT_APP_SECRET_KEY, (err, authorized) => {
      if (authorized) {
        req.decodedToken = authorized;
        next();
      } else {
        res.sendStatus(403);
      }
    });
  } else {
    res.sendStatus(403);
  }
};

const secureCookieSettings = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 31536000000,
};

module.exports = {
  signToken,
  verifyToken,
  secureCookieSettings,
};

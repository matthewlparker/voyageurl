import JWT from 'jsonwebtoken';
import User from '../models/user-model';

const signToken = user => {
  return JWT.sign(
    {
      iss: 'Lionly',
      // sub connects token with user using immutable data from user
      sub: user._id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day
    },
    process.env.REACT_APP_SECRET_KEY
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(422).send({
        name: 'ValidationError',
        details: [{ message: 'You must provide a username and a password' }],
      });
    }

    // Check if there is a user with the same username
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      return res.status(403).json({
        name: 'ValidationError',
        details: [{ message: `Username already exists` }],
      });
    }

    // Create a new user;
    const newUser = new User({ username, password });
    await newUser.save();
    delete newUser.password;

    // Generate the token
    const token = signToken(newUser);

    // Respond with token
    res.status(200).json({ token });
  },

  // TODO: clean up commented code
  signIn: async (req, res, next) => {
    // Generate token
    if (req.user.name !== 'ValidationError') {
      const token = signToken(req.user);
      // res.cookie('userToken', token, {
      //   httpOnly: true,
      // });
      // res.status(200).json({ success: true });
      res.status(200).json({ token });
    } else {
      req.error = req.user;
      res.status(400).json(req.error);
    }
  },
};

import User from '../models/user-model';
import { signToken } from '../util';

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

    // Generate the token
    // const token = signToken(newUser);
    const token = signToken(req.user);
    res.cookie('userToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV,
    });

    // Respond with token
    res.status(200).json({ success: true });
  },

  // TODO: clean up commented code
  signIn: async (req, res, next) => {
    if (req.user.name !== 'ValidationError') {
      // Generate token
      const token = signToken(req.user);
      res.cookie('userToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV,
      });
      res.status(200).json({ success: true });
    } else {
      req.error = req.user;
      res.status(400).json(req.error);
    }
  },

  signOut: async (req, res, next) => {
    console.log('made it to signout!');
    res.cookie('userToken', { expires: Date.now() });
    res.status(200).json({ success: true });
  },
};

import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  googleId: { type: String },
  providers: {},
  urls: [],
});

const User = mongoose.model('user', userSchema);

module.exports = User;

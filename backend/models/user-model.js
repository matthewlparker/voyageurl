import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: { type: String },
  googleId: { type: String },
  providers: {},
});

const User = mongoose.model('user', userSchema);

module.exports = User;

import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: { type: String },
  googleId: { type: String },
});

const User = mongoose.model('user', userSchema);

module.exports = User;

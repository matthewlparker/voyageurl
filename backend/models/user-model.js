import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  providers: { type: Object },
  urls: [],
});

userSchema.pre('save', async function(next) {
  if (this.password) {
    try {
      // salting and hashing
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      // Generate password hash (salt + hash)
      const passwordHash = await bcrypt.hash(this.password, salt);
      // Reassign hashed pasword over plain text password
      this.password = passwordHash;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

userSchema.methods.isValidPassword = async function(candiatePassword) {
  try {
    return await bcrypt.compare(candiatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('user', userSchema);

module.exports = User;

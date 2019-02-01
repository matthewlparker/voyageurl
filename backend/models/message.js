import mongoose from 'mongoose';

// Define your model
const messageSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  message: { type: String, required: true },
});

// Create the model class
const Message = mongoose.model('message', messageSchema);

module.exports = Message;

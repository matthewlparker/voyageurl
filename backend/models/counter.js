import mongoose from 'mongoose';

// Define your model
const counterSchema = mongoose.Schema({
  _id: { type: String, required: true },
  count: { type: Number, default: 10000 },
});

// Create the model class
const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;

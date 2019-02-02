import mongoose from 'mongoose';
import Counter from './counter';

// Define your model
const urlSchema = mongoose.Schema({
  _id: { type: Number },
  url: '',
  created_at: '',
});

// Add pre-save hook
urlSchema.pre('save', function(next) {
  console.log('running pre-save');
  let doc = this;
  Counter.findByIdAndUpdate(
    { _id: 'url_count' },
    { $inc: { count: 1 } },
    (err, counter) => {
      if (err) return next(err);
      doc._id = counter.count;
      doc.created_at = new Date();
      next();
    }
  );
});

// Create the model class
const URL = mongoose.model('URL', urlSchema);

module.exports = URL;

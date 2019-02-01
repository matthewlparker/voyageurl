import express from 'express';
import Message from '../models/message';
const message = express.Router();

// Middleware
message.use('/', (req, res, next) => {
  Message.find({ title: 'Voyageurl MongoDB API' }, (err, message) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.message = message;
    }
    next();
  });
});

message
  .route('/')
  .get((req, res) => {
    res.json(req.message);
  })
  .post((req, res) => {
    if (req.message.length > 0) {
      res.status(409).send(req.message[0]);
    } else {
      let newMessage = new Message(req.body);
      newMessage.save();
      res.status(201).send(newMessage);
    }
  });

module.exports = message;

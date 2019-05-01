const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  fullName: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  userCreated: {
    type: Date,
    format: 'MMMM Do YYYY',
  },
  updated: {
    type: Date,
    default: Date.now,
    format: 'MMM Do YYYY',
  }
});

mongoose.model('users', UserSchema);

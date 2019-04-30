const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  birthday: {
    type: Date,
    format: 'MMMM Do YYYY',
  },
  gender: {
    type: String,
    default: 'undisclosed',
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  phoneType: {
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

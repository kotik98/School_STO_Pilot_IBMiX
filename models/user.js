const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = Schema({
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String},
  phone: {type: String},
  photo: {type: String},
  username: {type: String},
  password: {type: String},

});

module.exports = mongoose.model('user', user);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comander = Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  role: { type: String },
  password: { type: String },
  keyForNewPassword: { type: String },
});

module.exports = mongoose.model("comander", comander);

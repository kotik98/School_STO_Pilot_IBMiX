const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const airport = Schema({
  airportId: { type: String },
  airportName: { type: String },
  airportNameEng: { type: String },
  cityName: { type: String },
  cityNameEng: { type: String },
  countryName: { type: String },
  countryNameEng: { type: String },
  difficulty: { type: Number},

});

module.exports = mongoose.model("Airport", airport);

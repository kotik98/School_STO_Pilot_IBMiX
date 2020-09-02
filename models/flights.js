const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flights = Schema({
  where_to: {type: String},
  where_from: {type: String},
  flight_time: {type: String},
  time_of_departure: {type: String},
  time_of_arrival: {type: String},
  level_flights: {type: String},
  city_photo: {type: String},
  airport_name: {type: String},
});

module.exports = mongoose.model('Flights', flights);

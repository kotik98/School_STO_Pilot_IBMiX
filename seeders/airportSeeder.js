const mongoose = require("mongoose");
const faker = require('faker');
const parse = require('nodemon');
const data = require('./airports.json');

mongoose.connect(
    `mongodb+srv://igorg:ibmix4@cluster0.aev79.azure.mongodb.net/IBMiX4?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
);

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

const Airport = mongoose.model("Airport", airport);

seedAirports = async () => {
  for(let i in data) {
    data[i]['difficulty'] = faker.random.number(10);
    const airport = new Airport(data[i]);
    airport.save();
    console.log(i)
  }
}
//seedAirports();
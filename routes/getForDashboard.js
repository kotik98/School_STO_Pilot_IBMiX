const express = require('express');
const router = express.Router();

const Flights = require('../models/flights');
const Airports = require('../models/airports');

router.post('/api/getAllFly', async (req, res) => {

  try {
    const flights = await Flights.find();
    // здесь будет обращение к базе
    console.log('Пустой массив', flights);
    return res.status(200).json({response: flights});
  } catch (e) {
    res.status(400).json({response: 'fail'});
  }
});

router.post('/api/getAirports', async (req, res) => {
  try {
    const airports = await Airports.find();
    return res.status(200).json({response: airports});
  } catch (e) {
    res.status(400).json({response: 'fail'});
  }
});

module.exports = router;


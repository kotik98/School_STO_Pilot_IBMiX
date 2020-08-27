const express = require('express');
const router = express.Router();

const Comander = require('../models/comander');
const Pilot = require('../models/pilot');
const Flights = require('../models/flights');

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

module.exports = router;


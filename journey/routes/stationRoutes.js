const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');

// GET /api/stations - get all stations
router.get('/', stationController.getStations);

// GET /api/stations/:id - get a single station
router.post('/', stationController.createStation);

module.exports = router;
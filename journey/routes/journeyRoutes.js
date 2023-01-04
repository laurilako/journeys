const express = require('express');
const router = express.Router();
const journeyController = require('../controllers/journeyController');

// GET /api/journeys - get all journeys
router.get('/', journeyController.getJourneys);

// POST /api/journeys - create a new journey
router.post('/', journeyController.createJourney);

// GET /api/journeys/:id - get a single journey
router.get('/:id', journeyController.getJourney);

// GET /api/journeys/station/:id - get journeydata for station
router.get('/station/:id', journeyController.getStationData);

// DELETE /api/journeys/:id - delete a journey
router.delete('/:id', journeyController.deleteJourney);

module.exports = router;
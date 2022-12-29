const express = require('express');
const router = express.Router();
const journeyController = require('../controllers/journeyController');

router.get('/', journeyController.getJourneys);
router.post('/', journeyController.createJourney);

module.exports = router;
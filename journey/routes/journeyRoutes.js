const express = require('express');
const router = express.Router();
const journeyController = require('../controllers/journeyController');

router.get('/', journeyController.getJourneys);
router.post('/', journeyController.createJourney);
router.get('/:id', journeyController.getJourney);
router.delete('/:id', journeyController.deleteJourney);

module.exports = router;
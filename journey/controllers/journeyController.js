const Journey = require('../models/journeyModel');

const getJourneys = async (req, res) => {
    try {
        const journeys = await Journey.find();
        res.json(journeys);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createJourney = async (req, res) => {
    const journey = new Journey({
        departure: req.body.departure,
        return: req.body.return,
        departureStationId: req.body.departureStationId,
        departureStationName: req.body.departureStationName,
        returnStationId: req.body.returnStationId,
        returnStationName: req.body.returnStationName,
        coveredDistance: req.body.coveredDistance,
        duration: req.body.duration,
    });

    try {
        const newJourney = await journey.save();
        res.status(201).json(newJourney);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    getJourneys,
    createJourney,
};
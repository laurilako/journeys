const Journey = require('../models/journeyModel');

// Get one from /api/journeys/:id
const getJourney = async (req, res) => {
    try {
        const journey = await Journey.findById(req.params.id);
        res.json(journey);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete one from /api/journeys/:id
const deleteJourney = async (req, res) => {
    try {
        const journey = await Journey.findById(req.params.id);
        if (journey == null) {
            return res.status(404).json({ message: 'Cannot find journey' });
        }
        await journey.remove();
        res.json({ message: 'Deleted journey' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all from /api/journeys
const getJourneys = async (req, res) => {
    try {
        const journeys = await Journey.find().limit(100);
        res.json(journeys);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new journey
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

// Get count of how many times a stations is used as departure station and return station
const getStationData = async (req, res) => {
    console.log(req.params.id)
    try {
        const departureStationCount = await Journey.find({"departureStationId" : req.params.id}).count();
        const returnStationCount = await Journey.find({"returnStationId" : req.params.id}).count();
        res.json({departureStationCount, returnStationCount});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getJourneys,
    getJourney,
    getStationData,
    deleteJourney,
    createJourney,
};
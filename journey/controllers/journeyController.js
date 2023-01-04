const Journey = require('../models/journeyModel');

// Get one from /api/journeys/:id
const getJourney = async (req, res) => {
    try {
        const journey = await Journey.findById(req.params.id);
        if (journey == null) {
            return res.status(404).json({ message: 'Cannot find journey' });
        }
        journey.coveredDistance = Number((journey.coveredDistance)/1000).toFixed(2);
        journey.duration = Number((journey.duration)/60).toFixed(2);
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
        const journeys = await Journey.find();
        journeys.forEach(journey => {
            journey.coveredDistance = Number((journey.coveredDistance)/1000).toFixed(2);
            journey.duration = Number((journey.duration)/60).toFixed(2);
        });
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

// Get station data from /api/journeys/station/:id
const getStationData = async (req, res) => {
    try {
        const departureStation = await Journey.find({"departureStationId" : req.params.id});
        const returnStation = await Journey.find({"returnStationId" : req.params.id});
        const departureStationCount = departureStation.length;
        const returnStationCount = returnStation.length;
        let departureStationDuration = 0;
        let departureStationDistance = 0;
        let returnStationDuration = 0;
        let returnStationDistance = 0;
        departureStation.forEach(journey => {
            departureStationDuration += Number(journey.duration);
            departureStationDistance += Number(journey.coveredDistance);
        });
        returnStation.forEach(journey => {
            returnStationDuration += Number(journey.duration);
            returnStationDistance += Number(journey.coveredDistance);
        });
        departureStationDuration = Number(departureStationDuration/1000/departureStationCount).toFixed(2);
        departureStationDistance = Number(departureStationDistance/1000/departureStationCount).toFixed(2);
        returnStationDuration = Number(returnStationDuration/1000/returnStationCount).toFixed(2);
        returnStationDistance = Number(returnStationDistance/1000/returnStationCount).toFixed(2);
        res.json({ departureStationCount, returnStationCount, departureStationDuration, departureStationDistance, returnStationDuration, returnStationDistance });
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
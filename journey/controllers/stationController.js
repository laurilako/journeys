const Station = require('../models/stationModel');

// Create new station
const createStation = async (req, res) => {
    const station = new Station({
        fid: req.body.fid,
        stationId: req.body.stationId,
        nimi: req.body.nimi,
        namn: req.body.namn,
        name: req.body.name,
        osoite: req.body.osoite,
        adress: req.body.adress,
        kaupunki: req.body.kaupunki,
        stad: req.body.stad,
        operaattor: req.body.operaattor,
        kapasiteet: req.body.kapasiteet,
        x: req.body.x,
        y: req.body.y,
    });

    try {
        const newStation = await station.save();
        res.status(201).json(newStation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Get all from /api/stations
const getStations = async (req, res) => {
    try {
        const stations = await Station.find();
        res.json(stations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getStations,
    createStation,
};
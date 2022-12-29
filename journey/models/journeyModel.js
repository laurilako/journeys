const mongoose = require('mongoose');

// example data in csv format
// Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
// 2021-05-31T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,100,Teljäntie,2043,500

const journeySchema = new mongoose.Schema({
    departure: {
        type: Date,
        required: true,
    },
    return: {
        type: Date,
        required: true,
    },
    departureStationId: {
        type: String,
        required: true,
    },
    departureStationName: {
        type: String,
        required: true,
    },
    returnStationId: {
        type: String,
        required: true,
    },
    returnStationName: {
        type: String,
        required: true,
    },
    coveredDistance: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
});

const Journey = mongoose.model('Journey', journeySchema);

module.exports = Journey;

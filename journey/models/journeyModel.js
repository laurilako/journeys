const mongoose = require('mongoose');

// example data in csv format
// Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
// 2021-05-31T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,100,Teljäntie,2043,500

// example data in json format
// {
//     "departure": "2021-05-31T23:57:25",
//     "return": "2021-06-01T00:05:46",
//     "departureStationId": "094",
//     "departureStationName": "Laajalahden aukio",
//     "returnStationId": "100",
//     "returnStationName": "Teljäntie",
//     "coveredDistance": 2043,
//     "duration": 500
// }

const journeySchema = new mongoose.Schema({
    departure: {
        type: String,
        required: true,
    },
    return: {
        type: String,
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
        type: String,
        required: true,
        // check if coveredDistance as int is greater than 10
        validate: (value) => {
            if(parseInt(value) >= 10) return true;
            else throw new Error("coveredDistance is not greater than 10 m");
        }
    },
    duration: {
        type: String,
        required: true,
        validate: (value) => {
            if(parseInt(value) >= 10) return true;
            else throw new Error("duration is not greater than 10 sec");
        }
    },
});

const Journey = mongoose.model('Journey', journeySchema);

module.exports = Journey;

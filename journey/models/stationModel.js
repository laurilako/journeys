const mongoose = require('mongoose');

// example data in csv format
// FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
// 1,501,Hanasaari,Hanaholmen,Hanasaari,Hanasaarenranta 1,Hanaholmsstranden 1,Espoo,Esbo,CityBike Finland,10,24.840319,60.16582

// example data in json format
// {
//     "fid": 1,
//     "id": 501,
//     "nimi": "Hanasaari",
//     "namn": "Hanaholmen",
//     "name": "Hanasaari",
//     "osoite": "Hanasaarenranta 1",
//     "adress": "Hanaholmsstranden 1",
//     "kaupunki": "Espoo",
//     "stad": "Esbo",
//     "operaattor": "CityBike Finland",
//     "kapasiteet": 10,
//     "x": "24.840319",
//     "y": "60.16582"
// }

const stationSchema = new mongoose.Schema({
    fid: {
        type: String,
        required: true,
    },
    stationId: {
        type: String,
        required: true,
    },
    nimi: {
        type: String,
        required: true,
    },
    namn: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    osoite: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    kaupunki: {
        type: String,
        required: true,
    },
    stad: {
        type: String,
        required: true,
    },
    operaattor: {
        type: String,
        required: true,
    },
    kapasiteet: {
        type: Number,
        required: true,
    },
    x: {
        type: String,
        required: true,
    },
    y: {
        type: String,
        required: true,
    },
});

stationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;
const fs = require("fs");
const { parse } = require("fast-csv");
const Station = require("../models/stationModel");

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

const stationcsvToMongo = () => {    
    const csvData = [];
    let path = "../../solita23data/stations.csv";
    fs.createReadStream(path)
        .pipe(parse({ headers: false, skipLines:1 , maxRows: 5000, delimiter: "," }))
        .on("error", (error) => {
            console.error(error);
        })
        .on("data", (row) => {
            csvData.push({
                fid: row[0],
                stationId: row[1],
                nimi: row[2],
                namn: row[3],
                name: row[4],
                osoite: row[5],
                adress: row[6],
                kaupunki: row[7],
                stad: row[8],
                operaattor: row[9],
                kapasiteet: row[10],
                x: row[11],
                y: row[12],
            });
        })
        .on("end", () => {
            console.log(csvData);
            // save to database
            save2MongoDB(csvData);
        });
};
save2MongoDB = (csvData) => {
    // save to db
    console.log("save to db");
    Station.insertMany(csvData, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
};


module.exports = stationcsvToMongo;
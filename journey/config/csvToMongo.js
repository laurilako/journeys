const fs = require("fs");
const { parse } = require("fast-csv");
const Journey = require("../models/journeyModel");


const importCsvData2MongoDB = () => {    
    const csvData = [];
    let path = "";
    fs.createReadStream(path)
        .pipe(parse({ headers: false, skipLines:1 , maxRows: 5000, delimiter: "," }))
        .on("error", (error) => {
            console.error(error);
        })
        .on("data", (row) => {
            if(row[7] < 10 || row[6] < 10) return;
            csvData.push({
                departure: row[0],
                return: row[1],
                departureStationId: row[2],
                departureStationName: row[3],
                returnStationId: row[4],
                returnStationName: row[5],
                coveredDistance: row[6],
                duration: row[7],
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
    Journey.insertMany(csvData, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
};


module.exports = importCsvData2MongoDB;
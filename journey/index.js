const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: '/config/.env' });

console.log(process.env.PORT);
// const importCsvData2MongoDB = require('./config/journeycsvToMongo');
// const stationcsvToMongo = require('./config/stationcsvToMongo');

const app = express();
app.use(cors());
app.use(express.json());

// connect to database
connectDB();

app.use('/api/journeys', require('./routes/journeyRoutes'));
app.use('/api/stations', require('./routes/stationRoutes'));

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// middlewares
app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const importCsvData2MongoDB = require('./config/journeycsvToMongo');
const stationcsvToMongo = require('./config/stationcsvToMongo');

const app = express();
app.use(cors());
app.use(express.json());

// connect to database
connectDB();

// if (process.env.NODE_ENV === 'TEST') {
//   // import csv data to mongodb database
//   // only during testing (NODE_ENV=TEST)
//   stationcsvToMongo();
// }

// routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/journeys', require('./routes/journeyRoutes'));
app.use('/api/stations', require('./routes/stationRoutes'));

// middlewares
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
// middlewares
app.use(cors());
app.use(express.json());

// connect to database
connectDB();

// routes

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


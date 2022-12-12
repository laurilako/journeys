const express = require('express');
const app = express();
const cors = require('cors');

// middlewares
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


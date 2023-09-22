const cors = require('cors');
const express = require('express');
const app = express();
const logger = require("./logger");
const port = 3000;
const quizRoutes = require('./routes/quizRoutes');

app.use(logger);
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Homepage!');
})

app.use('/quiz', quizRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})

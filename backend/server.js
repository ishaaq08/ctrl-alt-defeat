const cors = require('cors');
const express = require('express');
const app = express();
const quiz = require('./quiz.json');
const logger = require("./logger");
const port = 3000;

app.use(logger);
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Homepage!');
})

app.get('/quiz', (req, res) => {
    res.send(quiz);
})

app.get('/quiz/:id', (req, res) => {
    const index = req.params.id;
    console.log(index);
    const q = quiz[index];

    if (index >= 0 && index < quiz.length) {
        res.send(q);
    } else {
        res.status(404).send("Quiz not found");
    }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})
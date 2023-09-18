const quiz = require('../quiz.json')

const getAllQuestions = (req, res) => {
  res.status(200).send(quiz);
}


const getEachQuestion = (req, res) => {
  const index = req.params.id;
  console.log(index);
  const q = quiz[index];

  if (index >= 0 && index < quiz.length) {
      res.status(200).send(q);
  } else {
      res.status(404).send("Quiz not found");
  }
}

module.exports = {
  getAllQuestions,
  getEachQuestion
}


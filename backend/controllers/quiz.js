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

const getRandomQuestion = (req, res) => {
  const randIdx = Math.floor(Math.random() * Object.keys(quiz).length);
  res.json(quiz[randIdx]);
}

const randomiseAll = (req, res) => {  
  
  const random = quiz.sort(() => Math.random() - 0.5);
  res.status(200).json(random);

}


module.exports = {
  getAllQuestions,
  getEachQuestion,
  getRandomQuestion,
  randomiseAll
}


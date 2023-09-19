const express = require('express');
const router = express.Router();

const {
  getAllQuestions,
  getEachQuestion,
  getRandomQuestion,
  randomiseAll
} = require('../controllers/quiz');

router.route('/').get(getAllQuestions)
router.route('/random').get(getRandomQuestion);
router.route('/random/all').get(randomiseAll)
router.route('/:id').get(getEachQuestion);

module.exports = router;

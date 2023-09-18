const express = require('express');
const router = express.Router();

const {
  getAllQuestions,
  getEachQuestion,
  getRandomQuestion
} = require('../controllers/quiz');

router.route('/').get(getAllQuestions)
router.route('/random').get(getRandomQuestion);
router.route('/:id').get(getEachQuestion);

module.exports = router;

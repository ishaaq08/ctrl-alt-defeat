const express = require('express');
const router = express.Router();

const {
  getAllQuestions,
  getEachQuestion
} = require('../controllers/quiz');

router.route('/').get(getAllQuestions);
router.route('/:id').get(getEachQuestion);

module.exports = router;

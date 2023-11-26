const express = require('express');
const router = express.Router();
const { addCard, editCard, deleteCard } = require('../controllers/card');

router.post('/', addCard);
router.patch('/:cardId', editCard);
router.delete('/:cardId', deleteCard);

module.exports = router;

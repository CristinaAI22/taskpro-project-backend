const express = require('express');
const router = express.Router();
const { addList, editList, deleteList } = require('../controllers/list');

router.post('/', addList);
router.patch('/:listId', editList);
router.delete('/:listId', deleteList);

module.exports = router;

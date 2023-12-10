const express = require('express');
const router = express.Router();
const { addBoard, editBoard, deleteBoard } = require('../controllers/board');
const multer = require('multer');
const {
  // getAllData,
  getAllBoards,
  getBoardData,
} = require('../controllers/getAllData');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getAllBoards);
router.get('/:boardId', getBoardData);

router.post(
  '/',
  // upload.fields([
  //   { name: 'icon', maxCount: 1 },
  //   { name: 'backgroundImg', maxCount: 1 },
  // ]),
  addBoard
);
router.patch(
  '/:boardId',
  // upload.fields([
  //   { name: 'icon', maxCount: 1 },
  //   { name: 'backgroundImg', maxCount: 1 },
  // ]),
  editBoard
);

router.delete('/:boardId', deleteBoard);

module.exports = router;

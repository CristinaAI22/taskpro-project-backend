const express = require('express');
const router = express.Router();
const { addBoard, editBoard } = require('../controllers/board');
// const { editBoard } = require('../controllers/editBoard');
const multer = require('multer');
const path = require('path');
const uploadDir = path.join(process.cwd(), 'images');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  '/',
  upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'backgroundImg', maxCount: 1 },
  ]),
  addBoard
);
router.put(
  '/:boardId',
  upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'backgroundImg', maxCount: 1 },
  ]),
  editBoard
);

module.exports = router;

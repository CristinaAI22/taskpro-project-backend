const Board = require('../models/board');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { StatusCodes } = require('http-status-codes');
let streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addBoard = async (req, res) => {
  const { title } = req.body;
  const newBoard = new Board({ title });
  const { icon, backgroundImg } = req.files;
  if (icon) {
    const iconBuffer = icon[0].buffer;
    const iconUploadPromise = new Promise((resolve, reject) => {
      const cloudStream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      });

      streamifier.createReadStream(iconBuffer).pipe(cloudStream);
    });

    const iconUrl = await iconUploadPromise;
    newBoard.icon = iconUrl;
  }

  if (backgroundImg) {
    const backgroundBuffer = icon[0].buffer;
    const backgroundUploadPromise = new Promise((resolve, reject) => {
      const cloudStream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      });

      streamifier.createReadStream(backgroundBuffer).pipe(cloudStream);
    });

    const backgroundUrl = await backgroundUploadPromise;
    newBoard.backgroundImg = backgroundUrl;
  }

  await newBoard.save();

  res.status(StatusCodes.CREATED).json({ newBoard });
};

const editBoard = async (req, res) => {
  const boardId = req.params.boardId;
  const boardToUpdate = await Board.findById(boardId);
  if (!boardToUpdate) {
    throw new NotFoundError('No board with that id');
  }

  const { title } = req.body;
  const { icon, backgroundImg } = req.files;

  if (title) {
    boardToUpdate.title = title;
  }

  if (icon) {
    const iconBuffer = icon[0].buffer;
    const iconUploadPromise = new Promise((resolve, reject) => {
      const cloudStream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      });

      streamifier.createReadStream(iconBuffer).pipe(cloudStream);
    });

    const iconUrl = await iconUploadPromise;
    boardToUpdate.icon = iconUrl;
  }

  if (backgroundImg) {
    const backgroundBuffer = icon[0].buffer;
    const backgroundUploadPromise = new Promise((resolve, reject) => {
      const cloudStream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      });

      streamifier.createReadStream(backgroundBuffer).pipe(cloudStream);
    });

    const backgroundUrl = await backgroundUploadPromise;
    boardToUpdate.backgroundImg = backgroundUrl;
  }

  await boardToUpdate.save();

  res.status(StatusCodes.CREATED).json({ boardToUpdate });
};

const deleteBoard = async (req, res) => {
  const boardId = req.params.boardId;
  const deletedBoard = await Board.findByIdAndDelete(boardId);
  res.status(StatusCodes.OK).json({ msg: 'ok', deletedBoard });
};

module.exports = { addBoard, editBoard, deleteBoard };

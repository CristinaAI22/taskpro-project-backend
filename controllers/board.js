const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { StatusCodes } = require('http-status-codes');
let streamifier = require('streamifier');
const { NotFoundError } = require('../errors');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addBoard = async (req, res) => {
  const { title, icon, backgroundImg } = req.body;

  const newBoard = new Board({ title });

  // const { icon, backgroundImg } = req.files;
  // const iconFile = req.files['icon'][0];
  // const backgroundImgFile = req.files['backgroundImg'][0];
  // console.log('test5');

  // console.log(iconFile, backgroundImgFile);
  if (icon) {
    // const iconBuffer = icon[0].buffer;
    // const iconUploadPromise = new Promise((resolve, reject) => {
    //   const cloudStream = cloudinary.uploader.upload_stream((error, result) => {
    //     if (error) {
    //       reject(error);
    //     } else {
    //       resolve(result.secure_url);
    //     }
    //   });

    //   streamifier.createReadStream(iconBuffer).pipe(cloudStream);
    // });

    // const iconUrl = await iconUploadPromise;

    newBoard.icon = icon;
  }

  if (backgroundImg) {
    // const backgroundBuffer = icon[0].buffer;
    // const backgroundUploadPromise = new Promise((resolve, reject) => {
    //   const cloudStream = cloudinary.uploader.upload_stream((error, result) => {
    //     if (error) {
    //       reject(error);
    //     } else {
    //       resolve(result.secure_url);
    //     }
    //   });

    //   streamifier.createReadStream(backgroundBuffer).pipe(cloudStream);
    // });

    // const backgroundUrl = await backgroundUploadPromise;
    newBoard.backgroundImg = backgroundImg;
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

  const { title, icon, backgroundImg } = req.body;
  // const { icon, backgroundImg } = req.files;

  if (title) {
    boardToUpdate.title = title;
  }

  if (icon) {
    // const iconBuffer = icon[0].buffer;
    // const iconUploadPromise = new Promise((resolve, reject) => {
    //   const cloudStream = cloudinary.uploader.upload_stream((error, result) => {
    //     if (error) {
    //       reject(error);
    //     } else {
    //       resolve(result.secure_url);
    //     }
    //   });

    //   streamifier.createReadStream(iconBuffer).pipe(cloudStream);
    // });

    // const iconUrl = await iconUploadPromise;
    boardToUpdate.icon = icon;
  }

  if (backgroundImg) {
    // const backgroundBuffer = icon[0].buffer;
    // const backgroundUploadPromise = new Promise((resolve, reject) => {
    //   const cloudStream = cloudinary.uploader.upload_stream((error, result) => {
    //     if (error) {
    //       reject(error);
    //     } else {
    //       resolve(result.secure_url);
    //     }
    //   });

    //   streamifier.createReadStream(backgroundBuffer).pipe(cloudStream);
    // });

    // const backgroundUrl = await backgroundUploadPromise;
    boardToUpdate.backgroundImg = backgroundImg;
  }

  await boardToUpdate.save();

  res.status(StatusCodes.CREATED).json({ boardToUpdate });
};

const deleteBoard = async (req, res) => {
  const boardId = req.params.boardId;

  const listsArray = await List.find({ owner: boardId });
  const listsIDs = listsArray.map((list) => list._id);

  for (const id of listsIDs) {
    await Card.deleteMany({ owner: id });
  }

  const deletedLists = await List.deleteMany({ owner: boardId });

  const deletedBoard = await Board.findByIdAndDelete(boardId);

  if (!deletedBoard) {
    throw new NotFoundError('No board with provided ID');
  }
  res.status(StatusCodes.OK).json({ deleteBoard: boardId });
};

module.exports = { addBoard, editBoard, deleteBoard };

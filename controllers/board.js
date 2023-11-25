const Board = require('../models/board');
require('dotenv').config();
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { StatusCodes } = require('http-status-codes');
const fs = require('fs');

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
    const iconPath = icon[0].path;
    const cloudinaryUploadPromise = new Promise((resolve, reject) => {
      cloudinary.uploader.upload(iconPath, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      });
    });

    const iconUrl = await cloudinaryUploadPromise;
    newBoard.icon = iconUrl;
    fs.unlinkSync(iconPath);
  }
  if (backgroundImg) {
    const backgroundPath = backgroundImg[0].path;
    const cloudinaryUploadPromise = new Promise((resolve, reject) => {
      cloudinary.uploader.upload(backgroundPath, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      });
    });

    const backgroundUrl = await cloudinaryUploadPromise;
    newBoard.backgroundImg = backgroundUrl;
    fs.unlinkSync(backgroundPath);
  }

  await newBoard.save();

  res.status(StatusCodes.CREATED).json({ newBoard });
};

const editBoard = async (req, res) => {
  const boardId = req.params.boardId;
  console.log(req.files, boardId);
  // console.log(req.body);
  // const boardToUpdate = await Board.findById(boardId);
  // if (!boardToUpdate) {
  //   throw new NotFoundError('No board with that id');
  // }

  // const { title } = req.body;
  // const { icon, backgroundImg } = req.files;

  // if (title) {
  //   boardToUpdate.title = title;
  // }

  // if (icon) {
  //   const iconPath = icon[0].path;
  //   const cloudinaryUploadPromise = new Promise((resolve, reject) => {
  //     cloudinary.uploader.upload(iconPath, (error, result) => {
  //       if (error) {
  //         reject(error);
  //       } else {
  //         resolve(result.secure_url);
  //       }
  //     });
  //   });

  //   const iconUrl = await cloudinaryUploadPromise;
  //   boardToUpdate.icon = iconUrl;
  // }

  // if (backgroundImg) {
  //   const backgroundPath = backgroundImg[0].path;
  //   const cloudinaryUploadPromise = new Promise((resolve, reject) => {
  //     cloudinary.uploader.upload(backgroundPath, (error, result) => {
  //       if (error) {
  //         reject(error);
  //       } else {
  //         resolve(result.secure_url);
  //       }
  //     });
  //   });

  //   const backgroundUrl = await cloudinaryUploadPromise;
  //   boardToUpdate.backgroundImg = backgroundUrl;
  // }

  // await boardToUpdate.save();

  // res.status(StatusCodes.CREATED).json({ boardToUpdate });
};

module.exports = { addBoard, editBoard };

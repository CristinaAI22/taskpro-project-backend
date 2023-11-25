// const Board = require('../models/board');
// require('dotenv').config();
// const multer = require('multer');
// const path = require('path');
// const cloudinary = require('cloudinary').v2;
// const uploadDir = path.join(process.cwd(), 'images');
// const { StatusCodes } = require('http-status-codes');
// const { NotFoundError } = require('../errors');

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
//   // limits: {
//   //   fileSize: 1048576,
//   // },
// });

// const editUpload = multer({ storage: storage });

// const editBoardUpload = editUpload.fields([
//   { name: 'icon', maxCount: 1 },
//   { name: 'backgroundImg', maxCount: 1 },
// ]);

// const editBoard = async (req, res) => {
//   const boardId = req.params.boardId;
//   // console.log(req.files, boardId);
//   console.log(req.body);
//   // const boardToUpdate = await Board.findById(boardId);
//   // if (!boardToUpdate) {
//   //   throw new NotFoundError('No board with that id');
//   // }

//   // const { title } = req.body;
//   // const { icon, backgroundImg } = req.files;

//   // if (title) {
//   //   boardToUpdate.title = title;
//   // }

//   // if (icon) {
//   //   const iconPath = icon[0].path;
//   //   const cloudinaryUploadPromise = new Promise((resolve, reject) => {
//   //     cloudinary.uploader.upload(iconPath, (error, result) => {
//   //       if (error) {
//   //         reject(error);
//   //       } else {
//   //         resolve(result.secure_url);
//   //       }
//   //     });
//   //   });

//   //   const iconUrl = await cloudinaryUploadPromise;
//   //   boardToUpdate.icon = iconUrl;
//   // }

//   // if (backgroundImg) {
//   //   const backgroundPath = backgroundImg[0].path;
//   //   const cloudinaryUploadPromise = new Promise((resolve, reject) => {
//   //     cloudinary.uploader.upload(backgroundPath, (error, result) => {
//   //       if (error) {
//   //         reject(error);
//   //       } else {
//   //         resolve(result.secure_url);
//   //       }
//   //     });
//   //   });

//   //   const backgroundUrl = await cloudinaryUploadPromise;
//   //   boardToUpdate.backgroundImg = backgroundUrl;
//   // }

//   // await boardToUpdate.save();

//   // res.status(StatusCodes.CREATED).json({ boardToUpdate });
// };

// module.exports = { editBoard, editBoardUpload };

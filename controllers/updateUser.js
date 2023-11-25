const { User } = require('../models/user-model');
require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const uploadDir = path.join(process.cwd(), 'images');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({ storage: storage });

const updateUser = async (req, res) => {
  const userId = req.user.id;

  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new UnauthenticatedError('User not found');
  }

  if (req.body.name) {
    existingUser.name = req.body.name;
  }
  if (req.body.email) {
    existingUser.email = req.body.email;
  }
  if (req.body.password) {
    existingUser.setPass(req.body.password);
  }

  if (req.file) {
    const imageFilePath = req.file.path;

    const cloudinaryUploadPromise = new Promise((resolve, reject) => {
      cloudinary.uploader.upload(imageFilePath, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      });
    });

    const imageUrl = await cloudinaryUploadPromise;

    existingUser.avatarURL = imageUrl;
  }

  await existingUser.save();

  res.status(StatusCodes.OK).json({
    user: existingUser,
  });
};

module.exports = { upload, updateUser };

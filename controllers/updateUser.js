const { User } = require('../models/user-model');
require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
let streamifier = require('streamifier');
const { NotFoundError } = require('../errors');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

const updateUser = async (req, res) => {
  const userId = req.user.id;
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new NotFoundError('User not found');
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
    const iconBuffer = req.file.buffer;
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

    existingUser.avatarURL = iconUrl;
  }

  await existingUser.save();

  res.status(StatusCodes.OK).json({
    user: existingUser,
  });
};

const setUserTheme = async (req, res) => {
  const userId = req.user.id;
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new NotFoundError('User not found');
  }

  const { theme } = req.body;
  existingUser.theme = theme;
  await existingUser.save();

  res.status(StatusCodes.OK).json({
    user: existingUser,
  });
};

module.exports = { upload, updateUser, setUserTheme };

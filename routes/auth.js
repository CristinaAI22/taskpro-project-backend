const express = require('express');
const router = express.Router();
const { register, login, logout, refreshUser } = require('../controllers/auth');
const auth = require('../middleware/authentication');
const {
  upload,
  updateUser,
  setUserTheme,
} = require('../controllers/updateUser');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/current', auth, refreshUser);
router.patch('/', auth, upload.single('avatar'), updateUser);
router.patch('/theme', auth, setUserTheme);

module.exports = router;

const { Schema, model } = require('mongoose');

const board = new Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  icon: String,
  backgroundImg: String,
});

const Board = model('board', board);

module.exports = Board;

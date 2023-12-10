const { Schema, model } = require('mongoose');

const board = new Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  icon: Number,
  backgroundImg: {
    type: Number,
    default: null,
  },
});

const Board = model('board', board);

module.exports = Board;

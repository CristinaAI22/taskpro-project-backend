const { Schema, model } = require('mongoose');

const card = new Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  description: String,
  labelColor: String,
  deadline: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'list',
  },
});

const Card = model('card', card);

module.exports = Card;

const { Schema, model } = require('mongoose');

const list = new Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'board',
  },
});

const List = model('list', list);

module.exports = List;

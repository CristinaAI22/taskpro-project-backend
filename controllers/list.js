const { StatusCodes } = require('http-status-codes');
const List = require('../models/list');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const addList = async (req, res) => {
  const { title, owner } = req.body;
  if (!title || !owner) {
    throw new BadRequestError('Please provide title and owner for the list');
  }
  const newList = new List({ title, owner });
  await newList.save();
  res.status(StatusCodes.CREATED).json({ newList });
};

const editList = async (req, res) => {
  const listId = req.params.listId;
  const listToEdit = await List.findById(listId);
  if (!listToEdit) {
    throw new UnauthenticatedError('List not found');
  }
  const { title } = req.body;
  listToEdit.title = title;
  await listToEdit.save();
  res.status(StatusCodes.OK).json({
    list: listToEdit,
  });
};

const deleteList = async (req, res) => {
  const listId = req.params.listId;
  const deletedList = await List.findByIdAndDelete(listId);
  res.status(StatusCodes.OK).json({ msg: 'ok', deletedList });
};

module.exports = { addList, editList, deleteList };

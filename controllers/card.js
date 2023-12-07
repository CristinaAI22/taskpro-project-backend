const { StatusCodes } = require('http-status-codes');
const Card = require('../models/card');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const addCard = async (req, res) => {
  const { title, description, labelColor, deadline, owner } = req.body;
  if (!title || !owner) {
    throw new BadRequestError('Please provide title and owner for the list');
  }
  const newCard = new Card({ title, description, labelColor, deadline, owner });
  await newCard.save();
  res.status(StatusCodes.CREATED).json({ newCard });
};

const editCard = async (req, res) => {
  const cardId = req.params.cardId;
  const cardToEdit = await Card.findById(cardId);
  if (!cardToEdit) {
    throw new UnauthenticatedError('Card not found');
  }
  const { title, description, labelColor, deadline, owner } = req.body;
  if (title) {
    cardToEdit.title = title;
  }
  if (description) {
    cardToEdit.description = description;
  }
  if (labelColor) {
    cardToEdit.labelColor = labelColor;
  }
  if (deadline) {
    cardToEdit.deadline = deadline;
  }
  if (owner) {
    cardToEdit.owner = owner;
  }

  await cardToEdit.save();
  res.status(StatusCodes.OK).json({
    card: cardToEdit,
  });
};

const deleteCard = async (req, res) => {
  const cardId = req.params.cardId;
  const deletedCard = await Card.findByIdAndDelete(cardId);
  res.status(StatusCodes.OK).json({ msg: 'ok', deletedCard });
};

module.exports = { addCard, editCard, deleteCard };

const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');
const { StatusCodes } = require('http-status-codes');

const getAllData = async (req, res) => {
  const boardsArray = await Board.find();

  const response = await Promise.all(
    boardsArray.map(async (board) => {
      const lists = await List.find({ owner: board._id });
      const listsWithCards = await Promise.all(
        lists.map(async (list) => {
          const cards = await Card.find({ owner: list._id });
          return {
            ...list.toObject(),
            cards: cards.map((card) => card.toObject()),
          };
        })
      );

      return {
        ...board.toObject(),
        lists: listsWithCards,
      };
    })
  );

  res.status(StatusCodes.OK).json({ aplicationData: response });
};

module.exports = getAllData;

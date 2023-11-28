const Board = require('../models/board');
const List = require('../models/list');
const Card = require('../models/card');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

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

const getAllBoards = async (req, res) => {
  const boards = await Board.find();

  res.status(StatusCodes.OK).json({ boards });
};

const getBoardData = async (req, res) => {
  const boardId = req.params.boardId;

  const selectedBoard = await Board.findById(boardId);

  if (!selectedBoard) {
    throw new NotFoundError('No board with provided ID');
  }

  const listArray = await await List.find({ owner: boardId });

  const boardListsAndCards = await Promise.all(
    listArray.map(async (list) => {
      const cards = await Card.find({ owner: list._id });
      return {
        ...list.toObject(),
        cards: cards.map((card) => card.toObject()),
      };
    })
  );

  const bordData = selectedBoard.toObject();
  bordData.lists = boardListsAndCards;

  res.status(StatusCodes.OK).json({ bordData });
};

module.exports = { getAllData, getAllBoards, getBoardData };

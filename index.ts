import * as path from "path";
import fs from "fs";

const DIMENSION = 4;
const BASE_PATH = path.join(__dirname, ".", "assets");

type Board = Array<Array<string | null>>;

const getTiles = (pathToScan: string) => {
  return fs
    .readdirSync(pathToScan)
    .filter((file) => file.startsWith("tile"))
    .sort();
};

const createCompletedBoard = (boardName: string): Board => {
  const tilePaths = fs
    .readdirSync(path.join(BASE_PATH, boardName))
    .filter((file) => file.startsWith("tile"))
    .sort();

  getTiles(path.join(BASE_PATH, boardName));

  // construct 2D array
  const board = new Array(DIMENSION);
  for (let i = 0; i < DIMENSION; i++) {
    board[i] = new Array(DIMENSION);
  }

  // populate array with tile paths
  let tileNumber = 0;
  for (let i = 0; i < DIMENSION; i++) {
    for (let j = 0; j < DIMENSION; j++) {
      board[i][j] = tilePaths[tileNumber];
      tileNumber++;
    }
  }

  return board;
};

const createBoardWithBlank = (boardName: string): Board => {
  const board = createCompletedBoard(boardName);

  // make the last one blank
  board[DIMENSION - 1][DIMENSION - 1] = null;

  return board;
};

const shuffleBoard = (board: Board): Board => {
  const updatedBoard = board.slice(); // copy original board
  const shuffleAmount = Math.floor(Math.random() * 10000) + 1000;

  const findSpace = (row: number, col: number): [number, number] | null => {
    const toCheck = [
      [row, col - 1],
      [row, col + 1],
      [row - 1, col],
      [row + 1, col],
    ];

    for (const coords of toCheck) {
      const [rowToCheck, colToCheck] = coords;
      if (rowToCheck < 0 || colToCheck < 0) {
        // outside board (values too low)
        continue;
      }
      if (
        // outside board (values too high)
        rowToCheck >= updatedBoard.length ||
        colToCheck >= updatedBoard[rowToCheck].length
      ) {
        continue;
      }
      if (updatedBoard[rowToCheck][colToCheck] === null) {
        // blank space identified
        return [rowToCheck, colToCheck];
      }
    }

    // no blank space next to this tile
    return null;
  };

  for (let i = 0; i < shuffleAmount; i++) {
    const selectedRow = Math.floor(Math.random() * DIMENSION);
    const selectedCol = Math.floor(Math.random() * DIMENSION);
    const coordsBlank = findSpace(selectedRow, selectedCol);

    if (coordsBlank !== null) {
      const [blankRow, blankCol] = coordsBlank;

      // swap squares
      const selectedTile = updatedBoard[selectedRow][selectedCol];
      const blankTile = updatedBoard[blankRow][blankCol];
      updatedBoard[selectedRow][selectedCol] = blankTile;
      updatedBoard[blankRow][blankCol] = selectedTile;
    }
  }

  return updatedBoard;
};

const createGame = (boardName: string) => {
  const board = createBoardWithBlank(boardName);
  return shuffleBoard(board);
};

const validate = (attempt: Board, boardName: string) => {
  const solvedBoard = createBoardWithBlank(boardName);

  if (JSON.stringify(attempt) === JSON.stringify(solvedBoard)) {
    return createCompletedBoard(boardName);
  } else {
    return false;
  }
};

export { createGame, validate };

import Piece from "./piece";
import * as GameUtils from "./utils";
import allTetrominos from "./tetromino";

class Game {
  constructor(ctx, controller) {
    this.ctx = ctx;
    this.pieces = [];
    this.gameOver = false;
    this.controller = controller;
    // this.score = 0;

    this.dimX = GameUtils.DIM_X;
    this.dimY = GameUtils.DIM_Y;
    this.numCols = GameUtils.NUM_COLS;
    this.numRows = GameUtils.NUM_ROWS;
    this.gridColor = GameUtils.BG_COLOR;
    this.tileSize = GameUtils.TILE_SIZE;

    // Keep track of the tiles currently occupied on the grid using booleans
    // A Piece is comprised of 16 tiles, but only 4 tiles will be true
    this.tilesOccupied = new Array(this.numCols).fill(0).map(() => {
      return new Array(this.numRows).fill(false);
    });

    // Keep track of Pieces by pushing them into a matrix of arrays using the
    // Piece's position (all tiles are offset relative to the top left tile)
    this.pieceMatrix = new Array(this.numCols).fill(0).map(() => {
      return new Array(this.numRows).fill(0).map(() => {
        return new Array();
      });
    });

    this.generatedPieces = this.generatePieces();
    this.currPiece = this.generatePiece();
  }
  
  // Generates a set of random tetrominos stored in `this.generatedPieces`
  generatePieces() {
    const allTetrominoKeys = Object.keys(allTetrominos);

    // Shuffle the keys obtained from `allTetrominoKeys`
    for (let idx = allTetrominoKeys.length - 1; idx > 0; idx--) {
      const jdx = Math.floor(Math.random() * idx);
      const tempKey = allTetrominoKeys[idx];
      allTetrominoKeys[idx] = allTetrominoKeys[jdx];
      allTetrominoKeys[jdx] = tempKey;
    }

    // Map all of the keys in `allTetrominoKeys` into Piece objects
    return allTetrominoKeys.map(key => {
      return JSON.parse(JSON.stringify(allTetrominos[key]));
    });
  }

  // Returns a random Piece by sampling from `this.generatedPieces`
  generatePiece() {
    if (!this.generatedPieces.length) {
      this.generatedPieces = this.generatePieces();
    }
    let randTetromino = this.generatedPieces.pop();

    // Used for specific piece testing
    // const randTetromino = JSON.parse(JSON.stringify(allTetrominos["tetrominoI"]));

    return new Piece(randTetromino, this);
  }

  // Draws the game board, locked Pieces, and current Piece
  draw() {
    // Draws the background for the grid
    this.ctx.clearRect(0, 0, this.dimX, this.dimY);
    this.ctx.fillStyle = this.gridColor;
    this.ctx.fillRect(0, 0, this.dimX, this.dimY);
    
    // Constructs and draws the vertical lines for the grid
    this.ctx.strokeStyle = "#777777";
    for (let idx = 0; idx < this.numCols; idx++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.tileSize * idx, 0);
      this.ctx.lineTo(this.tileSize * idx, this.tileSize * this.numRows);
      this.ctx.stroke();
    }

    // Constructs and draws the horizontal lines for the grid
    for (let idx = 0; idx < this.numRows; idx++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.tileSize * idx)
      this.ctx.lineTo(this.dimX, this.tileSize * idx);
      this.ctx.stroke();
    }

    // Draws all of the Pieces that are already "locked in"
    for (let idx = 0; idx < this.pieces.length; idx++) {
      let fixedPiece = this.pieces[idx];
      fixedPiece.draw(this.ctx);
    }

    // Draws the current Piece which is still movable
    this.currPiece.draw(this.ctx);
  }

  // Move the current Piece to the right by 1 block if it is a valid position
  stepRight() {
    if (this.currPiece.validHorizontal(1)) {
      this.currPiece.moveRight();
    }
  }

  // Move the current Piece to the left by 1 block if it is a valid position
  stepLeft() {
    if (this.currPiece.validHorizontal(-1)) {
      this.currPiece.moveLeft();
    }
  }

  // Move the current Piece down by 1 block if it is a valid position
  // Otherwise, store the current Piece as a "locked in" Piece, record its
  // current position, clear rows if any, and then generate a new current Piece
  stepDown() {
    if (this.currPiece.validVertical()) {
      this.currPiece.moveDown();
      return true;
    } else {
      // this.currPiece.color = "#444444"; // Change color on drop
      this.pieces.push(this.currPiece);
      this.currPiece.recordPiece();
      this.clearRows();
      this.currPiece = this.generatePiece();
      return false;
    }
  }

  // Continuously move the current Piece downwards until collision
  dropPiece() {
    let validStep = this.stepDown();
    while (validStep) {
      validStep = this.stepDown();
    }
  }

  // Rotates the current Piece by updating its orientation attribute if its
  // next orientation is a valid position
  rotatePiece() {
    let nextOrientation = (this.currPiece.orientation + 1) % 4;
    if (this.currPiece.validOrientation(nextOrientation)) {
      this.currPiece.rotate();
    }
  }

  // If there exists a row to clear, return that row's index, and -1 otherwise
  // Rows are checked from the bottom of the grid to the top of the grid
  findRowToClear() {
    for (let rowIdx = this.numRows - 1; rowIdx >= 0; rowIdx--) {
      let row = this.tilesOccupied.map((col, colIdx) => this.tilesOccupied[colIdx][rowIdx]);
      if (row.reduce((a, b) => a + b, 0) === this.numCols) return rowIdx;
    }
    return -1;
  }

  // Update `this.tilesOccupied` by shifting every entry down by 1 if its rowIdx
  // is less than (higher on the grid) `rowToClear`, starting from rowToClear
  updateTilesOccupied(rowToClear) {
    for (let colIdx = 0; colIdx < this.numCols; colIdx++) {
      for (let rowIdx = rowToClear; rowIdx >= 0; rowIdx--) {
        // Accounts for the top row pulling from a negative index
        this.tilesOccupied[colIdx][rowIdx] = this.tilesOccupied[colIdx][rowIdx - 1] || false;
      }
    }
  }

  // Clears filled rows from the game board, run on every dropped piece
  clearRows() {
    let rowToClear = this.findRowToClear();

    while (rowToClear >= 0) {
      this.updateTilesOccupied(rowToClear);

      // Update Piece orientations for drawing logic starting from `rowToClear`
      for (let pieceMatrixCol = 0; pieceMatrixCol < this.numCols; pieceMatrixCol++) {
        for (let pieceMatrixRow = rowToClear; pieceMatrixRow >= 0; pieceMatrixRow--) {

          // `piecesArr` contains Piece starting points (Piece's top left tile)
          let piecesArr = this.pieceMatrix[pieceMatrixCol][pieceMatrixRow];
          if (piecesArr.length) {

            // Keep track of the Pieces that need to be shifted downwards into
            // the tile directly underneath in `this.pieceMatrix`
            let trackIdxs = [];
            for (let pieceIdx = piecesArr.length - 1; pieceIdx >= 0; pieceIdx--) {
              let piece = piecesArr[pieceIdx];
             
              // Handles if cyan piece is guaranteed to be above `rowToClear`
              if (piece.color === "#00FFFF" && piece.pos[1] + 4 < rowToClear) {
                piece.pos[1] += 1;
                trackIdxs.push(pieceIdx);

              // Handles any other piece guaranteed to be above `rowToClear`
              } else if (piece.pos[1] + 3 < rowToClear) {
                piece.pos[1] += 1;
                trackIdxs.push(pieceIdx);

              // The `rowToClear` is within the bounds of the considered piece
              // Delete that portion of the piece's orientation and update the
              // piece's orientation array to reflect the change
              // However, the Piece's position does not need to be changed
              } else {
                let [colPos, rowPos] = piece.pos;
                let currOrientation = piece.orientations[piece.orientation];
                let currOrientationStr = currOrientation.toString(2).padStart(16, "0");
                for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {
                  let [colShift, rowShift] = piece.calculateShift(shiftAmt);
                  let newRowPos = rowPos + rowShift;
                  if (newRowPos === rowToClear) {
                    currOrientationStr = (currOrientationStr.slice(0, 15 - shiftAmt) + currOrientationStr.slice(15 - shiftAmt + 1)).padStart(16, "0");
                  }
                }
                let binaryOrientation = parseInt(currOrientationStr, 2);
                piece.orientations[piece.orientation] = binaryOrientation;
              }
            }

            // `trackIdxs` will be an array of Piece indices within `piecesArr`
            // in decreasing order that needs to be shifted down by 1
            for (let idx = 0; idx < trackIdxs.length; idx++) {
              let trackIdx = trackIdxs[idx];
              let trackPiece = piecesArr[trackIdx];
              this.pieceMatrix[pieceMatrixCol][pieceMatrixRow + 1].push(trackPiece);
            }

            // Remove the tracked Pieces from the current `piecesArr`, which
            // will also affect `this.pieceMatrix` due to reference
            for (let idx = 0; idx < trackIdxs.length; idx++) {
              let trackIdx = trackIdxs[idx];
              piecesArr.splice(trackIdx, 1);
            }
          }
        }
      }

      // Keep updating `rowToClear` until there are no more rows to clear
      rowToClear = this.findRowToClear();
    }
  }

//   gameOver() {
//     if (this.filledTiles[3][0] || this.filledTiles[4][0] || this.filledTiles[5][0] || this.filledTiles[6][0]) {
//       return true;
//     }
//     return false;
//   }
}

export default Game;
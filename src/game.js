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

    // this.shiftRowDown = this.shiftRowDown.bind(this);
    this.tilesOccupied = new Array(this.numCols).fill(0).map(() => {
      return new Array(this.numRows).fill(false);
    });

    this.currPiece = this.generatePiece();
  }
  
  // Returns a new and random Piece
  generatePiece() {
    const allTetrominoKeys = Object.keys(allTetrominos);
    const randTetrominoKey = allTetrominoKeys[Math.floor(Math.random() * allTetrominoKeys.length)];
    const randTetromino = JSON.parse(JSON.stringify(allTetrominos[randTetrominoKey]));

    // Used for specific piece testing
    // const randTetromino = JSON.parse(JSON.stringify(allTetrominos["tetrominoL"]));

    return new Piece(randTetromino, this);
  }

  draw() {
    // Background for the grid
    this.ctx.clearRect(0, 0, this.dimX, this.dimY);
    this.ctx.fillStyle = this.gridColor;
    this.ctx.fillRect(0, 0, this.dimX, this.dimY);
    
    // Construct the vertical lines for the grid
    this.ctx.strokeStyle = "#777777";
    for (let idx = 0; idx < this.numCols; idx++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.tileSize * idx, 0);
      this.ctx.lineTo(this.tileSize * idx, this.tileSize * this.numRows);
      this.ctx.stroke();
    }

    // Construct the horizontal lines for the grid
    for (let idx = 0; idx < this.numRows; idx++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.tileSize * idx)
      this.ctx.lineTo(this.dimX, this.tileSize * idx);
      this.ctx.stroke();
    }

    // Rendering a Piece
    for (let idx = 0; idx < this.pieces.length; idx++) {
      let fixedPiece = this.pieces[idx];
      fixedPiece.draw(this.ctx);
    }

    this.currPiece.draw(this.ctx);
  }

  stepRight() {
    if (this.currPiece.validHorizontal(1)) {
      this.currPiece.moveRight();
    }
  }

  stepLeft() {
    if (this.currPiece.validHorizontal(-1)) {
      this.currPiece.moveLeft();
    }
  }

  stepDown() {
    if (this.currPiece.validVertical()) {
      this.currPiece.moveDown();
    } else {
      this.pieces.push(this.currPiece);
      this.currPiece.updatePosition(true);
      // Add row clearing logic here?
      this.clearRows();
      this.currPiece = this.generatePiece();
    }
  }

  dropPiece() {
    while (this.currPiece.validVertical()) {
      this.currPiece.moveDown();
    }
    this.pieces.push(this.currPiece);
    this.currPiece.updatePosition(true);
    // Add row clearing logic here?
    this.clearRows();
    this.currPiece = this.generatePiece();
  }

  rotatePiece() {
    this.currPiece.rotate();
    // this.clearRows();
  }

  clearRows() {
    let rowsToClear = [];
    for (let rowIdx = this.numRows - 1; rowIdx >= 0; rowIdx--) {
      let row = this.tilesOccupied.map((col, colIdx) => {
        return this.tilesOccupied[colIdx][rowIdx];
      });
      if (row.reduce((a, b) => a + b, 0) === this.numCols) {
        rowsToClear.push(rowIdx);
      };
    }

    // this.pieces.forEach(piece => {
    //   let []
    // });
  }

//   gameOver() {
//     if (this.filledTiles[3][0] || this.filledTiles[4][0] || this.filledTiles[5][0] || this.filledTiles[6][0]) {
//       return true;
//     }
//     return false;
//   }
}

export default Game;
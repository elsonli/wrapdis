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
    this.gridWidth = GameUtils.GRID_WIDTH;
    this.gridHeight = GameUtils.GRID_HEIGHT;
    this.gridColor = GameUtils.BG_COLOR;
    this.tileSize = GameUtils.TILE_SIZE;

    // this.shiftRowDown = this.shiftRowDown.bind(this);
    this.tilesOccupied = new Array(this.gridWidth).fill(0).map(() => {
      return new Array(this.gridHeight).fill(false);
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
    for (let idx = 0; idx < this.gridWidth; idx++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.tileSize * idx, 0);
      this.ctx.lineTo(this.tileSize * idx, this.tileSize * this.gridHeight);
      this.ctx.stroke();
    }

    // Construct the horizontal lines for the grid
    for (let idx = 0; idx < this.gridHeight; idx++) {
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
    this.currPiece = this.generatePiece();
  }

  rotatePiece() {
    this.currPiece.rotate();
    this.clearRows();
  }

  clearRows() {
    for (let rowIdx = 0; rowIdx < this.gridHeight; rowIdx++) {
      let row = this.tilesOccupied.map((col, colIdx) => this.tilesOccupied[colIdx][rowIdx]);
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
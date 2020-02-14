import Piece from "./piece";
import * as GameUtils from "./utils";
import allTetrominos from "./tetromino";

class Game {
  constructor(ctx, controller) {
    this.ctx = ctx;
    this.pieces = [];
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
    // this.currPiece.updatePosition(true);
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

  // Issue: Multi row clears with a gap in between leaves empty row in the middle
  // shiftRowDown(grid, rowIdx) {
  //   for (let idx = rowIdx; idx > 0; idx--) {
  //     if (idx <= rowIdx) {
  //       for (let jdx = 0; jdx < grid[0].length; jdx++) {
  //         grid[idx][jdx] = grid[idx - 1][jdx];
  //         if (grid[idx][jdx]) {
  //           grid[idx][jdx].pos[1] += 1;
  //         }
  //       }
  //     }
  //   }
  //   grid[0] = new Array(grid[0].length);
  // }

  // clearRow() {
    // Keep track of rows that have been cleared
    // let clearedRows = [];

    // Construct a transposed game board to check for filled rows
  //   const transposed = new Array(this.gridHeight).fill(0).map(() => {
  //     return new Array(this.gridWidth);
  //   });
  //   for (let idx = 0; idx < transposed.length; idx++) {
  //     for (let jdx = 0; jdx < transposed[0].length; jdx++) {
  //       transposed[idx][jdx] = this.filledTiles[jdx][idx];
  //     }
  //   }
  //   for (let idx = 0; idx < transposed.length; idx++) {
  //     const row = transposed[idx];
  //     if (row.every(block => block)) {
  //       clearedRows.push(idx);
  //       for (let jdx = 0; jdx < row.length; jdx++) {
  //         const currBlock = transposed[idx][jdx];
  //         currBlock.toggleOff();
  //       }
  //     }
  //   }

  //   clearedRows = clearedRows.reverse();
  //   clearedRows.forEach(rowIdx => this.shiftRowDown(transposed, rowIdx));

  //   for (let idx = 0; idx < this.filledTiles.length; idx++) {
  //     for (let jdx = 0; jdx < this.filledTiles[0].length; jdx++) {
  //       this.filledTiles[idx][jdx] = transposed[jdx][idx];
  //     }
  //   }

  //   this.score += clearedRows.length;
  // }

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

//   stepRight() {
//     if (!this.checkCollisions()) { this.currPiece.move(this.filledTiles, 0, 1) }
//   }

  // stepLeft() {
    // if (!this.checkCollisions()) { this.currPiece.move(this.filledTiles, 0, -1) }
  // }

  stepDown() {
    if (this.currPiece.validPosition()) {
      this.currPiece.moveDown();
    } else {
      this.pieces.push(this.currPiece);
      this.currPiece.updatePosition(true);
      this.currPiece = this.generatePiece();
    }
//     if (!this.checkCollisions()) { this.currPiece.move(this.filledTiles, 1, 1) }
  }

//   dropPiece() {
//     while (!this.checkCollisions()) { this.currPiece.move(this.filledTiles, 1, 1) }
//   }

//   rotatePiece() {
//     this.currPiece.rotate();
//   }

//   gameOver() {
//     if (this.filledTiles[3][0] || this.filledTiles[4][0] || this.filledTiles[5][0] || this.filledTiles[6][0]) {
//       return true;
//     }
//     return false;
//   }
}

export default Game;
import Piece from "./piece";
import * as GameUtils from "./utils";
import allTetrominos from "./tetromino";

class Game {
  constructor(ctx, controller) {
    this.ctx = ctx;
    this.pieces = [];
    this.controller = controller;
    this.score = 0;

    this.gridWidth = GameUtils.GRID_WIDTH;
    this.gridHeight = GameUtils.GRID_HEIGHT;
    this.tileSize = GameUtils.TILE_SIZE;

    this.generateNextPiece();

    this.checkBlock = this.checkBlock.bind(this);
    this.applyToBlocks = this.applyToBlocks.bind(this);
    this.shiftRowDown = this.shiftRowDown.bind(this);
    this.filledTiles = new Array(this.gridWidth).fill(0).map(() => {
      return new Array(this.gridHeight);
    });
  }
  
  // Assigns `this.currPiece` to be a random and new Piece
  generateNextPiece() {
    const allTetrominoKeys = Object.keys(allTetrominos);
    // const randKey = allTetrominoKeys[Math.floor(Math.random() * allTetrominoKeys.length)];
    // const randTetromino = JSON.parse(JSON.stringify(allTetrominos[randKey]))
    const randTetromino = JSON.parse(JSON.stringify(allTetrominos["tetrominoI"]));
    this.currPiece = new Piece(randTetromino, this, this.ctx);
    return this.currPiece;
  }

  // Applies a function that takes in a block to every block of `this.currPiece`
  applyToBlocks(func) {
    return this.currPiece.blocks.map(block => func(block));
  }

  checkBlock(block) {
    let [xPos, yPos] = block.pos;
    if (xPos >= 0 && xPos < GameUtils.GRID_WIDTH) {
      return (yPos >= GameUtils.GRID_HEIGHT - 1) || this.filledTiles[xPos][yPos + 1];
    }
    return false;
  }

  // Issue: Multi row clears with a gap in between leaves empty row in the middle
  shiftRowDown(grid, rowIdx) {
    for (let idx = rowIdx; idx > 0; idx--) {
      if (idx <= rowIdx) {
        for (let jdx = 0; jdx < grid[0].length; jdx++) {
          grid[idx][jdx] = grid[idx - 1][jdx];
          if (grid[idx][jdx]) {
            grid[idx][jdx].pos[1] += 1;
          }
        }
      }
    }
    grid[0] = new Array(grid[0].length);
  }

  clearRow() {
    // Keep track of rows that have been cleared
    let clearedRows = [];

    // Construct a transposed game board to check for filled rows
    const transposed = new Array(this.gridHeight).fill(0).map(() => {
      return new Array(this.gridWidth);
    });
    for (let idx = 0; idx < transposed.length; idx++) {
      for (let jdx = 0; jdx < transposed[0].length; jdx++) {
        transposed[idx][jdx] = this.filledTiles[jdx][idx];
      }
    }
    for (let idx = 0; idx < transposed.length; idx++) {
      const row = transposed[idx];
      if (row.every(block => block)) {
        clearedRows.push(idx);
        for (let jdx = 0; jdx < row.length; jdx++) {
          const currBlock = transposed[idx][jdx];
          currBlock.toggleOff();
        }
      }
    }

    clearedRows = clearedRows.reverse();
    clearedRows.forEach(rowIdx => this.shiftRowDown(transposed, rowIdx));

    for (let idx = 0; idx < this.filledTiles.length; idx++) {
      for (let jdx = 0; jdx < this.filledTiles[0].length; jdx++) {
        this.filledTiles[idx][jdx] = transposed[jdx][idx];
      }
    }

    this.score += clearedRows.length;
  }

  checkCollisions() {
    if (this.applyToBlocks(this.checkBlock).some(bool => bool)) {
      this.applyToBlocks(block => {
        this.filledTiles[block.pos[0]][block.pos[1]] = block
      });
      this.pieces.push(this.currPiece);
      this.clearRow();
      this.generateNextPiece();
      return true;
    }
    return false;
  }

  draw() {
    // Background for the Grid
    this.ctx.clearRect(0, 0, GameUtils.DIM_X, GameUtils.DIM_Y);
    this.ctx.fillStyle = GameUtils.BG_COLOR;
    this.ctx.fillRect(0, 0, GameUtils.DIM_X, GameUtils.DIM_Y);
    
    // Constructing the Grid
    this.ctx.strokeStyle = "#777777";
    for (let idx = 0; idx < this.gridWidth; idx++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.tileSize * idx, 0);
      this.ctx.lineTo(this.tileSize * idx, GameUtils.TILE_SIZE * GameUtils.GRID_HEIGHT);
      this.ctx.stroke();
    }
    for (let idx = 0; idx < this.gridHeight; idx++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.tileSize * idx)
      this.ctx.lineTo(GameUtils.DIM_X, this.tileSize * idx);
      this.ctx.stroke();
    }

    // Rendering a Piece
    for (let idx = 0; idx < this.pieces.length; idx++) {
      const currPiece = this.pieces[idx];
      currPiece.draw(this.ctx);
    }
    this.currPiece.draw(this.ctx);
  }

  stepRight() {
    if (!this.checkCollisions()) { this.currPiece.move(this.filledTiles, 0, 1) }
  }

  stepLeft() {
    if (!this.checkCollisions()) { this.currPiece.move(this.filledTiles, 0, -1) }
  }

  stepDown() {
    if (!this.checkCollisions()) { this.currPiece.move(this.filledTiles, 1, 1) }
  }

  dropPiece() {
    while (!this.checkCollisions()) { this.currPiece.move(this.filledTiles, 1, 1) }
  }

  rotatePiece() {
    this.currPiece.rotate();
  }

  gameOver() {
    if (this.filledTiles[3][0] || this.filledTiles[4][0] || this.filledTiles[5][0] || this.filledTiles[6][0]) {
      return true;
    }
    return false;
  }
}

export default Game;
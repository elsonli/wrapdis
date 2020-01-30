import Piece from "./piece";
import * as GameUtils from "./utils";
import allTetrominos from "./tetromino";

class Game {
  constructor(ctx, controller) {
    this.ctx = ctx;
    this.pieces = [];
    this.controller = controller;

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
    const randKey = allTetrominoKeys[Math.floor(Math.random() * allTetrominoKeys.length)];
    const randTetromino = JSON.parse(JSON.stringify(allTetrominos[randKey]))
    this.currPiece = new Piece(randTetromino, this, this.ctx);
    return this.currPiece;
  }

  // Applies a function that takes in a block to every block of `this.currPiece`
  applyToBlocks(func) {
    return this.currPiece.blocks.map(block => func(block));
  }

  // Checks if a block is occupied, within bounds, not necessarily an integer
  checkBlock(block) {
    let [xPos, yPos] = block.pos;
    if (xPos >= 0 && xPos < GameUtils.GRID_WIDTH) {
      return (yPos >= GameUtils.GRID_HEIGHT - 1) || this.filledTiles[xPos][yPos + 1];
    }
    return false;
  }

  // Shifts a single row down, but leaves an empty square
  shiftRowDown(grid, rowIdx) {
    const row = grid[rowIdx - 1];
    if (row) {
      row.map(block => {
        if (block) { block.pos[1] += 1 }
      });
    }
  }

  clearRow() {
    // Keep track of rows that have been cleared
    // const clearedRows = [];

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
        // clearedRows.push(idx);
        for (let jdx = 0; jdx < transposed[0].length; jdx++) {
          const currBlock = transposed[idx][jdx];
          currBlock.toggleOff();
        }
      }
    }

    // console.log(clearedRows);
    // this.shiftRowDown(transposed, clearedRows[0]);

    // Clear clearedRows
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
      this.ctx.lineTo(this.tileSize * idx, GameUtils.DIM_Y);
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
}

export default Game;
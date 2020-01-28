import Piece from "./piece";
import * as GameUtil from "./utils";
import allTetrominos from "./tetromino";

class Game {
  constructor() {
    this.gridWidth = 10;
    this.gridHeight = 20;
    this.tileSize = 40;
    this.pieces = [];
    this.generateNextPiece();
    // this.filledTiles = new Array(10).fill(0).map(() => new Array(20).fill(false));
  }
  
  generateNextPiece() {
    const allTetrominoKeys = Object.keys(allTetrominos);
    const randKey = allTetrominoKeys[Math.floor(Math.random() * allTetrominoKeys.length)];
    const randTetromino = JSON.parse(JSON.stringify(allTetrominos[randKey]))
    this.currPiece = new Piece(randTetromino);
    return this.currPiece;
  }

  checkCollisions() {
    if (
      this.currPiece.block1[1] >= 5 ||
      this.currPiece.block2[1] >= 5 ||
      this.currPiece.block3[1] >= 5 ||
      this.currPiece.block4[1] >= 5
    ) {
      this.pieces.push(this.currPiece);
      this.generateNextPiece();
      return true;
    } else {
      return false;
    }
  }

  draw(ctx) {
    // Background for the Grid
    ctx.clearRect(0, 0, GameUtil.DIM_X, GameUtil.DIM_Y);
    ctx.fillStyle = GameUtil.BG_COLOR;
    ctx.fillRect(0, 0, GameUtil.DIM_X, GameUtil.DIM_Y);
    
    // Constructing the Grid
    ctx.strokeStyle = "#777777";
    for (let idx = 0; idx < this.gridWidth; idx++) {
      ctx.beginPath();
      ctx.moveTo(this.tileSize * idx, 0);
      ctx.lineTo(this.tileSize * idx, 800);
      ctx.stroke();
    }
    for (let idx = 0; idx < this.gridHeight; idx++) {
      ctx.beginPath();
      ctx.moveTo(0, this.tileSize * idx)
      ctx.lineTo(400, this.tileSize * idx);
      ctx.stroke();
    }

    // Rendering a Piece
    for (let idx = 0; idx < this.pieces.length; idx++) {
      const currPiece = this.pieces[idx];
      currPiece.draw(ctx);
    }
    this.currPiece.draw(ctx);
  }

  step() {
    if (!this.checkCollisions()) { this.currPiece.move() }
  }
}

export default Game;
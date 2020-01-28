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
    this.filledTiles = new Array(10).fill(0).map(() => new Array(20).fill(false));
  }
  
  generateNextPiece() {
    const allTetrominoKeys = Object.keys(allTetrominos);
    const randKey = allTetrominoKeys[Math.floor(Math.random() * allTetrominoKeys.length)];
    const randTetromino = JSON.parse(JSON.stringify(allTetrominos[randKey]))
    this.currPiece = new Piece(randTetromino);
    return this.currPiece;
  }

  checkCollisions() {
    const [block1x, block1y] = this.currPiece.block1;
    const [block2x, block2y] = this.currPiece.block2;
    const [block3x, block3y] = this.currPiece.block3;
    const [block4x, block4y] = this.currPiece.block4;
    if (
      this.filledTiles[block1x][block1y + 1] || block1y === this.gridHeight - 1 ||
      this.filledTiles[block2x][block2y + 1] || block2y === this.gridHeight - 1 ||
      this.filledTiles[block3x][block3y + 1] || block3y === this.gridHeight - 1 ||
      this.filledTiles[block4x][block4y + 1] || block4y === this.gridHeight - 1
    ) {
      this.filledTiles[block1x][block1y] = true;
      this.filledTiles[block2x][block2y] = true;
      this.filledTiles[block3x][block3y] = true;
      this.filledTiles[block4x][block4y] = true;
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
    if (!this.checkCollisions()) { this.currPiece.move(this.filledTiles) }
  }
}

export default Game;
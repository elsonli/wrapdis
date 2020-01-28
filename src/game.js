import Piece from "./piece";
import * as GameUtil from "./utils";
import * as Tetrominos from "./tetromino";

class Game {
  constructor() {
    this.gridWidth = 10;
    this.gridHeight = 20;
    this.tileSize = 40;
  }

  draw(ctx) {
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

    let piece = new Piece(Tetrominos.tetrominoL);
    piece.draw(ctx);
  }
}

export default Game;
class Piece {
  constructor(tetromino, game) {
    this.block1 = tetromino.block1;
    this.block2 = tetromino.block2;
    this.block3 = tetromino.block3;
    this.block4 = tetromino.block4;
    this.color = tetromino.color;
    this.image = new Image();
    this.image.src = tetromino.image;
    this.game = game;
  }
  
  // Draws a Piece with its color and background image
  drawPieceBackground(block) {
    const tileSize = this.game.tileSize;
    this.game.ctx.fillRect(
      block[0] * tileSize,
      block[1] * tileSize,
      tileSize,
      tileSize
    );
  }

  drawPieceImage(block) {
    const tileSize = this.game.tileSize;
    this.game.ctx.drawImage(
      this.image,
      block[0] * tileSize,
      block[1] * tileSize,
      tileSize,
      tileSize
    );
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    this.drawPieceBackground(this.block1);
    this.drawPieceBackground(this.block2);
    this.drawPieceBackground(this.block3);
    this.drawPieceBackground(this.block4);
    this.drawPieceImage(this.block1);
    this.drawPieceImage(this.block2);
    this.drawPieceImage(this.block3);
    this.drawPieceImage(this.block4);
  }

  fillTiles(filledTiles) {
    filledTiles[this.block1[0]][this.block1[1]] = false;
    filledTiles[this.block2[0]][this.block2[1]] = false;
    filledTiles[this.block3[0]][this.block3[1]] = false;
    filledTiles[this.block4[0]][this.block4[1]] = false;
  }

  move(filledTiles, direction, amount) {
    this.fillTiles(filledTiles);
    this.block1[direction] += amount;
    this.block2[direction] += amount;
    this.block3[direction] += amount;
    this.block4[direction] += amount;
  }
}

export default Piece;
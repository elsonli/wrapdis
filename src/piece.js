class Piece {
  constructor(tetromino) {
    this.block1 = tetromino.block1;
    this.block2 = tetromino.block2;
    this.block3 = tetromino.block3;
    this.block4 = tetromino.block4;
    this.color = tetromino.color;
    this.image = new Image();
    this.image.src = tetromino.image;
  }
  
  // Draws a Piece with its color and background image
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.block1[0] * 40, this.block1[1] * 40, 40, 40);
    ctx.fillRect(this.block2[0] * 40, this.block2[1] * 40, 40, 40);
    ctx.fillRect(this.block3[0] * 40, this.block3[1] * 40, 40, 40);
    ctx.fillRect(this.block4[0] * 40, this.block4[1] * 40, 40, 40);
    ctx.drawImage(this.image, this.block1[0] * 40, this.block1[1] * 40, 40, 40)
    ctx.drawImage(this.image, this.block2[0] * 40, this.block2[1] * 40, 40, 40)
    ctx.drawImage(this.image, this.block3[0] * 40, this.block3[1] * 40, 40, 40)
    ctx.drawImage(this.image, this.block4[0] * 40, this.block4[1] * 40, 40, 40)
  }

  move(filledTiles) {
    filledTiles[this.block1[0]][this.block1[1]] = false;
    filledTiles[this.block2[0]][this.block2[1]] = false;
    filledTiles[this.block3[0]][this.block3[1]] = false;
    filledTiles[this.block4[0]][this.block4[1]] = false;
    this.block1[1] += 1;
    this.block2[1] += 1;
    this.block3[1] += 1;
    this.block4[1] += 1;
  }
}

export default Piece;
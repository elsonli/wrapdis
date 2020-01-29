class Piece {
  constructor(tetromino, game) {
    this.blocks = [
      tetromino.block1,
      tetromino.block2,
      tetromino.block3,
      tetromino.block4
    ]
    this.block1 = tetromino.block1;
    this.block2 = tetromino.block2;
    this.block3 = tetromino.block3;
    this.block4 = tetromino.block4;
    this.color = tetromino.color;
    this.image = new Image();
    this.image.src = tetromino.image;
    this.game = game;
    this.applyToBlocks = this.applyToBlocks.bind(this);
    this.drawPieceBackground = this.drawPieceBackground.bind(this);
    this.drawPieceImage = this.drawPieceImage.bind(this);
  }
  
  applyToBlocks(func) {
    this.blocks.forEach(block => func(block));
  };

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
    this.applyToBlocks(this.drawPieceBackground);
    this.applyToBlocks(this.drawPieceImage);
  }

  fillTiles(filledTiles) {
    this.applyToBlocks(block => {
      filledTiles[block[0]][block[1]] = false;
    })
  }

  move(filledTiles, direction, amount) {
    this.fillTiles(filledTiles);
    if (
      direction === 0 && (
        this.block1[0] === 0 || this.block1[1] === this.game.gridWidth ||
        this.block2[0] === 0 || this.block2[1] === this.game.gridWidth ||
        this.block3[0] === 0 || this.block3[1] === this.game.gridWidth ||
        this.block4[0] === 0 || this.block4[1] === this.game.gridWidth
      )
    ) {
      this.applyToBlocks(block => block[direction] += amount);
    } else {
      this.applyToBlocks(block => block[direction] += amount);
    }
  }

  rotate(filledTiles) {
    this.fillTiles(filledTiles);
    const temp = this.block1;
    this.block1 = this.block2;
    this.block2 = this.block3;
    this.block3 = this.block4;
    this.block4 = temp;
  }
}

export default Piece;
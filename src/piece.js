import * as GameUtils from "./utils";

class Piece {
  constructor(tetromino, game) {
    ({ block1: this.block1,
       block2: this.block2,
       block3: this.block3,
       block4: this.block4 } = tetromino);
    this.blocks = [this.block1, this.block2, this.block3, this.block4];
    this.color = tetromino.color;
    this.image = new Image();
    this.image.src = tetromino.image;
    this.game = game;

    this.applyToBlocks = this.applyToBlocks.bind(this);
    this.drawPieceBackground = this.drawPieceBackground.bind(this);
    this.drawPieceImage = this.drawPieceImage.bind(this);
  }

  applyToBlocks(func) {
    this.blocks.map(block => func(block));
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

  fillTiles(filledTiles, bool) {
    this.applyToBlocks(block => {
      let [xPos, yPos] = block;
      // if (xPos >= 0 && xPos <= GameUtils.GRID_WIDTH - 1 && yPos <= GameUtils.GRID_HEIGHT - 1) {
        filledTiles[xPos][yPos] = bool;
      // }
    });
  }

  // Direction 0: Moving horizontally
  // Direction 1: Moving vertically
  // Amount -1: Moving left
  // Amount 1: Moving right
  move(filledTiles, direction, amount) {
    
    if (direction === 0) {
      if ((amount === 1) && (
        (this.block1[0] === GameUtils.GRID_WIDTH - 1) ||
        (this.block2[0] === GameUtils.GRID_WIDTH - 1) ||
        (this.block3[0] === GameUtils.GRID_WIDTH - 1) ||
        (this.block4[0] === GameUtils.GRID_WIDTH - 1)
      )) {
        this.fillTiles(filledTiles, false);
        this.applyToBlocks(block => block[direction] += 0);
      } else if ((amount === -1) && (
        (this.block1[0] === 0) ||
        (this.block2[0] === 0) ||
        (this.block3[0] === 0) ||
        (this.block4[0] === 0)
      )) {
        this.fillTiles(filledTiles, false);
        this.applyToBlocks(block => block[direction] += 0);
      } else {
        this.fillTiles(filledTiles, false);
        this.applyToBlocks(block => block[direction] += amount);
      }
    } else {
      // Direction is 1
      
      if (
        (this.block1[1] + 1 <= GameUtils.GRID_HEIGHT - 1 || filledTiles[this.block1[0]][this.block1[1] + 1]) ||
        (this.block2[1] + 1 <= GameUtils.GRID_HEIGHT - 1 || filledTiles[this.block2[0]][this.block2[1] + 1]) ||
        (this.block3[1] + 1 <= GameUtils.GRID_HEIGHT - 1 || filledTiles[this.block3[0]][this.block3[1] + 1]) ||
        (this.block4[1] + 1 <= GameUtils.GRID_HEIGHT - 1 || filledTiles[this.block4[0]][this.block4[1] + 1])
        ) {
          // this.fillTiles(filledTiles, false);
          this.applyToBlocks(block => block[direction] += amount);
          // this.fillTiles(filledTiles, true);

        } else {
          this.applyToBlocks(block => block[direction] += amount);
          this.fillTiles(filledTiles, true);
          // console.log(this.filledTiles[this.block1[0]][this.block[1]], "block1")
      }
    }
  }

  // rotate(filledTiles) {
  //   this.fillTiles(filledTiles);
  //   const temp = this.block1;
  //   this.block1 = this.block2;
  //   this.block2 = this.block3;
  //   this.block3 = this.block4;
  //   this.block4 = temp;
  // }
}

export default Piece;
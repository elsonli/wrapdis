import Block from "./block";
import * as GameUtils from "./utils";

class Piece {
  constructor(tetromino, game) {
    ({ block1: this.block1,
       block2: this.block2,
       block3: this.block3,
       block4: this.block4 } = tetromino);
    this.blocks = [
      new Block(this.block1),
      new Block(this.block2),
      new Block(this.block3),
      new Block(this.block4)
    ];
    this.color = tetromino.color;
    this.orientation = tetromino.orientation;
    this.image = new Image();
    this.image.src = tetromino.image;
    this.game = game;

    this.applyToBlocks = this.applyToBlocks.bind(this);
    this.draw = this.draw.bind(this);
    this.drawPieceImage = this.drawPieceImage.bind(this);
    this.drawPieceBackground = this.drawPieceBackground.bind(this);
  }

  applyToBlocks(func, ctx) {
    this.blocks.map(block => func(block, ctx));
  };

  // Draws a Piece with its color and background image
  drawPieceBackground(block, ctx) {
    const tileSize = this.game.tileSize;
    if (block.filled) {
      ctx.fillRect(
        block.pos[0] * tileSize,
        block.pos[1] * tileSize,
        tileSize,
        tileSize
        );
    } else {
      ctx.fillStyle = "black";
      ctx.fillRect(
        block.pos[0] * tileSize,
        block.pos[1] * tileSize,
        tileSize,
        tileSize
      );
    }
  }

  drawPieceImage(block, ctx) {
    const tileSize = this.game.tileSize;
    if (block.filled) {
      ctx.drawImage(
        this.image,
        block.pos[0] * tileSize,
        block.pos[1] * tileSize,
        tileSize,
        tileSize
      );
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    this.applyToBlocks(this.drawPieceBackground, ctx);
    this.applyToBlocks(this.drawPieceImage, ctx);

    // Constructing the Grid
    ctx.strokeStyle = "#777777";
    for (let idx = 0; idx < GameUtils.GRID_WIDTH; idx++) {
      ctx.beginPath();
      ctx.moveTo(GameUtils.TILE_SIZE * idx, 0);
      ctx.lineTo(GameUtils.TILE_SIZE * idx, GameUtils.DIM_Y);
      ctx.stroke();
    }
    for (let idx = 0; idx < GameUtils.GRID_HEIGHT; idx++) {
      ctx.beginPath();
      ctx.moveTo(0, GameUtils.TILE_SIZE * idx)
      ctx.lineTo(GameUtils.DIM_X, GameUtils.TILE_SIZE * idx);
      ctx.stroke();
    }
  }

  fillTiles(filledTiles, bool) {
    this.applyToBlocks(block => {
      let [xPos, yPos] = block.pos;
      if (bool) {
        filledTiles[xPos][yPos] = block;
      } else {
        filledTiles[xPos][yPos] = undefined;
      }
    });
  }

  // Direction 0: Moving horizontally
  // Direction 1: Moving vertically
  // Amount -1: Moving left
  // Amount 1: Moving right
  move(filledTiles, direction, amount) {
    
    if (direction === 0) {
      if ((amount === 1) && (this.blocks.map(block => {
        return block.pos[0] === GameUtils.GRID_WIDTH - 1;
      }).some(ele => ele))) {
        this.fillTiles(filledTiles, undefined);
        this.applyToBlocks(block => block.pos[direction] += 0);
      } else if ((amount === -1) && (this.blocks.map(block => {
        return block.pos[0] === 0;
      }).some(ele => ele))) {
        this.fillTiles(filledTiles, undefined);
        this.applyToBlocks(block => block.pos[direction] += 0);
      } else {
        this.fillTiles(filledTiles, undefined);
        this.applyToBlocks(block => block.pos[direction] += amount);
      }
    } else {
      // Direction is 1
      if (
        (this.blocks.map(block => block.pos[1] + 1 <= GameUtils.GRID_HEIGHT - 1)).some(ele => ele) ||
        (this.blocks.map(block => filledTiles[block.pos[0]][block.pos[1]] + 1)).some(ele => ele)
      ) {
        this.applyToBlocks(block => block.pos[direction] += amount);
      } else {
        this.applyToBlocks(block => block.pos[direction] += amount);
        this.fillTiles(filledTiles, true);
      }
    }
  }

  rotate() {
    console.log(this.orientation, "start");

    if (this.orientation === 0) {
      if (this.color === "lightblue") {
        this.blocks[0].pos[0] += 2;
        this.blocks[0].pos[1] += 0;
        this.blocks[1].pos[0] += 1;
        this.blocks[1].pos[1] += 1;
        this.blocks[2].pos[0] += 0;
        this.blocks[2].pos[1] += 2;
        this.blocks[3].pos[0] += -1;
        this.blocks[3].pos[1] += 3;
      } else if (this.color === "green") {
        this.blocks[0].pos[0] += 0;
        this.blocks[0].pos[1] += 0;
        this.blocks[1].pos[0] += -1;
        this.blocks[1].pos[1] += -1;
        this.blocks[2].pos[0] += 2;
        this.blocks[2].pos[1] += 0;
        this.blocks[3].pos[0] += 1;
        this.blocks[3].pos[1] += -1;
      } else if (this.color === "red") {
        
      } else if (this.color === "yellow") {

      } else if (this.color === "purple") {

      } else if (this.color === "blue") {

      } else {

      }
    } else if (this.orientation === 1) {
      if (this.color === "lightblue") {
        this.blocks[0].pos[0] += 1;
        this.blocks[0].pos[1] += 1;
        this.blocks[1].pos[0] += 0;
        this.blocks[1].pos[1] += 0;
        this.blocks[2].pos[0] += -1;
        this.blocks[2].pos[1] += -1;
        this.blocks[3].pos[0] += -2;
        this.blocks[3].pos[1] += -2;
      } else if (this.color === "green") {
        this.blocks[0].pos[0] += 0;
        this.blocks[0].pos[1] += 0;
        this.blocks[1].pos[0] += 1;
        this.blocks[1].pos[1] += 1;
        this.blocks[2].pos[0] += -2;
        this.blocks[2].pos[1] += 0;
        this.blocks[3].pos[0] += -1;
        this.blocks[3].pos[1] += 1;
      } else if (this.color === "red") {

      } else if (this.color === "yellow") {

      } else if (this.color === "purple") {

      } else if (this.color === "blue") {

      } else {

      }
    } else if (this.orientation === 2) {
      if (this.color === "lightblue") {
        this.blocks[0].pos[0] += 0;
        this.blocks[0].pos[1] += 0;
        this.blocks[1].pos[0] += 1;
        this.blocks[1].pos[1] += 1;
        this.blocks[2].pos[0] += -2;
        this.blocks[2].pos[1] += 0;
        this.blocks[3].pos[0] += -1;
        this.blocks[3].pos[1] += 1;
      } else if (this.color === "green") {
        this.blocks[0].pos[0] += 0;
        this.blocks[0].pos[1] += 0;
        this.blocks[1].pos[0] += -1;
        this.blocks[1].pos[1] += -1;
        this.blocks[2].pos[0] += 2;
        this.blocks[2].pos[1] += 0;
        this.blocks[3].pos[0] += 1;
        this.blocks[3].pos[1] += -1;
      } else if (this.color === "red") {

      } else if (this.color === "yellow") {

      } else if (this.color === "purple") {

      } else if (this.color === "blue") {

      } else {

      }
    } else {
      if (this.color === "lightblue") {
        this.blocks[0].pos[0] += -1;
        this.blocks[0].pos[1] += -3;
        this.blocks[1].pos[0] += 0;
        this.blocks[1].pos[1] += -2;
        this.blocks[2].pos[0] += 1;
        this.blocks[2].pos[1] += -1;
        this.blocks[3].pos[0] += 2;
        this.blocks[3].pos[1] += 0;
      } else if (this.color === "green") {
        this.blocks[0].pos[0] += 0;
        this.blocks[0].pos[1] += 0;
        this.blocks[1].pos[0] += 1;
        this.blocks[1].pos[1] += 1;
        this.blocks[2].pos[0] += -2;
        this.blocks[2].pos[1] += 0;
        this.blocks[3].pos[0] += -1;
        this.blocks[3].pos[1] += 1;
      } else if (this.color === "red") {

      } else if (this.color === "yellow") {

      } else if (this.color === "purple") {

      } else if (this.color === "blue") {

      } else {

      }
    }
    this.orientation = (this.orientation + 1) % 4;
    console.log(this.orientation, "end");
    console.log(this.blocks.map(block => block.pos));

  }
}

export default Piece;
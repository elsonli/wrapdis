import Block from "./block";
import * as GameUtils from "./utils";

class Piece {
  constructor(tetromino, game) {
    this.pos = [3, -2];
    this.color = tetromino.color;
    this.orientation = tetromino.orientation;
    this.orientations = tetromino.orientations;
    this.game = game;

    this.updatePosition = this.updatePosition.bind(this);
  }

  calculateShift(shiftAmt) {
    let xShift = Math.abs(15 - shiftAmt) % 4;
    let yShift = Math.floor((15 - shiftAmt) / 4);
    return [xShift, yShift];
  }

  draw() {
    let [xPos, yPos] = this.pos;
    
    // Iterates over the bits in currOrientation (ex: 0x0F00) from left to right
    let currOrientation = this.orientations[this.orientation];

    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {
      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;
      let [xShift, yShift] = this.calculateShift(shiftAmt);

      // Only need to color in the blocks with a 1 bit
      if (currBit) {
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillRect(
          (xPos + xShift) * this.game.tileSize,
          (yPos + yShift) * this.game.tileSize,
          this.game.tileSize,
          this.game.tileSize
        );
      } else {
        // REMOVE
        // this.game.ctx.fillStyle = "#444444";
        // this.game.ctx.fillRect(
        //   (xPos + xShift) * this.game.tileSize,
        //   (yPos + yShift) * this.game.tileSize,
        //   this.game.tileSize,
        //   this.game.tileSize
        // );
      }
    }
  }

  // Returns a boolean whether or not the next position is valid
  validPosition() {
    let [xPos, yPos] = this.pos;
    let currOrientation = this.orientations[this.orientation];
    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {
      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;
      let [xShift, yShift] = this.calculateShift(shiftAmt);
      let tileOccupied = this.game.tilesOccupied[xPos + xShift][yPos + yShift + 1];
      let notWithinBounds = (yPos + yShift + 1) >= this.game.gridHeight;
      if (currBit && (tileOccupied || notWithinBounds)) {
        console.log(this.game.tilesOccupied);
        return false;
      }
    }
    return true;
  }

  updatePosition(bool) {
    let [xPos, yPos] = this.pos;
    let currOrientation = this.orientations[this.orientation];
    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {
      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;
      let [xShift, yShift] = this.calculateShift(shiftAmt);
      if (currBit) {
        this.game.tilesOccupied[xPos + xShift][yPos + yShift] = bool;
      }
    }
  }

  moveDown() {
    this.pos[1] += 1;
  }

  // Direction 0: Moving horizontally
  // Direction 1: Moving vertically
  // Amount -1: Moving left
  // Amount 1: Moving right
  // move(filledTiles, direction, amount) {
    
  //   if (direction === 0) {
  //     if ((amount === 1) && (this.blocks.map(block => {
  //       return block.pos[0] === GameUtils.GRID_WIDTH - 1;
  //     }).some(ele => ele))) {
  //       this.fillTiles(filledTiles, undefined);
  //       this.applyToBlocks(block => block.pos[direction] += 0);
  //     } else if ((amount === -1) && (this.blocks.map(block => {
  //       return block.pos[0] === 0;
  //     }).some(ele => ele))) {
  //       this.fillTiles(filledTiles, undefined);
  //       this.applyToBlocks(block => block.pos[direction] += 0);
  //     } else {
  //       this.fillTiles(filledTiles, undefined);
  //       this.applyToBlocks(block => block.pos[direction] += amount);
  //     }
  //   } else {
      // Direction is 1
  //     if (
  //       (this.blocks.map(block => block.pos[1] + 1 <= GameUtils.GRID_HEIGHT - 1)).some(ele => ele) ||
  //       (this.blocks.map(block => filledTiles[block.pos[0]][block.pos[1]] + 1)).some(ele => ele)
  //     ) {
  //       this.applyToBlocks(block => block.pos[direction] += amount);
  //     } else {
  //       this.applyToBlocks(block => block.pos[direction] += amount);
  //       this.fillTiles(filledTiles, true);
  //     }
  //   }
  // }

  rotate() {
  //   if (this.orientation === 0) {
  //     if (this.color === "cyan") {
  //       this.blocks[0].pos[0] += 2;
  //       this.blocks[0].pos[1] += -1;
  //       this.blocks[1].pos[0] += 1;
  //       this.blocks[1].pos[1] += 0;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += 1;
  //       this.blocks[3].pos[0] += -1;
  //       this.blocks[3].pos[1] += 2;
  //     } else if (this.color === "green") {
  //       this.blocks[0].pos[0] += 0;
  //       this.blocks[0].pos[1] += 0;
  //       this.blocks[1].pos[0] += -1;
  //       this.blocks[1].pos[1] += -1;
  //       this.blocks[2].pos[0] += 2;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += 1;
  //       this.blocks[3].pos[1] += -1;
  //     } else if (this.color === "red") {
  //       this.blocks[0].pos[0] += 2;
  //       this.blocks[0].pos[1] += 0;
  //       this.blocks[1].pos[0] += 1;
  //       this.blocks[1].pos[1] += 1;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += -1;
  //       this.blocks[3].pos[1] += 1;
  //     } else if (this.color === "yellow") {
  //       this.blocks[0].pos[0] += 0;
  //       this.blocks[0].pos[1] += 0;
  //       this.blocks[1].pos[0] += 0;
  //       this.blocks[1].pos[1] += 0;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += 0;
  //       this.blocks[3].pos[1] += 0;
  //     } else if (this.color === "magenta") {
  //       this.blocks[0].pos[0] += 1;
  //       this.blocks[0].pos[1] += 1;
  //       this.blocks[1].pos[0] += 1;
  //       this.blocks[1].pos[1] += -1;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += -1;
  //       this.blocks[3].pos[1] += 1;
  //     } else if (this.color === "blue") {
  //       this.blocks[0].pos[0] += 2;
  //       this.blocks[0].pos[1] += -1;
  //       this.blocks[1].pos[0] += 1;
  //       this.blocks[1].pos[1] += -2;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += -1;
  //       this.blocks[3].pos[0] += -1;
  //       this.blocks[3].pos[1] += 0;
  //     } else {
  //       this.blocks[0].pos[0] += 1;
  //       this.blocks[0].pos[1] += 0;
  //       this.blocks[1].pos[0] += 1;
  //       this.blocks[1].pos[1] += 0;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += 1;
  //       this.blocks[3].pos[0] += 2;
  //       this.blocks[3].pos[1] += 1;
  //     }
  //   } else if (this.orientation === 1) {
  //     if (this.color === "cyan") {
  //       this.blocks[0].pos[0] += -2;
  //       this.blocks[0].pos[1] += 2;
  //       this.blocks[1].pos[0] += -1;
  //       this.blocks[1].pos[1] += 1;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += 1;
  //       this.blocks[3].pos[1] += -1;
  //     } else if (this.color === "green") {
  //       this.blocks[0].pos[0] += 0;
  //       this.blocks[0].pos[1] += 0;
  //       this.blocks[1].pos[0] += 1;
  //       this.blocks[1].pos[1] += 1;
  //       this.blocks[2].pos[0] += -2;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += -1;
  //       this.blocks[3].pos[1] += 1;
  //     } else if (this.color === "red") {
  //       this.blocks[0].pos[0] += -2;
  //       this.blocks[0].pos[1] += 0;
  //       this.blocks[1].pos[0] += -1;
  //       this.blocks[1].pos[1] += -1;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += 1;
  //       this.blocks[3].pos[1] += -1;
  //     } else if (this.color === "yellow") {
  //       this.blocks[0].pos[0] += 0;
  //       this.blocks[0].pos[1] += 0;
  //       this.blocks[1].pos[0] += 0;
  //       this.blocks[1].pos[1] += 0;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += 0;
  //       this.blocks[3].pos[1] += 0;
  //     } else if (this.color === "magenta") {
  //       this.blocks[0].pos[0] += -1;
  //       this.blocks[0].pos[1] += 1;
  //       this.blocks[1].pos[0] += 1;
  //       this.blocks[1].pos[1] += 1;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += -1;
  //       this.blocks[3].pos[1] += -1;
  //     } else if (this.color === "blue") {
  //       this.blocks[0].pos[0] += 0;
  //       this.blocks[0].pos[1] += 1;
  //       this.blocks[1].pos[0] += 1;
  //       this.blocks[1].pos[1] += 0;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += -1;
  //       this.blocks[3].pos[0] += -1;
  //       this.blocks[3].pos[1] += -2;
  //     } else {
  //       this.blocks[0].pos[0] += 1;
  //       this.blocks[0].pos[1] += 1;
  //       this.blocks[1].pos[0] += 0;
  //       this.blocks[1].pos[1] += 2;
  //       this.blocks[2].pos[0] += -1;
  //       this.blocks[2].pos[1] += 1;
  //       this.blocks[3].pos[0] += -2;
  //       this.blocks[3].pos[1] += 0;
  //     }
  //   } else if (this.orientation === 2) {
  //     if (this.color === "cyan") {
  //       this.blocks[0].pos[0] += 1;
  //       this.blocks[0].pos[1] += -2;
  //       this.blocks[1].pos[0] += 0;
  //       this.blocks[1].pos[1] += -1;
  //       this.blocks[2].pos[0] += -1;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += -2;
  //       this.blocks[3].pos[1] += 1;
  //     } else if (this.color === "green") {
  //       this.blocks[0].pos[0] += 0;
  //       this.blocks[0].pos[1] += 0;
  //       this.blocks[1].pos[0] += -1;
  //       this.blocks[1].pos[1] += -1;
  //       this.blocks[2].pos[0] += 2;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += 1;
  //       this.blocks[3].pos[1] += -1;
  //     } else if (this.color === "red") {
  //       this.blocks[0].pos[0] += 2;
  //       this.blocks[0].pos[1] += 0;
  //       this.blocks[1].pos[0] += 1;
  //       this.blocks[1].pos[1] += 1;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += -1;
  //       this.blocks[3].pos[1] += 1;
  //     } else if (this.color === "yellow") {
  //       this.blocks[0].pos[0] += 0;
  //       this.blocks[0].pos[1] += 0;
  //       this.blocks[1].pos[0] += 0;
  //       this.blocks[1].pos[1] += 0;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += 0;
  //       this.blocks[3].pos[1] += 0;
  //     } else if (this.color === "magenta") {
  //       this.blocks[0].pos[0] += -1;
  //       this.blocks[0].pos[1] += -1;
  //       this.blocks[1].pos[0] += -1;
  //       this.blocks[1].pos[1] += 1;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += 1;
  //       this.blocks[3].pos[1] += -1;
  //     } else if (this.color === "blue") {
  //       this.blocks[0].pos[0] += -1;
  //       this.blocks[0].pos[1] += 0;
  //       this.blocks[1].pos[0] += 0;
  //       this.blocks[1].pos[1] += 1;
  //       this.blocks[2].pos[0] += 1;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += 2;
  //       this.blocks[3].pos[1] += -1;
  //     } else {
  //       this.blocks[0].pos[0] += -1;
  //       this.blocks[0].pos[1] += 1;
  //       this.blocks[1].pos[0] += -2;
  //       this.blocks[1].pos[1] += 0;
  //       this.blocks[2].pos[0] += -1;
  //       this.blocks[2].pos[1] += -1;
  //       this.blocks[3].pos[0] += 0;
  //       this.blocks[3].pos[1] += -2;
  //     }
  //   } else {
  //     if (this.color === "cyan") {
  //       this.blocks[0].pos[0] += -1;
  //       this.blocks[0].pos[1] += 1;
  //       this.blocks[1].pos[0] += 0;
  //       this.blocks[1].pos[1] += 0;
  //       this.blocks[2].pos[0] += 1;
  //       this.blocks[2].pos[1] += -1;
  //       this.blocks[3].pos[0] += 2;
  //       this.blocks[3].pos[1] += -2;
  //     } else if (this.color === "green") {
  //       this.blocks[0].pos[0] += 0;
  //       this.blocks[0].pos[1] += 0;
  //       this.blocks[1].pos[0] += 1;
  //       this.blocks[1].pos[1] += 1;
  //       this.blocks[2].pos[0] += -2;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += -1;
  //       this.blocks[3].pos[1] += 1;
  //     } else if (this.color === "red") {
  //       this.blocks[0].pos[0] += -2;
  //       this.blocks[0].pos[1] += 0;
  //       this.blocks[1].pos[0] += -1;
  //       this.blocks[1].pos[1] += -1;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += 1;
  //       this.blocks[3].pos[1] += -1;
  //     } else if (this.color === "yellow") {
  //       this.blocks[0].pos[0] += 0;
  //       this.blocks[0].pos[1] += 0;
  //       this.blocks[1].pos[0] += 0;
  //       this.blocks[1].pos[1] += 0;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += 0;
  //       this.blocks[3].pos[1] += 0;
  //     } else if (this.color === "magenta") {
  //       this.blocks[0].pos[0] += 1;
  //       this.blocks[0].pos[1] += -1;
  //       this.blocks[1].pos[0] += -1;
  //       this.blocks[1].pos[1] += -1;
  //       this.blocks[2].pos[0] += 0;
  //       this.blocks[2].pos[1] += 0;
  //       this.blocks[3].pos[0] += 1;
  //       this.blocks[3].pos[1] += 1;
  //     } else if (this.color === "blue") {
  //       this.blocks[0].pos[0] += -1;
  //       this.blocks[0].pos[1] += -1;
  //       this.blocks[1].pos[0] += -2;
  //       this.blocks[1].pos[1] += 0;
  //       this.blocks[2].pos[0] += -1;
  //       this.blocks[2].pos[1] += 1;
  //       this.blocks[3].pos[0] += 0;
  //       this.blocks[3].pos[1] += 2;
  //     } else {
  //       this.blocks[0].pos[0] += -1;
  //       this.blocks[0].pos[1] += -2;
  //       this.blocks[1].pos[0] += 1;
  //       this.blocks[1].pos[1] += -2;
  //       this.blocks[2].pos[0] += 2;
  //       this.blocks[2].pos[1] += -1;
  //       this.blocks[3].pos[0] += 0;
  //       this.blocks[3].pos[1] += 1;
  //     }
  //   }
  //   this.orientation = (this.orientation + 1) % 4;
  }
}

export default Piece;
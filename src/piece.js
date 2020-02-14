class Piece {
  constructor(tetromino, game) {
    this.game = game;
    this.color = tetromino.color;
    this.pos = [Math.floor(this.game.gridWidth / 2) - 1, -2];
    this.orientation = tetromino.orientation;
    this.orientations = tetromino.orientations;
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

  // Returns a boolean whether or not the next horizontal position is valid
  validHorizontal(direction) {
    let [xPos, yPos] = this.pos;
    let currOrientation = this.orientations[this.orientation];
    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {
      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;
      let [xShift, yShift] = this.calculateShift(shiftAmt);
      let tileOccupied = this.game.tilesOccupied[xPos + xShift + direction][yPos + yShift];
      // let notWithinBounds = (yPos + yShift + 1) >= this.game.gridHeight;
      if (currBit && (tileOccupied)) {
        console.log(this.game.tilesOccupied);
        return false;
      }
    }
    return true;
  }

  // Returns a boolean whether or not the next vertical position is valid
  validVertical() {
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

  moveDown() { this.pos[1] += 1 }

  moveLeft() { this.pos[0] -= 1 }

  moveRight() { this.pos[0] += 1 }

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
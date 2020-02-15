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

      // Calculate new positions - newXPos needs to account for negative modulos
      let newXPos = (xPos + xShift) % this.game.gridWidth;
      newXPos = (newXPos + this.game.gridWidth) % this.game.gridWidth;
      let newYPos = yPos + yShift;

      // Only need to color in the blocks with a 1 bit
      if (currBit) {
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillRect(
          newXPos * this.game.tileSize,
          newYPos * this.game.tileSize,
          this.game.tileSize,
          this.game.tileSize
        );
      } else {
        // REMOVE
        // this.game.ctx.fillStyle = "#444444";
        // this.game.ctx.fillRect(
        //   newXPos * this.game.tileSize,
        //   newYPos * this.game.tileSize,
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

      // Calculate new positions - newXPos needs to account for negative modulos
      let newXPos = (xPos + xShift + direction) % this.game.gridWidth;
      newXPos = (newXPos + this.game.gridWidth) % this.game.gridWidth;
      let newYPos = yPos + yShift;

      let tileOccupied = this.game.tilesOccupied[newXPos][newYPos];
      if (currBit && tileOccupied) return false;
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

      // Calculate new positions - newXPos needs to account for negative modulos
      let newXPos = (xPos + xShift) % this.game.gridWidth;
      newXPos = (newXPos + this.game.gridWidth) % this.game.gridWidth;
      let newYPos = yPos + yShift + 1;

      let tileOccupied = this.game.tilesOccupied[newXPos][newYPos];
      let notWithinBounds = (yPos + yShift + 1) >= this.game.gridHeight;
      if (currBit && (tileOccupied || notWithinBounds)) return false;
    }
    return true;
  }

  updatePosition(bool) {
    let [xPos, yPos] = this.pos;
    let currOrientation = this.orientations[this.orientation];
    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {
      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;
      let [xShift, yShift] = this.calculateShift(shiftAmt);

      // Calculate new positions - newXPos needs to account for negative modulos
      let newXPos = (xPos + xShift) % this.game.gridWidth;
      newXPos = (newXPos + this.game.gridWidth) % this.game.gridWidth;
      let newYPos = yPos + yShift;

      if (currBit) this.game.tilesOccupied[newXPos][newYPos] = bool;
    }
  }

  moveDown() { this.pos[1] += 1 }

  moveLeft() { this.pos[0] -= 1 }

  moveRight() { this.pos[0] += 1 }

  rotate() {
    this.orientation = (this.orientation + 1) % 4;
  }
}

export default Piece;
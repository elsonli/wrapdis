class Piece {
  constructor(tetromino, game) {
    this.game = game;
    this.color = tetromino.color;
    this.pos = [Math.floor(this.game.numCols / 2) - 1, -2];
    this.orientation = tetromino.orientation;
    this.orientations = tetromino.orientations;

    this.recordPiece = this.recordPiece.bind(this);
  }

  // Calculates [colShift, rowShift] based on shiftAmt of an orientation
  calculateShift(shiftAmt) {
    let colShift = Math.abs(15 - shiftAmt) % 4;
    let rowShift = Math.floor((15 - shiftAmt) / 4);
    return [colShift, rowShift];
  }

  // Draws a piece onto the game board
  draw() {
    let [colPos, rowPos] = this.pos;
    
    // Iterates over the bits in currOrientation (ex: 0x0F00) from left to right
    let currOrientation = this.orientations[this.orientation];

    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {
      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;
      let [colShift, rowShift] = this.calculateShift(shiftAmt);

      // Calculate new positions - newColPos needs to account for negative modulos
      let newColPos = (colPos + colShift) % this.game.numCols;
      newColPos = (newColPos + this.game.numCols) % this.game.numCols;
      let newRowPos = rowPos + rowShift;

      // Only need to color in the blocks with a 1 bit
      if (currBit) {
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillRect(
          newColPos * this.game.tileSize,
          newRowPos * this.game.tileSize,
          this.game.tileSize,
          this.game.tileSize
        );
      } else {
        // REMOVE
        // this.game.ctx.fillStyle = "#444444";
        // this.game.ctx.fillRect(
        //   newColPos * this.game.tileSize,
        //   newRowPos * this.game.tileSize,
        //   this.game.tileSize,
        //   this.game.tileSize
        // );
      }
    }
  }

  // Returns a boolean whether or not the GIVEN orientation is valid
  validOrientation(orientation) {
    let [colPos, rowPos] = this.pos;
    let nextOrientation = this.orientations[orientation];
    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {
      let currBit = (nextOrientation & (1 << shiftAmt)) >> shiftAmt;
      let [colShift, rowShift] = this.calculateShift(shiftAmt);

      // Calculate new positions, newColPos needs to account for negative modulos
      let newColPos = (colPos + colShift) % this.game.numCols;
      newColPos = (newColPos + this.game.numCols) % this.game.numCols;
      let newRowPos = rowPos + rowShift;
      
      let tileOccupied = this.game.tilesOccupied[newColPos][newRowPos];
      if (currBit && tileOccupied) return false;
    }
    return true;
  }

  // Returns a boolean whether or not the NEXT horizontal position is valid
  validHorizontal(direction) {
    let [colPos, rowPos] = this.pos;
    let currOrientation = this.orientations[this.orientation];
    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {
      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;
      let [colShift, rowShift] = this.calculateShift(shiftAmt);

      // Calculate new positions - newColPos needs to account for negative modulos
      let newColPos = (colPos + colShift + direction) % this.game.numCols;
      newColPos = (newColPos + this.game.numCols) % this.game.numCols;
      let newRowPos = rowPos + rowShift;

      let tileOccupied = this.game.tilesOccupied[newColPos][newRowPos];
      if (currBit && tileOccupied) return false;
    }
    return true;
  }

  // Returns a boolean whether or not the NEXT vertical position is valid
  validVertical() {
    let [colPos, rowPos] = this.pos;
    let currOrientation = this.orientations[this.orientation];
    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {
      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;
      let [colShift, rowShift] = this.calculateShift(shiftAmt);

      // Calculate new positions - newColPos needs to account for negative modulos
      let newColPos = (colPos + colShift) % this.game.numCols;
      newColPos = (newColPos + this.game.numCols) % this.game.numCols;
      let newRowPos = rowPos + rowShift + 1;

      let tileOccupied = this.game.tilesOccupied[newColPos][newRowPos];
      let notWithinBounds = (rowPos + rowShift + 1) >= this.game.numRows;
      if (currBit && (tileOccupied || notWithinBounds)) return false;
    }
    return true;
  }

  // Updates `this.game.tilesOccupied` and `this.game.pieceMatrix` after drop
  recordPiece() {
    let [colPos, rowPos] = this.pos;
    let currOrientation = this.orientations[this.orientation];

    // if (!bool) this.game.pieceMatrix[colPos][rowPos] = null;

    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {
      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;
      let [colShift, rowShift] = this.calculateShift(shiftAmt);

      // Calculate new positions - newColPos needs to account for negative modulos
      let newColPos = (colPos + colShift) % this.game.numCols;
      newColPos = (newColPos + this.game.numCols) % this.game.numCols;
      let newRowPos = rowPos + rowShift;

      if (currBit) this.game.tilesOccupied[newColPos][newRowPos] = true;
    }

    this.game.pieceMatrix[colPos][rowPos].push(this);
  }

  moveDown() {
    this.pos[1] += 1
  }

  moveLeft() {
    this.pos[0] = (this.pos[0] - 1) % this.game.numCols;
    this.pos[0] = (this.pos[0] + this.game.numCols) % this.game.numCols;
  }

  moveRight() {
    this.pos[0] = (this.pos[0] + 1) % this.game.numCols;
    this.pos[0] = (this.pos[0] + this.game.numCols) % this.game.numCols;
  }

  rotate() {
    this.orientation = (this.orientation + 1) % 4;
  }
}

export default Piece;
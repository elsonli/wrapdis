import Piece from "./piece";
import * as GameUtils from "./utils";
import allTetrominos from "./tetromino";

class Game {
  constructor(ctx, controller) {
    this.ctx = ctx;
    this.pieces = [];
    this.gameOver = false;
    this.controller = controller;
    // this.score = 0;

    this.dimX = GameUtils.DIM_X;
    this.dimY = GameUtils.DIM_Y;
    this.numCols = GameUtils.NUM_COLS;
    this.numRows = GameUtils.NUM_ROWS;
    this.gridColor = GameUtils.BG_COLOR;
    this.tileSize = GameUtils.TILE_SIZE;

    // this.shiftRowDown = this.shiftRowDown.bind(this);
    this.tilesOccupied = new Array(this.numCols).fill(0).map(() => {
      return new Array(this.numRows).fill(false);
    });

    this.pieceMatrix = new Array(this.numCols).fill(0).map(() => {
      return new Array(this.numRows).fill(null);
    });

    this.currPiece = this.generatePiece();
  }
  
  // Returns a new and random Piece
  generatePiece() {
    const allTetrominoKeys = Object.keys(allTetrominos);
    const randTetrominoKey = allTetrominoKeys[Math.floor(Math.random() * allTetrominoKeys.length)];
    const randTetromino = JSON.parse(JSON.stringify(allTetrominos[randTetrominoKey]));

    // Used for specific piece testing
    // const randTetromino = JSON.parse(JSON.stringify(allTetrominos["tetrominoL"]));

    return new Piece(randTetromino, this);
  }

  draw() {
    // Background for the grid
    this.ctx.clearRect(0, 0, this.dimX, this.dimY);
    this.ctx.fillStyle = this.gridColor;
    this.ctx.fillRect(0, 0, this.dimX, this.dimY);
    
    // Construct the vertical lines for the grid
    this.ctx.strokeStyle = "#777777";
    for (let idx = 0; idx < this.numCols; idx++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.tileSize * idx, 0);
      this.ctx.lineTo(this.tileSize * idx, this.tileSize * this.numRows);
      this.ctx.stroke();
    }

    // Construct the horizontal lines for the grid
    for (let idx = 0; idx < this.numRows; idx++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.tileSize * idx)
      this.ctx.lineTo(this.dimX, this.tileSize * idx);
      this.ctx.stroke();
    }

    // Rendering a Piece
    for (let idx = 0; idx < this.pieces.length; idx++) {
      let fixedPiece = this.pieces[idx];
      fixedPiece.draw(this.ctx);
    }

    this.currPiece.draw(this.ctx);
  }

  stepRight() {
    if (this.currPiece.validHorizontal(1)) {
      this.currPiece.moveRight();
    }
  }

  stepLeft() {
    if (this.currPiece.validHorizontal(-1)) {
      this.currPiece.moveLeft();
    }
  }

  stepDown() {
    if (this.currPiece.validVertical()) {
      this.currPiece.moveDown();
    } else {
    // this.currPiece.color = "#FFFFFF"; // Change color on drop
      this.pieces.push(this.currPiece);
      this.currPiece.updatePosition(true);
      // Add row clearing logic here?
      this.clearRows();
      this.currPiece = this.generatePiece();
    }
  }

  dropPiece() {
    while (this.currPiece.validVertical()) {
      this.currPiece.moveDown();
    }
    // this.currPiece.color = "#FFFFFF"; // Change color on drop
    this.pieces.push(this.currPiece);
    this.currPiece.updatePosition(true);
    // Add row clearing logic here?
    this.clearRows();
    this.currPiece = this.generatePiece();
  }

  rotatePiece() {
    this.currPiece.rotate();
    // this.clearRows();
  }



  // Finds and returns a single row to be cleared if one exists
  findRowToClear() {
    for (let rowIdx = 0; rowIdx < this.numRows; rowIdx++) {
      let row = this.tilesOccupied.map((col, colIdx) => this.tilesOccupied[colIdx][rowIdx]);
      if (row.reduce((a, b) => a + b, 0) === this.numCols) return rowIdx;
    }
    return -1;
  }

  // Shifts every block at or above the lowestRowIdx down by one
  collapseRows(lowestRowIdx) {
    for (let colIdx = 0; colIdx < this.numCols; colIdx++) {
      for (let rowIdx = lowestRowIdx; rowIdx >= 0; rowIdx--) {
        this.tilesOccupied[colIdx][rowIdx] = this.tilesOccupied[colIdx][rowIdx - 1] || false;
        // this.pieceMatrix[colIdx][rowIdx] = this.pieceMatrix[colIdx][rowIdx - 1] || null;
      }
    }
  }

  clearRows() {
    let rowToClear = this.findRowToClear();

    while (rowToClear >= 0) {
      // Shift down rows above rowToClear in 'this.tilesOccupied' for collision logic
      this.collapseRows(rowToClear);

      // Update piece orientations for drawing logic
      // Doesn't update correctly for multiple rows (update pieces above cleared rows)
      for (let pieceCol = 0; pieceCol < this.numCols; pieceCol++) {
        for (let pieceRow = this.numRows - 1; pieceRow >= 0; pieceRow--) {
          let piece = this.pieceMatrix[pieceCol][pieceRow];
          if (piece) {
            // piece.pos[1] += 1;
            // let containsRow = false;
            let [colPos, rowPos] = piece.pos;
            let currOrientation = piece.orientations[piece.orientation];
            let currOrientationStr = currOrientation.toString(2).padStart(16, "0");
            for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {
              // let currBit = currOrientationStr[15 - shiftAmt];
              let [colShift, rowShift] = piece.calculateShift(shiftAmt);
              let newRowPos = rowPos + rowShift;
              if (newRowPos === rowToClear) {
                // console.log(shiftAmt);
                // console.log(currOrientationStr, "before");
                currOrientationStr = (currOrientationStr.slice(0, 15 - shiftAmt) + currOrientationStr.slice(15 - shiftAmt + 1)).padStart(16, "0");
                // console.log(currOrientationStr, "after");
                // containsRow = true;
              }
            }
            // if (!containsRow || piece.pos[1] < rowToClear) piece.pos[1] += 1;
            piece.orientations[piece.orientation] = parseInt(currOrientationStr, 2);
          }
        }
      }

      // console.log(this.tilesOccupied, "tilesoccupied");
      // console.log(this.pieceMatrix, "piecematrix");

      rowToClear = this.findRowToClear();
    }
  }

//   gameOver() {
//     if (this.filledTiles[3][0] || this.filledTiles[4][0] || this.filledTiles[5][0] || this.filledTiles[6][0]) {
//       return true;
//     }
//     return false;
//   }
}

export default Game;
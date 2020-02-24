# Bandori Tetris

<a href="https://elsonli.github.io/wrapdis/">Live Link</a>

<img src="https://i.imgur.com/Hw6DJm4.png" width="400" height="800"/>

Bandori Tetris is a fully interactive JavaScript and HTML5 Canvas game based on the classic tile-matching puzzle game. Players gradually fill up the rows of the game board using randomly generated pieces. After a row has been completely filled, it will be cleared from the game board. The game ends when the pieces reach the top of the game board, preventing any additional pieces from being generated.

## Technologies
* HTML5 Canvas for rendering of the board and pieces
* JavaScript for gameplay related functionality

## Features
* Rotating the falling pieces using keyboard controls
* Scoring system based on the number of cleared rows

## Controls
* Keyboard arrow keys to move and rotate the falling piece
  * Keydown event listeners were placed onto the window with a switch statement to handle different key codes
  * A piece is moved around the board by modifying its stored block states, and is then redrawn onto the canvas
* Space to immediately drop the piece straight down
  * Likewise, a keydown event listener was used to handle an immediate drop
  * This consisted of stepping the game continuously until a collision has been detected
  * A matrix was used to determine whether or not a block currently occupies a position on the game board
  
## Feature Implementation Issues
* Randomly generating pieces to be drawn onto the canvas
  * An object containing all of the Tetrominos was sampled and a piece was constructed from that sample
  * Since positions are stored as arrays for a tetromino, the sampled object needs to be stringified and parsed to create a deep copy of the object - otherwise, updating the position for the sample would affect the original
  ```javascript
  generateNextPiece() {
    const allTetrominoKeys = Object.keys(allTetrominos);
    const randKey = allTetrominoKeys[Math.floor(Math.random() * allTetrominoKeys.length)];
    const randTetromino = JSON.parse(JSON.stringify(allTetrominos[randKey]))
    this.currPiece = new Piece(randTetromino, this, this.ctx);
    return this.currPiece;
  }
  ```
* Implementing a collision feature where movement of a piece stops when it comes into contact with another piece (without overlapping) or the bottom of the game board
  * Used a higher order function to help in mapping over all the blocks of a piece to meet some condition
  ```javascript
  applyToBlocks(func) {
    return this.currPiece.blocks.map(block => func(block));
  }
  
  checkBlock(block) {
    let [xPos, yPos] = block.pos;
    if (xPos >= 0 && xPos < GameUtils.GRID_WIDTH) {
      return (yPos >= GameUtils.GRID_HEIGHT - 1) || this.filledTiles[xPos][yPos + 1];
    }
    return false;
  }
  
  checkCollisions() {
    if (this.applyToBlocks(this.checkBlock).some(bool => bool)) {
      this.applyToBlocks(block => {
        this.filledTiles[block.pos[0]][block.pos[1]] = block
      });
      this.pieces.push(this.currPiece);
      this.clearRow();
      this.generateNextPiece();
      return true;
    }
    return false;
  }
  ```
  
## Release History
* 0.0.1
  * Initial release

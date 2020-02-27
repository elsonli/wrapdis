# Wrapdis

<a href="https://elsonli.github.io/wrapdis/">Live Link</a>

<img src="https://i.imgur.com/E5qYxsO.png" width="1000" height="900"/>

Wrapdis is a fully interactive JavaScript and HTML5 Canvas game based on the classic tile-matching puzzle game. Players gradually fill up the rows of the game board using randomly generated pieces. After a row has been completely filled, it will be cleared from the game board. The game ends when the center tiles of the top row are filled, which prevents any additional pieces from being generated.

## Technologies
* `CSS3` to visually style the game canvas
* `Webpack` to gather all dependencies and bundle `JavaScript` files
* `HTML5 Canvas` to render the pieces and the game canvas
* `JavaScript` to handle other gameplay related functionality

## Features
* Rotating the current piece using keyboard controls
* Pausing the game to prevent the descent of the current piece
* Viewing the upcoming piece (panel on the right)
* Storing and swapping the current piece (panel on the right)
* Scoring system based on the number of cleared rows (panel on the right)
* Wrapping pieces around the game canvas to allow for more creative plays
* Instructions are straight-forward and key bindings are visually appealing
* Music plays in the background during gameplay (mute option available)

## Controls
* Keydown event listeners were placed onto the window and utilized a switch statement to handle different key codes
  * Keyboard arrow keys are used to move and rotate the current piece
    * The piece is moved around the game board by modifying its stored position
    * The piece is rotated based on its current position by modifying its stored orientation
  * Space is used to immediately drop the piece straight down (hard drop)
    * The game is stepped continuously until a collision has been detected
    * One matrix was used to determine whether or not a tile on the game board is occupied
    * Another matrix was used to track information about pieces for other collision and rendering logic
  * Other keyboard keys are used to achieve various additional functionality
    * The C key is used to store the current piece or swap with an already saved piece
    * The N key is used to restart the game when the game is in the play state
    * The M key is used to mute and unmute the music that plays in the background
    * The Enter key is used to pause and unpause the game at any point during a session
  
## Piece and Game Canvas Rendering
* The game canvas, current piece, next piece, saved piece, and current score are drawn onto the screen using `HTML5 Canvas`
* Before the current piece can be swapped with the saved piece or moved in a direction, a collision detection algorithm is used to determine whether the next position is a valid position
* Orientations of pieces are encoded as an array of 16-bit binary integers representing its various orientations

<img src="https://i.imgur.com/vYW82bm.png" width="650" height="800"/>

```javascript
allTetrominoes = {
  tetrominoI: {
    orientation: 0,
    orientations: [0x0F00, 0x2222, 0x00F0, 0x4444],
    color: "#00FFFF"
  },
  tetrominoS: {
    orientation: 0,
    orientations: [0x06C0, 0x8C40, 0x6C00, 0x4620],
    color: "#72CB3B"
  },
  tetrominoZ: {
    orientation: 0,
    orientations: [0x0C60, 0x4C80, 0xC600, 0x2640],
    color: "#FF3213"
  },
  tetrominoO: {
    orientation: 0,
    orientations: [0xCC00, 0xCC00, 0xCC00, 0xCC00],
    color: "#FFD500"
  },
  tetrominoT: {
    orientation: 0,
    orientations: [0x4E00, 0x4640, 0x0E40, 0x4C40],
    color: "#FF00FF"
  },
  tetrominoJ: {
    orientation: 0,
    orientations: [0x8E00, 0x6440, 0x0E20, 0x44C0],
    color: "#0341AE"
  },
  tetrominoL: {
    orientation: 0,
    orientations: [0x0E80, 0xC440, 0x2E00, 0x4460],
    color: "#FF971C"
  }
}
```

* The position of tiles that comprise a piece are calculated by targeting specific bits of the current orientation through the combination of bitwise shifts and bit masks
  * This is relevant for rendering pieces, collision detection, and row clearing
  ```javascript
  // Calculates [colShift, rowShift] based on shiftAmt of an orientation
  calculateShift(shiftAmt) {
    let colShift = Math.abs(15 - shiftAmt) % 4;
    let rowShift = Math.floor((15 - shiftAmt) / 4);
    return [colShift, rowShift];
  }
  
  // Draws a Piece onto the game board
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
      }
    }
  }
  ```

## Feature Implementation Issues

* Randomly generating pieces to be drawn onto the game board
  * An object containing all of the tetrominoes was shuffled and tetrominoes are served in the resulting order
  * Since positions are stored as an array for a tetromino, the sampled object needs to be stringified and parsed to create a deep copy of the object - otherwise, updating the position for the sample would affect the original object
  ```javascript
  generatePieces() {
    const allTetrominoKeys = Object.keys(allTetrominoes);

    // Shuffle the keys contained in `allTetrominoKeys` in place
    for (let idx = allTetrominoKeys.length - 1; idx > 0; idx--) {
      const jdx = Math.floor(Math.random() * idx);
      const tempKey = allTetrominoKeys[idx];
      allTetrominoKeys[idx] = allTetrominoKeys[jdx];
      allTetrominoKeys[jdx] = tempKey;
    }

    // Map all of the shuffled keys in `allTetrominoKeys` into Piece objects
    return allTetrominoKeys.map(key => {
      return new Piece(JSON.parse(JSON.stringify(allTetrominoes[key])), this);
    });
  }
  ```

* Only the starting position (top-left tile) of pieces are stored within the 2D array `pieceMatrix` because the position of every other tile of a piece can be determined from the starting position by utilizing bitwise shifts
  * This occasionally yielded situations where a piece can be "deleted" from the 2D array if the starting positions of two pieces were identical, resulting in a hard-to-detect bug
  * This problem was solved by using a 3D array (for each position of the game board, an array was used to store the pieces with that starting position)
   ```javascript
   // Updates `this.game.tilesOccupied` and `this.game.pieceMatrix` after drop
   recordPiece() {
     let [colPos, rowPos] = this.pos;
     let currOrientation = this.orientations[this.orientation];

     for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {
       let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;
       let [colShift, rowShift] = this.calculateShift(shiftAmt);

       // Calculate new positions - newColPos needs to account for negative modulos
       let newColPos = (colPos + colShift) % this.game.numCols;
       newColPos = (newColPos + this.game.numCols) % this.game.numCols;
       let newRowPos = rowPos + rowShift;

       if (currBit) this.game.tilesOccupied[newColPos][newRowPos] = true;
     }

     if (rowPos >= 0) this.game.pieceMatrix[colPos][rowPos].push(this);
   }
   ```

* Pausing and unpausing the game toggles too many times due to the keydown event
  * The last time the game was paused is stored in the game instance, and the key listener immediately returns if the pause key is pressed within 100ms, preventing mass toggling
  * A separate event listener was used to add and remove event listeners depending on whether or not the game is currently paused
    ```javascript
    constructor(ctx) {
      // Delegates to the Game class based on the pressed key
      this.controller = {
        pauseListener: event => {
          switch (event.code) {
            case "Enter":
              if (this.paused) {
                window.removeEventListener("keydown", this.controller.keyListener);
              } else {
                window.addEventListener("keydown", this.controller.keyListener);
              }
              break;
          }
        },
        keyListener: event => {
          switch (event.code) {
            // Enter Key (Pause Game)
            case "Enter":
              let currTime = Date.now();
              if (currTime - this.lastTime < 100) return;
              this.lastTime = currTime;
              this.paused = !this.paused;

              let pauseNode = document.getElementsByClassName("pause-screen")[0];
              if (this.paused && !this.game.gameOver()) {
                window.addEventListener("keydown", this.controller.pauseListener);
                this.stop();
              } else {
                window.removeEventListener("keydown", this.controller.pauseListener);
                this.start();
              }
              break;
          }
        }
        window.addEventListener("keydown", this.controller.keyListener.bind(this));
      };
    }
    
    // This function will be continuously called until the game is over, and
    // will progress the game by moving down the current Piece
    animate() {
      if (!this.game.gameOver()) {
        this.game.stepDown();
        this.game.draw(this.ctx);
      } else {
        this.stop();
      }
    }

    // Starts the game by requesting an animation frame using `this.animate`
    start() {
      this.lastTime = Date.now();
      this.game.draw(this.ctx);
      this.interval = setInterval(this.animate, 1000);
      this.animation = requestAnimationFrame(this.animate);
    }

    // Stops the game from running by clearing the stored interval, clearing the
    // stored animation frame, as well as removing the window's event listener
    stop() {
      clearInterval(this.interval);
      cancelAnimationFrame(this.animation);
      window.removeEventListener("keydown", this.controller.keyListener.bind(this));
    }
    ```
  
## Release History
* 0.0.1
  * Initial Release
* 0.0.2
  * Update README
* 0.0.3
  * Layout Change, Start Screen, Music

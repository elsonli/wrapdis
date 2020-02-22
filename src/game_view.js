import Game from "./game";

class GameView {
  constructor(ctx) {
    // Delegates to the Game class based on the pressed key
    this.controller = {
      keyListener: event => {
        switch (event.code) {
          
          // Left Arrow (Move Piece Left)
          case "ArrowLeft":
            if (!this.paused && !this.game.gameOver()) {
              this.game.stepLeft();
              this.game.draw(this.ctx);
            }
            break;

          // Right Arrow (Move Piece Right)
          case "ArrowRight":
            if (!this.paused && !this.game.gameOver()) {
              this.game.stepRight();
              this.game.draw(this.ctx);
            }
            break;
          
          // Up Arrow (Rotate Piece Clockwise)
          case "ArrowUp":
            if (!this.paused && !this.game.gameOver()) {
              this.game.rotatePiece();
              this.game.draw(this.ctx);
            }
            break;

          case "ArrowDown":
            if (!this.paused && !this.game.gameOver()) {
              this.game.stepDown();
              this.game.draw(this.ctx);
            }
            break;
          
          // Space (Drop Immediately)
          case "Space":
            if (!this.paused && !this.game.gameOver()) {
              this.game.dropPiece();
              this.game.draw(this.ctx);
            }
            break;

          // N Key (New Game)
          case "KeyN":
            if (!this.paused && !this.game.gameOver()) {
              this.game = new Game(this.ctx, this.controller);
            }
            break;

          // C Key (Hold Piece)
          case "KeyC":
            if (!this.paused && !this.game.gameOver()) {
              let currPiece = this.game.currPiece;
              let savedPiece = this.game.savedPiece;
              if (savedPiece) {
                currPiece.pos = currPiece.startPos.slice();
                this.game.currPiece = savedPiece;
                this.game.savedPiece = currPiece;
              } else {
                currPiece.pos = currPiece.startPos.slice();
                this.game.savedPiece = currPiece;
                this.game.currPiece = this.game.generatePiece();
              }
            }
            break;

          // Enter Key (Pause Game)
          case "Enter":
            if (!this.paused && !this.game.gameOver()) {
              this.paused = true;
              clearInterval(this.interval);
              cancelAnimationFrame(this.animation);
              window.addEventListener("keydown", this.controller.keyListener.bind(this));
            } else {
              this.paused = false;
              this.animation = requestAnimationFrame(this.animate);
              window.removeEventListener("keydown", this.controller.keyListener.bind(this));
            }
            break;
        }
      }
    };

    this.ctx = ctx;
    this.game = new Game(this.ctx, this.controller);
    this.paused = false;
    this.animate = this.animate.bind(this);
    this.interval = setInterval(this.animate, 1000);
    window.addEventListener("keydown", this.controller.keyListener.bind(this));
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
    this.game.draw(this.ctx);
    this.animation = requestAnimationFrame(this.animate);
  }

  // Stops the game from running by clearing the stored interval, clearing the
  // stored animation frame, as well as removing the window's event listener
  stop() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.animation);
    window.removeEventListener("keydown", this.controller.keyListener.bind(this));
  }
}

export default GameView;
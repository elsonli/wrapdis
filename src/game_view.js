import Game from "./game";

class GameView {
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
            this.game = new Game(this.ctx, this.controller);
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

          // M Key (Mute Music)
          case "KeyM":
            let muteButton = document.getElementsByClassName("mute-button")[0];
            muteButton.click();
            break;

          // Enter Key (Pause Game)
          case "Enter":
            let pauseButton = document.getElementsByClassName("pause-button")[0];
            pauseButton.click();
            break;
        }
      }
    };

    this.ctx = ctx;
    this.paused = false;
    this.animate = this.animate.bind(this);
    this.game = new Game(this.ctx, this.controller);
    this.controller.keyListener = this.controller.keyListener.bind(this);
    this.controller.pauseListener = this.controller.pauseListener.bind(this);
    window.addEventListener("keydown", this.controller.keyListener.bind(this));
    this.muted = false;
    this.themeSong = new Audio("https://ia600504.us.archive.org/33/items/TetrisThemeMusic/Tetris.ogg");
    this.themeSong.loop = true;
    
    let muteButton = document.getElementsByClassName("mute-button")[0];
    muteButton.addEventListener("click", () => {
      if (this.paused) return;
      if (this.muted) {
        muteButton.innerText = "Mute";
        this.themeSong.play();
        this.muted = false;
      } else {
        muteButton.innerText = "Unmute";
        this.themeSong.pause();
        this.muted = true;
      }
    });

    let pauseButton = document.getElementsByClassName("pause-button")[0];
    pauseButton.addEventListener("click", () => {
      let currTime = Date.now();
      if (currTime - this.lastTime < 100) return;
      this.lastTime = currTime;
      this.paused = !this.paused;

      let pauseNode = document.getElementsByClassName("pause-screen")[0];
      if (this.paused && !this.game.gameOver()) {
        pauseButton.innerText = "Unpause";
        this.themeSong.pause();
        pauseNode.classList.add("pause-overlay");
        pauseNode.innerText = "Paused";
        window.addEventListener("keydown", this.controller.pauseListener);
        this.stop();
      } else {
        pauseButton.innerText = "Pause";
        if (!this.muted) this.themeSong.play();
        pauseNode.classList.remove("pause-overlay");
        pauseNode.innerText = "";
        window.removeEventListener("keydown", this.controller.pauseListener);
        this.start();
      }
    });
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
    if (!this.muted) this.themeSong.play();
  }

  // Stops the game from running by clearing the stored interval, clearing the
  // stored animation frame, as well as removing the window's event listener
  stop() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.animation);
    window.removeEventListener("keydown", this.controller.keyListener.bind(this));
    this.themeSong.pause();
  }
}

export default GameView;
import Game from "./game";

class GameView {
  constructor(ctx) {
    // Delegates to the Game class based on the pressed key
    this.controller = {
      keyListener: event => {
        switch (event.code) {
          
          // Left Arrow (Move Piece Left)
          case "ArrowLeft":
            this.game.stepLeft();
            this.game.draw(this.ctx);
            break;

          // Right Arrow (Move Piece Right)
          case "ArrowRight":
            this.game.stepRight();
            this.game.draw(this.ctx);
            break;
          
          // Up Arrow (Rotate Piece Clockwise)
          case "ArrowUp":
            this.game.rotatePiece();
            this.game.draw(this.ctx);
            break;

          case "ArrowDown":
            this.game.stepDown();
            this.game.draw(this.ctx);
            break;
          
          // Space (Drop Immediately)
          case "Space":
            this.game.dropPiece();
            this.game.draw(this.ctx);
            break;
        }
      }
    };

    this.ctx = ctx;
    this.game = new Game(this.ctx, this.controller);
    this.animate = this.animate.bind(this);
    this.interval = setInterval(this.animate, 1000);
    window.addEventListener("keydown", this.controller.keyListener.bind(this));
  }

  animate() {
    // if (!this.game.gameOver) {
      this.game.stepDown();
      this.game.draw(this.ctx);
    // } else {
      // this.stop();
    // }
  }

  start() {
    this.game.draw(this.ctx);
    this.animation = requestAnimationFrame(this.animate);
  }

  stop() {
  //   this.ctx.fillStyle = "white";
  //   this.ctx.font = "30px Arial";
  //   this.ctx.fillText(this.game.score, 200, 830);
    cancelAnimationFrame(this.animation);
  }
}

export default GameView;
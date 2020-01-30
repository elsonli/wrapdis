import Game from "./game";

class GameView {
  constructor(ctx) {
    this.controller = {
      keyListener: event => {
        switch (event.code) {
          case "ArrowLeft":
            this.game.stepLeft();
            break;

          case "ArrowRight":
            this.game.stepRight();
            break;
          
          // Up Arrow (Rotate Piece Clockwise)
          // case "ArrowUp":
            // this.game.rotatePiece();
          
          // Space (Drop Immediately)
          case "Space":
            this.game.dropPiece();
        }
      }
    };
    this.ctx = ctx;
    this.game = new Game(this.ctx, this.controller);
    this.animate = this.animate.bind(this);
    window.addEventListener("keydown", this.controller.keyListener.bind(this));
  }

  animate() {
    this.game.stepDown();
    this.game.draw(this.ctx);
    setTimeout(() => {
      requestAnimationFrame(this.animate);
    }, 1000);
  }

  start() {
    requestAnimationFrame(this.animate);
  }
}

export default GameView;
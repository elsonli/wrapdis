import Game from "./game";

class GameView {
  constructor(ctx) {
    this.controller = {
      keyListener: event => {
        switch (event.code) {
          case "ArrowLeft":
            this.game.movePieceLeft();
            break;

          // Up Arrow (Rotate Piece Clockwise)
          // case "ArrowUp":
            // this.game.rotatePiece();
          
          // Right Arrow (Move Right 1 Block)
          case "ArrowRight":
            this.game.movePieceRight();
            break;
          
          // Down Arrow (Move Down 1 Block)
          case "ArrowDown":
            this.game.movePieceDown();
            break;
          
          // Space (Drop Immediately)
          // case "Space":

        }
      }
    };
    this.ctx = ctx;
    this.game = new Game(this.ctx, this.controller);
    this.animate = this.animate.bind(this);
    window.addEventListener("keydown", this.controller.keyListener.bind(this));
  }

  animate() {
    this.game.movePieceDown();
    this.game.draw(this.ctx);
    setTimeout(() => {
      requestAnimationFrame(this.animate);
    }, 500);
  }

  start() {
    requestAnimationFrame(this.animate);
  }
}

export default GameView;
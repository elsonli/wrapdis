import Game from "./game";

class GameView {
  constructor(ctx) {
    this.controller = {
      keyListener: (event) => {
        switch (event.keyCode) {
          // Left Arrow (Move Left 1 Block)
          case 37:
            this.game.movePieceLeft();
            break;

          // Up Arrow (Rotate Piece Clockwise)
          // case 38:
          
          // Right Arrow (Move Right 1 Block)
          case 39:
            this.game.movePieceRight();
            break;
          
          // Down Arrow (Move Down 1 Block)
          case 40:
            this.game.movePieceDown();
            break;
          
          // Space (Drop Immediately)
          // case 32:

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
    }, 200);
  }

  start() {
    requestAnimationFrame(this.animate);
  }
}

export default GameView;
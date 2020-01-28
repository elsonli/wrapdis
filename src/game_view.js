class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.animate = this.animate.bind(this);
  }

  // bindKeyHandlers() {

  // }

  animate() {
    // this.game.step();
    this.game.draw(this.ctx);
    requestAnimationFrame(this.animate);
  }

  start() {
    // this.bindKeyHandlers();
    requestAnimationFrame(this.animate);
  }
}

export default GameView;
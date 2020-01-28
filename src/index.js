import Game from "./game";
import GameView from "./game_view";
import * as GameUtil from "./utils";

document.addEventListener("DOMContentLoaded", () => {
  const canvasEle = document.getElementsByTagName("canvas")[0];
  canvasEle.width = GameUtil.DIM_X;
  canvasEle.height = GameUtil.DIM_Y;
  const ctx = canvasEle.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});
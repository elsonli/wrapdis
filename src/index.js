import GameView from "./game_view";
import * as GameUtil from "./utils";

document.addEventListener("DOMContentLoaded", () => {
  const canvasEle = document.getElementsByClassName("game-canvas")[0];
  canvasEle.width = GameUtil.DIM_X;
  canvasEle.height = GameUtil.DIM_Y;
  const ctx = canvasEle.getContext("2d");

  // When the canvas is rendered, draw the start-screen overlay which is only
  // removed when the user clicks on the corresponding button
  let startGameNode = document.getElementsByClassName("start-screen")[0];
  startGameNode.classList.add("start-overlay");
  
  // When the `Start Game` button is clicked, remove the start-screen overlay
  // and the start button then start the game by drawing on the ctx
  let startNode = document.createElement("button");
  startNode.onclick = () => {
    let titleNode = document.getElementsByClassName("game-title")[0];
    startGameNode.removeChild(titleNode);

    startGameNode.classList.remove("start-overlay");
    new GameView(ctx).start();
    startGameNode.removeChild(startNode);
  };
  
  startNode.innerHTML = "Start Game";
  startNode.classList.add("start-game");
  startGameNode.appendChild(startNode);
});
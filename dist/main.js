/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./piece */ \"./src/piece.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _tetromino__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tetromino */ \"./src/tetromino.js\");\n\n\n\n\nclass Game {\n  constructor(ctx, controller) {\n    this.ctx = ctx;\n    this.controller = controller;\n    this.gridWidth = 10;\n    this.gridHeight = 20;\n    this.tileSize = 40;\n    this.pieces = [];\n    this.generateNextPiece();\n    this.filledTiles = new Array(10).fill(0).map(() => new Array(20).fill(false));\n  }\n  \n  generateNextPiece() {\n    const allTetrominoKeys = Object.keys(_tetromino__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n    const randKey = allTetrominoKeys[Math.floor(Math.random() * allTetrominoKeys.length)];\n    const randTetromino = JSON.parse(JSON.stringify(_tetromino__WEBPACK_IMPORTED_MODULE_2__[\"default\"][randKey]))\n    this.currPiece = new _piece__WEBPACK_IMPORTED_MODULE_0__[\"default\"](randTetromino, this);\n    return this.currPiece;\n  }\n\n  checkCollisions() {\n    const [block1x, block1y] = this.currPiece.block1;\n    const [block2x, block2y] = this.currPiece.block2;\n    const [block3x, block3y] = this.currPiece.block3;\n    const [block4x, block4y] = this.currPiece.block4;\n    if (\n      this.filledTiles[block1x][block1y + 1] || block1y === this.gridHeight - 1 ||\n      this.filledTiles[block2x][block2y + 1] || block2y === this.gridHeight - 1 ||\n      this.filledTiles[block3x][block3y + 1] || block3y === this.gridHeight - 1 ||\n      this.filledTiles[block4x][block4y + 1] || block4y === this.gridHeight - 1\n    ) {\n      this.filledTiles[block1x][block1y] = true;\n      this.filledTiles[block2x][block2y] = true;\n      this.filledTiles[block3x][block3y] = true;\n      this.filledTiles[block4x][block4y] = true;\n      this.pieces.push(this.currPiece);\n      this.generateNextPiece();\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  draw() {\n    // Background for the Grid\n    this.ctx.clearRect(0, 0, _utils__WEBPACK_IMPORTED_MODULE_1__[\"DIM_X\"], _utils__WEBPACK_IMPORTED_MODULE_1__[\"DIM_Y\"]);\n    this.ctx.fillStyle = _utils__WEBPACK_IMPORTED_MODULE_1__[\"BG_COLOR\"];\n    this.ctx.fillRect(0, 0, _utils__WEBPACK_IMPORTED_MODULE_1__[\"DIM_X\"], _utils__WEBPACK_IMPORTED_MODULE_1__[\"DIM_Y\"]);\n    \n    // Constructing the Grid\n    this.ctx.strokeStyle = \"#777777\";\n    for (let idx = 0; idx < this.gridWidth; idx++) {\n      this.ctx.beginPath();\n      this.ctx.moveTo(this.tileSize * idx, 0);\n      this.ctx.lineTo(this.tileSize * idx, 800);\n      this.ctx.stroke();\n    }\n    for (let idx = 0; idx < this.gridHeight; idx++) {\n      this.ctx.beginPath();\n      this.ctx.moveTo(0, this.tileSize * idx)\n      this.ctx.lineTo(400, this.tileSize * idx);\n      this.ctx.stroke();\n    }\n\n    // Rendering a Piece\n    for (let idx = 0; idx < this.pieces.length; idx++) {\n      const currPiece = this.pieces[idx];\n      currPiece.draw(this.ctx);\n    }\n    this.currPiece.draw(this.ctx);\n  }\n\n  movePieceLeft() {\n    if (!this.checkCollisions()) { this.currPiece.move(this.filledTiles, 0, -1) }\n  }\n\n  movePieceRight() {\n    if (!this.checkCollisions()) { this.currPiece.move(this.filledTiles, 0, 1) }\n  }\n\n  movePieceDown() {\n    if (!this.checkCollisions()) { this.currPiece.move(this.filledTiles, 1, 1) }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nclass GameView {\n  constructor(ctx) {\n    this.controller = {\n      keyListener: (event) => {\n        switch (event.keyCode) {\n          // Left Arrow (Move Left 1 Block)\n          case 37:\n            this.game.movePieceLeft();\n            break;\n\n          // Up Arrow (Rotate Piece Clockwise)\n          // case 38:\n          \n          // Right Arrow (Move Right 1 Block)\n          case 39:\n            this.game.movePieceRight();\n            break;\n          \n          // Down Arrow (Move Down 1 Block)\n          case 40:\n            this.game.movePieceDown();\n            break;\n          \n          // Space (Drop Immediately)\n          // case 32:\n\n        }\n      }\n    };\n    this.ctx = ctx;\n    this.game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctx, this.controller);\n    this.animate = this.animate.bind(this);\n    window.addEventListener(\"keydown\", this.controller.keyListener.bind(this));\n  }\n\n  // bindKeyHandlers() {\n\n  // }\n\n  animate() {\n    this.game.movePieceDown();\n    this.game.draw(this.ctx);\n    setTimeout(() => {\n      requestAnimationFrame(this.animate);\n    }, 200);\n  }\n\n  start() {\n    // this.bindKeyHandlers();\n    requestAnimationFrame(this.animate);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameView);\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasEle = document.getElementsByTagName(\"canvas\")[0];\n  canvasEle.width = _utils__WEBPACK_IMPORTED_MODULE_1__[\"DIM_X\"];\n  canvasEle.height = _utils__WEBPACK_IMPORTED_MODULE_1__[\"DIM_Y\"];\n  const ctx = canvasEle.getContext(\"2d\");\n  new _game_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx).start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/piece.js":
/*!**********************!*\
  !*** ./src/piece.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Piece {\n  constructor(tetromino, game) {\n    this.block1 = tetromino.block1;\n    this.block2 = tetromino.block2;\n    this.block3 = tetromino.block3;\n    this.block4 = tetromino.block4;\n    this.color = tetromino.color;\n    this.image = new Image();\n    this.image.src = tetromino.image;\n    this.game = game;\n  }\n  \n  // Draws a Piece with its color and background image\n  drawPieceBackground(block) {\n    const tileSize = this.game.tileSize;\n    this.game.ctx.fillRect(\n      block[0] * tileSize,\n      block[1] * tileSize,\n      tileSize,\n      tileSize\n    );\n  }\n\n  drawPieceImage(block) {\n    const tileSize = this.game.tileSize;\n    this.game.ctx.drawImage(\n      this.image,\n      block[0] * tileSize,\n      block[1] * tileSize,\n      tileSize,\n      tileSize\n    );\n  }\n\n  draw(ctx) {\n    ctx.fillStyle = this.color;\n    this.drawPieceBackground(this.block1);\n    this.drawPieceBackground(this.block2);\n    this.drawPieceBackground(this.block3);\n    this.drawPieceBackground(this.block4);\n    this.drawPieceImage(this.block1);\n    this.drawPieceImage(this.block2);\n    this.drawPieceImage(this.block3);\n    this.drawPieceImage(this.block4);\n  }\n\n  fillTiles(filledTiles) {\n    filledTiles[this.block1[0]][this.block1[1]] = false;\n    filledTiles[this.block2[0]][this.block2[1]] = false;\n    filledTiles[this.block3[0]][this.block3[1]] = false;\n    filledTiles[this.block4[0]][this.block4[1]] = false;\n  }\n\n  move(filledTiles, direction, amount) {\n    this.fillTiles(filledTiles);\n    this.block1[direction] += amount;\n    this.block2[direction] += amount;\n    this.block3[direction] += amount;\n    this.block4[direction] += amount;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Piece);\n\n//# sourceURL=webpack:///./src/piece.js?");

/***/ }),

/***/ "./src/tetromino.js":
/*!**************************!*\
  !*** ./src/tetromino.js ***!
  \**************************/
/*! exports provided: allTetrominos, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"allTetrominos\", function() { return allTetrominos; });\nconst allTetrominos = {\n  tetrominoI: {\n    block1: [3, -2],\n    block2: [4, -2],\n    block3: [5, -2],\n    block4: [6, -2],\n    color: \"lightblue\",\n    image: \"https://cdn.discordapp.com/emojis/645009599870664715.png?v=1\"\n  },\n  tetrominoS: {\n    block1: [4, -3],\n    block2: [5, -3],\n    block3: [3, -2],\n    block4: [4, -2],\n    color: \"green\",\n    image: \"https://cdn.discordapp.com/emojis/648742827009769483.png?v=1\"\n  },\n  tetrominoZ: {\n    block1: [3, -3],\n    block2: [4, -3],\n    block3: [4, -2],\n    block4: [5, -2],\n    color: \"red\",\n    image: \"https://cdn.discordapp.com/emojis/585567202837528586.png?v=1\"\n  },\n  tetrominoO: {\n    block1: [4, -3],\n    block2: [5, -3],\n    block3: [4, -2],\n    block4: [5, -2],\n    color: \"yellow\",\n    image: \"https://cdn.discordapp.com/emojis/585567189944238101.png?v=1g\"\n  },\n  tetrominoT: {\n    block1: [4, -3],\n    block2: [3, -2],\n    block3: [4, -2],\n    block4: [5, -2],\n    color: \"purple\",\n    image: \"https://cdn.discordapp.com/emojis/648743727895937044.png?v=1\"\n  },\n  tetrominoJ: {\n    block1: [3, -3],\n    block2: [3, -2],\n    block3: [4, -2],\n    block4: [5, -2],\n    color: \"blue\",\n    image: \"https://cdn.discordapp.com/emojis/571208727772790786.png?v=1\"\n  },\n  tetrominoL: {\n    block1: [3, -3],\n    block2: [4, -3],\n    block3: [5, -3],\n    block4: [3, -2],\n    color: \"orange\",\n    image: \"https://cdn.discordapp.com/emojis/644299473081729024.png?v=1\"\n  }\n}\n\n// Light Blue Piece\n// export const tetrominoI = {\n//   block1: [3, 0],\n//   block2: [4, 0],\n//   block3: [5, 0],\n//   block4: [6, 0],\n//   color: \"lightblue\",\n//   image: \"https://cdn.discordapp.com/emojis/645009599870664715.png?v=1\"\n// }\n\n// Green Piece\n// export const tetrominoS = {\n//   block1: [4, 0],\n//   block2: [5, 0],\n//   block3: [3, 1],\n//   block4: [4, 1],\n//   color: \"green\",\n//   image: \"https://cdn.discordapp.com/emojis/648742827009769483.png?v=1\"\n// }\n\n// Red Piece\n// export const tetrominoZ = {\n//   block1: [3, 0],\n//   block2: [4, 0],\n//   block3: [4, 1],\n//   block4: [5, 1],\n//   color: \"red\",\n//   image: \"https://cdn.discordapp.com/emojis/585567202837528586.png?v=1\"\n// }\n\n// Yellow Piece\n// export const tetrominoO = {\n//   block1: [4, 0],\n//   block2: [5, 0],\n//   block3: [4, 1],\n//   block4: [5, 1],\n//   color: \"yellow\",\n//   image: \"https://cdn.discordapp.com/emojis/585567189944238101.png?v=1g\"\n// }\n\n// Purple Piece\n// export const tetrominoT = {\n//   block1: [4, 0],\n//   block2: [3, 1],\n//   block3: [4, 1],\n//   block4: [5, 1],\n//   color: \"purple\",\n//   image: \"https://cdn.discordapp.com/emojis/648743727895937044.png?v=1\"\n// }\n\n// Blue Piece\n// export const tetrominoJ = {\n//   block1: [3, 0],\n//   block2: [3, 1],\n//   block3: [4, 1],\n//   block4: [5, 1],\n//   color: \"blue\",\n//   image: \"https://cdn.discordapp.com/emojis/571208727772790786.png?v=1\"\n// }\n\n// Orange Piece\n// export const tetrominoL = {\n//   block1: [3, 0],\n//   block2: [4, 0],\n//   block3: [5, 0],\n//   block4: [3, 1],\n//   color: \"orange\",\n//   image: \"https://cdn.discordapp.com/emojis/644299473081729024.png?v=1\"\n// }\n\n// export const allTetrominos = [\n//   tetrominoI,\n//   tetrominoJ,\n//   tetrominoL,\n//   tetrominoO,\n//   tetrominoS,\n//   tetrominoT,\n//   tetrominoZ\n// ]\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (allTetrominos);\n\n//# sourceURL=webpack:///./src/tetromino.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: DIM_X, DIM_Y, BG_COLOR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DIM_X\", function() { return DIM_X; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DIM_Y\", function() { return DIM_Y; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BG_COLOR\", function() { return BG_COLOR; });\n// Game board is 10 cols x 20 rows, and each square is 20px x 20px\nconst DIM_X = 400;\nconst DIM_Y = 800;\nconst BG_COLOR = \"#000000\";\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });
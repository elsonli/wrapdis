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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./piece */ \"./src/piece.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _tetromino__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tetromino */ \"./src/tetromino.js\");\n\n\n\n\nclass Game {\n  constructor(ctx, controller) {\n    this.ctx = ctx;\n    this.pieces = [];\n    this.gameOver = false;\n    this.controller = controller;\n    // this.score = 0;\n\n    this.dimX = _utils__WEBPACK_IMPORTED_MODULE_1__[\"DIM_X\"];\n    this.dimY = _utils__WEBPACK_IMPORTED_MODULE_1__[\"DIM_Y\"];\n    this.gridWidth = _utils__WEBPACK_IMPORTED_MODULE_1__[\"GRID_WIDTH\"];\n    this.gridHeight = _utils__WEBPACK_IMPORTED_MODULE_1__[\"GRID_HEIGHT\"];\n    this.gridColor = _utils__WEBPACK_IMPORTED_MODULE_1__[\"BG_COLOR\"];\n    this.tileSize = _utils__WEBPACK_IMPORTED_MODULE_1__[\"TILE_SIZE\"];\n\n    // this.shiftRowDown = this.shiftRowDown.bind(this);\n    this.tilesOccupied = new Array(this.gridWidth).fill(0).map(() => {\n      return new Array(this.gridHeight).fill(false);\n    });\n\n    this.currPiece = this.generatePiece();\n  }\n  \n  // Returns a new and random Piece\n  generatePiece() {\n    const allTetrominoKeys = Object.keys(_tetromino__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n    const randTetrominoKey = allTetrominoKeys[Math.floor(Math.random() * allTetrominoKeys.length)];\n    const randTetromino = JSON.parse(JSON.stringify(_tetromino__WEBPACK_IMPORTED_MODULE_2__[\"default\"][randTetrominoKey]));\n\n    // Used for specific piece testing\n    // const randTetromino = JSON.parse(JSON.stringify(allTetrominos[\"tetrominoL\"]));\n\n    return new _piece__WEBPACK_IMPORTED_MODULE_0__[\"default\"](randTetromino, this);\n  }\n\n  // Issue: Multi row clears with a gap in between leaves empty row in the middle\n  // shiftRowDown(grid, rowIdx) {\n  //   for (let idx = rowIdx; idx > 0; idx--) {\n  //     if (idx <= rowIdx) {\n  //       for (let jdx = 0; jdx < grid[0].length; jdx++) {\n  //         grid[idx][jdx] = grid[idx - 1][jdx];\n  //         if (grid[idx][jdx]) {\n  //           grid[idx][jdx].pos[1] += 1;\n  //         }\n  //       }\n  //     }\n  //   }\n  //   grid[0] = new Array(grid[0].length);\n  // }\n\n  // clearRow() {\n    // Keep track of rows that have been cleared\n    // let clearedRows = [];\n\n    // Construct a transposed game board to check for filled rows\n  //   const transposed = new Array(this.gridHeight).fill(0).map(() => {\n  //     return new Array(this.gridWidth);\n  //   });\n  //   for (let idx = 0; idx < transposed.length; idx++) {\n  //     for (let jdx = 0; jdx < transposed[0].length; jdx++) {\n  //       transposed[idx][jdx] = this.filledTiles[jdx][idx];\n  //     }\n  //   }\n  //   for (let idx = 0; idx < transposed.length; idx++) {\n  //     const row = transposed[idx];\n  //     if (row.every(block => block)) {\n  //       clearedRows.push(idx);\n  //       for (let jdx = 0; jdx < row.length; jdx++) {\n  //         const currBlock = transposed[idx][jdx];\n  //         currBlock.toggleOff();\n  //       }\n  //     }\n  //   }\n\n  //   clearedRows = clearedRows.reverse();\n  //   clearedRows.forEach(rowIdx => this.shiftRowDown(transposed, rowIdx));\n\n  //   for (let idx = 0; idx < this.filledTiles.length; idx++) {\n  //     for (let jdx = 0; jdx < this.filledTiles[0].length; jdx++) {\n  //       this.filledTiles[idx][jdx] = transposed[jdx][idx];\n  //     }\n  //   }\n\n  //   this.score += clearedRows.length;\n  // }\n\n  draw() {\n    // Background for the grid\n    this.ctx.clearRect(0, 0, this.dimX, this.dimY);\n    this.ctx.fillStyle = this.gridColor;\n    this.ctx.fillRect(0, 0, this.dimX, this.dimY);\n    \n    // Construct the vertical lines for the grid\n    this.ctx.strokeStyle = \"#777777\";\n    for (let idx = 0; idx < this.gridWidth; idx++) {\n      this.ctx.beginPath();\n      this.ctx.moveTo(this.tileSize * idx, 0);\n      this.ctx.lineTo(this.tileSize * idx, this.tileSize * this.gridHeight);\n      this.ctx.stroke();\n    }\n\n    // Construct the horizontal lines for the grid\n    for (let idx = 0; idx < this.gridHeight; idx++) {\n      this.ctx.beginPath();\n      this.ctx.moveTo(0, this.tileSize * idx)\n      this.ctx.lineTo(this.dimX, this.tileSize * idx);\n      this.ctx.stroke();\n    }\n\n    // Rendering a Piece\n    for (let idx = 0; idx < this.pieces.length; idx++) {\n      let fixedPiece = this.pieces[idx];\n      fixedPiece.draw(this.ctx);\n    }\n\n    this.currPiece.draw(this.ctx);\n  }\n\n  stepRight() {\n    if (this.currPiece.validHorizontal(1)) {\n      this.currPiece.moveRight();\n    }\n  }\n\n  stepLeft() {\n    if (this.currPiece.validHorizontal(-1)) {\n      this.currPiece.moveLeft();\n    }\n  }\n\n  stepDown() {\n    if (this.currPiece.validVertical()) {\n      this.currPiece.moveDown();\n    } else {\n      this.pieces.push(this.currPiece);\n      this.currPiece.updatePosition(true);\n      this.currPiece = this.generatePiece();\n    }\n  }\n\n//   dropPiece() {\n//     while (!this.checkCollisions()) { this.currPiece.move(this.filledTiles, 1, 1) }\n//   }\n\n//   rotatePiece() {\n//     this.currPiece.rotate();\n//   }\n\n//   gameOver() {\n//     if (this.filledTiles[3][0] || this.filledTiles[4][0] || this.filledTiles[5][0] || this.filledTiles[6][0]) {\n//       return true;\n//     }\n//     return false;\n//   }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nclass GameView {\n  constructor(ctx) {\n    // Delegates to the Game class based on the pressed key\n    this.controller = {\n      keyListener: event => {\n        switch (event.code) {\n          \n          // Left Arrow (Move Piece Left)\n          case \"ArrowLeft\":\n            this.game.stepLeft();\n            this.game.draw(this.ctx);\n            break;\n\n          // Right Arrow (Move Piece Right)\n          case \"ArrowRight\":\n            this.game.stepRight();\n            this.game.draw(this.ctx);\n            break;\n          \n          // Up Arrow (Rotate Piece Clockwise)\n          case \"ArrowUp\":\n            this.game.rotatePiece();\n            this.game.draw(this.ctx);\n            break;\n          \n          // Space (Drop Immediately)\n          case \"Space\":\n            this.game.dropPiece();\n            this.game.draw(this.ctx);\n        }\n      }\n    };\n\n    this.ctx = ctx;\n    this.game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctx, this.controller);\n    this.animate = this.animate.bind(this);\n    this.interval = setInterval(this.animate, 1000);\n    window.addEventListener(\"keydown\", this.controller.keyListener.bind(this));\n  }\n\n  animate() {\n    if (!this.game.gameOver) {\n      this.game.stepDown();\n      this.game.draw(this.ctx);\n    } else {\n      this.stop();\n    }\n  }\n\n  start() {\n    this.game.draw(this.ctx);\n    this.animation = requestAnimationFrame(this.animate);\n  }\n\n  stop() {\n  //   this.ctx.fillStyle = \"white\";\n  //   this.ctx.font = \"30px Arial\";\n  //   this.ctx.fillText(this.game.score, 200, 830);\n    cancelAnimationFrame(this.animation);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameView);\n\n//# sourceURL=webpack:///./src/game_view.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\nclass Piece {\n  constructor(tetromino, game) {\n    this.game = game;\n    this.color = tetromino.color;\n    this.pos = [Math.floor(this.game.gridWidth / 2) - 1, -2];\n    this.orientation = tetromino.orientation;\n    this.orientations = tetromino.orientations;\n  }\n\n  calculateShift(shiftAmt) {\n    let xShift = Math.abs(15 - shiftAmt) % 4;\n    let yShift = Math.floor((15 - shiftAmt) / 4);\n    return [xShift, yShift];\n  }\n\n  draw() {\n    let [xPos, yPos] = this.pos;\n    \n    // Iterates over the bits in currOrientation (ex: 0x0F00) from left to right\n    let currOrientation = this.orientations[this.orientation];\n\n    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {\n      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;\n      let [xShift, yShift] = this.calculateShift(shiftAmt);\n\n      // Only need to color in the blocks with a 1 bit\n      if (currBit) {\n        this.game.ctx.fillStyle = this.color;\n        this.game.ctx.fillRect(\n          (xPos + xShift) * this.game.tileSize,\n          (yPos + yShift) * this.game.tileSize,\n          this.game.tileSize,\n          this.game.tileSize\n        );\n      } else {\n        // REMOVE\n        // this.game.ctx.fillStyle = \"#444444\";\n        // this.game.ctx.fillRect(\n        //   (xPos + xShift) * this.game.tileSize,\n        //   (yPos + yShift) * this.game.tileSize,\n        //   this.game.tileSize,\n        //   this.game.tileSize\n        // );\n      }\n    }\n  }\n\n  // Returns a boolean whether or not the next horizontal position is valid\n  validHorizontal(direction) {\n    let [xPos, yPos] = this.pos;\n    let currOrientation = this.orientations[this.orientation];\n    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {\n      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;\n      let [xShift, yShift] = this.calculateShift(shiftAmt);\n      let tileOccupied = this.game.tilesOccupied[xPos + xShift + direction][yPos + yShift];\n      // let notWithinBounds = (yPos + yShift + 1) >= this.game.gridHeight;\n      if (currBit && (tileOccupied)) {\n        console.log(this.game.tilesOccupied);\n        return false;\n      }\n    }\n    return true;\n  }\n\n  // Returns a boolean whether or not the next vertical position is valid\n  validVertical() {\n    let [xPos, yPos] = this.pos;\n    let currOrientation = this.orientations[this.orientation];\n    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {\n      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;\n      let [xShift, yShift] = this.calculateShift(shiftAmt);\n      let tileOccupied = this.game.tilesOccupied[xPos + xShift][yPos + yShift + 1];\n      let notWithinBounds = (yPos + yShift + 1) >= this.game.gridHeight;\n      if (currBit && (tileOccupied || notWithinBounds)) {\n        console.log(this.game.tilesOccupied);\n        return false;\n      }\n    }\n    return true;\n  }\n\n  updatePosition(bool) {\n    let [xPos, yPos] = this.pos;\n    let currOrientation = this.orientations[this.orientation];\n    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {\n      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;\n      let [xShift, yShift] = this.calculateShift(shiftAmt);\n      if (currBit) {\n        this.game.tilesOccupied[xPos + xShift][yPos + yShift] = bool;\n      }\n    }\n  }\n\n  moveDown() { this.pos[1] += 1 }\n\n  moveLeft() { this.pos[0] -= 1 }\n\n  moveRight() { this.pos[0] += 1 }\n\n  rotate() {\n  //   if (this.orientation === 0) {\n  //     if (this.color === \"cyan\") {\n  //       this.blocks[0].pos[0] += 2;\n  //       this.blocks[0].pos[1] += -1;\n  //       this.blocks[1].pos[0] += 1;\n  //       this.blocks[1].pos[1] += 0;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += 1;\n  //       this.blocks[3].pos[0] += -1;\n  //       this.blocks[3].pos[1] += 2;\n  //     } else if (this.color === \"green\") {\n  //       this.blocks[0].pos[0] += 0;\n  //       this.blocks[0].pos[1] += 0;\n  //       this.blocks[1].pos[0] += -1;\n  //       this.blocks[1].pos[1] += -1;\n  //       this.blocks[2].pos[0] += 2;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += 1;\n  //       this.blocks[3].pos[1] += -1;\n  //     } else if (this.color === \"red\") {\n  //       this.blocks[0].pos[0] += 2;\n  //       this.blocks[0].pos[1] += 0;\n  //       this.blocks[1].pos[0] += 1;\n  //       this.blocks[1].pos[1] += 1;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += -1;\n  //       this.blocks[3].pos[1] += 1;\n  //     } else if (this.color === \"yellow\") {\n  //       this.blocks[0].pos[0] += 0;\n  //       this.blocks[0].pos[1] += 0;\n  //       this.blocks[1].pos[0] += 0;\n  //       this.blocks[1].pos[1] += 0;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += 0;\n  //       this.blocks[3].pos[1] += 0;\n  //     } else if (this.color === \"magenta\") {\n  //       this.blocks[0].pos[0] += 1;\n  //       this.blocks[0].pos[1] += 1;\n  //       this.blocks[1].pos[0] += 1;\n  //       this.blocks[1].pos[1] += -1;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += -1;\n  //       this.blocks[3].pos[1] += 1;\n  //     } else if (this.color === \"blue\") {\n  //       this.blocks[0].pos[0] += 2;\n  //       this.blocks[0].pos[1] += -1;\n  //       this.blocks[1].pos[0] += 1;\n  //       this.blocks[1].pos[1] += -2;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += -1;\n  //       this.blocks[3].pos[0] += -1;\n  //       this.blocks[3].pos[1] += 0;\n  //     } else {\n  //       this.blocks[0].pos[0] += 1;\n  //       this.blocks[0].pos[1] += 0;\n  //       this.blocks[1].pos[0] += 1;\n  //       this.blocks[1].pos[1] += 0;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += 1;\n  //       this.blocks[3].pos[0] += 2;\n  //       this.blocks[3].pos[1] += 1;\n  //     }\n  //   } else if (this.orientation === 1) {\n  //     if (this.color === \"cyan\") {\n  //       this.blocks[0].pos[0] += -2;\n  //       this.blocks[0].pos[1] += 2;\n  //       this.blocks[1].pos[0] += -1;\n  //       this.blocks[1].pos[1] += 1;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += 1;\n  //       this.blocks[3].pos[1] += -1;\n  //     } else if (this.color === \"green\") {\n  //       this.blocks[0].pos[0] += 0;\n  //       this.blocks[0].pos[1] += 0;\n  //       this.blocks[1].pos[0] += 1;\n  //       this.blocks[1].pos[1] += 1;\n  //       this.blocks[2].pos[0] += -2;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += -1;\n  //       this.blocks[3].pos[1] += 1;\n  //     } else if (this.color === \"red\") {\n  //       this.blocks[0].pos[0] += -2;\n  //       this.blocks[0].pos[1] += 0;\n  //       this.blocks[1].pos[0] += -1;\n  //       this.blocks[1].pos[1] += -1;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += 1;\n  //       this.blocks[3].pos[1] += -1;\n  //     } else if (this.color === \"yellow\") {\n  //       this.blocks[0].pos[0] += 0;\n  //       this.blocks[0].pos[1] += 0;\n  //       this.blocks[1].pos[0] += 0;\n  //       this.blocks[1].pos[1] += 0;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += 0;\n  //       this.blocks[3].pos[1] += 0;\n  //     } else if (this.color === \"magenta\") {\n  //       this.blocks[0].pos[0] += -1;\n  //       this.blocks[0].pos[1] += 1;\n  //       this.blocks[1].pos[0] += 1;\n  //       this.blocks[1].pos[1] += 1;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += -1;\n  //       this.blocks[3].pos[1] += -1;\n  //     } else if (this.color === \"blue\") {\n  //       this.blocks[0].pos[0] += 0;\n  //       this.blocks[0].pos[1] += 1;\n  //       this.blocks[1].pos[0] += 1;\n  //       this.blocks[1].pos[1] += 0;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += -1;\n  //       this.blocks[3].pos[0] += -1;\n  //       this.blocks[3].pos[1] += -2;\n  //     } else {\n  //       this.blocks[0].pos[0] += 1;\n  //       this.blocks[0].pos[1] += 1;\n  //       this.blocks[1].pos[0] += 0;\n  //       this.blocks[1].pos[1] += 2;\n  //       this.blocks[2].pos[0] += -1;\n  //       this.blocks[2].pos[1] += 1;\n  //       this.blocks[3].pos[0] += -2;\n  //       this.blocks[3].pos[1] += 0;\n  //     }\n  //   } else if (this.orientation === 2) {\n  //     if (this.color === \"cyan\") {\n  //       this.blocks[0].pos[0] += 1;\n  //       this.blocks[0].pos[1] += -2;\n  //       this.blocks[1].pos[0] += 0;\n  //       this.blocks[1].pos[1] += -1;\n  //       this.blocks[2].pos[0] += -1;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += -2;\n  //       this.blocks[3].pos[1] += 1;\n  //     } else if (this.color === \"green\") {\n  //       this.blocks[0].pos[0] += 0;\n  //       this.blocks[0].pos[1] += 0;\n  //       this.blocks[1].pos[0] += -1;\n  //       this.blocks[1].pos[1] += -1;\n  //       this.blocks[2].pos[0] += 2;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += 1;\n  //       this.blocks[3].pos[1] += -1;\n  //     } else if (this.color === \"red\") {\n  //       this.blocks[0].pos[0] += 2;\n  //       this.blocks[0].pos[1] += 0;\n  //       this.blocks[1].pos[0] += 1;\n  //       this.blocks[1].pos[1] += 1;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += -1;\n  //       this.blocks[3].pos[1] += 1;\n  //     } else if (this.color === \"yellow\") {\n  //       this.blocks[0].pos[0] += 0;\n  //       this.blocks[0].pos[1] += 0;\n  //       this.blocks[1].pos[0] += 0;\n  //       this.blocks[1].pos[1] += 0;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += 0;\n  //       this.blocks[3].pos[1] += 0;\n  //     } else if (this.color === \"magenta\") {\n  //       this.blocks[0].pos[0] += -1;\n  //       this.blocks[0].pos[1] += -1;\n  //       this.blocks[1].pos[0] += -1;\n  //       this.blocks[1].pos[1] += 1;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += 1;\n  //       this.blocks[3].pos[1] += -1;\n  //     } else if (this.color === \"blue\") {\n  //       this.blocks[0].pos[0] += -1;\n  //       this.blocks[0].pos[1] += 0;\n  //       this.blocks[1].pos[0] += 0;\n  //       this.blocks[1].pos[1] += 1;\n  //       this.blocks[2].pos[0] += 1;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += 2;\n  //       this.blocks[3].pos[1] += -1;\n  //     } else {\n  //       this.blocks[0].pos[0] += -1;\n  //       this.blocks[0].pos[1] += 1;\n  //       this.blocks[1].pos[0] += -2;\n  //       this.blocks[1].pos[1] += 0;\n  //       this.blocks[2].pos[0] += -1;\n  //       this.blocks[2].pos[1] += -1;\n  //       this.blocks[3].pos[0] += 0;\n  //       this.blocks[3].pos[1] += -2;\n  //     }\n  //   } else {\n  //     if (this.color === \"cyan\") {\n  //       this.blocks[0].pos[0] += -1;\n  //       this.blocks[0].pos[1] += 1;\n  //       this.blocks[1].pos[0] += 0;\n  //       this.blocks[1].pos[1] += 0;\n  //       this.blocks[2].pos[0] += 1;\n  //       this.blocks[2].pos[1] += -1;\n  //       this.blocks[3].pos[0] += 2;\n  //       this.blocks[3].pos[1] += -2;\n  //     } else if (this.color === \"green\") {\n  //       this.blocks[0].pos[0] += 0;\n  //       this.blocks[0].pos[1] += 0;\n  //       this.blocks[1].pos[0] += 1;\n  //       this.blocks[1].pos[1] += 1;\n  //       this.blocks[2].pos[0] += -2;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += -1;\n  //       this.blocks[3].pos[1] += 1;\n  //     } else if (this.color === \"red\") {\n  //       this.blocks[0].pos[0] += -2;\n  //       this.blocks[0].pos[1] += 0;\n  //       this.blocks[1].pos[0] += -1;\n  //       this.blocks[1].pos[1] += -1;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += 1;\n  //       this.blocks[3].pos[1] += -1;\n  //     } else if (this.color === \"yellow\") {\n  //       this.blocks[0].pos[0] += 0;\n  //       this.blocks[0].pos[1] += 0;\n  //       this.blocks[1].pos[0] += 0;\n  //       this.blocks[1].pos[1] += 0;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += 0;\n  //       this.blocks[3].pos[1] += 0;\n  //     } else if (this.color === \"magenta\") {\n  //       this.blocks[0].pos[0] += 1;\n  //       this.blocks[0].pos[1] += -1;\n  //       this.blocks[1].pos[0] += -1;\n  //       this.blocks[1].pos[1] += -1;\n  //       this.blocks[2].pos[0] += 0;\n  //       this.blocks[2].pos[1] += 0;\n  //       this.blocks[3].pos[0] += 1;\n  //       this.blocks[3].pos[1] += 1;\n  //     } else if (this.color === \"blue\") {\n  //       this.blocks[0].pos[0] += -1;\n  //       this.blocks[0].pos[1] += -1;\n  //       this.blocks[1].pos[0] += -2;\n  //       this.blocks[1].pos[1] += 0;\n  //       this.blocks[2].pos[0] += -1;\n  //       this.blocks[2].pos[1] += 1;\n  //       this.blocks[3].pos[0] += 0;\n  //       this.blocks[3].pos[1] += 2;\n  //     } else {\n  //       this.blocks[0].pos[0] += -1;\n  //       this.blocks[0].pos[1] += -2;\n  //       this.blocks[1].pos[0] += 1;\n  //       this.blocks[1].pos[1] += -2;\n  //       this.blocks[2].pos[0] += 2;\n  //       this.blocks[2].pos[1] += -1;\n  //       this.blocks[3].pos[0] += 0;\n  //       this.blocks[3].pos[1] += 1;\n  //     }\n  //   }\n  //   this.orientation = (this.orientation + 1) % 4;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Piece);\n\n//# sourceURL=webpack:///./src/piece.js?");

/***/ }),

/***/ "./src/tetromino.js":
/*!**************************!*\
  !*** ./src/tetromino.js ***!
  \**************************/
/*! exports provided: allTetrominos, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"allTetrominos\", function() { return allTetrominos; });\nconst allTetrominos = {\n  tetrominoI: {\n    orientation: 0,\n    orientations: [0x0F00, 0x2222, 0x00F0, 0x4444],\n    color: \"#00FFFF\",\n    // block1: [3, -2],\n    // block2: [4, -2],\n    // block3: [5, -2],\n    // block4: [6, -2],\n    // image: \"https://cdn.discordapp.com/emojis/645009599870664715.png?v=1\"\n  },\n  tetrominoS: {\n    orientation: 0,\n    orientations: [0x06C0, 0x8C40, 0x6C00, 0x4620],\n    color: \"#72CB3B\",\n    // block1: [4, -3],\n    // block2: [5, -3],\n    // block3: [3, -2],\n    // block4: [4, -2],\n    // image: \"https://cdn.discordapp.com/emojis/648742827009769483.png?v=1\"\n  },\n  tetrominoZ: {\n    orientation: 0,\n    orientations: [0x0C60, 0x4C80, 0xC600, 0x2640],\n    color: \"#FF3213\",\n    // block1: [3, -3],\n    // block2: [4, -3],\n    // block3: [4, -2],\n    // block4: [5, -2],\n    // image: \"https://cdn.discordapp.com/emojis/585567202837528586.png?v=1\"\n  },\n  tetrominoO: {\n    orientation: 0,\n    orientations: [0xCC00, 0xCC00, 0xCC00, 0xCC00],\n    color: \"#FFD500\",\n    // block1: [4, -3],\n    // block2: [5, -3],\n    // block3: [4, -2],\n    // block4: [5, -2],\n    // image: \"https://cdn.discordapp.com/emojis/585567189944238101.png?v=1g\"\n  },\n  tetrominoT: {\n    orientation: 0,\n    orientations: [0x4E00, 0x4640, 0x0E40, 0x4C40],\n    color: \"#FF00FF\",\n    // block1: [4, -3],\n    // block2: [3, -2],\n    // block3: [4, -2],\n    // block4: [5, -2],\n    // image: \"https://cdn.discordapp.com/emojis/648743727895937044.png?v=1\"\n  },\n  tetrominoJ: {\n    orientation: 0,\n    orientations: [0x8E00, 0x6440, 0x0E20, 0x44C0],\n    color: \"#0341AE\",\n    // block1: [3, -3],\n    // block2: [3, -2],\n    // block3: [4, -2],\n    // block4: [5, -2],\n    // image: \"https://cdn.discordapp.com/emojis/571208727772790786.png?v=1\"\n  },\n  tetrominoL: {\n    orientation: 0,\n    orientations: [0x0E80, 0xC440, 0x2E00, 0x4460],\n    color: \"#FF971C\",\n    // block1: [3, -3],\n    // block2: [4, -3],\n    // block3: [5, -3],\n    // block4: [3, -2],\n    // image: \"https://cdn.discordapp.com/emojis/644299473081729024.png?v=1\"\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (allTetrominos);\n\n//# sourceURL=webpack:///./src/tetromino.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: GRID_WIDTH, GRID_HEIGHT, TILE_SIZE, DIM_X, DIM_Y, BG_COLOR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GRID_WIDTH\", function() { return GRID_WIDTH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GRID_HEIGHT\", function() { return GRID_HEIGHT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TILE_SIZE\", function() { return TILE_SIZE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DIM_X\", function() { return DIM_X; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DIM_Y\", function() { return DIM_Y; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BG_COLOR\", function() { return BG_COLOR; });\n// Game board is 10 cols x 20 rows, and each square is 40px x 40px\nconst GRID_WIDTH = 10;\nconst GRID_HEIGHT = 20;\nconst TILE_SIZE = 40;\nconst DIM_X = 400;\nconst DIM_Y = 800;\nconst BG_COLOR = \"#000000\";\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });
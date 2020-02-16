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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./piece */ \"./src/piece.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _tetromino__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tetromino */ \"./src/tetromino.js\");\n\n\n\n\nclass Game {\n  constructor(ctx, controller) {\n    this.ctx = ctx;\n    this.pieces = [];\n    this.gameOver = false;\n    this.controller = controller;\n    // this.score = 0;\n\n    this.dimX = _utils__WEBPACK_IMPORTED_MODULE_1__[\"DIM_X\"];\n    this.dimY = _utils__WEBPACK_IMPORTED_MODULE_1__[\"DIM_Y\"];\n    this.numCols = _utils__WEBPACK_IMPORTED_MODULE_1__[\"NUM_COLS\"];\n    this.numRows = _utils__WEBPACK_IMPORTED_MODULE_1__[\"NUM_ROWS\"];\n    this.gridColor = _utils__WEBPACK_IMPORTED_MODULE_1__[\"BG_COLOR\"];\n    this.tileSize = _utils__WEBPACK_IMPORTED_MODULE_1__[\"TILE_SIZE\"];\n\n    // this.shiftRowDown = this.shiftRowDown.bind(this);\n    this.tilesOccupied = new Array(this.numCols).fill(0).map(() => {\n      return new Array(this.numRows).fill(false);\n    });\n\n    this.pieceMatrix = new Array(this.numCols).fill(0).map(() => {\n      return new Array(this.numRows).fill(null);\n    });\n\n    this.currPiece = this.generatePiece();\n  }\n  \n  // Returns a new and random Piece\n  generatePiece() {\n    const allTetrominoKeys = Object.keys(_tetromino__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n    const randTetrominoKey = allTetrominoKeys[Math.floor(Math.random() * allTetrominoKeys.length)];\n    const randTetromino = JSON.parse(JSON.stringify(_tetromino__WEBPACK_IMPORTED_MODULE_2__[\"default\"][randTetrominoKey]));\n\n    // Used for specific piece testing\n    // const randTetromino = JSON.parse(JSON.stringify(allTetrominos[\"tetrominoL\"]));\n\n    return new _piece__WEBPACK_IMPORTED_MODULE_0__[\"default\"](randTetromino, this);\n  }\n\n  draw() {\n    // Background for the grid\n    this.ctx.clearRect(0, 0, this.dimX, this.dimY);\n    this.ctx.fillStyle = this.gridColor;\n    this.ctx.fillRect(0, 0, this.dimX, this.dimY);\n    \n    // Construct the vertical lines for the grid\n    this.ctx.strokeStyle = \"#777777\";\n    for (let idx = 0; idx < this.numCols; idx++) {\n      this.ctx.beginPath();\n      this.ctx.moveTo(this.tileSize * idx, 0);\n      this.ctx.lineTo(this.tileSize * idx, this.tileSize * this.numRows);\n      this.ctx.stroke();\n    }\n\n    // Construct the horizontal lines for the grid\n    for (let idx = 0; idx < this.numRows; idx++) {\n      this.ctx.beginPath();\n      this.ctx.moveTo(0, this.tileSize * idx)\n      this.ctx.lineTo(this.dimX, this.tileSize * idx);\n      this.ctx.stroke();\n    }\n\n    // Rendering a Piece\n    for (let idx = 0; idx < this.pieces.length; idx++) {\n      let fixedPiece = this.pieces[idx];\n      fixedPiece.draw(this.ctx);\n    }\n\n    this.currPiece.draw(this.ctx);\n  }\n\n  stepRight() {\n    if (this.currPiece.validHorizontal(1)) {\n      this.currPiece.moveRight();\n    }\n  }\n\n  stepLeft() {\n    if (this.currPiece.validHorizontal(-1)) {\n      this.currPiece.moveLeft();\n    }\n  }\n\n  stepDown() {\n    if (this.currPiece.validVertical()) {\n      this.currPiece.moveDown();\n    } else {\n    // this.currPiece.color = \"#FFFFFF\"; // Change color on drop\n      this.pieces.push(this.currPiece);\n      this.currPiece.updatePosition(true);\n      // Add row clearing logic here?\n      this.clearRows();\n      this.currPiece = this.generatePiece();\n    }\n  }\n\n  dropPiece() {\n    while (this.currPiece.validVertical()) {\n      this.currPiece.moveDown();\n    }\n    // this.currPiece.color = \"#FFFFFF\"; // Change color on drop\n    this.pieces.push(this.currPiece);\n    this.currPiece.updatePosition(true);\n    // Add row clearing logic here?\n    this.clearRows();\n    this.currPiece = this.generatePiece();\n  }\n\n  rotatePiece() {\n    this.currPiece.rotate();\n    // this.clearRows();\n  }\n\n\n\n  // Finds and returns a single row to be cleared if one exists\n  findRowToClear() {\n    for (let rowIdx = 0; rowIdx < this.numRows; rowIdx++) {\n      let row = this.tilesOccupied.map((col, colIdx) => this.tilesOccupied[colIdx][rowIdx]);\n      if (row.reduce((a, b) => a + b, 0) === this.numCols) return rowIdx;\n    }\n    return -1;\n  }\n\n  // Shifts every block at or above the lowestRowIdx down by one\n  collapseRows(lowestRowIdx) {\n    for (let colIdx = 0; colIdx < this.numCols; colIdx++) {\n      for (let rowIdx = lowestRowIdx; rowIdx >= 0; rowIdx--) {\n        this.tilesOccupied[colIdx][rowIdx] = this.tilesOccupied[colIdx][rowIdx - 1] || false;\n        // this.pieceMatrix[colIdx][rowIdx] = this.pieceMatrix[colIdx][rowIdx - 1] || null;\n      }\n    }\n  }\n\n  clearRows() {\n    let rowToClear = this.findRowToClear();\n\n    while (rowToClear >= 0) {\n      // Shift down rows above rowToClear in 'this.tilesOccupied' for collision logic\n      this.collapseRows(rowToClear);\n\n      // Update piece orientations for drawing logic\n      // Doesn't update correctly for multiple rows (update pieces above cleared rows)\n      for (let pieceCol = 0; pieceCol < this.numCols; pieceCol++) {\n        for (let pieceRow = this.numRows - 1; pieceRow >= 0; pieceRow--) {\n          let piece = this.pieceMatrix[pieceCol][pieceRow];\n          if (piece) {\n            // piece.pos[1] += 1;\n            // let containsRow = false;\n            let [colPos, rowPos] = piece.pos;\n            let currOrientation = piece.orientations[piece.orientation];\n            let currOrientationStr = currOrientation.toString(2).padStart(16, \"0\");\n            for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {\n              // let currBit = currOrientationStr[15 - shiftAmt];\n              let [colShift, rowShift] = piece.calculateShift(shiftAmt);\n              let newRowPos = rowPos + rowShift;\n              if (newRowPos === rowToClear) {\n                // console.log(shiftAmt);\n                // console.log(currOrientationStr, \"before\");\n                currOrientationStr = (currOrientationStr.slice(0, 15 - shiftAmt) + currOrientationStr.slice(15 - shiftAmt + 1)).padStart(16, \"0\");\n                // console.log(currOrientationStr, \"after\");\n                // containsRow = true;\n              }\n            }\n            // if (!containsRow || piece.pos[1] < rowToClear) piece.pos[1] += 1;\n            piece.orientations[piece.orientation] = parseInt(currOrientationStr, 2);\n          }\n        }\n      }\n\n      // console.log(this.tilesOccupied, \"tilesoccupied\");\n      // console.log(this.pieceMatrix, \"piecematrix\");\n\n      rowToClear = this.findRowToClear();\n    }\n  }\n\n//   gameOver() {\n//     if (this.filledTiles[3][0] || this.filledTiles[4][0] || this.filledTiles[5][0] || this.filledTiles[6][0]) {\n//       return true;\n//     }\n//     return false;\n//   }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nclass GameView {\n  constructor(ctx) {\n    // Delegates to the Game class based on the pressed key\n    this.controller = {\n      keyListener: event => {\n        switch (event.code) {\n          \n          // Left Arrow (Move Piece Left)\n          case \"ArrowLeft\":\n            this.game.stepLeft();\n            this.game.draw(this.ctx);\n            break;\n\n          // Right Arrow (Move Piece Right)\n          case \"ArrowRight\":\n            this.game.stepRight();\n            this.game.draw(this.ctx);\n            break;\n          \n          // Up Arrow (Rotate Piece Clockwise)\n          case \"ArrowUp\":\n            this.game.rotatePiece();\n            this.game.draw(this.ctx);\n            break;\n\n          case \"ArrowDown\":\n            this.game.stepDown();\n            this.game.draw(this.ctx);\n            break;\n          \n          // Space (Drop Immediately)\n          case \"Space\":\n            this.game.dropPiece();\n            this.game.draw(this.ctx);\n            break;\n        }\n      }\n    };\n\n    this.ctx = ctx;\n    this.game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctx, this.controller);\n    this.animate = this.animate.bind(this);\n    this.interval = setInterval(this.animate, 1000);\n    window.addEventListener(\"keydown\", this.controller.keyListener.bind(this));\n  }\n\n  animate() {\n    // if (!this.game.gameOver) {\n    this.game.stepDown();\n    this.game.draw(this.ctx);\n    // } else {\n      // this.stop();\n    // }\n  }\n\n  start() {\n    this.game.draw(this.ctx);\n    this.animation = requestAnimationFrame(this.animate);\n  }\n\n  stop() {\n  //   this.ctx.fillStyle = \"white\";\n  //   this.ctx.font = \"30px Arial\";\n  //   this.ctx.fillText(this.game.score, 200, 830);\n    cancelAnimationFrame(this.animation);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameView);\n\n//# sourceURL=webpack:///./src/game_view.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\nclass Piece {\n  constructor(tetromino, game) {\n    this.game = game;\n    this.color = tetromino.color;\n    this.pos = [Math.floor(this.game.numCols / 2) - 1, -2];\n    this.orientation = tetromino.orientation;\n    this.orientations = tetromino.orientations;\n  }\n\n  calculateShift(shiftAmt) {\n    let colShift = Math.abs(15 - shiftAmt) % 4;\n    let rowShift = Math.floor((15 - shiftAmt) / 4);\n    return [colShift, rowShift];\n  }\n\n  draw() {\n    let [colPos, rowPos] = this.pos;\n    \n    // Iterates over the bits in currOrientation (ex: 0x0F00) from left to right\n    let currOrientation = this.orientations[this.orientation];\n\n    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {\n      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;\n      let [colShift, rowShift] = this.calculateShift(shiftAmt);\n\n      // Calculate new positions - newColPos needs to account for negative modulos\n      let newColPos = (colPos + colShift) % this.game.numCols;\n      newColPos = (newColPos + this.game.numCols) % this.game.numCols;\n      let newRowPos = rowPos + rowShift;\n\n      // Only need to color in the blocks with a 1 bit\n      if (currBit) {\n        this.game.ctx.fillStyle = this.color;\n        this.game.ctx.fillRect(\n          newColPos * this.game.tileSize,\n          newRowPos * this.game.tileSize,\n          this.game.tileSize,\n          this.game.tileSize\n        );\n      } else {\n        // REMOVE\n        // this.game.ctx.fillStyle = \"#444444\";\n        // this.game.ctx.fillRect(\n        //   newColPos * this.game.tileSize,\n        //   newRowPos * this.game.tileSize,\n        //   this.game.tileSize,\n        //   this.game.tileSize\n        // );\n      }\n    }\n  }\n\n  validOrientation(orientation) {\n    let [colPos, rowPos] = this.pos;\n    let nextOrientation = this.orientations[orientation];\n    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {\n      let currBit = (nextOrientation & (1 << shiftAmt)) >> shiftAmt;\n      let [colShift, rowShift] = this.calculateShift(shiftAmt);\n\n      // Calculate new positions, newColPos needs to account for negative modulos\n      let newColPos = (colPos + colShift) % this.game.numCols;\n      newColPos = (newColPos + this.game.numCols) % this.game.numCols;\n      let newRowPos = rowPos + rowShift;\n      \n      let tileOccupied = this.game.tilesOccupied[newColPos][newRowPos];\n      if (currBit && tileOccupied) return false;\n    }\n    return true;\n  }\n\n  // Returns a boolean whether or not the next horizontal position is valid\n  validHorizontal(direction) {\n    let [colPos, rowPos] = this.pos;\n    let currOrientation = this.orientations[this.orientation];\n    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {\n      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;\n      let [colShift, rowShift] = this.calculateShift(shiftAmt);\n\n      // Calculate new positions - newColPos needs to account for negative modulos\n      let newColPos = (colPos + colShift + direction) % this.game.numCols;\n      newColPos = (newColPos + this.game.numCols) % this.game.numCols;\n      let newRowPos = rowPos + rowShift;\n\n      let tileOccupied = this.game.tilesOccupied[newColPos][newRowPos];\n      if (currBit && tileOccupied) return false;\n    }\n    return true;\n  }\n\n  // Returns a boolean whether or not the next vertical position is valid\n  validVertical() {\n    let [colPos, rowPos] = this.pos;\n    let currOrientation = this.orientations[this.orientation];\n    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {\n      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;\n      let [colShift, rowShift] = this.calculateShift(shiftAmt);\n\n      // Calculate new positions - newColPos needs to account for negative modulos\n      let newColPos = (colPos + colShift) % this.game.numCols;\n      newColPos = (newColPos + this.game.numCols) % this.game.numCols;\n      let newRowPos = rowPos + rowShift + 1;\n\n      let tileOccupied = this.game.tilesOccupied[newColPos][newRowPos];\n      let notWithinBounds = (rowPos + rowShift + 1) >= this.game.numRows;\n      if (currBit && (tileOccupied || notWithinBounds)) return false;\n    }\n    return true;\n  }\n\n  updatePosition(bool) {\n    let [colPos, rowPos] = this.pos;\n    let updatedPos = false;\n    let currOrientation = this.orientations[this.orientation];\n\n    if (!bool) this.game.pieceMatrix[colPos][rowPos] = null;\n\n    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {\n      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;\n      let [colShift, rowShift] = this.calculateShift(shiftAmt);\n\n      // Calculate new positions - newColPos needs to account for negative modulos\n      let newColPos = (colPos + colShift) % this.game.numCols;\n      newColPos = (newColPos + this.game.numCols) % this.game.numCols;\n      let newRowPos = rowPos + rowShift;\n\n      if (currBit) {\n        if (!updatedPos && bool) this.game.pieceMatrix[newColPos][newRowPos] = this;\n        updatedPos = true;\n        this.game.tilesOccupied[newColPos][newRowPos] = bool\n      }\n    }\n    console.log(this.game.pieceMatrix, \"piecematrix\")\n  }\n\n  moveDown() { this.pos[1] += 1 }\n\n  moveLeft() { this.pos[0] -= 1 }\n\n  moveRight() { this.pos[0] += 1 }\n\n  rotate() {\n    let nextOrientation = (this.orientation + 1) % 4;\n    if (this.validOrientation(nextOrientation)) {\n      this.orientation = (this.orientation + 1) % 4;\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Piece);\n\n//# sourceURL=webpack:///./src/piece.js?");

/***/ }),

/***/ "./src/tetromino.js":
/*!**************************!*\
  !*** ./src/tetromino.js ***!
  \**************************/
/*! exports provided: allTetrominos, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"allTetrominos\", function() { return allTetrominos; });\nconst allTetrominos = {\n  tetrominoI: {\n    orientation: 0,\n    orientations: [0x0F00, 0x2222, 0x00F0, 0x4444],\n    color: \"#00FFFF\"\n  },\n  tetrominoS: {\n    orientation: 0,\n    orientations: [0x06C0, 0x8C40, 0x6C00, 0x4620],\n    color: \"#72CB3B\"\n  },\n  tetrominoZ: {\n    orientation: 0,\n    orientations: [0x0C60, 0x4C80, 0xC600, 0x2640],\n    color: \"#FF3213\"\n  },\n  tetrominoO: {\n    orientation: 0,\n    orientations: [0xCC00, 0xCC00, 0xCC00, 0xCC00],\n    color: \"#FFD500\"\n  },\n  tetrominoT: {\n    orientation: 0,\n    orientations: [0x4E00, 0x4640, 0x0E40, 0x4C40],\n    color: \"#FF00FF\"\n  },\n  tetrominoJ: {\n    orientation: 0,\n    orientations: [0x8E00, 0x6440, 0x0E20, 0x44C0],\n    color: \"#0341AE\"\n  },\n  tetrominoL: {\n    orientation: 0,\n    orientations: [0x0E80, 0xC440, 0x2E00, 0x4460],\n    color: \"#FF971C\"\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (allTetrominos);\n\n//# sourceURL=webpack:///./src/tetromino.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: NUM_COLS, NUM_ROWS, TILE_SIZE, DIM_X, DIM_Y, BG_COLOR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NUM_COLS\", function() { return NUM_COLS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NUM_ROWS\", function() { return NUM_ROWS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TILE_SIZE\", function() { return TILE_SIZE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DIM_X\", function() { return DIM_X; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DIM_Y\", function() { return DIM_Y; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BG_COLOR\", function() { return BG_COLOR; });\n// Game board is 10 cols x 20 rows, and each square is 40px x 40px\nconst NUM_COLS = 10;\nconst NUM_ROWS = 20;\nconst TILE_SIZE = 40;\nconst DIM_X = 400;\nconst DIM_Y = 800;\nconst BG_COLOR = \"#000000\";\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./piece */ \"./src/piece.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _tetromino__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tetromino */ \"./src/tetromino.js\");\n\n\n\n\nclass Game {\n  constructor(ctx, controller) {\n    this.ctx = ctx;\n    this.pieces = [];\n    this.controller = controller;\n    this.score = 0;\n\n    this.dimX = _utils__WEBPACK_IMPORTED_MODULE_1__[\"DIM_X\"];\n    this.dimY = _utils__WEBPACK_IMPORTED_MODULE_1__[\"DIM_Y\"];\n    this.numCols = _utils__WEBPACK_IMPORTED_MODULE_1__[\"NUM_COLS\"];\n    this.numRows = _utils__WEBPACK_IMPORTED_MODULE_1__[\"NUM_ROWS\"];\n    this.gridColor = _utils__WEBPACK_IMPORTED_MODULE_1__[\"BG_COLOR\"];\n    this.tileSize = _utils__WEBPACK_IMPORTED_MODULE_1__[\"TILE_SIZE\"];\n\n    // Keep track of the tiles currently occupied on the grid using booleans\n    // A Piece is comprised of 16 tiles, but only 4 tiles will be true\n    this.tilesOccupied = new Array(this.numCols).fill(0).map(() => {\n      return new Array(this.numRows).fill(false);\n    });\n\n    // Keep track of Pieces by pushing them into a matrix of arrays using the\n    // Piece's position (all tiles are offset relative to the top left tile)\n    this.pieceMatrix = new Array(this.numCols).fill(0).map(() => {\n      return new Array(this.numRows).fill(0).map(() => {\n        return new Array();\n      });\n    });\n\n    this.generatedPieces = this.generatePieces();\n    this.currPiece = this.generatePiece();\n  }\n  \n  // Generates a set of random tetrominos stored in `this.generatedPieces`\n  generatePieces() {\n    const allTetrominoKeys = Object.keys(_tetromino__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n\n    // Shuffle the keys obtained from `allTetrominoKeys`\n    for (let idx = allTetrominoKeys.length - 1; idx > 0; idx--) {\n      const jdx = Math.floor(Math.random() * idx);\n      const tempKey = allTetrominoKeys[idx];\n      allTetrominoKeys[idx] = allTetrominoKeys[jdx];\n      allTetrominoKeys[jdx] = tempKey;\n    }\n\n    // Map all of the keys in `allTetrominoKeys` into Piece objects\n    return allTetrominoKeys.map(key => {\n      return JSON.parse(JSON.stringify(_tetromino__WEBPACK_IMPORTED_MODULE_2__[\"default\"][key]));\n    });\n  }\n\n  // Returns a random Piece by sampling from `this.generatedPieces`\n  generatePiece() {\n    if (!this.generatedPieces.length) {\n      this.generatedPieces = this.generatePieces();\n    }\n    let randTetromino = this.generatedPieces.pop();\n    // Used for specific piece testing\n    // const randTetromino = JSON.parse(JSON.stringify(allTetrominos[\"tetrominoI\"]));\n\n    return new _piece__WEBPACK_IMPORTED_MODULE_0__[\"default\"](randTetromino, this);\n  }\n\n  // Draws the game board, locked Pieces, and current Piece\n  draw() {\n    // Draws the background for the grid\n    this.ctx.clearRect(0, 0, this.dimX, this.dimY);\n    this.ctx.fillStyle = this.gridColor;\n    this.ctx.fillRect(0, 0, this.dimX, this.dimY);\n    \n    // Constructs and draws the vertical lines for the grid\n    this.ctx.strokeStyle = \"#777777\";\n    for (let idx = 0; idx < this.numCols; idx++) {\n      this.ctx.beginPath();\n      this.ctx.moveTo(this.tileSize * idx, 0);\n      this.ctx.lineTo(this.tileSize * idx, this.tileSize * this.numRows);\n      this.ctx.stroke();\n    }\n\n    // Constructs and draws the horizontal lines for the grid\n    for (let idx = 0; idx < this.numRows; idx++) {\n      this.ctx.beginPath();\n      this.ctx.moveTo(0, this.tileSize * idx)\n      this.ctx.lineTo(this.dimX, this.tileSize * idx);\n      this.ctx.stroke();\n    }\n\n    // Draws all of the Pieces that are already \"locked in\"\n    for (let idx = 0; idx < this.pieces.length; idx++) {\n      let fixedPiece = this.pieces[idx];\n      fixedPiece.draw(this.ctx);\n    }\n\n    // Draws the current Piece which is still movable\n    this.currPiece.draw(this.ctx);\n  }\n\n  // Move the current Piece to the right by 1 block if it is a valid position\n  stepRight() {\n    if (this.currPiece.validHorizontal(1)) {\n      this.currPiece.moveRight();\n    }\n  }\n\n  // Move the current Piece to the left by 1 block if it is a valid position\n  stepLeft() {\n    if (this.currPiece.validHorizontal(-1)) {\n      this.currPiece.moveLeft();\n    }\n  }\n\n  // Move the current Piece down by 1 block if it is a valid position\n  // Otherwise, store the current Piece as a \"locked in\" Piece, record its\n  // current position, clear rows if any, and then generate a new current Piece\n  stepDown() {\n    if (this.currPiece.validVertical()) {\n      this.currPiece.moveDown();\n      return true;\n    } else {\n      // this.currPiece.color = \"#444444\"; // Change color on drop\n      this.pieces.push(this.currPiece);\n      this.currPiece.recordPiece();\n      this.clearRows();\n      this.currPiece = this.generatePiece();\n      return false;\n    }\n  }\n\n  // Continuously move the current Piece downwards until collision\n  dropPiece() {\n    let validStep = this.stepDown();\n    while (validStep) {\n      validStep = this.stepDown();\n    }\n  }\n\n  // Rotates the current Piece by updating its orientation attribute if its\n  // next orientation is a valid position\n  rotatePiece() {\n    let nextOrientation = (this.currPiece.orientation + 1) % 4;\n    if (this.currPiece.validOrientation(nextOrientation)) {\n      this.currPiece.rotate();\n    }\n  }\n\n  // If there exists a row to clear, return that row's index, and -1 otherwise\n  // Rows are checked from the bottom of the grid to the top of the grid\n  findRowToClear() {\n    for (let rowIdx = this.numRows - 1; rowIdx >= 0; rowIdx--) {\n      let row = this.tilesOccupied.map((col, colIdx) => this.tilesOccupied[colIdx][rowIdx]);\n      if (row.reduce((a, b) => a + b, 0) === this.numCols) return rowIdx;\n    }\n    return -1;\n  }\n\n  // Update `this.tilesOccupied` by shifting every entry down by 1 if its rowIdx\n  // is less than (higher on the grid) `rowToClear`, starting from rowToClear\n  updateTilesOccupied(rowToClear) {\n    for (let colIdx = 0; colIdx < this.numCols; colIdx++) {\n      for (let rowIdx = rowToClear; rowIdx >= 0; rowIdx--) {\n        // Accounts for the top row pulling from a negative index\n        this.tilesOccupied[colIdx][rowIdx] = this.tilesOccupied[colIdx][rowIdx - 1] || false;\n      }\n    }\n  }\n\n  // Clears filled rows from the game board, run on every dropped piece\n  clearRows() {\n    let clearedRows = 0;\n    let rowToClear = this.findRowToClear();\n\n    while (rowToClear >= 0) {\n      clearedRows += 1;\n      this.updateTilesOccupied(rowToClear);\n\n      // Update Piece orientations for drawing logic starting from `rowToClear`\n      for (let pieceMatrixCol = 0; pieceMatrixCol < this.numCols; pieceMatrixCol++) {\n        for (let pieceMatrixRow = rowToClear; pieceMatrixRow >= 0; pieceMatrixRow--) {\n\n          // `piecesArr` contains Piece starting points (Piece's top left tile)\n          let piecesArr = this.pieceMatrix[pieceMatrixCol][pieceMatrixRow];\n          if (piecesArr.length) {\n\n            // Keep track of the Pieces that need to be shifted downwards into\n            // the tile directly underneath in `this.pieceMatrix`\n            let trackIdxs = [];\n            for (let pieceIdx = piecesArr.length - 1; pieceIdx >= 0; pieceIdx--) {\n              let piece = piecesArr[pieceIdx];\n             \n              // Handles if cyan piece is guaranteed to be above `rowToClear`\n              if (piece.color === \"#00FFFF\" && piece.pos[1] + 4 < rowToClear) {\n                piece.pos[1] += 1;\n                trackIdxs.push(pieceIdx);\n\n              // Handles any other piece guaranteed to be above `rowToClear`\n              } else if (piece.pos[1] + 3 < rowToClear) {\n                piece.pos[1] += 1;\n                trackIdxs.push(pieceIdx);\n\n              // The `rowToClear` is within the bounds of the considered piece\n              // Delete that portion of the piece's orientation and update the\n              // piece's orientation array to reflect the change\n              // However, the Piece's position does not need to be changed\n              } else {\n                let [colPos, rowPos] = piece.pos;\n                let currOrientation = piece.orientations[piece.orientation];\n                let currOrientationStr = currOrientation.toString(2).padStart(16, \"0\");\n                for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {\n                  let [colShift, rowShift] = piece.calculateShift(shiftAmt);\n                  let newRowPos = rowPos + rowShift;\n                  if (newRowPos === rowToClear) {\n                    currOrientationStr = (currOrientationStr.slice(0, 15 - shiftAmt) + currOrientationStr.slice(15 - shiftAmt + 1)).padStart(16, \"0\");\n                  }\n                }\n                let binaryOrientation = parseInt(currOrientationStr, 2);\n                piece.orientations[piece.orientation] = binaryOrientation;\n              }\n            }\n\n            // `trackIdxs` will be an array of Piece indices within `piecesArr`\n            // in decreasing order that needs to be shifted down by 1\n            for (let idx = 0; idx < trackIdxs.length; idx++) {\n              let trackIdx = trackIdxs[idx];\n              let trackPiece = piecesArr[trackIdx];\n              this.pieceMatrix[pieceMatrixCol][pieceMatrixRow + 1].push(trackPiece);\n            }\n\n            // Remove the tracked Pieces from the current `piecesArr`, which\n            // will also affect `this.pieceMatrix` due to reference\n            for (let idx = 0; idx < trackIdxs.length; idx++) {\n              let trackIdx = trackIdxs[idx];\n              piecesArr.splice(trackIdx, 1);\n            }\n          }\n        }\n      }\n\n      // Keep updating `rowToClear` until there are no more rows to clear\n      rowToClear = this.findRowToClear();\n    }\n\n    this.score += clearedRows * 200;\n  }\n\n  // Checks whether or not the game is over and returns a boolean\n  gameOver() {\n    return this.currPiece.validVertical() ? false : true;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nclass GameView {\n  constructor(ctx) {\n    // Delegates to the Game class based on the pressed key\n    this.controller = {\n      keyListener: event => {\n        switch (event.code) {\n          \n          // Left Arrow (Move Piece Left)\n          case \"ArrowLeft\":\n            this.game.stepLeft();\n            this.game.draw(this.ctx);\n            break;\n\n          // Right Arrow (Move Piece Right)\n          case \"ArrowRight\":\n            this.game.stepRight();\n            this.game.draw(this.ctx);\n            break;\n          \n          // Up Arrow (Rotate Piece Clockwise)\n          case \"ArrowUp\":\n            this.game.rotatePiece();\n            this.game.draw(this.ctx);\n            break;\n\n          case \"ArrowDown\":\n            this.game.stepDown();\n            this.game.draw(this.ctx);\n            break;\n          \n          // Space (Drop Immediately)\n          case \"Space\":\n            this.game.dropPiece();\n            this.game.draw(this.ctx);\n            break;\n        }\n      }\n    };\n\n    this.ctx = ctx;\n    this.game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctx, this.controller);\n    this.animate = this.animate.bind(this);\n    this.interval = setInterval(this.animate, 1000);\n    window.addEventListener(\"keydown\", this.controller.keyListener.bind(this));\n  }\n\n  // This function will be continuously called until the game is over, and\n  // will progress the game by moving down the current Piece\n  animate() {\n    if (!this.game.gameOver()) {\n      this.game.stepDown();\n      this.game.draw(this.ctx);\n    } else {\n      this.stop();\n    }\n  }\n\n  // Starts the game by requesting an animation frame using `this.animate`\n  start() {\n    this.game.draw(this.ctx);\n    this.animation = requestAnimationFrame(this.animate);\n  }\n\n  // Stops the game from running by clearing the stored interval, clearing the\n  // stored animation frame, as well as removing the window's event listener\n  stop() {\n    clearInterval(this.interval);\n    cancelAnimationFrame(this.animation);\n    window.removeEventListener(\"keydown\", this.controller.keyListener.bind(this));\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameView);\n\n//# sourceURL=webpack:///./src/game_view.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\nclass Piece {\n  constructor(tetromino, game) {\n    this.game = game;\n    this.color = tetromino.color;\n    this.pos = [Math.floor(this.game.numCols / 2) - 1, -3];\n    this.orientation = tetromino.orientation;\n    this.orientations = tetromino.orientations;\n  }\n\n  // Calculates [colShift, rowShift] based on shiftAmt of an orientation\n  calculateShift(shiftAmt) {\n    let colShift = Math.abs(15 - shiftAmt) % 4;\n    let rowShift = Math.floor((15 - shiftAmt) / 4);\n    return [colShift, rowShift];\n  }\n\n  // Draws a Piece onto the game board\n  draw() {\n    let [colPos, rowPos] = this.pos;\n    \n    // Iterates over the bits in currOrientation (ex: 0x0F00) from left to right\n    let currOrientation = this.orientations[this.orientation];\n\n    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {\n      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;\n      let [colShift, rowShift] = this.calculateShift(shiftAmt);\n\n      // Calculate new positions - newColPos needs to account for negative modulos\n      let newColPos = (colPos + colShift) % this.game.numCols;\n      newColPos = (newColPos + this.game.numCols) % this.game.numCols;\n      let newRowPos = rowPos + rowShift;\n\n      // Only need to color in the blocks with a 1 bit\n      if (currBit) {\n        this.game.ctx.fillStyle = this.color;\n        this.game.ctx.fillRect(\n          newColPos * this.game.tileSize,\n          newRowPos * this.game.tileSize,\n          this.game.tileSize,\n          this.game.tileSize\n        );\n      } else {\n        // Draws the region occupied by the Piece, with overlapping gray tiles\n        // this.game.ctx.fillStyle = \"#444444\";\n        // this.game.ctx.fillRect(\n        //   newColPos * this.game.tileSize,\n        //   newRowPos * this.game.tileSize,\n        //   this.game.tileSize,\n        //   this.game.tileSize\n        // );\n      }\n    }\n  }\n\n  // Returns a boolean whether or not the GIVEN orientation is valid\n  validOrientation(orientation) {\n    let [colPos, rowPos] = this.pos;\n    let nextOrientation = this.orientations[orientation];\n    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {\n      let currBit = (nextOrientation & (1 << shiftAmt)) >> shiftAmt;\n      let [colShift, rowShift] = this.calculateShift(shiftAmt);\n\n      // Calculate new positions, newColPos needs to account for negative modulos\n      let newColPos = (colPos + colShift) % this.game.numCols;\n      newColPos = (newColPos + this.game.numCols) % this.game.numCols;\n      let newRowPos = rowPos + rowShift;\n      \n      let tileOccupied = this.game.tilesOccupied[newColPos][newRowPos];\n      if (currBit && tileOccupied) return false;\n    }\n    return true;\n  }\n\n  // Returns a boolean whether or not the NEXT horizontal position is valid\n  validHorizontal(direction) {\n    let [colPos, rowPos] = this.pos;\n    let currOrientation = this.orientations[this.orientation];\n    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {\n      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;\n      let [colShift, rowShift] = this.calculateShift(shiftAmt);\n\n      // Calculate new positions - newColPos needs to account for negative modulos\n      let newColPos = (colPos + colShift + direction) % this.game.numCols;\n      newColPos = (newColPos + this.game.numCols) % this.game.numCols;\n      let newRowPos = rowPos + rowShift;\n\n      let tileOccupied = this.game.tilesOccupied[newColPos][newRowPos];\n      if (currBit && tileOccupied) return false;\n    }\n    return true;\n  }\n\n  // Returns a boolean whether or not the NEXT vertical position is valid\n  validVertical() {\n    let [colPos, rowPos] = this.pos;\n    let currOrientation = this.orientations[this.orientation];\n    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {\n      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;\n      let [colShift, rowShift] = this.calculateShift(shiftAmt);\n\n      // Calculate new positions - newColPos needs to account for negative modulos\n      let newColPos = (colPos + colShift) % this.game.numCols;\n      newColPos = (newColPos + this.game.numCols) % this.game.numCols;\n      let newRowPos = rowPos + rowShift + 1;\n\n      let tileOccupied = this.game.tilesOccupied[newColPos][newRowPos];\n      let notWithinBounds = (rowPos + rowShift + 1) >= this.game.numRows;\n      if (currBit && (tileOccupied || notWithinBounds)) return false;\n    }\n    return true;\n  }\n\n  // Updates `this.game.tilesOccupied` and `this.game.pieceMatrix` after drop\n  recordPiece() {\n    let [colPos, rowPos] = this.pos;\n    let currOrientation = this.orientations[this.orientation];\n\n    for (let shiftAmt = 15; shiftAmt >= 0; shiftAmt--) {\n      let currBit = (currOrientation & (1 << shiftAmt)) >> shiftAmt;\n      let [colShift, rowShift] = this.calculateShift(shiftAmt);\n\n      // Calculate new positions - newColPos needs to account for negative modulos\n      let newColPos = (colPos + colShift) % this.game.numCols;\n      newColPos = (newColPos + this.game.numCols) % this.game.numCols;\n      let newRowPos = rowPos + rowShift;\n\n      if (currBit) this.game.tilesOccupied[newColPos][newRowPos] = true;\n    }\n\n    if (rowPos >= 0) this.game.pieceMatrix[colPos][rowPos].push(this);\n  }\n\n  moveDown() {\n    this.pos[1] += 1\n  }\n\n  moveLeft() {\n    this.pos[0] = (this.pos[0] - 1) % this.game.numCols;\n    this.pos[0] = (this.pos[0] + this.game.numCols) % this.game.numCols;\n  }\n\n  moveRight() {\n    this.pos[0] = (this.pos[0] + 1) % this.game.numCols;\n    this.pos[0] = (this.pos[0] + this.game.numCols) % this.game.numCols;\n  }\n\n  rotate() {\n    this.orientation = (this.orientation + 1) % 4;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Piece);\n\n//# sourceURL=webpack:///./src/piece.js?");

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
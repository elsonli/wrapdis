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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./piece */ \"./src/piece.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _tetromino__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tetromino */ \"./src/tetromino.js\");\n\n\n\n\nclass Game {\n  constructor() {\n    this.gridWidth = 10;\n    this.gridHeight = 20;\n    this.tileSize = 40;\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, _utils__WEBPACK_IMPORTED_MODULE_1__[\"DIM_X\"], _utils__WEBPACK_IMPORTED_MODULE_1__[\"DIM_Y\"]);\n    ctx.fillStyle = _utils__WEBPACK_IMPORTED_MODULE_1__[\"BG_COLOR\"];\n    ctx.fillRect(0, 0, _utils__WEBPACK_IMPORTED_MODULE_1__[\"DIM_X\"], _utils__WEBPACK_IMPORTED_MODULE_1__[\"DIM_Y\"]);\n    \n    // Constructing the Grid\n    ctx.strokeStyle = \"#777777\";\n    for (let idx = 0; idx < this.gridWidth; idx++) {\n      ctx.beginPath();\n      ctx.moveTo(this.tileSize * idx, 0);\n      ctx.lineTo(this.tileSize * idx, 800);\n      ctx.stroke();\n    }\n    for (let idx = 0; idx < this.gridHeight; idx++) {\n      ctx.beginPath();\n      ctx.moveTo(0, this.tileSize * idx)\n      ctx.lineTo(400, this.tileSize * idx);\n      ctx.stroke();\n    }\n\n    let piece = new _piece__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_tetromino__WEBPACK_IMPORTED_MODULE_2__[\"tetrominoL\"]);\n    piece.draw(ctx);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass GameView {\n  constructor(game, ctx) {\n    this.game = game;\n    this.ctx = ctx;\n    this.animate = this.animate.bind(this);\n  }\n\n  // bindKeyHandlers() {\n\n  // }\n\n  animate() {\n    // this.game.step();\n    this.game.draw(this.ctx);\n    requestAnimationFrame(this.animate);\n  }\n\n  start() {\n    // this.bindKeyHandlers();\n    requestAnimationFrame(this.animate);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameView);\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasEle = document.getElementsByTagName(\"canvas\")[0];\n  canvasEle.width = _utils__WEBPACK_IMPORTED_MODULE_2__[\"DIM_X\"];\n  canvasEle.height = _utils__WEBPACK_IMPORTED_MODULE_2__[\"DIM_Y\"];\n  const ctx = canvasEle.getContext(\"2d\");\n  const game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  new _game_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"](game, ctx).start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/piece.js":
/*!**********************!*\
  !*** ./src/piece.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Piece {\n  constructor(tetromino) {\n    this.block1 = tetromino.block1;\n    this.block2 = tetromino.block2;\n    this.block3 = tetromino.block3;\n    this.block4 = tetromino.block4;\n    this.color = tetromino.color;\n    this.image = new Image();\n    this.image.src = tetromino.image;\n  }\n\n  // Draws a Piece with its color and background image\n  draw(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.fillRect(this.block1[0] * 40, this.block1[1] * 40, 40, 40);\n    ctx.fillRect(this.block2[0] * 40, this.block2[1] * 40, 40, 40);\n    ctx.fillRect(this.block3[0] * 40, this.block3[1] * 40, 40, 40);\n    ctx.fillRect(this.block4[0] * 40, this.block4[1] * 40, 40, 40);\n    ctx.drawImage(this.image, this.block1[0] * 40, this.block1[1] * 40, 40, 40)\n    ctx.drawImage(this.image, this.block2[0] * 40, this.block2[1] * 40, 40, 40)\n    ctx.drawImage(this.image, this.block3[0] * 40, this.block3[1] * 40, 40, 40)\n    ctx.drawImage(this.image, this.block4[0] * 40, this.block4[1] * 40, 40, 40)\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Piece);\n\n//# sourceURL=webpack:///./src/piece.js?");

/***/ }),

/***/ "./src/tetromino.js":
/*!**************************!*\
  !*** ./src/tetromino.js ***!
  \**************************/
/*! exports provided: tetrominoI, tetrominoS, tetrominoZ, tetrominoO, tetrominoT, tetrominoJ, tetrominoL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tetrominoI\", function() { return tetrominoI; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tetrominoS\", function() { return tetrominoS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tetrominoZ\", function() { return tetrominoZ; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tetrominoO\", function() { return tetrominoO; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tetrominoT\", function() { return tetrominoT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tetrominoJ\", function() { return tetrominoJ; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tetrominoL\", function() { return tetrominoL; });\n// Light Blue Piece\nconst tetrominoI = {\n  block1: [3, 0],\n  block2: [4, 0],\n  block3: [5, 0],\n  block4: [6, 0],\n  color: \"lightblue\",\n  image: \"https://cdn.discordapp.com/emojis/645009599870664715.png?v=1\"\n}\n\n// Green Piece\nconst tetrominoS = {\n  block1: [4, 0],\n  block2: [5, 0],\n  block3: [3, 1],\n  block4: [4, 1],\n  color: \"green\",\n  image: \"https://cdn.discordapp.com/emojis/648742827009769483.png?v=1\"\n}\n\n// Red Piece\nconst tetrominoZ = {\n  block1: [3, 0],\n  block2: [4, 0],\n  block3: [4, 1],\n  block4: [5, 1],\n  color: \"red\",\n  image: \"https://cdn.discordapp.com/emojis/585567202837528586.png?v=1\"\n}\n\n// Yellow Piece\nconst tetrominoO = {\n  block1: [4, 0],\n  block2: [5, 0],\n  block3: [4, 1],\n  block4: [5, 1],\n  color: \"yellow\",\n  image: \"https://cdn.discordapp.com/emojis/585567189944238101.png?v=1g\"\n}\n\n// Purple Piece\nconst tetrominoT = {\n  block1: [4, 0],\n  block2: [3, 1],\n  block3: [4, 1],\n  block4: [5, 1],\n  color: \"purple\",\n  image: \"https://cdn.discordapp.com/emojis/648743727895937044.png?v=1\"\n}\n\n// Blue Piece\nconst tetrominoJ = {\n  block1: [3, 0],\n  block2: [3, 1],\n  block3: [4, 1],\n  block4: [5, 1],\n  color: \"blue\",\n  image: \"https://cdn.discordapp.com/emojis/571208727772790786.png?v=1\"\n}\n\n// Orange Piece\nconst tetrominoL = {\n  block1: [3, 0],\n  block2: [4, 0],\n  block3: [5, 0],\n  block4: [3, 1],\n  color: \"orange\",\n  image: \"https://cdn.discordapp.com/emojis/644299473081729024.png?v=1\"\n}\n\n// \n\n//# sourceURL=webpack:///./src/tetromino.js?");

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
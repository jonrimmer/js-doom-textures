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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__image_cache__ = __webpack_require__(1);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__deutex_textures__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__deutex_wadinfo__ = __webpack_require__(5);\n\n\n\n\n/**\n * Populates the given HTML container element with <canvas> elements\n * for all textures for the given game. It is expected that there exist\n * directories in the following format:\n * \n *  <game>/textures/texture[12].txt\n *    - Texture definition files, which will be loaded and parsed.\n *      Both TEXTURE1 and TEXTURE2 are expected, except for 'doom2'.\n * \n *  <game>/patches/<patch name>.png\n *    - Individual PNG patch files to composite into textures.\n * \n * @param {HTMLElement} element - The container element.\n * @param {string} game - The game to load the textures for.\n */\nfunction renderAllTextures(element, game) {\n  let patchesCache = new __WEBPACK_IMPORTED_MODULE_0__image_cache__[\"a\" /* ImageCache */](game + '/patches', '.png');\n\n  let urls = [game + '/textures/texture1.txt'];\n  if (game != 'doom2') {\n    urls.push(game + '/textures/texture2.txt');\n  }\n  Object(__WEBPACK_IMPORTED_MODULE_1__deutex_textures__[\"a\" /* loadAllTextures */])(urls).then(textures => {\n    textures.forEach(tx => {\n      let canvas = tx.drawTexture(patchesCache);\n      element.appendChild(canvas);\n    });\n  });\n}\n\nfunction renderAllFlats(element, game) {\n  let flatsCache = new __WEBPACK_IMPORTED_MODULE_0__image_cache__[\"a\" /* ImageCache */](game + '/flats', '.png');\n\n  Object(__WEBPACK_IMPORTED_MODULE_2__deutex_wadinfo__[\"a\" /* loadWadInfo */])(game + '/wadinfo.txt').then(wadInfo => {\n    wadInfo.flats.forEach(flat => {\n      let canvas = flat.draw(flatsCache);\n      element.appendChild(canvas);\n    })\n  })\n}\n\n/**\n * Looks for a URL parameter in the loaded page specifying which game\n * to render textures for; if none exists then 'freedoom1' is the default.\n * @returns {string} The game to load.\n */\nfunction getGame() {\n  let url = new URL(window.location.href);\n  return url.searchParams.get('game') || 'freedoom1';\n}\n\nwindow.onload = function() {\n  console.log('Page loaded');\n\n  let game = getGame();\n  console.log('Rendering for ' + game);\n\n  renderAllTextures(\n    document.getElementById('texture-list'),\n    game\n  );\n\n  renderAllFlats(\n    document.getElementById('flats-list'),\n    game\n  );\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9hcHAuanM/N2FjOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbWFnZUNhY2hlIH0gZnJvbSAnLi9pbWFnZS1jYWNoZSc7XG5pbXBvcnQgeyBsb2FkQWxsVGV4dHVyZXMgfSBmcm9tICcuL2RldXRleC90ZXh0dXJlcyc7XG5pbXBvcnQgeyBsb2FkV2FkSW5mbyB9IGZyb20gJy4vZGV1dGV4L3dhZGluZm8nO1xuXG4vKipcbiAqIFBvcHVsYXRlcyB0aGUgZ2l2ZW4gSFRNTCBjb250YWluZXIgZWxlbWVudCB3aXRoIDxjYW52YXM+IGVsZW1lbnRzXG4gKiBmb3IgYWxsIHRleHR1cmVzIGZvciB0aGUgZ2l2ZW4gZ2FtZS4gSXQgaXMgZXhwZWN0ZWQgdGhhdCB0aGVyZSBleGlzdFxuICogZGlyZWN0b3JpZXMgaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6XG4gKiBcbiAqICA8Z2FtZT4vdGV4dHVyZXMvdGV4dHVyZVsxMl0udHh0XG4gKiAgICAtIFRleHR1cmUgZGVmaW5pdGlvbiBmaWxlcywgd2hpY2ggd2lsbCBiZSBsb2FkZWQgYW5kIHBhcnNlZC5cbiAqICAgICAgQm90aCBURVhUVVJFMSBhbmQgVEVYVFVSRTIgYXJlIGV4cGVjdGVkLCBleGNlcHQgZm9yICdkb29tMicuXG4gKiBcbiAqICA8Z2FtZT4vcGF0Y2hlcy88cGF0Y2ggbmFtZT4ucG5nXG4gKiAgICAtIEluZGl2aWR1YWwgUE5HIHBhdGNoIGZpbGVzIHRvIGNvbXBvc2l0ZSBpbnRvIHRleHR1cmVzLlxuICogXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gVGhlIGNvbnRhaW5lciBlbGVtZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IGdhbWUgLSBUaGUgZ2FtZSB0byBsb2FkIHRoZSB0ZXh0dXJlcyBmb3IuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlckFsbFRleHR1cmVzKGVsZW1lbnQsIGdhbWUpIHtcbiAgbGV0IHBhdGNoZXNDYWNoZSA9IG5ldyBJbWFnZUNhY2hlKGdhbWUgKyAnL3BhdGNoZXMnLCAnLnBuZycpO1xuXG4gIGxldCB1cmxzID0gW2dhbWUgKyAnL3RleHR1cmVzL3RleHR1cmUxLnR4dCddO1xuICBpZiAoZ2FtZSAhPSAnZG9vbTInKSB7XG4gICAgdXJscy5wdXNoKGdhbWUgKyAnL3RleHR1cmVzL3RleHR1cmUyLnR4dCcpO1xuICB9XG4gIGxvYWRBbGxUZXh0dXJlcyh1cmxzKS50aGVuKHRleHR1cmVzID0+IHtcbiAgICB0ZXh0dXJlcy5mb3JFYWNoKHR4ID0+IHtcbiAgICAgIGxldCBjYW52YXMgPSB0eC5kcmF3VGV4dHVyZShwYXRjaGVzQ2FjaGUpO1xuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQWxsRmxhdHMoZWxlbWVudCwgZ2FtZSkge1xuICBsZXQgZmxhdHNDYWNoZSA9IG5ldyBJbWFnZUNhY2hlKGdhbWUgKyAnL2ZsYXRzJywgJy5wbmcnKTtcblxuICBsb2FkV2FkSW5mbyhnYW1lICsgJy93YWRpbmZvLnR4dCcpLnRoZW4od2FkSW5mbyA9PiB7XG4gICAgd2FkSW5mby5mbGF0cy5mb3JFYWNoKGZsYXQgPT4ge1xuICAgICAgbGV0IGNhbnZhcyA9IGZsYXQuZHJhdyhmbGF0c0NhY2hlKTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICB9KVxuICB9KVxufVxuXG4vKipcbiAqIExvb2tzIGZvciBhIFVSTCBwYXJhbWV0ZXIgaW4gdGhlIGxvYWRlZCBwYWdlIHNwZWNpZnlpbmcgd2hpY2ggZ2FtZVxuICogdG8gcmVuZGVyIHRleHR1cmVzIGZvcjsgaWYgbm9uZSBleGlzdHMgdGhlbiAnZnJlZWRvb20xJyBpcyB0aGUgZGVmYXVsdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBnYW1lIHRvIGxvYWQuXG4gKi9cbmZ1bmN0aW9uIGdldEdhbWUoKSB7XG4gIGxldCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgcmV0dXJuIHVybC5zZWFyY2hQYXJhbXMuZ2V0KCdnYW1lJykgfHwgJ2ZyZWVkb29tMSc7XG59XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJ1BhZ2UgbG9hZGVkJyk7XG5cbiAgbGV0IGdhbWUgPSBnZXRHYW1lKCk7XG4gIGNvbnNvbGUubG9nKCdSZW5kZXJpbmcgZm9yICcgKyBnYW1lKTtcblxuICByZW5kZXJBbGxUZXh0dXJlcyhcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dHVyZS1saXN0JyksXG4gICAgZ2FtZVxuICApO1xuXG4gIHJlbmRlckFsbEZsYXRzKFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmbGF0cy1saXN0JyksXG4gICAgZ2FtZVxuICApO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("\n/**\n * ImageCache implements a class that will load images on demand from a\n * specified URL, creating them as `<img>` elements in a hidden `<div>` so that they\n * can be composited into a full texture.\n */\nclass ImageCache {\n  constructor(rootPath, extension) {\n    this.images = {};\n    this.rootPath = rootPath;\n    this.extension = extension;\n\n    // Make a container for holding images.\n    this.container = document.createElement('div');\n    this.container.style.display = 'none';\n    document.body.appendChild(this.container);\n  }\n\n  /**\n   * Loads the given image by name, creating an `<img>` element\n   * for it if necessary.\n   * \n   * @param {string} name - The name of the image.\n   * @returns {Promise<Image>} A promise that resolves with the `<img>` once it is loaded.\n   */\n  loadImage(name) {\n    name = name.toLowerCase();\n\n    return this.images[name] || (this.images[name] = new Promise(resolve => {\n      let img = new Image();\n      img.onload = () => {\n        console.debug('Image loaded: ' + name);\n        resolve(img);\n      };\n      let filename = this.rootPath + '/' + name + this.extension;\n      img.src = filename;\n      this.container.append(img);\n    }));\n  }\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = ImageCache;\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9pbWFnZS1jYWNoZS5qcz9iOGNhIl0sInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiBJbWFnZUNhY2hlIGltcGxlbWVudHMgYSBjbGFzcyB0aGF0IHdpbGwgbG9hZCBpbWFnZXMgb24gZGVtYW5kIGZyb20gYVxuICogc3BlY2lmaWVkIFVSTCwgY3JlYXRpbmcgdGhlbSBhcyBgPGltZz5gIGVsZW1lbnRzIGluIGEgaGlkZGVuIGA8ZGl2PmAgc28gdGhhdCB0aGV5XG4gKiBjYW4gYmUgY29tcG9zaXRlZCBpbnRvIGEgZnVsbCB0ZXh0dXJlLlxuICovXG5leHBvcnQgY2xhc3MgSW1hZ2VDYWNoZSB7XG4gIGNvbnN0cnVjdG9yKHJvb3RQYXRoLCBleHRlbnNpb24pIHtcbiAgICB0aGlzLmltYWdlcyA9IHt9O1xuICAgIHRoaXMucm9vdFBhdGggPSByb290UGF0aDtcbiAgICB0aGlzLmV4dGVuc2lvbiA9IGV4dGVuc2lvbjtcblxuICAgIC8vIE1ha2UgYSBjb250YWluZXIgZm9yIGhvbGRpbmcgaW1hZ2VzLlxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyB0aGUgZ2l2ZW4gaW1hZ2UgYnkgbmFtZSwgY3JlYXRpbmcgYW4gYDxpbWc+YCBlbGVtZW50XG4gICAqIGZvciBpdCBpZiBuZWNlc3NhcnkuXG4gICAqIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBpbWFnZS5cbiAgICogQHJldHVybnMge1Byb21pc2U8SW1hZ2U+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBgPGltZz5gIG9uY2UgaXQgaXMgbG9hZGVkLlxuICAgKi9cbiAgbG9hZEltYWdlKG5hbWUpIHtcbiAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgcmV0dXJuIHRoaXMuaW1hZ2VzW25hbWVdIHx8ICh0aGlzLmltYWdlc1tuYW1lXSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZygnSW1hZ2UgbG9hZGVkOiAnICsgbmFtZSk7XG4gICAgICAgIHJlc29sdmUoaW1nKTtcbiAgICAgIH07XG4gICAgICBsZXQgZmlsZW5hbWUgPSB0aGlzLnJvb3RQYXRoICsgJy8nICsgbmFtZSArIHRoaXMuZXh0ZW5zaW9uO1xuICAgICAgaW1nLnNyYyA9IGZpbGVuYW1lO1xuICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kKGltZyk7XG4gICAgfSkpO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbWFnZS1jYWNoZS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* unused harmony export parseTextures */\n/* unused harmony export loadTexturesFile */\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = loadAllTextures;\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__texture__ = __webpack_require__(3);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__patch__ = __webpack_require__(4);\n\n\n\n// Regexps for parsing contents of deutex-format texture definition files.\nconst EMPTY_RE = /^\\s*$/;\nconst COMMENT_RE = /^\\s*;/;\nconst TEXTURE_RE = /^\\s*([A-Za-z0-9_-]+)\\s*(-?[0-9]+)\\s*(-?[0-9]+)/;\nconst PATCH_RE = /^\\s*\\*\\s*([A-Za-z0-9_-]+)\\s*(-?[0-9]+)\\s*(-?[0-9]+)/;\n\n/**\n * Parses the contents of a deutex-format texture definition\n * file. Returned is an array of Texture objects.\n * \n * @param {string} config - A deutex-format texture file. \n * @returns {Array<Texture>} The parsed textures.\n */\nfunction parseTextures(config) {\n  var lines = config.split('\\n');\n  var i;\n  var textures = [], tx = null;\n  for (i = 0; i < lines.length; ++i) {\n    var line = lines[i];\n    console.log(line);\n    if (COMMENT_RE.exec(line)) {\n      continue;\n    }\n    var m = TEXTURE_RE.exec(line);\n    if (m) {\n      var w = parseInt(m[2]);\n      var h = parseInt(m[3]);\n      tx = new __WEBPACK_IMPORTED_MODULE_0__texture__[\"a\" /* Texture */](m[1], w, h);\n      textures.push(tx);\n      continue;\n    }\n    var m = PATCH_RE.exec(line);\n    if (m) {\n      var x = parseInt(m[2]);\n      var y = parseInt(m[3]);\n      tx.addPatch(new __WEBPACK_IMPORTED_MODULE_1__patch__[\"a\" /* Patch */](m[1], x, y));\n      continue;\n    }\n    if (!EMPTY_RE.exec(line)) {\n      throw 'Parse error in texture file: ' + line;\n    }\n  }\n  return textures;\n}\n\n/**\n * Loads and parses a deutex-format texture definition file\n * from the given URL. It returns a promise that resolves with a list of\n * textures from the file.\n * \n * @param {string} url - The texture file to load.\n * @returns {Promise<Array<Texture>>} The loaded textures.\n */\nfunction loadTexturesFile(url) {\n  console.log('Loading textures from ' + url);\n  return fetch(url).then(response => {\n    console.debug(`Response loading ${response.url}: ${response.status}`);\n    return response.text().then(parseTextures).then(textures => {\n      console.info(`Loaded ${textures.length} textures from file ${response.url}`);\n      return textures;\n    })\n  }).catch(error => {\n    console.error(`Error loading ${error.url}: ${error.toString()}`);\n  });\n}\n\n/**\n * Loads deutex-format texture definition files from the given\n * array of URLs. It returns a promise that resolves with a concanated\n * list of all the loaded textures.\n * \n * @param {Array<string>} urls - The URLs from which to load textures.\n * @returns {Promise<Array<Texture>>} The loaded textures.\n */\nfunction loadAllTextures(urls) {\n  return Promise\n    .all(urls.map(loadTexturesFile))\n    .then(textures => textures.reduce((acc, value) => acc.concat(value), []));\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9kZXV0ZXgvdGV4dHVyZXMuanM/NGYzNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0dXJlIH0gZnJvbSAnLi4vdGV4dHVyZSc7XG5pbXBvcnQgeyBQYXRjaCB9IGZyb20gJy4uL3BhdGNoJztcblxuLy8gUmVnZXhwcyBmb3IgcGFyc2luZyBjb250ZW50cyBvZiBkZXV0ZXgtZm9ybWF0IHRleHR1cmUgZGVmaW5pdGlvbiBmaWxlcy5cbmNvbnN0IEVNUFRZX1JFID0gL15cXHMqJC87XG5jb25zdCBDT01NRU5UX1JFID0gL15cXHMqOy87XG5jb25zdCBURVhUVVJFX1JFID0gL15cXHMqKFtBLVphLXowLTlfLV0rKVxccyooLT9bMC05XSspXFxzKigtP1swLTldKykvO1xuY29uc3QgUEFUQ0hfUkUgPSAvXlxccypcXCpcXHMqKFtBLVphLXowLTlfLV0rKVxccyooLT9bMC05XSspXFxzKigtP1swLTldKykvO1xuXG4vKipcbiAqIFBhcnNlcyB0aGUgY29udGVudHMgb2YgYSBkZXV0ZXgtZm9ybWF0IHRleHR1cmUgZGVmaW5pdGlvblxuICogZmlsZS4gUmV0dXJuZWQgaXMgYW4gYXJyYXkgb2YgVGV4dHVyZSBvYmplY3RzLlxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gY29uZmlnIC0gQSBkZXV0ZXgtZm9ybWF0IHRleHR1cmUgZmlsZS4gXG4gKiBAcmV0dXJucyB7QXJyYXk8VGV4dHVyZT59IFRoZSBwYXJzZWQgdGV4dHVyZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRleHR1cmVzKGNvbmZpZykge1xuICB2YXIgbGluZXMgPSBjb25maWcuc3BsaXQoJ1xcbicpO1xuICB2YXIgaTtcbiAgdmFyIHRleHR1cmVzID0gW10sIHR4ID0gbnVsbDtcbiAgZm9yIChpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICBjb25zb2xlLmxvZyhsaW5lKTtcbiAgICBpZiAoQ09NTUVOVF9SRS5leGVjKGxpbmUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgdmFyIG0gPSBURVhUVVJFX1JFLmV4ZWMobGluZSk7XG4gICAgaWYgKG0pIHtcbiAgICAgIHZhciB3ID0gcGFyc2VJbnQobVsyXSk7XG4gICAgICB2YXIgaCA9IHBhcnNlSW50KG1bM10pO1xuICAgICAgdHggPSBuZXcgVGV4dHVyZShtWzFdLCB3LCBoKTtcbiAgICAgIHRleHR1cmVzLnB1c2godHgpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHZhciBtID0gUEFUQ0hfUkUuZXhlYyhsaW5lKTtcbiAgICBpZiAobSkge1xuICAgICAgdmFyIHggPSBwYXJzZUludChtWzJdKTtcbiAgICAgIHZhciB5ID0gcGFyc2VJbnQobVszXSk7XG4gICAgICB0eC5hZGRQYXRjaChuZXcgUGF0Y2gobVsxXSwgeCwgeSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICghRU1QVFlfUkUuZXhlYyhsaW5lKSkge1xuICAgICAgdGhyb3cgJ1BhcnNlIGVycm9yIGluIHRleHR1cmUgZmlsZTogJyArIGxpbmU7XG4gICAgfVxuICB9XG4gIHJldHVybiB0ZXh0dXJlcztcbn1cblxuLyoqXG4gKiBMb2FkcyBhbmQgcGFyc2VzIGEgZGV1dGV4LWZvcm1hdCB0ZXh0dXJlIGRlZmluaXRpb24gZmlsZVxuICogZnJvbSB0aGUgZ2l2ZW4gVVJMLiBJdCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBsaXN0IG9mXG4gKiB0ZXh0dXJlcyBmcm9tIHRoZSBmaWxlLlxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVGhlIHRleHR1cmUgZmlsZSB0byBsb2FkLlxuICogQHJldHVybnMge1Byb21pc2U8QXJyYXk8VGV4dHVyZT4+fSBUaGUgbG9hZGVkIHRleHR1cmVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbG9hZFRleHR1cmVzRmlsZSh1cmwpIHtcbiAgY29uc29sZS5sb2coJ0xvYWRpbmcgdGV4dHVyZXMgZnJvbSAnICsgdXJsKTtcbiAgcmV0dXJuIGZldGNoKHVybCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgY29uc29sZS5kZWJ1ZyhgUmVzcG9uc2UgbG9hZGluZyAke3Jlc3BvbnNlLnVybH06ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIHJldHVybiByZXNwb25zZS50ZXh0KCkudGhlbihwYXJzZVRleHR1cmVzKS50aGVuKHRleHR1cmVzID0+IHtcbiAgICAgIGNvbnNvbGUuaW5mbyhgTG9hZGVkICR7dGV4dHVyZXMubGVuZ3RofSB0ZXh0dXJlcyBmcm9tIGZpbGUgJHtyZXNwb25zZS51cmx9YCk7XG4gICAgICByZXR1cm4gdGV4dHVyZXM7XG4gICAgfSlcbiAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGxvYWRpbmcgJHtlcnJvci51cmx9OiAke2Vycm9yLnRvU3RyaW5nKCl9YCk7XG4gIH0pO1xufVxuXG4vKipcbiAqIExvYWRzIGRldXRleC1mb3JtYXQgdGV4dHVyZSBkZWZpbml0aW9uIGZpbGVzIGZyb20gdGhlIGdpdmVuXG4gKiBhcnJheSBvZiBVUkxzLiBJdCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggYSBjb25jYW5hdGVkXG4gKiBsaXN0IG9mIGFsbCB0aGUgbG9hZGVkIHRleHR1cmVzLlxuICogXG4gKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IHVybHMgLSBUaGUgVVJMcyBmcm9tIHdoaWNoIHRvIGxvYWQgdGV4dHVyZXMuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxUZXh0dXJlPj59IFRoZSBsb2FkZWQgdGV4dHVyZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQWxsVGV4dHVyZXModXJscykge1xuICByZXR1cm4gUHJvbWlzZVxuICAgIC5hbGwodXJscy5tYXAobG9hZFRleHR1cmVzRmlsZSkpXG4gICAgLnRoZW4odGV4dHVyZXMgPT4gdGV4dHVyZXMucmVkdWNlKChhY2MsIHZhbHVlKSA9PiBhY2MuY29uY2F0KHZhbHVlKSwgW10pKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RldXRleC90ZXh0dXJlcy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2\n");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("\n/**\n * Texture represents a texture inside the TEXTUREx lump.\n */\nclass Texture {\n  constructor(name, width, height) {\n    this.name = name;\n    this.width = width;\n    this.height = height;\n    this.patches = [];\n  }\n\n  addPatch(p) {\n    this.patches.push(p);\n  }\n\n  toString() {\n    var hdr = this.name + ' ' + this.width + ' ' + this.height;\n    return hdr + '\\n' + this.patches.join('\\n');\n  }\n\n  /**\n   * Renders the texture into a `<canvas>` element which\n   * is returned to the caller. An ImageCache must be passed in.\n   * \n   * @param {ImageCache} patchesCache - The cache containing patch images.\n   * @return {HTMLCanvasElement} The canvas element into which the texture will be drawn.\n   */\n  drawTexture(patchesCache) {\n    var canvas = document.createElement('canvas');\n    canvas.setAttribute('width', this.width);\n    canvas.setAttribute('height', this.height);\n\n    var ctx = canvas.getContext('2d');\n    ctx.fillStyle = '#EEE';\n    ctx.fillRect(0, 0, this.width, this.height);\n\n    Promise.all(this.patches.map(patch => patchesCache.loadImage(patch.name))).then(images => {\n      var ctx = canvas.getContext('2d');\n      this.patches.forEach((patch, i) => {\n        ctx.drawImage(images[i], patch.x, patch.y);\n      });\n    });\n\n    return canvas;\n  }\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = Texture;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy90ZXh0dXJlLmpzPzk0ZTciXSwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIFRleHR1cmUgcmVwcmVzZW50cyBhIHRleHR1cmUgaW5zaWRlIHRoZSBURVhUVVJFeCBsdW1wLlxuICovXG5leHBvcnQgY2xhc3MgVGV4dHVyZSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLnBhdGNoZXMgPSBbXTtcbiAgfVxuXG4gIGFkZFBhdGNoKHApIHtcbiAgICB0aGlzLnBhdGNoZXMucHVzaChwKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHZhciBoZHIgPSB0aGlzLm5hbWUgKyAnICcgKyB0aGlzLndpZHRoICsgJyAnICsgdGhpcy5oZWlnaHQ7XG4gICAgcmV0dXJuIGhkciArICdcXG4nICsgdGhpcy5wYXRjaGVzLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIHRleHR1cmUgaW50byBhIGA8Y2FudmFzPmAgZWxlbWVudCB3aGljaFxuICAgKiBpcyByZXR1cm5lZCB0byB0aGUgY2FsbGVyLiBBbiBJbWFnZUNhY2hlIG11c3QgYmUgcGFzc2VkIGluLlxuICAgKiBcbiAgICogQHBhcmFtIHtJbWFnZUNhY2hlfSBwYXRjaGVzQ2FjaGUgLSBUaGUgY2FjaGUgY29udGFpbmluZyBwYXRjaCBpbWFnZXMuXG4gICAqIEByZXR1cm4ge0hUTUxDYW52YXNFbGVtZW50fSBUaGUgY2FudmFzIGVsZW1lbnQgaW50byB3aGljaCB0aGUgdGV4dHVyZSB3aWxsIGJlIGRyYXduLlxuICAgKi9cbiAgZHJhd1RleHR1cmUocGF0Y2hlc0NhY2hlKSB7XG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdGhpcy53aWR0aCk7XG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xuXG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnI0VFRSc7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgIFByb21pc2UuYWxsKHRoaXMucGF0Y2hlcy5tYXAocGF0Y2ggPT4gcGF0Y2hlc0NhY2hlLmxvYWRJbWFnZShwYXRjaC5uYW1lKSkpLnRoZW4oaW1hZ2VzID0+IHtcbiAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHRoaXMucGF0Y2hlcy5mb3JFYWNoKChwYXRjaCwgaSkgPT4ge1xuICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlc1tpXSwgcGF0Y2gueCwgcGF0Y2gueSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjYW52YXM7XG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90ZXh0dXJlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///3\n");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/**\n * Patch represents a single patch inside a texture entry.\n */\nclass Patch {\n  constructor(name, x, y) {\n    this.name = name;\n    this.x = x;\n    this.y = y;\n  }\n\n  toString() {\n    return '*    ' + this.name + ' ' + this.x + ' ' + this.y;\n  }\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = Patch;\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9wYXRjaC5qcz8yY2RhIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUGF0Y2ggcmVwcmVzZW50cyBhIHNpbmdsZSBwYXRjaCBpbnNpZGUgYSB0ZXh0dXJlIGVudHJ5LlxuICovXG5leHBvcnQgY2xhc3MgUGF0Y2gge1xuICBjb25zdHJ1Y3RvcihuYW1lLCB4LCB5KSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJyogICAgJyArIHRoaXMubmFtZSArICcgJyArIHRoaXMueCArICcgJyArIHRoaXMueTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGF0Y2guanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///4\n");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (immutable) */ __webpack_exports__[\"a\"] = loadWadInfo;\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__flat__ = __webpack_require__(6);\n\n\nconst EMPTY_RE = /^\\s*$/;\nconst COMMENT_RE = /^\\s*#.*$/;\nconst SECTION_RE = /^\\s*\\[(\\w+)\\]\\s*$/;\n\nclass WadInfo {\n  constructor(raw) {\n    this.flats = [];\n\n    const lines = raw.split('\\n');\n    let context = null;\n  \n    for (let i = 0; i < lines.length; i++) {\n      let line = lines[i];\n  \n      if (EMPTY_RE.test(line) || COMMENT_RE.test(line)) {\n        continue;\n      }\n      \n      let sectionMatch = SECTION_RE.exec(line);\n  \n      if (sectionMatch) {\n        context = sectionMatch[1];\n        continue;\n      }\n  \n      switch(context) {\n        case 'flats':\n          this.flats.push(new __WEBPACK_IMPORTED_MODULE_0__flat__[\"a\" /* Flat */](line));\n          break;\n        default:\n          break;\n      }\n    }\n  }\n\n  toString() {\n    return `WadInfo: \\n  ${flats.length} Flats`;\n  }\n}\n/* unused harmony export WadInfo */\n\n\n/**\n * Loads and parses a deutex-format wadinfo.txt.\n * \n * @param {string} url - The URL from which to load.\n * @returns {WadInfo} The parsed WadInfo.\n */\nfunction loadWadInfo(url) {\n  console.log('Loading textures from ' + url);\n  return fetch(url).then(response => {\n    console.log(`Response loading ${response.url}: ${response.status}`);\n    return response.text().then(content => new WadInfo(content)).then(wadInfo => {\n      console.log(wadInfo);\n      return wadInfo;\n    })\n  }).catch(error => {\n    console.error(`Error loading ${error.url}: ${error.toString()}`);\n    return Promise.error(error);\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9kZXV0ZXgvd2FkaW5mby5qcz8zNTc4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZsYXQgfSBmcm9tICcuLi9mbGF0JztcblxuY29uc3QgRU1QVFlfUkUgPSAvXlxccyokLztcbmNvbnN0IENPTU1FTlRfUkUgPSAvXlxccyojLiokLztcbmNvbnN0IFNFQ1RJT05fUkUgPSAvXlxccypcXFsoXFx3KylcXF1cXHMqJC87XG5cbmV4cG9ydCBjbGFzcyBXYWRJbmZvIHtcbiAgY29uc3RydWN0b3IocmF3KSB7XG4gICAgdGhpcy5mbGF0cyA9IFtdO1xuXG4gICAgY29uc3QgbGluZXMgPSByYXcuc3BsaXQoJ1xcbicpO1xuICAgIGxldCBjb250ZXh0ID0gbnVsbDtcbiAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGxpbmUgPSBsaW5lc1tpXTtcbiAgXG4gICAgICBpZiAoRU1QVFlfUkUudGVzdChsaW5lKSB8fCBDT01NRU5UX1JFLnRlc3QobGluZSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGxldCBzZWN0aW9uTWF0Y2ggPSBTRUNUSU9OX1JFLmV4ZWMobGluZSk7XG4gIFxuICAgICAgaWYgKHNlY3Rpb25NYXRjaCkge1xuICAgICAgICBjb250ZXh0ID0gc2VjdGlvbk1hdGNoWzFdO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgXG4gICAgICBzd2l0Y2goY29udGV4dCkge1xuICAgICAgICBjYXNlICdmbGF0cyc6XG4gICAgICAgICAgdGhpcy5mbGF0cy5wdXNoKG5ldyBGbGF0KGxpbmUpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gYFdhZEluZm86IFxcbiAgJHtmbGF0cy5sZW5ndGh9IEZsYXRzYDtcbiAgfVxufVxuXG4vKipcbiAqIExvYWRzIGFuZCBwYXJzZXMgYSBkZXV0ZXgtZm9ybWF0IHdhZGluZm8udHh0LlxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVGhlIFVSTCBmcm9tIHdoaWNoIHRvIGxvYWQuXG4gKiBAcmV0dXJucyB7V2FkSW5mb30gVGhlIHBhcnNlZCBXYWRJbmZvLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbG9hZFdhZEluZm8odXJsKSB7XG4gIGNvbnNvbGUubG9nKCdMb2FkaW5nIHRleHR1cmVzIGZyb20gJyArIHVybCk7XG4gIHJldHVybiBmZXRjaCh1cmwpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIGNvbnNvbGUubG9nKGBSZXNwb25zZSBsb2FkaW5nICR7cmVzcG9uc2UudXJsfTogJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKS50aGVuKGNvbnRlbnQgPT4gbmV3IFdhZEluZm8oY29udGVudCkpLnRoZW4od2FkSW5mbyA9PiB7XG4gICAgICBjb25zb2xlLmxvZyh3YWRJbmZvKTtcbiAgICAgIHJldHVybiB3YWRJbmZvO1xuICAgIH0pXG4gIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGBFcnJvciBsb2FkaW5nICR7ZXJyb3IudXJsfTogJHtlcnJvci50b1N0cmluZygpfWApO1xuICAgIHJldHVybiBQcm9taXNlLmVycm9yKGVycm9yKTtcbiAgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZGV1dGV4L3dhZGluZm8uanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///5\n");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/**\n * Flat represents a drawable flat image, taken from an image cache.\n */\nclass Flat {\n  constructor(name) {\n    this.name = name;\n  }\n\n  draw(flatsCache) {\n    var canvas = document.createElement('canvas');\n    canvas.setAttribute('width', 64);\n    canvas.setAttribute('height', 64);\n\n    var ctx = canvas.getContext('2d');\n    ctx.fillStyle = '#EEE';\n    ctx.fillRect(0, 0, 64, 64);\n\n    flatsCache.loadImage(this.name).then(image => {\n      ctx.drawImage(image, 0, 0);\n    });\n\n    return canvas;\n  }\n}\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = Flat;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9mbGF0LmpzPzhkYTMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBGbGF0IHJlcHJlc2VudHMgYSBkcmF3YWJsZSBmbGF0IGltYWdlLCB0YWtlbiBmcm9tIGFuIGltYWdlIGNhY2hlLlxuICovXG5leHBvcnQgY2xhc3MgRmxhdCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgZHJhdyhmbGF0c0NhY2hlKSB7XG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgNjQpO1xuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIDY0KTtcblxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguZmlsbFN0eWxlID0gJyNFRUUnO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCA2NCwgNjQpO1xuXG4gICAgZmxhdHNDYWNoZS5sb2FkSW1hZ2UodGhpcy5uYW1lKS50aGVuKGltYWdlID0+IHtcbiAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ZsYXQuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///6\n");

/***/ })
/******/ ]);
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/***/ (function(module, exports, __webpack_require__) {

const Router = __webpack_require__(1);
const Inbox = __webpack_require__(2);
const Compose = __webpack_require__(3);
const Sent = __webpack_require__(4);

const routes = {
  compose: () => {
    return new Compose();
  },

  inbox: () => {
    return new Inbox();
  },

  sent: () => {
    return new Sent();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.location.hash = '';
  const sidebarItems = document.querySelectorAll(".sidebar-nav li");
  Array.from(sidebarItems).forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      let innerText = e.currentTarget.innerText;
      innerText = innerText.toLowerCase();
      window.location.hash = innerText;
    });
  });

  let content = document.querySelectorAll('.content')[0];
  let router = new Router(content, routes);
  router.start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Router {
  constructor(node, routes) {
    this.node = node;
    this.routes = routes;
  }

  start () {
    window.addEventListener("hashchange", (e) => {
      e.preventDefault();
      this.render();
    });
  }

  render () {
    let component = this.activeRoute();
    console.log(component);
    if(component===undefined) {
      this.node.innerHTML = "";
    } else {
      this.node.innerHTML = "";

      let node = component.render();
      this.node.appendChild(node);
    }
  }

  activeRoute() {
    let hash = window.location.hash;
    let route = hash.split("").slice(1).join("");
    if(route!=='') {
      return this.routes[route]();
    }
  }

}

module.exports = Router;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Inbox {
  render() {
    let ul = document.createElement('ul');
    ul.className = 'messages';
    ul.innerHTML = 'An Inbox Message';
    return ul;
  }
}

module.exports = Inbox;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Compose {

  render() {
    return '';
  }
}

module.exports = Compose;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Sent {
  render() {
    return "";
  }
}

module.exports = Sent;


/***/ })
/******/ ]);
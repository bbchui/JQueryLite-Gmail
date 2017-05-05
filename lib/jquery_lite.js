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

const DOMNodeCollection = __webpack_require__(1);

window.$l = (...args) => {
  const firstArg = args[0];

  if(typeof firstArg === 'function') {
    if (document.readyState === "complete") {
      firstArg();
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        firstArg();
      });
    }
  }

  if(firstArg instanceof(HTMLElement)) {
    return new DOMNodeCollection([firstArg]);
  } else {
    const nodeList = document.querySelectorAll(firstArg);
    const nodeArray = Array.from(nodeList);
    return new DOMNodeCollection(nodeArray);
  }
};

window.$l.extend = function(...args) {
  let newObj = {};
  args.forEach(obj => {
    Object.keys(obj).forEach(key => {
      newObj[key] = obj[key];
    });
  });
  return newObj;
};

window.$l.ajax = function(options) {

  let defaults = {
    url: window.location.href,
    dataType: 'json',
    method: 'GET',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: ((res) => res),
    error: (err) => (console.error(err))
  };
  const fullOptions = window.$l.extend(defaults, options);
  let parser = (res) => {
      res = JSON.parse(res);
      fullOptions.success(res);
  };

  const xhr = new XMLHttpRequest();
  xhr.open(fullOptions.method, fullOptions.url, true);
  xhr.send(fullOptions.data);
  xhr.onreadystatechange = function() {
    if (xhr.status >= 400) {
      fullOptions.error(JSON.parse(xhr.response).message);
    }
    else if(xhr.readyState===4) {
      fullOptions.success(JSON.parse(xhr.response));
    }
  };
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {

  constructor(HTMLels) {
    this.HTMLels = HTMLels;
  }

  html(text = null) {
    if(text!==null) {
      this.HTMLels.forEach(el => {
        el.innerHTML = text;
      });
      return;
    }
    return this.HTMLels[0].innerHTML;
  }

  empty() {
    this.html('');
  }

  append(el) {
    if(el instanceof HTMLElement) {
      this.HTMLels.forEach(ele => {
        ele.innerHTML += el.outerHTML;
      });
    }
    else if ((typeof el)==='string'){
      this.HTMLels.forEach(ele => {
        ele.innerHTML += el;
      });
    }
    else {
      this.HTMLels.forEach(ele => {
        el.HTMLels.forEach(el2 => {
          ele.innerHTML += el2.outerHTML;
        });
      });
    }
  }

  attr(attribute, val = null) {
    if(val !== null) {
      this.HTMLels.forEach(el => {
        el.setAttribute(attribute, val);
      });
      return;
    }
    return this.HTMLels[0].getAttribute(attribute);
  }

  addClass(klass) {
    this.HTMLels.forEach(el => {
      el.className = klass;
    });
    return;
  }

  removeClass(klass) {
    this.HTMLels.forEach(el => {
      el.classList.remove(klass);
    });
  }

  children() {
    let childList = [];
    this.HTMLels.forEach(el => {
      childList = childList.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(childList);
  }

  parent() {
    let parentList = [];
    this.HTMLels.forEach(el => {
      parentList.push(el.parentElement);
    });
    return new DOMNodeCollection(parentList);
  }

  find(selector) {
    let matchList = [];
    this.HTMLels.forEach(el => {
      matchList = matchList.concat(Array.from(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(matchList);
  }

  remove() {
    this.HTMLels.forEach(el => {
      let parent = el.parentElement;
      parent.removeChild(el);
    });
    this.HTMLels = [];
  }

  on(type, listener) {
    this.HTMLels.forEach(el => {
      el.addEventListener(type, listener);
    });
  }

  off(type, listener) {
    this.HTMLels.forEach(el => {
      el.removeEventListener(type, listener);
    });
  }



}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
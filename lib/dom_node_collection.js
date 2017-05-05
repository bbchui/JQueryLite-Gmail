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

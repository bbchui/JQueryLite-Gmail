const DOMNodeCollection = require('./dom_node_collection.js');

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

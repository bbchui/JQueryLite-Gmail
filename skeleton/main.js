const Router = require('./router.js');
const Inbox = require('./inbox.js');
const Compose = require('./compose.js');
const Sent = require('./sent.js');

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

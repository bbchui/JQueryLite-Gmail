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

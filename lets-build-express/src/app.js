var app = (exports = module.exports = {});

var http = require("node:http");
var methods = require("methods");
var slice = Array.prototype.slice;
var Router = require("./router");

app.init = function () {
  this.cache = {};
  this.engines = {};
  this.settings = {};

  this.__router = undefined;
};

methods.forEach(function (method) {
  app[method] = function (path) {
    this.lazyrouter();

    var route = this._router.route(path);

    route[method].apply(route, slice.call(arguments, 1));
    return this;
  };
});

app.handle = function handle(req, res, callback) {
  var router = this._router;

  router.handle(req, res);
};

app.lazyrouter = function lazyrouter() {
  if (!this._router) {
    this._router = new Router({});
  }
};

app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};

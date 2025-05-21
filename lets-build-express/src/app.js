var app = (exports = module.exports = {});

var slice = Array.prototype.slice;
var http = require("node:http");
var methods = require("methods");
var Router = require("./router");
const middleware = require("./middleware/init");

app.init = function () {
  this.cache = {};
  this.engines = {};
  this.settings = {};

  this._router = undefined;
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

  this._router.use(middleware.init(this));
};

app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};

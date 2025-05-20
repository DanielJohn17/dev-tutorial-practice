const setPrototypeOf = require("setprototypeof");
const Layer = require("./layer");
const Route = require("./route");

var proto = (module.exports = function (options) {
  var opts = options || {};

  function router(req, res, next) {
    router.handle(req, res, next);
  }

  setPrototypeOf(router, proto);

  router.params = {};
  router._params = [];
  router.caseSensetive = opts.caseSensetive;
  router.mergeParams = opts.mergeParams;
  router.strict = opts.strict;
  router.stack = [];

  return router;
});

proto.handle = function handle(req, res, out) {
  var self = this;
  var stack = self.stack;

  console.log(stack);
};

proto.route = function route(path) {
  var route = new Route(path);
  var layer = new Layer(path, {}, route.dispach.bind(route));

  layer.route = route;
  this.stack.push(layer);

  return route;
};

const setPrototypeOf = require("setprototypeof");
const parseUrl = require("parseurl");
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
  var idx = 0;

  next();

  function next() {
    var path = getPathname(req);

    var layer;
    var match;
    var route;

    while (match !== true && idx < stack.length) {
      layer = stack[idx++];
      match = matchLayer(layer, path);
      route = layer.route;

      if (match !== true) {
        continue;
      }

      if (!route) {
        continue;
      }

      route.stack[0].handle_request(req, res, next);
    }

    if (match) {
      layer.handle_request(req, res, next);
    }
  }
};

proto.route = function route(path) {
  var route = new Route(path);
  var layer = new Layer(path, {}, route.dispatch.bind(route));

  layer.route = route;
  this.stack.push(layer);

  return route;
};

proto.use = function use(fn) {
  var layer = new Layer("/", {}, fn);

  layer.route = undefined;
  this.stack.push(layer);

  return this;
};

function getPathname(req) {
  try {
    return parseUrl(req).pathname;
  } catch (err) {
    return undefined;
  }
}

function matchLayer(layer, path) {
  try {
    return layer.match(path);
  } catch (err) {
    return err;
  }
}

const methods = require("methods");
const flatten = require("array-flatten");
const Layer = require("./layer");

function Route(path) {
  this.path = path;
  this.stack = [];

  this.method = {};
}

methods.forEach(function (method) {
  Route.prototype[method] = function () {
    var handles = flatten(Array.prototype.slice.call(arguments));

    for (var i = 0; i < handles.length; i++) {
      var handle = handles[i];

      if (typeof handle !== "function") {
        var type = toString.call(handle);
        var msg =
          "Route. " +
          method +
          "() requires a callback function but got a " +
          type;
        throw new Error(msg);
      }

      var layer = Layer("/", {}, handle);
      layer.method = method;

      this.methods[method] = true;
      this.stack.push(layer);
    }

    return this;
  };
});

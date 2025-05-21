exports = module.exports = createApplication;

var mixin = require("merge-descriptors");
var http = require("node:http");
var proto = require("./app");

function createApplication() {
  let app = function (req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, proto, false);

  var req = Object.create(http.IncomingMessage.prototype);
  var res = Object.create(http.ServerResponse.prototype);

  res.send = function (body) {
    console.log("wow", body);
  };

  app.response = Object.create(res, {
    app: {
      configurable: true,
      enumerable: true,
      value: app,
      writable: true,
    },
  });

  app.init();

  return app;
}

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
    if (typeof body === "string") {
      this.setHeader("Content-Type", "text/plain");
      this.end(body, "utf-8");
    } else if (typeof body === "object") {
      this.json(body);
    }

    return this;
  };

  res.json = function (body) {
    this.setHeader("Content-Type", "application/json");
    this.end(JSON.stringify(body), "utf-8");

    return this;
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

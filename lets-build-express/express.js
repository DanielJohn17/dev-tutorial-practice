exports = module.exports = createApplication;

var mixin = require("merge-descriptors");
var proto = require("./app");

function createApplication() {
  let app = function (req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, proto, false);

  app.init();

  return app;
}

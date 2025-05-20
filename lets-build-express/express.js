exports = module.exports = createApplication;

const mixin = require("mixin");
var proto = require("./app");

function createApplication() {
  let app = function (req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, proto, false);

  app.init();

  return app;
}

let express = require("./express");
const app = express();

app.get("/", (req, res) => {
  res.writeHead(200);
  res.write("Hello World");
  res.end();
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

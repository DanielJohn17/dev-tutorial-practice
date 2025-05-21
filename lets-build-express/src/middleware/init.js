var setPrtotypeOf = require("setprototypeof");

exports.init = function (app) {
  return function expressInit(req, res, next) {
    setPrtotypeOf(res, app.response);
    next();
  };
};

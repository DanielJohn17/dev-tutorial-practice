var app = (exports = module.exports = {});

var methods = require("methods");
var slice = Array.prototype.slice;

app.init = function () {
  this.cache = {};
  this.engines = {};
  this.settings = {};

  this.__router = undefined;
};


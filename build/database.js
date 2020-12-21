"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].connect('mongodb://localhost/tiendaDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
}).then(function (db) {
  return console.log('conectado');
})["catch"](function (error) {
  return console.log('error');
});
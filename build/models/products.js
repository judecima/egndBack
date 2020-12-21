"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var productoSchema = new _mongoose.Schema({
  nombre: String,
  categoria: String,
  precio: Number,
  imgUrl: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Producto', productoSchema);

exports["default"] = _default;
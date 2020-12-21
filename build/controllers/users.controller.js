"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vencimiento = exports.topten = exports.revendedores = exports.pertenecen = exports.desactivar = exports.reasignarUserById = exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getUsers = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _users["default"].find();

          case 2:
            users = _context.sent;
            res.json(users);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;

var getUserById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _users["default"].findById(req.params.userId);

          case 2:
            user = _context2.sent;
            res.status(200).json(user);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUserById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUserById = getUserById;

var updateUserById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var userActualizado;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _users["default"].findByIdAndUpdate(req.params.userId, req.body, {
              "new": true
            });

          case 2:
            userActualizado = _context3.sent;
            res.status(204).json(userActualizado);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateUserById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateUserById = updateUserById;

var deleteUserById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var userEliminado;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _users["default"].deleteMany();

          case 2:
            userEliminado = _context4.sent;
            res.status(204).json();

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteUserById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteUserById = deleteUserById;

var reasignarUserById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var myquery, newvalues, usuarioActualizado;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            myquery = {
              padre: req.body.padre
            };
            newvalues = {
              $set: {
                padre: req.body.nuevoPadre
              }
            };
            _context5.next = 4;
            return _users["default"].updateMany(myquery, newvalues, {
              "new": true
            });

          case 4:
            usuarioActualizado = _context5.sent;
            console.log(usuarioActualizado);
            res.status(204).json();

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function reasignarUserById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.reasignarUserById = reasignarUserById;

var desactivar = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var newvalues, userActualizado;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            newvalues = {
              $set: {
                estado: 'Inactivo'
              }
            };
            _context6.next = 3;
            return _users["default"].findByIdAndUpdate(req.params.userId, newvalues, {
              "new": true
            });

          case 3:
            userActualizado = _context6.sent;
            res.status(204).json(userActualizado);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function desactivar(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.desactivar = desactivar;

var pertenecen = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var userFound;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _users["default"].find({
              padre: req.body.padre
            }, function (err, user) {
              if (err) {
                res.send(err);
              }

              console.log(user);
              res.json(user);
            });

          case 2:
            userFound = _context7.sent;

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function pertenecen(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.pertenecen = pertenecen;

var revendedores = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var userFound;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _users["default"].find({
              roles: '5fcb8124b424572820441a01'
            }, function (err, user) {
              if (err) {
                res.send(err);
              }

              console.log(user);
              res.json(user);
            });

          case 2:
            userFound = _context8.sent;

            if (!userFound) {
              res.status(400).json({
                message: 'Sin vendedores asignados'
              });
            }

            _express.response.status(200).json(userFound);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function revendedores(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.revendedores = revendedores;

var topten = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _users["default"].aggregate([{
              $group: {
                _id: '$padre',
                vendedores: {
                  $sum: 1
                }
              }
            }]);

          case 2:
            users = _context9.sent;
            users.sort(function (a, b) {
              if (a.vendedores < b.vendedores) {
                return 1;
              }

              if (a.vendedores > b.vendedores) {
                return -1;
              } // a must be equal to b


              return 0;
            });
            res.json(users);

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function topten(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.topten = topten;

var vencimiento = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var d, vencimiento;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            d = new Date();
            _context10.next = 3;
            return _users["default"].findOne({
              fecha: {
                $eq: d
              }
            }).exec(function (err, act) {
              if (err) {
                console.log('hubo un error');
                return res.status(500).json({
                  error: err.message
                }); //debes enviar una respuesta o llamar al manejador de errores (return next(err))
              }

              console.log(act);
              return res.status(200).json(act); // en este ejemplo se envía el resultado
            });

          case 3:
            vencimiento = _context10.sent;
            res.json(users);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function vencimiento(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.vencimiento = vencimiento;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = void 0;

var _users = _interopRequireDefault(require("../models/users"));

var _roles = _interopRequireDefault(require("../models/roles"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signIn = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var userFound, matchPassword, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _users["default"].findOne({
              email: req.body.email
            }).populate('roles');

          case 2:
            userFound = _context.sent;

            if (!userFound) {
              res.status(400).json({
                message: 'user not found'
              });
            }

            _context.next = 6;
            return _users["default"].comparePassword(req.body.password, userFound.password);

          case 6:
            matchPassword = _context.sent;

            if (matchPassword) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              token: null,
              message: 'validar datos ingresados'
            }));

          case 9:
            token = _jsonwebtoken["default"].sign({
              id: userFound._id
            }, _config["default"].SECRET, {
              expiresIn: 86400
            });
            res.json({
              token: token
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signIn(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signIn = signIn;

var signUp = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, username, modulos, email, cuit, celular, password, roles, nombre, estado, padre, d, newUser, foundRole, role, savedUser, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, modulos = _req$body.modulos, email = _req$body.email, cuit = _req$body.cuit, celular = _req$body.celular, password = _req$body.password, roles = _req$body.roles, nombre = _req$body.nombre, estado = _req$body.estado, padre = _req$body.padre;
            console.log(_users["default"].encryptPassword(password));
            console.log(password);
            d = new Date();
            _context2.t0 = _users["default"];
            _context2.t1 = username;
            _context2.t2 = email;
            _context2.t3 = cuit;
            _context2.t4 = nombre;
            _context2.t5 = celular;
            _context2.t6 = estado;
            _context2.t7 = padre;
            _context2.t8 = modulos;
            _context2.t9 = d.setDate(d.getDate() + 30);
            _context2.next = 16;
            return _users["default"].encryptPassword(password);

          case 16:
            _context2.t10 = _context2.sent;
            _context2.t11 = {
              username: _context2.t1,
              email: _context2.t2,
              cuit: _context2.t3,
              nombre: _context2.t4,
              celular: _context2.t5,
              estado: _context2.t6,
              padre: _context2.t7,
              modulos: _context2.t8,
              licencia: _context2.t9,
              password: _context2.t10
            };
            newUser = new _context2.t0(_context2.t11);

            if (padre) {
              newUser.padre = padre;
            } else {
              newUser.padre = 'Admin';
            }

            if (!estado) {
              newUser.estado = 'Activo';
            } else {
              newUser.estado = estado;
            }

            if (!roles) {
              _context2.next = 28;
              break;
            }

            _context2.next = 24;
            return _roles["default"].find({
              name: {
                $in: roles
              }
            });

          case 24:
            foundRole = _context2.sent;
            newUser.roles = foundRole.map(function (role) {
              return role._id;
            });
            _context2.next = 32;
            break;

          case 28:
            _context2.next = 30;
            return _roles["default"].findOne({
              name: 'Vendedor'
            });

          case 30:
            role = _context2.sent;
            newUser.roles = [role._id];

          case 32:
            _context2.next = 34;
            return newUser.save();

          case 34:
            savedUser = _context2.sent;
            token = _jsonwebtoken["default"].sign({
              id: savedUser._id
            }, _config["default"].SECRET, {
              expiresIn: 86400
            });
            console.log(savedUser);
            enviar(email)["catch"](console.error);
            res.json({
              token: token
            });

          case 39:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function signUp(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signUp = signUp;

function enviar(_x5) {
  return _enviar.apply(this, arguments);
}

function _enviar() {
  _enviar = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(email) {
    var transporter, info;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            // create reusable transporter object using the default SMTP transport
            transporter = _nodemailer["default"].createTransport({
              host: 'smtp.hostinger.com.ar',
              port: 587,
              secure: false,
              // true for 465, false for other ports
              auth: {
                user: 'info@ventas-online.xyz',
                // generated ethereal user
                pass: 'Welcome01' // generated ethereal password

              }
            }); // send mail with defined transport object

            _context3.next = 3;
            return transporter.sendMail({
              from: '"Fred Foo 👻" <info@ventas-online.xyz>',
              // sender address
              to: email,
              // list of receivers
              subject: 'Hello ✔',
              // Subject line
              text: 'Hello world?',
              // plain text body
              html: '<b>Hello world?</b>' // html body

            });

          case 3:
            info = _context3.sent;
            console.log('Message sent: %s', info.messageId); // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview only available when sending through an Ethereal account

            console.log('Preview URL: %s', _nodemailer["default"].getTestMessageUrl(info)); // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _enviar.apply(this, arguments);
}
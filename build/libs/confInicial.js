"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRole = void 0;

var _roles = _interopRequireDefault(require("../models/roles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createRole = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var count, values;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('llgo');
            _context.next = 3;
            return _roles["default"].estimatedDocumentCount();

          case 3:
            count = _context.sent;
            console.log(count);
            _context.prev = 5;

            if (!(count > 0)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return");

          case 8:
            _context.next = 10;
            return Promise.all([new _roles["default"]({
              name: 'Vendedor'
            }).save(), new _roles["default"]({
              name: 'ReVendedor'
            }).save(), new _roles["default"]({
              name: 'Admin'
            }).save()]);

          case 10:
            values = _context.sent;
            console.log(values);
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](5);
            console.log(_context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 14]]);
  }));

  return function createRole() {
    return _ref.apply(this, arguments);
  };
}();

exports.createRole = createRole;
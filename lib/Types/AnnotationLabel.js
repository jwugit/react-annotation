"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AnnotationLabel;

var _classnames = _interopRequireDefault(require("../classnames"));

var _Type = _interopRequireDefault(require("./Type"));

var _ConnectorLine = _interopRequireDefault(require("../Connector/ConnectorLine"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function AnnotationLabel(props) {
  var className = (0, _classnames.default)("label", props.className);
  return (0, _Type.default)(_objectSpread({}, props, {
    className: className
  }), _ConnectorLine.default, {
    align: "middle"
  });
}
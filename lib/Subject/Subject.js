"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Handle = _interopRequireDefault(require("../Handle"));

var _renderprops = require("react-spring/renderprops.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FILLABLE = ["SubjectCircle", "SubjectRect"];

var Subject =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Subject, _React$Component);

  function Subject() {
    _classCallCheck(this, Subject);

    return _possibleConstructorReturn(this, _getPrototypeOf(Subject).apply(this, arguments));
  }

  _createClass(Subject, [{
    key: "getComponents",
    value: function getComponents() {}
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          x = _this$props.x,
          y = _this$props.y,
          editMode = _this$props.editMode,
          color = _this$props.color,
          _this$props$fill = _this$props.fill,
          fill = _this$props$fill === void 0 ? "none" : _this$props$fill,
          _this$props$fillOpaci = _this$props.fillOpacity,
          fillOpacity = _this$props$fillOpaci === void 0 ? 1 : _this$props$fillOpaci,
          easing = _this$props.easing,
          _this$props$strokeWid = _this$props.strokeWidth,
          strokeWidth = _this$props$strokeWid === void 0 ? 2 : _this$props$strokeWid,
          delay = _this$props.delay;
      var d = this.getComponents(this.props) || {};
      var handles;

      if (editMode) {
        handles = [_react.default.createElement(_Handle.default, {
          key: "subject-handle",
          handleStart: this.props.dragStart,
          handleStop: this.props.dragEnd,
          handleDrag: this.props.dragSubject
        })];

        if (d.handles) {
          handles = handles.concat(d.handles.map(function (h, i) {
            return _react.default.createElement(_Handle.default, {
              key: "subjecthandle-".concat(i),
              handleStart: _this.props.dragStart,
              handleStop: _this.props.dragEnd,
              x: h.x,
              y: h.y,
              offsetParent: h.offsetParent && _this.subject,
              handleDrag: function handleDrag(e, data) {
                _this.props.dragSubjectSettings(e, d.handleFunction(h, data));
              }
            });
          }));
        }
      }

      var honorFill = FILLABLE.indexOf(this.name) !== -1;
      return _react.default.createElement("g", _extends({
        className: "annotation-subject"
      }, this.props.gAttrs, {
        ref: function ref(subject) {
          _this.subject = subject;
        }
      }), d.components && d.components.map(function (c, i) {
        var attrs = {};
        if (!c) return null;
        Object.keys(c.attrs).forEach(function (k) {
          if (c.attrs[k] && k !== "text") {
            attrs[k.replace(/-([a-z])/g, function (g) {
              return g[1].toUpperCase();
            })] = c.attrs[k];
          }
        });

        if (c.type === 'path') {
          var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
          p.setAttribute("d", c.attrs.d);
          var plength = Math.ceil(p.getTotalLength()); // console.log("plength", plength)

          return _react.default.createElement(_renderprops.Spring, {
            key: "".concat(i, "_").concat(plength, "_").concat(x, "_").concat(y),
            config: {
              duration: 500,
              easing: easing
            },
            delay: delay + 500,
            from: {
              ll: plength
            },
            to: {
              ll: 0
            }
          }, function (props) {
            return _react.default.createElement(c.type, _extends({
              key: i,
              className: c.className,
              fill: honorFill && fill || "none",
              fillOpacity: honorFill && fillOpacity,
              strokeWidth: strokeWidth,
              stroke: color,
              strokeDasharray: plength,
              strokeDashoffset: Math.round(props.ll)
            }, attrs), c.attrs.text);
          });
        } else {
          return _react.default.createElement(c.type, _extends({
            key: i,
            className: c.className,
            fill: honorFill && fill || "none",
            fillOpacity: honorFill && fillOpacity,
            strokeWidth: strokeWidth,
            stroke: color
          }, attrs), c.attrs.text);
        }
      }), handles);
    }
  }]);

  return Subject;
}(_react.default.Component);

exports.default = Subject;
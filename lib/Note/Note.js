"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _alignment4 = _interopRequireDefault(require("viz-annotation/lib/Note/alignment"));

var _Handle = _interopRequireDefault(require("../Handle"));

var _lineTypeVertical = _interopRequireDefault(require("viz-annotation/lib/Note/lineType-vertical"));

var _lineTypeHorizontal = _interopRequireDefault(require("viz-annotation/lib/Note/lineType-horizontal"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _renderprops = require("react-spring/renderprops.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getOuterBBox = function getOuterBBox() {
  for (var _len = arguments.length, domNodes = new Array(_len), _key = 0; _key < _len; _key++) {
    domNodes[_key] = arguments[_key];
  }

  return domNodes.concat().reduce(function (p, c) {
    if (c) {
      var bbox = c.getBBox();
      p.x = Math.min(p.x, bbox.x);
      p.y = Math.min(p.y, bbox.y);
      p.width = Math.max(p.width, bbox.width);
      var yOffset = c && c.attributes && c.attributes.y;
      p.height = Math.max(p.height, (yOffset && parseFloat(yOffset.value) || 0) + bbox.height);
    }

    return p;
  }, {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
};

var Note =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Note, _React$Component);

  function Note(props) {
    var _this;

    _classCallCheck(this, Note);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Note).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      translateX: 0,
      translateY: 0,
      labelOffset: 0,
      changed: 0,
      bbox: {
        width: 0,
        height: 0,
        x: 0,
        y: 0
      }
    });

    _this.updateText = _this.updateText.bind(_assertThisInitialized(_assertThisInitialized(_this))); // this.note = React.createRef()
    // this.title = React.createRef()
    // this.label = React.createRef()

    return _this;
  }

  _createClass(Note, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateText(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.titleSize !== this.props.titleSize || nextProps.title !== this.props.title || nextProps.label !== this.props.label || nextProps.wrap !== this.props.wrap) {
        this.updateText(nextProps);
      }

      if (nextProps.editMode && (nextProps.align === "dynamic" || !nextProps.align)) {
        this.updateText(nextProps);
      }
    }
  }, {
    key: "updateText",
    value: function updateText(_ref) {
      var _this2 = this;

      var orientation = _ref.orientation,
          padding = _ref.padding,
          align = _ref.align,
          lineType = _ref.lineType,
          label = _ref.label,
          title = _ref.title,
          wrap = _ref.wrap,
          wrapSplitter = _ref.wrapSplitter,
          dx = _ref.dx,
          dy = _ref.dy;
      var newState = {
        titleWrapped: null,
        labelWrapped: null
      };
      newState.changed = this.state.changed + 1;

      if (title) {
        newState.titleWrapped = this.title && this.wrapText(this.title, newState.changed, title, wrap, wrapSplitter);
      }

      if (label) newState.labelWrapped = this.label && this.wrapText(this.label, newState.changed, label, wrap, wrapSplitter);
      this.setState(newState, function () {
        var setLabel = function setLabel() {
          var bbox = getOuterBBox(_this2.title, _this2.label);
          var noteParams = {
            padding: padding,
            bbox: bbox,
            offset: {
              x: dx,
              y: dy
            },
            orientation: orientation,
            align: align
          };
          if (lineType === "vertical") noteParams.orientation = "leftRight";else if (lineType === "horizontal") noteParams.orientation = "topBottom";
          if (lineType === "verticalNone") noteParams.orientation = "leftRight";else if (lineType === "horizontalNone") noteParams.orientation = "topBottom";

          var _alignment = (0, _alignment4.default)(noteParams),
              x = _alignment.x,
              y = _alignment.y;

          _this2.setState({
            translateX: x,
            translateY: y,
            bbox: bbox
          });
        };

        _this2.setState({
          labelOffset: title && _this2.title.getBBox().height || 0
        }, setLabel);
      });
    }
  }, {
    key: "wrapText",
    value: function wrapText(textRef, key, text, width, wrapSplitter) {
      var initialAttrs = {
        x: 0,
        dy: "1.2em"
      };
      var words = text.split(wrapSplitter || /[ \t\r\n]+/).reverse().filter(function (w) {
        return w !== "";
      });
      var word,
          line = [];
      var tspans = [];

      while (word = words.pop()) {
        line.push(word);
        textRef.lastChild.textContent = line.join(" ");
        var length = textRef.lastChild.getComputedTextLength();
        textRef.lastChild.textContent = "";

        if (length > width && line.length > 1) {
          line.pop();
          tspans.push(_react.default.createElement("tspan", _extends({
            key: tspans.length + text
          }, initialAttrs), line.join(" ")));
          line = [word];
        }
      }

      if (line.length !== 0) {
        tspans.push(_react.default.createElement("tspan", _extends({
          key: tspans.length + text
        }, initialAttrs), line.join(" ")));
      }

      return _react.default.createElement("tspan", _extends({}, initialAttrs, {
        key: key + text
      }), tspans);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          orientation = _this$props.orientation,
          padding = _this$props.padding,
          align = _this$props.align,
          dx = _this$props.dx,
          dy = _this$props.dy,
          lineType = _this$props.lineType;

      if (this.state.bbox.width && (prevProps.dx !== this.props.dx || prevProps.dy !== this.props.dy) && (this.title || this.label)) {
        var bbox = getOuterBBox(this.title, this.label);
        var noteParams = {
          padding: padding,
          bbox: bbox,
          offset: {
            x: dx,
            y: dy
          },
          orientation: orientation,
          align: align
        };
        if (lineType === "vertical") noteParams.orientation = "leftRight";else if (lineType === "horizontal") noteParams.orientation = "topBottom";
        if (lineType === "verticalNone") noteParams.orientation = "leftRight";else if (lineType === "horizontalNone") noteParams.orientation = "topBottom";

        var _alignment2 = (0, _alignment4.default)(noteParams),
            x = _alignment2.x,
            y = _alignment2.y;

        var updates = {
          bbox: bbox
        };
        if (this.state.translateX !== x) updates.translateX = x;
        if (this.state.translateY !== y) updates.translateY = y;

        if (updates.translateX !== undefined || updates.translateY !== undefined) {
          this.setState(updates);
        }
      } else if (this.state.align !== prevProps.align || this.props.orientation !== prevProps.orientation || this.props.padding !== prevProps.padding) {
        var _noteParams = {
          padding: padding,
          bbox: this.state.bbox,
          offset: {
            x: dx,
            y: dy
          },
          orientation: orientation,
          align: align
        };
        if (lineType === "vertical") _noteParams.orientation = "leftRight";else if (lineType === "horizontal") _noteParams.orientation = "topBottom";
        if (lineType === "verticalNone") _noteParams.orientation = "leftRight";else if (lineType === "horizontalNone") _noteParams.orientation = "topBottom";

        var _alignment3 = (0, _alignment4.default)(_noteParams),
            _x = _alignment3.x,
            _y = _alignment3.y;

        var _updates = {};
        if (this.state.translateX !== _x) _updates.translateX = _x;
        if (this.state.translateY !== _y) _updates.translateY = _y;

        if (_updates.translateX !== undefined || _updates.translateY !== undefined) {
          this.setState(_updates);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          x = _this$props2.x,
          y = _this$props2.y,
          dx = _this$props2.dx,
          dy = _this$props2.dy,
          title = _this$props2.title,
          label = _this$props2.label,
          align = _this$props2.align,
          editMode = _this$props2.editMode,
          lineType = _this$props2.lineType,
          color = _this$props2.color,
          titleColor = _this$props2.titleColor,
          labelColor = _this$props2.labelColor,
          bgPadding = _this$props2.bgPadding,
          _this$props2$strokeWi = _this$props2.strokeWidth,
          strokeWidth = _this$props2$strokeWi === void 0 ? 2 : _this$props2$strokeWi,
          _this$props2$titleSiz = _this$props2.titleSize,
          titleSize = _this$props2$titleSiz === void 0 ? "inherit" : _this$props2$titleSiz,
          delay = _this$props2.delay; // console.log("props", this.props)

      var bgPaddingFinal = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      };

      if (typeof bgPadding === "number") {
        bgPaddingFinal = {
          top: bgPadding,
          bottom: bgPadding,
          left: bgPadding,
          right: bgPadding
        };
      } else if (bgPadding && _typeof(bgPadding) === "object") {
        bgPaddingFinal = Object.assign(bgPaddingFinal, bgPadding);
      }

      var noteTitle, noteText, noteLineType;

      if (title) {
        noteTitle = _react.default.createElement("text", {
          ref: function ref(el) {
            return _this3.title = el;
          },
          className: "annotation-note-title",
          fontWeight: "bold",
          key: "title",
          fill: titleColor || color,
          fontSize: titleSize
        }, this.state.titleWrapped || _react.default.createElement("tspan", {
          x: 0,
          dy: ".8em"
        }, title));
      }

      if (label) {
        noteText = _react.default.createElement("text", {
          ref: function ref(el) {
            return _this3.label = el;
          },
          className: "annotation-note-label",
          y: this.state.labelOffset * 1.1,
          key: "label",
          fill: labelColor || color,
          fontSize: titleSize
        }, this.state.labelWrapped || _react.default.createElement("tspan", {
          x: 0,
          dy: ".8em"
        }, label));
      }

      if (lineType && this.state.bbox.width) {
        var noteParams = {
          bbox: this.state.bbox,
          align: align,
          offset: {
            x: dx,
            y: dy
          }
        };
        var noteComponent = (lineType === "vertical" && (0, _lineTypeVertical.default)(noteParams) || lineType === "horizontal" && (0, _lineTypeHorizontal.default)(noteParams) || lineType === "verticalNone" && (0, _lineTypeVertical.default)(noteParams) || lineType === "horizontalNone" && (0, _lineTypeHorizontal.default)(noteParams)).components[0];

        if (noteComponent.type === 'path') {
          var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
          p.setAttribute("d", noteComponent.attrs.d);
          var plength = Math.ceil(p.getTotalLength());
          noteLineType = _react.default.createElement(_renderprops.Spring, {
            key: "noteComponent_".concat(plength, "_").concat(x, "_").concat(y),
            config: {
              duration: 250
            },
            delay: delay + 1200,
            from: {
              ll: plength
            },
            to: {
              ll: 0
            }
          }, function (props) {
            return _react.default.createElement(noteComponent.type, _extends({
              className: noteComponent.className
            }, noteComponent.attrs, {
              strokeWidth: strokeWidth,
              stroke: color,
              strokeDasharray: plength,
              strokeDashoffset: Math.round(props.ll)
            }));
          });
        } else {
          noteLineType = _react.default.createElement(noteComponent.type, _extends({
            className: noteComponent.className
          }, noteComponent.attrs, {
            strokeWidth: strokeWidth,
            stroke: color
          }));
        }
      }

      var handle;

      if (editMode) {
        handle = _react.default.createElement(_Handle.default, {
          handleStart: this.props.dragStart,
          handleStop: this.props.dragEnd,
          handleDrag: this.props.dragNote
        });
      }

      return _react.default.createElement("g", _extends({
        transform: "translate(".concat(dx, ", ").concat(dy, ")"),
        className: "annotation-note"
      }, this.props.gProps), _react.default.createElement(_renderprops.Spring, {
        key: "noteComponent_text_".concat(x, "_").concat(y),
        delay: delay + 1450,
        from: {
          opacity: 0
        },
        to: {
          opacity: 1
        }
      }, function (props) {
        return _react.default.createElement("g", {
          className: "annotation-note-content",
          transform: "translate(".concat(_this3.state.translateX, ", ").concat(_this3.state.translateY, ")"),
          ref: function ref(el) {
            return _this3.note = el;
          },
          style: {
            opacity: props.opacity
          }
        }, _react.default.createElement("rect", {
          className: "annotation-note-bg",
          width: _this3.state.bbox.width + bgPaddingFinal.left + bgPaddingFinal.right,
          x: -bgPaddingFinal.left,
          y: -bgPaddingFinal.top,
          height: _this3.state.bbox.height + bgPaddingFinal.top + bgPaddingFinal.bottom,
          stroke: "none",
          fill: "white",
          fillOpacity: "0"
        }), noteTitle, noteText);
      }), !["verticalNone", "horizontalNone"].includes(lineType) && noteLineType, handle);
    }
  }]);

  return Note;
}(_react.default.Component);

exports.default = Note;
Note.defaultProps = {
  wrap: 120,
  align: "dynamic",
  orientation: "topBottom",
  padding: 3,
  strokeWidth: 2,
  titleSize: "inherit"
};
Note.propTypes = {
  dx: _propTypes.default.number,
  dy: _propTypes.default.number,
  title: _propTypes.default.string,
  label: _propTypes.default.string,
  orientation: _propTypes.default.oneOf(["leftRight", "topBottom"]),
  padding: _propTypes.default.number,
  bgPadding: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.object]),
  align: _propTypes.default.oneOf(["left", "right", "middle", "top", "bottom", "dynamic"]),
  editMode: _propTypes.default.bool,
  lineType: _propTypes.default.oneOf(["vertical", "horizontal", "verticalNone", "horizontalNone"]),
  color: _propTypes.default.string,
  titleColor: _propTypes.default.string,
  labelColor: _propTypes.default.string,
  strokeWidth: _propTypes.default.number,
  titleSize: _propTypes.default.string
};
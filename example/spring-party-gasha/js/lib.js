"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function loadpage(action, opts) {
  action = action ? action : 'init';
  var progressValue = 0;
  var loadHtml = ['<div class="mdLoading">', '    <div class="loadingBox">',
  // '        <img class="line2" src="images/load-pic.png">',
  '        <div class="progressBar">', '            <div class="progress js-bar" style="width:0"></div>',
  // '			 <div class="js-count"></div>',
  '        </div>', '    </div>', '</div>'].join('');
  var dLoad, dCount, dBar;
  var config = {
    async: false
  };
  var body = document.querySelector('body');
  function init() {
    body.insertAdjacentHTML('beforeend', loadHtml);
    dLoad = document.querySelector('body .mdLoading');
    dCount = document.querySelector('.mdLoading .js-count');
    dBar = document.querySelector('.mdLoading .js-bar');
    return new Promise(function (resolve, reject) {
      if (!config.async) {
        var queue = new createjs.LoadQueue();
        queue.setMaxConnections(200);
        var loadArray = [];
        document.querySelectorAll('img').forEach(function (i) {
          loadArray.push({
            id: i,
            src: i.src
          });
        });
        console.log(loadArray);
        queue.loadManifest(loadArray);
        var handleComplete = function handleComplete() {
          // $(window).trigger("loadCompleted");
          var winEvent = new Event('loadCompleted');
          // window.addEventListener('loadCompleted',function(){}, false)
          window.dispatchEvent(winEvent);
          // document.querySelector(window).addEventListener('loadCompleted')
          // document.querySelector('.js-wrap').style
          TweenMax.fromTo(dLoad, 0.5, {
            opacity: 1
          }, {
            delay: .8,
            opacity: 0,
            ease: Power4.easeOut,
            onComplete: function onComplete() {
              dLoad.remove();
              resolve(true);
            }
          });
        };
        queue.on("progress", function () {
          var procValue = Math.min(Math.ceil(queue.progress * 100), 100);
          if (dCount) {
            dCount.innerHTML = procValue + '%';
          }
          if (dBar) {
            dBar.style.width = procValue + '%';
          }
        });
        queue.on("complete", handleComplete, this);
      } else {
        resolve(true);
      }
    });
  }
  if (action == 'init') {
    return init();
  }
  if (action == 'close') {
    dLoad = document.querySelector('body .mdLoading');
    dCount = document.querySelector('.mdLoading .js-count');
    dBar = document.querySelector('.mdLoading .js-bar');
    if (dCount) {
      dCount.innerHTML = '100%';
    }
    if (dBar) {
      dBar.style.width = '100%';
    }
    TweenMax.fromTo(dLoad, 0.5, {
      opacity: 1
    }, {
      delay: .8,
      opacity: 0,
      ease: Power4.easeOut,
      onComplete: function onComplete() {
        dLoad.remove();
      }
    });
  }
}
typeof navigator !== "undefined" && function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(function () {
      return factory(root);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
    module.exports = factory(root);
  } else {
    root.lottie = factory(root);
    root.bodymovin = root.lottie;
  }
}(window || {}, function (window) {
  "use strict";

  var svgNS = "http://www.w3.org/2000/svg",
    locationHref = "",
    initialDefaultFrame = -999999,
    subframeEnabled = !0,
    expressionsPlugin,
    isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    cachedColors = {},
    bmRnd,
    bmPow = Math.pow,
    bmSqrt = Math.sqrt,
    bmFloor = Math.floor,
    bmMax = Math.max,
    bmMin = Math.min,
    BMMath = {};
  function ProjectInterface() {
    return {};
  }
  !function () {
    var t,
      e = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"],
      r = e.length;
    for (t = 0; t < r; t += 1) BMMath[e[t]] = Math[e[t]];
  }(), BMMath.random = Math.random, BMMath.abs = function (t) {
    if ("object" === _typeof(t) && t.length) {
      var e,
        r = createSizedArray(t.length),
        i = t.length;
      for (e = 0; e < i; e += 1) r[e] = Math.abs(t[e]);
      return r;
    }
    return Math.abs(t);
  };
  var defaultCurveSegments = 150,
    degToRads = Math.PI / 180,
    roundCorner = .5519;
  function roundValues(t) {
    bmRnd = t ? Math.round : function (t) {
      return t;
    };
  }
  function styleDiv(t) {
    t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.display = "block", t.style.transformOrigin = "0 0", t.style.webkitTransformOrigin = "0 0", t.style.backfaceVisibility = "visible", t.style.webkitBackfaceVisibility = "visible", t.style.transformStyle = "preserve-3d", t.style.webkitTransformStyle = "preserve-3d", t.style.mozTransformStyle = "preserve-3d";
  }
  function BMEnterFrameEvent(t, e, r, i) {
    this.type = t, this.currentTime = e, this.totalTime = r, this.direction = i < 0 ? -1 : 1;
  }
  function BMCompleteEvent(t, e) {
    this.type = t, this.direction = e < 0 ? -1 : 1;
  }
  function BMCompleteLoopEvent(t, e, r, i) {
    this.type = t, this.currentLoop = r, this.totalLoops = e, this.direction = i < 0 ? -1 : 1;
  }
  function BMSegmentStartEvent(t, e, r) {
    this.type = t, this.firstFrame = e, this.totalFrames = r;
  }
  function BMDestroyEvent(t, e) {
    this.type = t, this.target = e;
  }
  function BMRenderFrameErrorEvent(t, e) {
    this.type = "renderFrameError", this.nativeError = t, this.currentTime = e;
  }
  function BMConfigErrorEvent(t) {
    this.type = "configError", this.nativeError = t;
  }
  function BMAnimationConfigErrorEvent(t, e) {
    this.type = t, this.nativeError = e;
  }
  roundValues(!1);
  var createElementID = (F = 0, function () {
      return "__lottie_element_" + (F += 1);
    }),
    F;
  function HSVtoRGB(t, e, r) {
    var i, s, a, n, o, h, l, p;
    switch (h = r * (1 - e), l = r * (1 - (o = 6 * t - (n = Math.floor(6 * t))) * e), p = r * (1 - (1 - o) * e), n % 6) {
      case 0:
        i = r, s = p, a = h;
        break;
      case 1:
        i = l, s = r, a = h;
        break;
      case 2:
        i = h, s = r, a = p;
        break;
      case 3:
        i = h, s = l, a = r;
        break;
      case 4:
        i = p, s = h, a = r;
        break;
      case 5:
        i = r, s = h, a = l;
    }
    return [i, s, a];
  }
  function RGBtoHSV(t, e, r) {
    var i,
      s = Math.max(t, e, r),
      a = Math.min(t, e, r),
      n = s - a,
      o = 0 === s ? 0 : n / s,
      h = s / 255;
    switch (s) {
      case a:
        i = 0;
        break;
      case t:
        i = e - r + n * (e < r ? 6 : 0), i /= 6 * n;
        break;
      case e:
        i = r - t + 2 * n, i /= 6 * n;
        break;
      case r:
        i = t - e + 4 * n, i /= 6 * n;
    }
    return [i, o, h];
  }
  function addSaturationToRGB(t, e) {
    var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
    return r[1] += e, 1 < r[1] ? r[1] = 1 : r[1] <= 0 && (r[1] = 0), HSVtoRGB(r[0], r[1], r[2]);
  }
  function addBrightnessToRGB(t, e) {
    var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
    return r[2] += e, 1 < r[2] ? r[2] = 1 : r[2] < 0 && (r[2] = 0), HSVtoRGB(r[0], r[1], r[2]);
  }
  function addHueToRGB(t, e) {
    var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
    return r[0] += e / 360, 1 < r[0] ? r[0] -= 1 : r[0] < 0 && (r[0] += 1), HSVtoRGB(r[0], r[1], r[2]);
  }
  var rgbToHex = function () {
    var t,
      e,
      i = [];
    for (t = 0; t < 256; t += 1) e = t.toString(16), i[t] = 1 === e.length ? "0" + e : e;
    return function (t, e, r) {
      return t < 0 && (t = 0), e < 0 && (e = 0), r < 0 && (r = 0), "#" + i[t] + i[e] + i[r];
    };
  }();
  function BaseEvent() {}
  BaseEvent.prototype = {
    triggerEvent: function triggerEvent(t, e) {
      if (this._cbs[t]) for (var r = this._cbs[t].length, i = 0; i < r; i += 1) this._cbs[t][i](e);
    },
    addEventListener: function addEventListener(t, e) {
      return this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e), function () {
        this.removeEventListener(t, e);
      }.bind(this);
    },
    removeEventListener: function removeEventListener(t, e) {
      if (e) {
        if (this._cbs[t]) {
          for (var r = 0, i = this._cbs[t].length; r < i;) this._cbs[t][r] === e && (this._cbs[t].splice(r, 1), r -= 1, i -= 1), r += 1;
          this._cbs[t].length || (this._cbs[t] = null);
        }
      } else this._cbs[t] = null;
    }
  };
  var createTypedArray = function () {
    function r(t, e) {
      var r,
        i = 0,
        s = [];
      switch (t) {
        case "int16":
        case "uint8c":
          r = 1;
          break;
        default:
          r = 1.1;
      }
      for (i = 0; i < e; i += 1) s.push(r);
      return s;
    }
    return "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? function (t, e) {
      return "float32" === t ? new Float32Array(e) : "int16" === t ? new Int16Array(e) : "uint8c" === t ? new Uint8ClampedArray(e) : r(t, e);
    } : r;
  }();
  function createSizedArray(t) {
    return Array.apply(null, {
      length: t
    });
  }
  function createNS(t) {
    return document.createElementNS(svgNS, t);
  }
  function createTag(t) {
    return document.createElement(t);
  }
  function DynamicPropertyContainer() {}
  DynamicPropertyContainer.prototype = {
    addDynamicProperty: function addDynamicProperty(t) {
      -1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), this._isAnimated = !0);
    },
    iterateDynamicProperties: function iterateDynamicProperties() {
      var t;
      this._mdf = !1;
      var e = this.dynamicProperties.length;
      for (t = 0; t < e; t += 1) this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0);
    },
    initDynamicPropertyContainer: function initDynamicPropertyContainer(t) {
      this.container = t, this.dynamicProperties = [], this._mdf = !1, this._isAnimated = !1;
    }
  };
  var getBlendMode = (Oa = {
      0: "source-over",
      1: "multiply",
      2: "screen",
      3: "overlay",
      4: "darken",
      5: "lighten",
      6: "color-dodge",
      7: "color-burn",
      8: "hard-light",
      9: "soft-light",
      10: "difference",
      11: "exclusion",
      12: "hue",
      13: "saturation",
      14: "color",
      15: "luminosity"
    }, function (t) {
      return Oa[t] || "";
    }),
    Oa,
    Matrix = function () {
      var s = Math.cos,
        a = Math.sin,
        n = Math.tan,
        i = Math.round;
      function t() {
        return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this;
      }
      function e(t) {
        if (0 === t) return this;
        var e = s(t),
          r = a(t);
        return this._t(e, -r, 0, 0, r, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      }
      function r(t) {
        if (0 === t) return this;
        var e = s(t),
          r = a(t);
        return this._t(1, 0, 0, 0, 0, e, -r, 0, 0, r, e, 0, 0, 0, 0, 1);
      }
      function o(t) {
        if (0 === t) return this;
        var e = s(t),
          r = a(t);
        return this._t(e, 0, r, 0, 0, 1, 0, 0, -r, 0, e, 0, 0, 0, 0, 1);
      }
      function h(t) {
        if (0 === t) return this;
        var e = s(t),
          r = a(t);
        return this._t(e, -r, 0, 0, r, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      }
      function l(t, e) {
        return this._t(1, e, t, 1, 0, 0);
      }
      function p(t, e) {
        return this.shear(n(t), n(e));
      }
      function m(t, e) {
        var r = s(e),
          i = a(e);
        return this._t(r, i, 0, 0, -i, r, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, n(t), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(r, -i, 0, 0, i, r, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      }
      function f(t, e, r) {
        return r || 0 === r || (r = 1), 1 === t && 1 === e && 1 === r ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1);
      }
      function c(t, e, r, i, s, a, n, o, h, l, p, m, f, c, d, u) {
        return this.props[0] = t, this.props[1] = e, this.props[2] = r, this.props[3] = i, this.props[4] = s, this.props[5] = a, this.props[6] = n, this.props[7] = o, this.props[8] = h, this.props[9] = l, this.props[10] = p, this.props[11] = m, this.props[12] = f, this.props[13] = c, this.props[14] = d, this.props[15] = u, this;
      }
      function d(t, e, r) {
        return r = r || 0, 0 !== t || 0 !== e || 0 !== r ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, r, 1) : this;
      }
      function u(t, e, r, i, s, a, n, o, h, l, p, m, f, c, d, u) {
        var y = this.props;
        if (1 === t && 0 === e && 0 === r && 0 === i && 0 === s && 1 === a && 0 === n && 0 === o && 0 === h && 0 === l && 1 === p && 0 === m) return y[12] = y[12] * t + y[15] * f, y[13] = y[13] * a + y[15] * c, y[14] = y[14] * p + y[15] * d, y[15] *= u, this._identityCalculated = !1, this;
        var g = y[0],
          v = y[1],
          b = y[2],
          P = y[3],
          x = y[4],
          E = y[5],
          S = y[6],
          A = y[7],
          C = y[8],
          _ = y[9],
          T = y[10],
          k = y[11],
          D = y[12],
          M = y[13],
          F = y[14],
          w = y[15];
        return y[0] = g * t + v * s + b * h + P * f, y[1] = g * e + v * a + b * l + P * c, y[2] = g * r + v * n + b * p + P * d, y[3] = g * i + v * o + b * m + P * u, y[4] = x * t + E * s + S * h + A * f, y[5] = x * e + E * a + S * l + A * c, y[6] = x * r + E * n + S * p + A * d, y[7] = x * i + E * o + S * m + A * u, y[8] = C * t + _ * s + T * h + k * f, y[9] = C * e + _ * a + T * l + k * c, y[10] = C * r + _ * n + T * p + k * d, y[11] = C * i + _ * o + T * m + k * u, y[12] = D * t + M * s + F * h + w * f, y[13] = D * e + M * a + F * l + w * c, y[14] = D * r + M * n + F * p + w * d, y[15] = D * i + M * o + F * m + w * u, this._identityCalculated = !1, this;
      }
      function y() {
        return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]), this._identityCalculated = !0), this._identity;
      }
      function g(t) {
        for (var e = 0; e < 16;) {
          if (t.props[e] !== this.props[e]) return !1;
          e += 1;
        }
        return !0;
      }
      function v(t) {
        var e;
        for (e = 0; e < 16; e += 1) t.props[e] = this.props[e];
        return t;
      }
      function b(t) {
        var e;
        for (e = 0; e < 16; e += 1) this.props[e] = t[e];
      }
      function P(t, e, r) {
        return {
          x: t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12],
          y: t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13],
          z: t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
        };
      }
      function x(t, e, r) {
        return t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12];
      }
      function E(t, e, r) {
        return t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13];
      }
      function S(t, e, r) {
        return t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14];
      }
      function A() {
        var t = this.props[0] * this.props[5] - this.props[1] * this.props[4],
          e = this.props[5] / t,
          r = -this.props[1] / t,
          i = -this.props[4] / t,
          s = this.props[0] / t,
          a = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / t,
          n = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / t,
          o = new Matrix();
        return o.props[0] = e, o.props[1] = r, o.props[4] = i, o.props[5] = s, o.props[12] = a, o.props[13] = n, o;
      }
      function C(t) {
        return this.getInverseMatrix().applyToPointArray(t[0], t[1], t[2] || 0);
      }
      function _(t) {
        var e,
          r = t.length,
          i = [];
        for (e = 0; e < r; e += 1) i[e] = C(t[e]);
        return i;
      }
      function T(t, e, r) {
        var i = createTypedArray("float32", 6);
        if (this.isIdentity()) i[0] = t[0], i[1] = t[1], i[2] = e[0], i[3] = e[1], i[4] = r[0], i[5] = r[1];else {
          var s = this.props[0],
            a = this.props[1],
            n = this.props[4],
            o = this.props[5],
            h = this.props[12],
            l = this.props[13];
          i[0] = t[0] * s + t[1] * n + h, i[1] = t[0] * a + t[1] * o + l, i[2] = e[0] * s + e[1] * n + h, i[3] = e[0] * a + e[1] * o + l, i[4] = r[0] * s + r[1] * n + h, i[5] = r[0] * a + r[1] * o + l;
        }
        return i;
      }
      function k(t, e, r) {
        return this.isIdentity() ? [t, e, r] : [t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]];
      }
      function D(t, e) {
        if (this.isIdentity()) return t + "," + e;
        var r = this.props;
        return Math.round(100 * (t * r[0] + e * r[4] + r[12])) / 100 + "," + Math.round(100 * (t * r[1] + e * r[5] + r[13])) / 100;
      }
      function M() {
        for (var t = 0, e = this.props, r = "matrix3d("; t < 16;) r += i(1e4 * e[t]) / 1e4, r += 15 === t ? ")" : ",", t += 1;
        return r;
      }
      function F(t) {
        return t < 1e-6 && 0 < t || -1e-6 < t && t < 0 ? i(1e4 * t) / 1e4 : t;
      }
      function w() {
        var t = this.props;
        return "matrix(" + F(t[0]) + "," + F(t[1]) + "," + F(t[4]) + "," + F(t[5]) + "," + F(t[12]) + "," + F(t[13]) + ")";
      }
      return function () {
        this.reset = t, this.rotate = e, this.rotateX = r, this.rotateY = o, this.rotateZ = h, this.skew = p, this.skewFromAxis = m, this.shear = l, this.scale = f, this.setTransform = c, this.translate = d, this.transform = u, this.applyToPoint = P, this.applyToX = x, this.applyToY = E, this.applyToZ = S, this.applyToPointArray = k, this.applyToTriplePoints = T, this.applyToPointStringified = D, this.toCSS = M, this.to2dCSS = w, this.clone = v, this.cloneFromProps = b, this.equals = g, this.inversePoints = _, this.inversePoint = C, this.getInverseMatrix = A, this._t = this.transform, this.isIdentity = y, this._identity = !0, this._identityCalculated = !1, this.props = createTypedArray("float32", 16), this.reset();
      };
    }();
  !function (o, h) {
    var l,
      p = this,
      m = 256,
      f = 6,
      c = "random",
      d = h.pow(m, f),
      u = h.pow(2, 52),
      y = 2 * u,
      g = m - 1;
    function v(t) {
      var e,
        r = t.length,
        n = this,
        i = 0,
        s = n.i = n.j = 0,
        a = n.S = [];
      for (r || (t = [r++]); i < m;) a[i] = i++;
      for (i = 0; i < m; i++) a[i] = a[s = g & s + t[i % r] + (e = a[i])], a[s] = e;
      n.g = function (t) {
        for (var e, r = 0, i = n.i, s = n.j, a = n.S; t--;) e = a[i = g & i + 1], r = r * m + a[g & (a[i] = a[s = g & s + e]) + (a[s] = e)];
        return n.i = i, n.j = s, r;
      };
    }
    function b(t, e) {
      return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e;
    }
    function P(t, e) {
      for (var r, i = t + "", s = 0; s < i.length;) e[g & s] = g & (r ^= 19 * e[g & s]) + i.charCodeAt(s++);
      return x(e);
    }
    function x(t) {
      return String.fromCharCode.apply(0, t);
    }
    h["seed" + c] = function (t, e, r) {
      var i = [],
        s = P(function t(e, r) {
          var i,
            s = [],
            a = _typeof(e);
          if (r && "object" == a) for (i in e) try {
            s.push(t(e[i], r - 1));
          } catch (t) {}
          return s.length ? s : "string" == a ? e : e + "\0";
        }((e = !0 === e ? {
          entropy: !0
        } : e || {}).entropy ? [t, x(o)] : null === t ? function () {
          try {
            if (l) return x(l.randomBytes(m));
            var t = new Uint8Array(m);
            return (p.crypto || p.msCrypto).getRandomValues(t), x(t);
          } catch (t) {
            var e = p.navigator,
              r = e && e.plugins;
            return [+new Date(), p, r, p.screen, x(o)];
          }
        }() : t, 3), i),
        a = new v(i),
        n = function n() {
          for (var t = a.g(f), e = d, r = 0; t < u;) t = (t + r) * m, e *= m, r = a.g(1);
          for (; y <= t;) t /= 2, e /= 2, r >>>= 1;
          return (t + r) / e;
        };
      return n.int32 = function () {
        return 0 | a.g(4);
      }, n.quick = function () {
        return a.g(4) / 4294967296;
      }, n["double"] = n, P(x(a.S), o), (e.pass || r || function (t, e, r, i) {
        return i && (i.S && b(i, a), t.state = function () {
          return b(a, {});
        }), r ? (h[c] = t, e) : t;
      })(n, s, "global" in e ? e.global : this == h, e.state);
    }, P(h.random(), o);
  }([], BMMath);
  var BezierFactory = function () {
    var t = {
        getBezierEasing: function getBezierEasing(t, e, r, i, s) {
          var a = s || ("bez_" + t + "_" + e + "_" + r + "_" + i).replace(/\./g, "p");
          if (o[a]) return o[a];
          var n = new h([t, e, r, i]);
          return o[a] = n;
        }
      },
      o = {};
    var l = 11,
      p = 1 / (l - 1),
      e = "function" == typeof Float32Array;
    function i(t, e) {
      return 1 - 3 * e + 3 * t;
    }
    function s(t, e) {
      return 3 * e - 6 * t;
    }
    function a(t) {
      return 3 * t;
    }
    function m(t, e, r) {
      return ((i(e, r) * t + s(e, r)) * t + a(e)) * t;
    }
    function f(t, e, r) {
      return 3 * i(e, r) * t * t + 2 * s(e, r) * t + a(e);
    }
    function h(t) {
      this._p = t, this._mSampleValues = e ? new Float32Array(l) : new Array(l), this._precomputed = !1, this.get = this.get.bind(this);
    }
    return h.prototype = {
      get: function get(t) {
        var e = this._p[0],
          r = this._p[1],
          i = this._p[2],
          s = this._p[3];
        return this._precomputed || this._precompute(), e === r && i === s ? t : 0 === t ? 0 : 1 === t ? 1 : m(this._getTForX(t), r, s);
      },
      _precompute: function _precompute() {
        var t = this._p[0],
          e = this._p[1],
          r = this._p[2],
          i = this._p[3];
        this._precomputed = !0, t === e && r === i || this._calcSampleValues();
      },
      _calcSampleValues: function _calcSampleValues() {
        for (var t = this._p[0], e = this._p[2], r = 0; r < l; ++r) this._mSampleValues[r] = m(r * p, t, e);
      },
      _getTForX: function _getTForX(t) {
        for (var e = this._p[0], r = this._p[2], i = this._mSampleValues, s = 0, a = 1, n = l - 1; a !== n && i[a] <= t; ++a) s += p;
        var o = s + (t - i[--a]) / (i[a + 1] - i[a]) * p,
          h = f(o, e, r);
        return .001 <= h ? function (t, e, r, i) {
          for (var s = 0; s < 4; ++s) {
            var a = f(e, r, i);
            if (0 === a) return e;
            e -= (m(e, r, i) - t) / a;
          }
          return e;
        }(t, o, e, r) : 0 === h ? o : function (t, e, r, i, s) {
          for (var a, n, o = 0; 0 < (a = m(n = e + (r - e) / 2, i, s) - t) ? r = n : e = n, 1e-7 < Math.abs(a) && ++o < 10;);
          return n;
        }(t, s, s + p, e, r);
      }
    }, t;
  }();
  function extendPrototype(t, e) {
    var r,
      i,
      s = t.length;
    for (r = 0; r < s; r += 1) for (var a in i = t[r].prototype) Object.prototype.hasOwnProperty.call(i, a) && (e.prototype[a] = i[a]);
  }
  function getDescriptor(t, e) {
    return Object.getOwnPropertyDescriptor(t, e);
  }
  function createProxyFunction(t) {
    function e() {}
    return e.prototype = t, e;
  }
  function bezFunction() {
    var D = Math;
    function y(t, e, r, i, s, a) {
      var n = t * i + e * s + r * a - s * i - a * t - r * e;
      return -.001 < n && n < .001;
    }
    var p = function p(t, e, r, i) {
      var s,
        a,
        n,
        o,
        h,
        l,
        p = defaultCurveSegments,
        m = 0,
        f = [],
        c = [],
        d = bezierLengthPool.newElement();
      for (n = r.length, s = 0; s < p; s += 1) {
        for (h = s / (p - 1), a = l = 0; a < n; a += 1) o = bmPow(1 - h, 3) * t[a] + 3 * bmPow(1 - h, 2) * h * r[a] + 3 * (1 - h) * bmPow(h, 2) * i[a] + bmPow(h, 3) * e[a], f[a] = o, null !== c[a] && (l += bmPow(f[a] - c[a], 2)), c[a] = f[a];
        l && (m += l = bmSqrt(l)), d.percents[s] = h, d.lengths[s] = m;
      }
      return d.addedLength = m, d;
    };
    function g(t) {
      this.segmentLength = 0, this.points = new Array(t);
    }
    function v(t, e) {
      this.partialLength = t, this.point = e;
    }
    var b,
      t = (b = {}, function (t, e, r, i) {
        var s = (t[0] + "_" + t[1] + "_" + e[0] + "_" + e[1] + "_" + r[0] + "_" + r[1] + "_" + i[0] + "_" + i[1]).replace(/\./g, "p");
        if (!b[s]) {
          var a,
            n,
            o,
            h,
            l,
            p,
            m,
            f = defaultCurveSegments,
            c = 0,
            d = null;
          2 === t.length && (t[0] !== e[0] || t[1] !== e[1]) && y(t[0], t[1], e[0], e[1], t[0] + r[0], t[1] + r[1]) && y(t[0], t[1], e[0], e[1], e[0] + i[0], e[1] + i[1]) && (f = 2);
          var u = new g(f);
          for (o = r.length, a = 0; a < f; a += 1) {
            for (m = createSizedArray(o), l = a / (f - 1), n = p = 0; n < o; n += 1) h = bmPow(1 - l, 3) * t[n] + 3 * bmPow(1 - l, 2) * l * (t[n] + r[n]) + 3 * (1 - l) * bmPow(l, 2) * (e[n] + i[n]) + bmPow(l, 3) * e[n], m[n] = h, null !== d && (p += bmPow(m[n] - d[n], 2));
            c += p = bmSqrt(p), u.points[a] = new v(p, m), d = m;
          }
          u.segmentLength = c, b[s] = u;
        }
        return b[s];
      });
    function M(t, e) {
      var r = e.percents,
        i = e.lengths,
        s = r.length,
        a = bmFloor((s - 1) * t),
        n = t * e.addedLength,
        o = 0;
      if (a === s - 1 || 0 === a || n === i[a]) return r[a];
      for (var h = i[a] > n ? -1 : 1, l = !0; l;) if (i[a] <= n && i[a + 1] > n ? (o = (n - i[a]) / (i[a + 1] - i[a]), l = !1) : a += h, a < 0 || s - 1 <= a) {
        if (a === s - 1) return r[a];
        l = !1;
      }
      return r[a] + (r[a + 1] - r[a]) * o;
    }
    var F = createTypedArray("float32", 8);
    return {
      getSegmentsLength: function getSegmentsLength(t) {
        var e,
          r = segmentsLengthPool.newElement(),
          i = t.c,
          s = t.v,
          a = t.o,
          n = t.i,
          o = t._length,
          h = r.lengths,
          l = 0;
        for (e = 0; e < o - 1; e += 1) h[e] = p(s[e], s[e + 1], a[e], n[e + 1]), l += h[e].addedLength;
        return i && o && (h[e] = p(s[e], s[0], a[e], n[0]), l += h[e].addedLength), r.totalLength = l, r;
      },
      getNewSegment: function getNewSegment(t, e, r, i, s, a, n) {
        s < 0 ? s = 0 : 1 < s && (s = 1);
        var o,
          h = M(s, n),
          l = M(a = 1 < a ? 1 : a, n),
          p = t.length,
          m = 1 - h,
          f = 1 - l,
          c = m * m * m,
          d = h * m * m * 3,
          u = h * h * m * 3,
          y = h * h * h,
          g = m * m * f,
          v = h * m * f + m * h * f + m * m * l,
          b = h * h * f + m * h * l + h * m * l,
          P = h * h * l,
          x = m * f * f,
          E = h * f * f + m * l * f + m * f * l,
          S = h * l * f + m * l * l + h * f * l,
          A = h * l * l,
          C = f * f * f,
          _ = l * f * f + f * l * f + f * f * l,
          T = l * l * f + f * l * l + l * f * l,
          k = l * l * l;
        for (o = 0; o < p; o += 1) F[4 * o] = D.round(1e3 * (c * t[o] + d * r[o] + u * i[o] + y * e[o])) / 1e3, F[4 * o + 1] = D.round(1e3 * (g * t[o] + v * r[o] + b * i[o] + P * e[o])) / 1e3, F[4 * o + 2] = D.round(1e3 * (x * t[o] + E * r[o] + S * i[o] + A * e[o])) / 1e3, F[4 * o + 3] = D.round(1e3 * (C * t[o] + _ * r[o] + T * i[o] + k * e[o])) / 1e3;
        return F;
      },
      getPointInSegment: function getPointInSegment(t, e, r, i, s, a) {
        var n = M(s, a),
          o = 1 - n;
        return [D.round(1e3 * (o * o * o * t[0] + (n * o * o + o * n * o + o * o * n) * r[0] + (n * n * o + o * n * n + n * o * n) * i[0] + n * n * n * e[0])) / 1e3, D.round(1e3 * (o * o * o * t[1] + (n * o * o + o * n * o + o * o * n) * r[1] + (n * n * o + o * n * n + n * o * n) * i[1] + n * n * n * e[1])) / 1e3];
      },
      buildBezierData: t,
      pointOnLine2D: y,
      pointOnLine3D: function pointOnLine3D(t, e, r, i, s, a, n, o, h) {
        if (0 === r && 0 === a && 0 === h) return y(t, e, i, s, n, o);
        var l,
          p = D.sqrt(D.pow(i - t, 2) + D.pow(s - e, 2) + D.pow(a - r, 2)),
          m = D.sqrt(D.pow(n - t, 2) + D.pow(o - e, 2) + D.pow(h - r, 2)),
          f = D.sqrt(D.pow(n - i, 2) + D.pow(o - s, 2) + D.pow(h - a, 2));
        return -1e-4 < (l = m < p ? f < p ? p - m - f : f - m - p : m < f ? f - m - p : m - p - f) && l < 1e-4;
      }
    };
  }
  !function () {
    for (var s = 0, t = ["ms", "moz", "webkit", "o"], e = 0; e < t.length && !window.requestAnimationFrame; ++e) window.requestAnimationFrame = window[t[e] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[e] + "CancelAnimationFrame"] || window[t[e] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
      var e = new Date().getTime(),
        r = Math.max(0, 16 - (e - s)),
        i = setTimeout(function () {
          t(e + r);
        }, r);
      return s = e + r, i;
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
      clearTimeout(t);
    });
  }();
  var bez = bezFunction();
  function dataFunctionManager() {
    function m(t, e, r) {
      var i,
        s,
        a,
        n,
        o,
        h,
        l = t.length;
      for (s = 0; s < l; s += 1) if ("ks" in (i = t[s]) && !i.completed) {
        if (i.completed = !0, i.tt && (t[s - 1].td = i.tt), i.hasMask) {
          var p = i.masksProperties;
          for (n = p.length, a = 0; a < n; a += 1) if (p[a].pt.k.i) d(p[a].pt.k);else for (h = p[a].pt.k.length, o = 0; o < h; o += 1) p[a].pt.k[o].s && d(p[a].pt.k[o].s[0]), p[a].pt.k[o].e && d(p[a].pt.k[o].e[0]);
        }
        0 === i.ty ? (i.layers = f(i.refId, e), m(i.layers, e, r)) : 4 === i.ty ? c(i.shapes) : 5 === i.ty && u(i);
      }
    }
    function f(t, e) {
      for (var r = 0, i = e.length; r < i;) {
        if (e[r].id === t) return e[r].layers.__used ? JSON.parse(JSON.stringify(e[r].layers)) : (e[r].layers.__used = !0, e[r].layers);
        r += 1;
      }
      return null;
    }
    function c(t) {
      var e, r, i;
      for (e = t.length - 1; 0 <= e; e -= 1) if ("sh" === t[e].ty) {
        if (t[e].ks.k.i) d(t[e].ks.k);else for (i = t[e].ks.k.length, r = 0; r < i; r += 1) t[e].ks.k[r].s && d(t[e].ks.k[r].s[0]), t[e].ks.k[r].e && d(t[e].ks.k[r].e[0]);
      } else "gr" === t[e].ty && c(t[e].it);
    }
    function d(t) {
      var e,
        r = t.i.length;
      for (e = 0; e < r; e += 1) t.i[e][0] += t.v[e][0], t.i[e][1] += t.v[e][1], t.o[e][0] += t.v[e][0], t.o[e][1] += t.v[e][1];
    }
    function o(t, e) {
      var r = e ? e.split(".") : [100, 100, 100];
      return t[0] > r[0] || !(r[0] > t[0]) && (t[1] > r[1] || !(r[1] > t[1]) && (t[2] > r[2] || !(r[2] > t[2]) && null));
    }
    var h,
      r = function () {
        var i = [4, 4, 14];
        function s(t) {
          var e,
            r,
            i,
            s = t.length;
          for (e = 0; e < s; e += 1) 5 === t[e].ty && (r = t[e], void 0, i = r.t.d, r.t.d = {
            k: [{
              s: i,
              t: 0
            }]
          });
        }
        return function (t) {
          if (o(i, t.v) && (s(t.layers), t.assets)) {
            var e,
              r = t.assets.length;
            for (e = 0; e < r; e += 1) t.assets[e].layers && s(t.assets[e].layers);
          }
        };
      }(),
      i = (h = [4, 7, 99], function (t) {
        if (t.chars && !o(h, t.v)) {
          var e,
            r,
            i,
            s,
            a,
            n = t.chars.length;
          for (e = 0; e < n; e += 1) if (t.chars[e].data && t.chars[e].data.shapes) for (i = (a = t.chars[e].data.shapes[0].it).length, r = 0; r < i; r += 1) (s = a[r].ks.k).__converted || (d(a[r].ks.k), s.__converted = !0);
        }
      }),
      s = function () {
        var i = [4, 1, 9];
        function a(t) {
          var e,
            r,
            i,
            s = t.length;
          for (e = 0; e < s; e += 1) if ("gr" === t[e].ty) a(t[e].it);else if ("fl" === t[e].ty || "st" === t[e].ty) if (t[e].c.k && t[e].c.k[0].i) for (i = t[e].c.k.length, r = 0; r < i; r += 1) t[e].c.k[r].s && (t[e].c.k[r].s[0] /= 255, t[e].c.k[r].s[1] /= 255, t[e].c.k[r].s[2] /= 255, t[e].c.k[r].s[3] /= 255), t[e].c.k[r].e && (t[e].c.k[r].e[0] /= 255, t[e].c.k[r].e[1] /= 255, t[e].c.k[r].e[2] /= 255, t[e].c.k[r].e[3] /= 255);else t[e].c.k[0] /= 255, t[e].c.k[1] /= 255, t[e].c.k[2] /= 255, t[e].c.k[3] /= 255;
        }
        function s(t) {
          var e,
            r = t.length;
          for (e = 0; e < r; e += 1) 4 === t[e].ty && a(t[e].shapes);
        }
        return function (t) {
          if (o(i, t.v) && (s(t.layers), t.assets)) {
            var e,
              r = t.assets.length;
            for (e = 0; e < r; e += 1) t.assets[e].layers && s(t.assets[e].layers);
          }
        };
      }(),
      a = function () {
        var i = [4, 4, 18];
        function l(t) {
          var e, r, i;
          for (e = t.length - 1; 0 <= e; e -= 1) if ("sh" === t[e].ty) {
            if (t[e].ks.k.i) t[e].ks.k.c = t[e].closed;else for (i = t[e].ks.k.length, r = 0; r < i; r += 1) t[e].ks.k[r].s && (t[e].ks.k[r].s[0].c = t[e].closed), t[e].ks.k[r].e && (t[e].ks.k[r].e[0].c = t[e].closed);
          } else "gr" === t[e].ty && l(t[e].it);
        }
        function s(t) {
          var e,
            r,
            i,
            s,
            a,
            n,
            o = t.length;
          for (r = 0; r < o; r += 1) {
            if ((e = t[r]).hasMask) {
              var h = e.masksProperties;
              for (s = h.length, i = 0; i < s; i += 1) if (h[i].pt.k.i) h[i].pt.k.c = h[i].cl;else for (n = h[i].pt.k.length, a = 0; a < n; a += 1) h[i].pt.k[a].s && (h[i].pt.k[a].s[0].c = h[i].cl), h[i].pt.k[a].e && (h[i].pt.k[a].e[0].c = h[i].cl);
            }
            4 === e.ty && l(e.shapes);
          }
        }
        return function (t) {
          if (o(i, t.v) && (s(t.layers), t.assets)) {
            var e,
              r = t.assets.length;
            for (e = 0; e < r; e += 1) t.assets[e].layers && s(t.assets[e].layers);
          }
        };
      }();
    function u(t) {
      0 !== t.t.a.length || "m" in t.t.p || (t.singleShape = !0);
    }
    var t = {
      completeData: function completeData(t, e) {
        t.__complete || (s(t), r(t), i(t), a(t), m(t.layers, t.assets, e), t.__complete = !0);
      }
    };
    return t.checkColors = s, t.checkChars = i, t.checkShapes = a, t.completeLayers = m, t;
  }
  var dataManager = dataFunctionManager();
  function getFontProperties(t) {
    for (var e = t.fStyle ? t.fStyle.split(" ") : [], r = "normal", i = "normal", s = e.length, a = 0; a < s; a += 1) switch (e[a].toLowerCase()) {
      case "italic":
        i = "italic";
        break;
      case "bold":
        r = "700";
        break;
      case "black":
        r = "900";
        break;
      case "medium":
        r = "500";
        break;
      case "regular":
      case "normal":
        r = "400";
        break;
      case "light":
      case "thin":
        r = "200";
    }
    return {
      style: i,
      weight: t.fWeight || r
    };
  }
  var FontManager = function () {
      var a = {
          w: 0,
          size: 0,
          shapes: []
        },
        t = [];
      function f(t, e) {
        var r = createTag("span");
        r.style.fontFamily = e;
        var i = createTag("span");
        i.innerText = "giItT1WQy@!-/#", r.style.position = "absolute", r.style.left = "-10000px", r.style.top = "-10000px", r.style.fontSize = "300px", r.style.fontVariant = "normal", r.style.fontStyle = "normal", r.style.fontWeight = "normal", r.style.letterSpacing = "0", r.appendChild(i), document.body.appendChild(r);
        var s = i.offsetWidth;
        return i.style.fontFamily = function (t) {
          var e,
            r = t.split(","),
            i = r.length,
            s = [];
          for (e = 0; e < i; e += 1) "sans-serif" !== r[e] && "monospace" !== r[e] && s.push(r[e]);
          return s.join(",");
        }(t) + ", " + e, {
          node: i,
          w: s,
          parent: r
        };
      }
      function c(t, e) {
        var r = createNS("text");
        r.style.fontSize = "100px";
        var i = getFontProperties(e);
        return r.setAttribute("font-family", e.fFamily), r.setAttribute("font-style", i.style), r.setAttribute("font-weight", i.weight), r.textContent = "1", e.fClass ? (r.style.fontFamily = "inherit", r.setAttribute("class", e.fClass)) : r.style.fontFamily = e.fFamily, t.appendChild(r), createTag("canvas").getContext("2d").font = e.fWeight + " " + e.fStyle + " 100px " + e.fFamily, r;
      }
      t = t.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
      var e = function e() {
        this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = !1, this._warned = !1, this.initTime = Date.now(), this.setIsLoadedBinded = this.setIsLoaded.bind(this), this.checkLoadedFontsBinded = this.checkLoadedFonts.bind(this);
      };
      return e.getCombinedCharacterCodes = function () {
        return t;
      }, e.prototype = {
        addChars: function addChars(t) {
          if (t) {
            var e;
            this.chars || (this.chars = []);
            var r,
              i,
              s = t.length,
              a = this.chars.length;
            for (e = 0; e < s; e += 1) {
              for (r = 0, i = !1; r < a;) this.chars[r].style === t[e].style && this.chars[r].fFamily === t[e].fFamily && this.chars[r].ch === t[e].ch && (i = !0), r += 1;
              i || (this.chars.push(t[e]), a += 1);
            }
          }
        },
        addFonts: function addFonts(t, e) {
          if (t) {
            if (this.chars) return this.isLoaded = !0, void (this.fonts = t.list);
            var r,
              i = t.list,
              s = i.length,
              a = s;
            for (r = 0; r < s; r += 1) {
              var n,
                o,
                h = !0;
              if (i[r].loaded = !1, i[r].monoCase = f(i[r].fFamily, "monospace"), i[r].sansCase = f(i[r].fFamily, "sans-serif"), i[r].fPath) {
                if ("p" === i[r].fOrigin || 3 === i[r].origin) {
                  if (0 < (n = document.querySelectorAll('style[f-forigin="p"][f-family="' + i[r].fFamily + '"], style[f-origin="3"][f-family="' + i[r].fFamily + '"]')).length && (h = !1), h) {
                    var l = createTag("style");
                    l.setAttribute("f-forigin", i[r].fOrigin), l.setAttribute("f-origin", i[r].origin), l.setAttribute("f-family", i[r].fFamily), l.type = "text/css", l.innerText = "@font-face {font-family: " + i[r].fFamily + "; font-style: normal; src: url('" + i[r].fPath + "');}", e.appendChild(l);
                  }
                } else if ("g" === i[r].fOrigin || 1 === i[r].origin) {
                  for (n = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), o = 0; o < n.length; o += 1) -1 !== n[o].href.indexOf(i[r].fPath) && (h = !1);
                  if (h) {
                    var p = createTag("link");
                    p.setAttribute("f-forigin", i[r].fOrigin), p.setAttribute("f-origin", i[r].origin), p.type = "text/css", p.rel = "stylesheet", p.href = i[r].fPath, document.body.appendChild(p);
                  }
                } else if ("t" === i[r].fOrigin || 2 === i[r].origin) {
                  for (n = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), o = 0; o < n.length; o += 1) i[r].fPath === n[o].src && (h = !1);
                  if (h) {
                    var m = createTag("link");
                    m.setAttribute("f-forigin", i[r].fOrigin), m.setAttribute("f-origin", i[r].origin), m.setAttribute("rel", "stylesheet"), m.setAttribute("href", i[r].fPath), e.appendChild(m);
                  }
                }
              } else i[r].loaded = !0, a -= 1;
              i[r].helper = c(e, i[r]), i[r].cache = {}, this.fonts.push(i[r]);
            }
            0 === a ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100);
          } else this.isLoaded = !0;
        },
        getCharData: function getCharData(t, e, r) {
          for (var i = 0, s = this.chars.length; i < s;) {
            if (this.chars[i].ch === t && this.chars[i].style === e && this.chars[i].fFamily === r) return this.chars[i];
            i += 1;
          }
          return ("string" == typeof t && 13 !== t.charCodeAt(0) || !t) && console && console.warn && !this._warned && (this._warned = !0, console.warn("Missing character from exported characters list: ", t, e, r)), a;
        },
        getFontByName: function getFontByName(t) {
          for (var e = 0, r = this.fonts.length; e < r;) {
            if (this.fonts[e].fName === t) return this.fonts[e];
            e += 1;
          }
          return this.fonts[0];
        },
        measureText: function measureText(t, e, r) {
          var i = this.getFontByName(e),
            s = t.charCodeAt(0);
          if (!i.cache[s + 1]) {
            var a = i.helper;
            if (" " === t) {
              a.textContent = "|" + t + "|";
              var n = a.getComputedTextLength();
              a.textContent = "||";
              var o = a.getComputedTextLength();
              i.cache[s + 1] = (n - o) / 100;
            } else a.textContent = t, i.cache[s + 1] = a.getComputedTextLength() / 100;
          }
          return i.cache[s + 1] * r;
        },
        checkLoadedFonts: function checkLoadedFonts() {
          var t,
            e,
            r,
            i = this.fonts.length,
            s = i;
          for (t = 0; t < i; t += 1) this.fonts[t].loaded ? s -= 1 : "n" === this.fonts[t].fOrigin || 0 === this.fonts[t].origin ? this.fonts[t].loaded = !0 : (e = this.fonts[t].monoCase.node, r = this.fonts[t].monoCase.w, e.offsetWidth !== r ? (s -= 1, this.fonts[t].loaded = !0) : (e = this.fonts[t].sansCase.node, r = this.fonts[t].sansCase.w, e.offsetWidth !== r && (s -= 1, this.fonts[t].loaded = !0)), this.fonts[t].loaded && (this.fonts[t].sansCase.parent.parentNode.removeChild(this.fonts[t].sansCase.parent), this.fonts[t].monoCase.parent.parentNode.removeChild(this.fonts[t].monoCase.parent)));
          0 !== s && Date.now() - this.initTime < 5e3 ? setTimeout(this.checkLoadedFontsBinded, 20) : setTimeout(this.setIsLoadedBinded, 10);
        },
        setIsLoaded: function setIsLoaded() {
          this.isLoaded = !0;
        }
      }, e;
    }(),
    PropertyFactory = function () {
      var m = initialDefaultFrame,
        s = Math.abs;
      function f(t, e) {
        var r,
          i = this.offsetTime;
        "multidimensional" === this.propType && (r = createTypedArray("float32", this.pv.length));
        for (var s, a, n, o, h, l, p, m, f = e.lastIndex, c = f, d = this.keyframes.length - 1, u = !0; u;) {
          if (s = this.keyframes[c], a = this.keyframes[c + 1], c === d - 1 && t >= a.t - i) {
            s.h && (s = a), f = 0;
            break;
          }
          if (a.t - i > t) {
            f = c;
            break;
          }
          c < d - 1 ? c += 1 : (f = 0, u = !1);
        }
        var y,
          g,
          v,
          b,
          P,
          x,
          E,
          S,
          A,
          C,
          _ = a.t - i,
          T = s.t - i;
        if (s.to) {
          s.bezierData || (s.bezierData = bez.buildBezierData(s.s, a.s || s.e, s.to, s.ti));
          var k = s.bezierData;
          if (_ <= t || t < T) {
            var D = _ <= t ? k.points.length - 1 : 0;
            for (o = k.points[D].point.length, n = 0; n < o; n += 1) r[n] = k.points[D].point[n];
          } else {
            s.__fnct ? m = s.__fnct : (m = BezierFactory.getBezierEasing(s.o.x, s.o.y, s.i.x, s.i.y, s.n).get, s.__fnct = m), h = m((t - T) / (_ - T));
            var M,
              F = k.segmentLength * h,
              w = e.lastFrame < t && e._lastKeyframeIndex === c ? e._lastAddedLength : 0;
            for (p = e.lastFrame < t && e._lastKeyframeIndex === c ? e._lastPoint : 0, u = !0, l = k.points.length; u;) {
              if (w += k.points[p].partialLength, 0 === F || 0 === h || p === k.points.length - 1) {
                for (o = k.points[p].point.length, n = 0; n < o; n += 1) r[n] = k.points[p].point[n];
                break;
              }
              if (w <= F && F < w + k.points[p + 1].partialLength) {
                for (M = (F - w) / k.points[p + 1].partialLength, o = k.points[p].point.length, n = 0; n < o; n += 1) r[n] = k.points[p].point[n] + (k.points[p + 1].point[n] - k.points[p].point[n]) * M;
                break;
              }
              p < l - 1 ? p += 1 : u = !1;
            }
            e._lastPoint = p, e._lastAddedLength = w - k.points[p].partialLength, e._lastKeyframeIndex = c;
          }
        } else {
          var I, V, B, R, L;
          if (d = s.s.length, y = a.s || s.e, this.sh && 1 !== s.h) {
            if (_ <= t) r[0] = y[0], r[1] = y[1], r[2] = y[2];else if (t <= T) r[0] = s.s[0], r[1] = s.s[1], r[2] = s.s[2];else {
              var G = N(s.s),
                z = N(y);
              g = r, v = function (t, e, r) {
                var i,
                  s,
                  a,
                  n,
                  o,
                  h = [],
                  l = t[0],
                  p = t[1],
                  m = t[2],
                  f = t[3],
                  c = e[0],
                  d = e[1],
                  u = e[2],
                  y = e[3];
                (s = l * c + p * d + m * u + f * y) < 0 && (s = -s, c = -c, d = -d, u = -u, y = -y);
                o = 1e-6 < 1 - s ? (i = Math.acos(s), a = Math.sin(i), n = Math.sin((1 - r) * i) / a, Math.sin(r * i) / a) : (n = 1 - r, r);
                return h[0] = n * l + o * c, h[1] = n * p + o * d, h[2] = n * m + o * u, h[3] = n * f + o * y, h;
              }(G, z, (t - T) / (_ - T)), b = v[0], P = v[1], x = v[2], E = v[3], S = Math.atan2(2 * P * E - 2 * b * x, 1 - 2 * P * P - 2 * x * x), A = Math.asin(2 * b * P + 2 * x * E), C = Math.atan2(2 * b * E - 2 * P * x, 1 - 2 * b * b - 2 * x * x), g[0] = S / degToRads, g[1] = A / degToRads, g[2] = C / degToRads;
            }
          } else for (c = 0; c < d; c += 1) 1 !== s.h && (h = _ <= t ? 1 : t < T ? 0 : (s.o.x.constructor === Array ? (s.__fnct || (s.__fnct = []), s.__fnct[c] ? m = s.__fnct[c] : (I = void 0 === s.o.x[c] ? s.o.x[0] : s.o.x[c], V = void 0 === s.o.y[c] ? s.o.y[0] : s.o.y[c], B = void 0 === s.i.x[c] ? s.i.x[0] : s.i.x[c], R = void 0 === s.i.y[c] ? s.i.y[0] : s.i.y[c], m = BezierFactory.getBezierEasing(I, V, B, R).get, s.__fnct[c] = m)) : s.__fnct ? m = s.__fnct : (I = s.o.x, V = s.o.y, B = s.i.x, R = s.i.y, m = BezierFactory.getBezierEasing(I, V, B, R).get, s.__fnct = m), m((t - T) / (_ - T)))), y = a.s || s.e, L = 1 === s.h ? s.s[c] : s.s[c] + (y[c] - s.s[c]) * h, "multidimensional" === this.propType ? r[c] = L : r = L;
        }
        return e.lastIndex = f, r;
      }
      function N(t) {
        var e = t[0] * degToRads,
          r = t[1] * degToRads,
          i = t[2] * degToRads,
          s = Math.cos(e / 2),
          a = Math.cos(r / 2),
          n = Math.cos(i / 2),
          o = Math.sin(e / 2),
          h = Math.sin(r / 2),
          l = Math.sin(i / 2);
        return [o * h * n + s * a * l, o * a * n + s * h * l, s * h * n - o * a * l, s * a * n - o * h * l];
      }
      function c() {
        var t = this.comp.renderedFrame - this.offsetTime,
          e = this.keyframes[0].t - this.offsetTime,
          r = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
        if (!(t === this._caching.lastFrame || this._caching.lastFrame !== m && (this._caching.lastFrame >= r && r <= t || this._caching.lastFrame < e && t < e))) {
          this._caching.lastFrame >= t && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
          var i = this.interpolateValue(t, this._caching);
          this.pv = i;
        }
        return this._caching.lastFrame = t, this.pv;
      }
      function d(t) {
        var e;
        if ("unidimensional" === this.propType) e = t * this.mult, 1e-5 < s(this.v - e) && (this.v = e, this._mdf = !0);else for (var r = 0, i = this.v.length; r < i;) e = t[r] * this.mult, 1e-5 < s(this.v[r] - e) && (this.v[r] = e, this._mdf = !0), r += 1;
      }
      function u() {
        if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) if (this.lock) this.setVValue(this.pv);else {
          var t;
          this.lock = !0, this._mdf = this._isFirstFrame;
          var e = this.effectsSequence.length,
            r = this.kf ? this.pv : this.data.k;
          for (t = 0; t < e; t += 1) r = this.effectsSequence[t](r);
          this.setVValue(r), this._isFirstFrame = !1, this.lock = !1, this.frameId = this.elem.globalData.frameId;
        }
      }
      function y(t) {
        this.effectsSequence.push(t), this.container.addDynamicProperty(this);
      }
      function n(t, e, r, i) {
        this.propType = "unidimensional", this.mult = r || 1, this.data = e, this.v = r ? e.k * r : e.k, this.pv = e.k, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = !0, this.getValue = u, this.setVValue = d, this.addEffect = y;
      }
      function o(t, e, r, i) {
        var s;
        this.propType = "multidimensional", this.mult = r || 1, this.data = e, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1;
        var a = e.k.length;
        for (this.v = createTypedArray("float32", a), this.pv = createTypedArray("float32", a), this.vel = createTypedArray("float32", a), s = 0; s < a; s += 1) this.v[s] = e.k[s] * this.mult, this.pv[s] = e.k[s];
        this._isFirstFrame = !0, this.effectsSequence = [], this.getValue = u, this.setVValue = d, this.addEffect = y;
      }
      function h(t, e, r, i) {
        this.propType = "unidimensional", this.keyframes = e.k, this.offsetTime = t.data.st, this.frameId = -1, this._caching = {
          lastFrame: m,
          lastIndex: 0,
          value: 0,
          _lastKeyframeIndex: -1
        }, this.k = !0, this.kf = !0, this.data = e, this.mult = r || 1, this.elem = t, this.container = i, this.comp = t.comp, this.v = m, this.pv = m, this._isFirstFrame = !0, this.getValue = u, this.setVValue = d, this.interpolateValue = f, this.effectsSequence = [c.bind(this)], this.addEffect = y;
      }
      function l(t, e, r, i) {
        var s;
        this.propType = "multidimensional";
        var a,
          n,
          o,
          h,
          l = e.k.length;
        for (s = 0; s < l - 1; s += 1) e.k[s].to && e.k[s].s && e.k[s + 1] && e.k[s + 1].s && (a = e.k[s].s, n = e.k[s + 1].s, o = e.k[s].to, h = e.k[s].ti, (2 === a.length && (a[0] !== n[0] || a[1] !== n[1]) && bez.pointOnLine2D(a[0], a[1], n[0], n[1], a[0] + o[0], a[1] + o[1]) && bez.pointOnLine2D(a[0], a[1], n[0], n[1], n[0] + h[0], n[1] + h[1]) || 3 === a.length && (a[0] !== n[0] || a[1] !== n[1] || a[2] !== n[2]) && bez.pointOnLine3D(a[0], a[1], a[2], n[0], n[1], n[2], a[0] + o[0], a[1] + o[1], a[2] + o[2]) && bez.pointOnLine3D(a[0], a[1], a[2], n[0], n[1], n[2], n[0] + h[0], n[1] + h[1], n[2] + h[2])) && (e.k[s].to = null, e.k[s].ti = null), a[0] === n[0] && a[1] === n[1] && 0 === o[0] && 0 === o[1] && 0 === h[0] && 0 === h[1] && (2 === a.length || a[2] === n[2] && 0 === o[2] && 0 === h[2]) && (e.k[s].to = null, e.k[s].ti = null));
        this.effectsSequence = [c.bind(this)], this.data = e, this.keyframes = e.k, this.offsetTime = t.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = r || 1, this.elem = t, this.container = i, this.comp = t.comp, this.getValue = u, this.setVValue = d, this.interpolateValue = f, this.frameId = -1;
        var p = e.k[0].s.length;
        for (this.v = createTypedArray("float32", p), this.pv = createTypedArray("float32", p), s = 0; s < p; s += 1) this.v[s] = m, this.pv[s] = m;
        this._caching = {
          lastFrame: m,
          lastIndex: 0,
          value: createTypedArray("float32", p)
        }, this.addEffect = y;
      }
      return {
        getProp: function getProp(t, e, r, i, s) {
          var a;
          if (e.k.length) {
            if ("number" == typeof e.k[0]) a = new o(t, e, i, s);else switch (r) {
              case 0:
                a = new h(t, e, i, s);
                break;
              case 1:
                a = new l(t, e, i, s);
            }
          } else a = new n(t, e, i, s);
          return a.effectsSequence.length && s.addDynamicProperty(a), a;
        }
      };
    }(),
    TransformPropertyFactory = function () {
      var n = [0, 0];
      function i(t, e, r) {
        if (this.elem = t, this.frameId = -1, this.propType = "transform", this.data = e, this.v = new Matrix(), this.pre = new Matrix(), this.appliedTransformations = 0, this.initDynamicPropertyContainer(r || t), e.p && e.p.s ? (this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this), this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this), e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(t, e.p || {
          k: [0, 0, 0]
        }, 1, 0, this), e.rx) {
          if (this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this), this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this), this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this), e.or.k[0].ti) {
            var i,
              s = e.or.k.length;
            for (i = 0; i < s; i += 1) e.or.k[i].to = null, e.or.k[i].ti = null;
          }
          this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this), this.or.sh = !0;
        } else this.r = PropertyFactory.getProp(t, e.r || {
          k: 0
        }, 0, degToRads, this);
        e.sk && (this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this), this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this)), this.a = PropertyFactory.getProp(t, e.a || {
          k: [0, 0, 0]
        }, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s || {
          k: [100, 100, 100]
        }, 1, .01, this), e.o ? this.o = PropertyFactory.getProp(t, e.o, 0, .01, t) : this.o = {
          _mdf: !1,
          v: 1
        }, this._isDirty = !0, this.dynamicProperties.length || this.getValue(!0);
      }
      return i.prototype = {
        applyToMatrix: function applyToMatrix(t) {
          var e = this._mdf;
          this.iterateDynamicProperties(), this._mdf = this._mdf || e, this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && t.skewFromAxis(-this.sk.v, this.sa.v), this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
        },
        getValue: function getValue(t) {
          if (this.elem.globalData.frameId !== this.frameId) {
            if (this._isDirty && (this.precalculateMatrix(), this._isDirty = !1), this.iterateDynamicProperties(), this._mdf || t) {
              var e;
              if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
                var r, i;
                if (e = this.elem.globalData.frameRate, this.p && this.p.keyframes && this.p.getValueAtTime) i = this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (r = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / e, 0), this.p.getValueAtTime(this.p.keyframes[0].t / e, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (r = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / e, 0), this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .05) / e, 0)) : (r = this.p.pv, this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / e, this.p.offsetTime));else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                  r = [], i = [];
                  var s = this.px,
                    a = this.py;
                  s._caching.lastFrame + s.offsetTime <= s.keyframes[0].t ? (r[0] = s.getValueAtTime((s.keyframes[0].t + .01) / e, 0), r[1] = a.getValueAtTime((a.keyframes[0].t + .01) / e, 0), i[0] = s.getValueAtTime(s.keyframes[0].t / e, 0), i[1] = a.getValueAtTime(a.keyframes[0].t / e, 0)) : s._caching.lastFrame + s.offsetTime >= s.keyframes[s.keyframes.length - 1].t ? (r[0] = s.getValueAtTime(s.keyframes[s.keyframes.length - 1].t / e, 0), r[1] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / e, 0), i[0] = s.getValueAtTime((s.keyframes[s.keyframes.length - 1].t - .01) / e, 0), i[1] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - .01) / e, 0)) : (r = [s.pv, a.pv], i[0] = s.getValueAtTime((s._caching.lastFrame + s.offsetTime - .01) / e, s.offsetTime), i[1] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - .01) / e, a.offsetTime));
                } else r = i = n;
                this.v.rotate(-Math.atan2(r[1] - i[1], r[0] - i[0]));
              }
              this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
            }
            this.frameId = this.elem.globalData.frameId;
          }
        },
        precalculateMatrix: function precalculateMatrix() {
          if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1, !this.s.effectsSequence.length)) {
            if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2, this.sk) {
              if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return;
              this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3;
            }
            this.r ? this.r.effectsSequence.length || (this.pre.rotate(-this.r.v), this.appliedTransformations = 4) : this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4);
          }
        },
        autoOrient: function autoOrient() {}
      }, extendPrototype([DynamicPropertyContainer], i), i.prototype.addDynamicProperty = function (t) {
        this._addDynamicProperty(t), this.elem.addDynamicProperty(t), this._isDirty = !0;
      }, i.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty, {
        getTransformProperty: function getTransformProperty(t, e, r) {
          return new i(t, e, r);
        }
      };
    }();
  function ShapePath() {
    this.c = !1, this._length = 0, this._maxLength = 8, this.v = createSizedArray(this._maxLength), this.o = createSizedArray(this._maxLength), this.i = createSizedArray(this._maxLength);
  }
  ShapePath.prototype.setPathData = function (t, e) {
    this.c = t, this.setLength(e);
    for (var r = 0; r < e;) this.v[r] = pointPool.newElement(), this.o[r] = pointPool.newElement(), this.i[r] = pointPool.newElement(), r += 1;
  }, ShapePath.prototype.setLength = function (t) {
    for (; this._maxLength < t;) this.doubleArrayLength();
    this._length = t;
  }, ShapePath.prototype.doubleArrayLength = function () {
    this.v = this.v.concat(createSizedArray(this._maxLength)), this.i = this.i.concat(createSizedArray(this._maxLength)), this.o = this.o.concat(createSizedArray(this._maxLength)), this._maxLength *= 2;
  }, ShapePath.prototype.setXYAt = function (t, e, r, i, s) {
    var a;
    switch (this._length = Math.max(this._length, i + 1), this._length >= this._maxLength && this.doubleArrayLength(), r) {
      case "v":
        a = this.v;
        break;
      case "i":
        a = this.i;
        break;
      case "o":
        a = this.o;
        break;
      default:
        a = [];
    }
    (!a[i] || a[i] && !s) && (a[i] = pointPool.newElement()), a[i][0] = t, a[i][1] = e;
  }, ShapePath.prototype.setTripleAt = function (t, e, r, i, s, a, n, o) {
    this.setXYAt(t, e, "v", n, o), this.setXYAt(r, i, "o", n, o), this.setXYAt(s, a, "i", n, o);
  }, ShapePath.prototype.reverse = function () {
    var t = new ShapePath();
    t.setPathData(this.c, this._length);
    var e = this.v,
      r = this.o,
      i = this.i,
      s = 0;
    this.c && (t.setTripleAt(e[0][0], e[0][1], i[0][0], i[0][1], r[0][0], r[0][1], 0, !1), s = 1);
    var a,
      n = this._length - 1,
      o = this._length;
    for (a = s; a < o; a += 1) t.setTripleAt(e[n][0], e[n][1], i[n][0], i[n][1], r[n][0], r[n][1], a, !1), n -= 1;
    return t;
  };
  var ShapePropertyFactory = function () {
      var s = -999999;
      function t(t, e, r) {
        var i,
          s,
          a,
          n,
          o,
          h,
          l,
          p,
          m,
          f = r.lastIndex,
          c = this.keyframes;
        if (t < c[0].t - this.offsetTime) i = c[0].s[0], a = !0, f = 0;else if (t >= c[c.length - 1].t - this.offsetTime) i = c[c.length - 1].s ? c[c.length - 1].s[0] : c[c.length - 2].e[0], a = !0;else {
          for (var d, u, y = f, g = c.length - 1, v = !0; v && (d = c[y], !((u = c[y + 1]).t - this.offsetTime > t));) y < g - 1 ? y += 1 : v = !1;
          if (f = y, !(a = 1 === d.h)) {
            if (t >= u.t - this.offsetTime) p = 1;else if (t < d.t - this.offsetTime) p = 0;else {
              var b;
              d.__fnct ? b = d.__fnct : (b = BezierFactory.getBezierEasing(d.o.x, d.o.y, d.i.x, d.i.y).get, d.__fnct = b), p = b((t - (d.t - this.offsetTime)) / (u.t - this.offsetTime - (d.t - this.offsetTime)));
            }
            s = u.s ? u.s[0] : d.e[0];
          }
          i = d.s[0];
        }
        for (h = e._length, l = i.i[0].length, r.lastIndex = f, n = 0; n < h; n += 1) for (o = 0; o < l; o += 1) m = a ? i.i[n][o] : i.i[n][o] + (s.i[n][o] - i.i[n][o]) * p, e.i[n][o] = m, m = a ? i.o[n][o] : i.o[n][o] + (s.o[n][o] - i.o[n][o]) * p, e.o[n][o] = m, m = a ? i.v[n][o] : i.v[n][o] + (s.v[n][o] - i.v[n][o]) * p, e.v[n][o] = m;
      }
      function a() {
        this.paths = this.localShapeCollection;
      }
      function e(t) {
        (function (t, e) {
          if (t._length !== e._length || t.c !== e.c) return !1;
          var r,
            i = t._length;
          for (r = 0; r < i; r += 1) if (t.v[r][0] !== e.v[r][0] || t.v[r][1] !== e.v[r][1] || t.o[r][0] !== e.o[r][0] || t.o[r][1] !== e.o[r][1] || t.i[r][0] !== e.i[r][0] || t.i[r][1] !== e.i[r][1]) return !1;
          return !0;
        })(this.v, t) || (this.v = shapePool.clone(t), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = !0, this.paths = this.localShapeCollection);
      }
      function r() {
        if (this.elem.globalData.frameId !== this.frameId) if (this.effectsSequence.length) {
          if (this.lock) this.setVValue(this.pv);else {
            var t, e;
            this.lock = !0, this._mdf = !1, t = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k;
            var r = this.effectsSequence.length;
            for (e = 0; e < r; e += 1) t = this.effectsSequence[e](t);
            this.setVValue(t), this.lock = !1, this.frameId = this.elem.globalData.frameId;
          }
        } else this._mdf = !1;
      }
      function n(t, e, r) {
        this.propType = "shape", this.comp = t.comp, this.container = t, this.elem = t, this.data = e, this.k = !1, this.kf = !1, this._mdf = !1;
        var i = 3 === r ? e.pt.k : e.ks.k;
        this.v = shapePool.clone(i), this.pv = shapePool.clone(this.v), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = a, this.effectsSequence = [];
      }
      function i(t) {
        this.effectsSequence.push(t), this.container.addDynamicProperty(this);
      }
      function o(t, e, r) {
        this.propType = "shape", this.comp = t.comp, this.elem = t, this.container = t, this.offsetTime = t.data.st, this.keyframes = 3 === r ? e.pt.k : e.ks.k, this.k = !0, this.kf = !0;
        var i = this.keyframes[0].s[0].i.length;
        this.v = shapePool.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, i), this.pv = shapePool.clone(this.v), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = s, this.reset = a, this._caching = {
          lastFrame: s,
          lastIndex: 0
        }, this.effectsSequence = [function () {
          var t = this.comp.renderedFrame - this.offsetTime,
            e = this.keyframes[0].t - this.offsetTime,
            r = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
            i = this._caching.lastFrame;
          return i !== s && (i < e && t < e || r < i && r < t) || (this._caching.lastIndex = i < t ? this._caching.lastIndex : 0, this.interpolateShape(t, this.pv, this._caching)), this._caching.lastFrame = t, this.pv;
        }.bind(this)];
      }
      n.prototype.interpolateShape = t, n.prototype.getValue = r, n.prototype.setVValue = e, n.prototype.addEffect = i, o.prototype.getValue = r, o.prototype.interpolateShape = t, o.prototype.setVValue = e, o.prototype.addEffect = i;
      var h = function () {
          var n = roundCorner;
          function t(t, e) {
            this.v = shapePool.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = e.d, this.elem = t, this.comp = t.comp, this.frameId = -1, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertEllToPath());
          }
          return t.prototype = {
            reset: a,
            getValue: function getValue() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath());
            },
            convertEllToPath: function convertEllToPath() {
              var t = this.p.v[0],
                e = this.p.v[1],
                r = this.s.v[0] / 2,
                i = this.s.v[1] / 2,
                s = 3 !== this.d,
                a = this.v;
              a.v[0][0] = t, a.v[0][1] = e - i, a.v[1][0] = s ? t + r : t - r, a.v[1][1] = e, a.v[2][0] = t, a.v[2][1] = e + i, a.v[3][0] = s ? t - r : t + r, a.v[3][1] = e, a.i[0][0] = s ? t - r * n : t + r * n, a.i[0][1] = e - i, a.i[1][0] = s ? t + r : t - r, a.i[1][1] = e - i * n, a.i[2][0] = s ? t + r * n : t - r * n, a.i[2][1] = e + i, a.i[3][0] = s ? t - r : t + r, a.i[3][1] = e + i * n, a.o[0][0] = s ? t + r * n : t - r * n, a.o[0][1] = e - i, a.o[1][0] = s ? t + r : t - r, a.o[1][1] = e + i * n, a.o[2][0] = s ? t - r * n : t + r * n, a.o[2][1] = e + i, a.o[3][0] = s ? t - r : t + r, a.o[3][1] = e - i * n;
            }
          }, extendPrototype([DynamicPropertyContainer], t), t;
        }(),
        l = function () {
          function t(t, e) {
            this.v = shapePool.newElement(), this.v.setPathData(!0, 0), this.elem = t, this.comp = t.comp, this.data = e, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), 1 === e.sy ? (this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this), this.is = PropertyFactory.getProp(t, e.is, 0, .01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this), this.or = PropertyFactory.getProp(t, e.or, 0, 0, this), this.os = PropertyFactory.getProp(t, e.os, 0, .01, this), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertToPath());
          }
          return t.prototype = {
            reset: a,
            getValue: function getValue() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath());
            },
            convertStarToPath: function convertStarToPath() {
              var t,
                e,
                r,
                i,
                s = 2 * Math.floor(this.pt.v),
                a = 2 * Math.PI / s,
                n = !0,
                o = this.or.v,
                h = this.ir.v,
                l = this.os.v,
                p = this.is.v,
                m = 2 * Math.PI * o / (2 * s),
                f = 2 * Math.PI * h / (2 * s),
                c = -Math.PI / 2;
              c += this.r.v;
              var d = 3 === this.data.d ? -1 : 1;
              for (t = this.v._length = 0; t < s; t += 1) {
                r = n ? l : p, i = n ? m : f;
                var u = (e = n ? o : h) * Math.cos(c),
                  y = e * Math.sin(c),
                  g = 0 === u && 0 === y ? 0 : y / Math.sqrt(u * u + y * y),
                  v = 0 === u && 0 === y ? 0 : -u / Math.sqrt(u * u + y * y);
                u += +this.p.v[0], y += +this.p.v[1], this.v.setTripleAt(u, y, u - g * i * r * d, y - v * i * r * d, u + g * i * r * d, y + v * i * r * d, t, !0), n = !n, c += a * d;
              }
            },
            convertPolygonToPath: function convertPolygonToPath() {
              var t,
                e = Math.floor(this.pt.v),
                r = 2 * Math.PI / e,
                i = this.or.v,
                s = this.os.v,
                a = 2 * Math.PI * i / (4 * e),
                n = .5 * -Math.PI,
                o = 3 === this.data.d ? -1 : 1;
              for (n += this.r.v, t = this.v._length = 0; t < e; t += 1) {
                var h = i * Math.cos(n),
                  l = i * Math.sin(n),
                  p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l),
                  m = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
                h += +this.p.v[0], l += +this.p.v[1], this.v.setTripleAt(h, l, h - p * a * s * o, l - m * a * s * o, h + p * a * s * o, l + m * a * s * o, t, !0), n += r * o;
              }
              this.paths.length = 0, this.paths[0] = this.v;
            }
          }, extendPrototype([DynamicPropertyContainer], t), t;
        }(),
        p = function () {
          function t(t, e) {
            this.v = shapePool.newElement(), this.v.c = !0, this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = t, this.comp = t.comp, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertRectToPath());
          }
          return t.prototype = {
            convertRectToPath: function convertRectToPath() {
              var t = this.p.v[0],
                e = this.p.v[1],
                r = this.s.v[0] / 2,
                i = this.s.v[1] / 2,
                s = bmMin(r, i, this.r.v),
                a = s * (1 - roundCorner);
              this.v._length = 0, 2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + r, e - i + s, t + r, e - i + s, t + r, e - i + a, 0, !0), this.v.setTripleAt(t + r, e + i - s, t + r, e + i - a, t + r, e + i - s, 1, !0), 0 !== s ? (this.v.setTripleAt(t + r - s, e + i, t + r - s, e + i, t + r - a, e + i, 2, !0), this.v.setTripleAt(t - r + s, e + i, t - r + a, e + i, t - r + s, e + i, 3, !0), this.v.setTripleAt(t - r, e + i - s, t - r, e + i - s, t - r, e + i - a, 4, !0), this.v.setTripleAt(t - r, e - i + s, t - r, e - i + a, t - r, e - i + s, 5, !0), this.v.setTripleAt(t - r + s, e - i, t - r + s, e - i, t - r + a, e - i, 6, !0), this.v.setTripleAt(t + r - s, e - i, t + r - a, e - i, t + r - s, e - i, 7, !0)) : (this.v.setTripleAt(t - r, e + i, t - r + a, e + i, t - r, e + i, 2), this.v.setTripleAt(t - r, e - i, t - r, e - i + a, t - r, e - i, 3))) : (this.v.setTripleAt(t + r, e - i + s, t + r, e - i + a, t + r, e - i + s, 0, !0), 0 !== s ? (this.v.setTripleAt(t + r - s, e - i, t + r - s, e - i, t + r - a, e - i, 1, !0), this.v.setTripleAt(t - r + s, e - i, t - r + a, e - i, t - r + s, e - i, 2, !0), this.v.setTripleAt(t - r, e - i + s, t - r, e - i + s, t - r, e - i + a, 3, !0), this.v.setTripleAt(t - r, e + i - s, t - r, e + i - a, t - r, e + i - s, 4, !0), this.v.setTripleAt(t - r + s, e + i, t - r + s, e + i, t - r + a, e + i, 5, !0), this.v.setTripleAt(t + r - s, e + i, t + r - a, e + i, t + r - s, e + i, 6, !0), this.v.setTripleAt(t + r, e + i - s, t + r, e + i - s, t + r, e + i - a, 7, !0)) : (this.v.setTripleAt(t - r, e - i, t - r + a, e - i, t - r, e - i, 1, !0), this.v.setTripleAt(t - r, e + i, t - r, e + i - a, t - r, e + i, 2, !0), this.v.setTripleAt(t + r, e + i, t + r - a, e + i, t + r, e + i, 3, !0)));
            },
            getValue: function getValue() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath());
            },
            reset: a
          }, extendPrototype([DynamicPropertyContainer], t), t;
        }();
      var m = {
        getShapeProp: function getShapeProp(t, e, r) {
          var i;
          return 3 === r || 4 === r ? i = (3 === r ? e.pt : e.ks).k.length ? new o(t, e, r) : new n(t, e, r) : 5 === r ? i = new p(t, e) : 6 === r ? i = new h(t, e) : 7 === r && (i = new l(t, e)), i.k && t.addDynamicProperty(i), i;
        },
        getConstructorFunction: function getConstructorFunction() {
          return n;
        },
        getKeyframedConstructorFunction: function getKeyframedConstructorFunction() {
          return o;
        }
      };
      return m;
    }(),
    ShapeModifiers = (Yr = {}, Zr = {}, Yr.registerModifier = function (t, e) {
      Zr[t] || (Zr[t] = e);
    }, Yr.getModifier = function (t, e, r) {
      return new Zr[t](e, r);
    }, Yr),
    Yr,
    Zr;
  function ShapeModifier() {}
  function TrimModifier() {}
  function RoundCornersModifier() {}
  function PuckerAndBloatModifier() {}
  function RepeaterModifier() {}
  function ShapeCollection() {
    this._length = 0, this._maxLength = 4, this.shapes = createSizedArray(this._maxLength);
  }
  function DashProperty(t, e, r, i) {
    var s;
    this.elem = t, this.frameId = -1, this.dataProps = createSizedArray(e.length), this.renderer = r, this.k = !1, this.dashStr = "", this.dashArray = createTypedArray("float32", e.length ? e.length - 1 : 0), this.dashoffset = createTypedArray("float32", 1), this.initDynamicPropertyContainer(i);
    var a,
      n = e.length || 0;
    for (s = 0; s < n; s += 1) a = PropertyFactory.getProp(t, e[s].v, 0, 0, this), this.k = a.k || this.k, this.dataProps[s] = {
      n: e[s].n,
      p: a
    };
    this.k || this.getValue(!0), this._isAnimated = this.k;
  }
  function GradientProperty(t, e, r) {
    this.data = e, this.c = createTypedArray("uint8c", 4 * e.p);
    var i = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
    this.o = createTypedArray("float32", i), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = i, this.initDynamicPropertyContainer(r), this.prop = PropertyFactory.getProp(t, e.k, 1, null, this), this.k = this.prop.k, this.getValue(!0);
  }
  ShapeModifier.prototype.initModifierProperties = function () {}, ShapeModifier.prototype.addShapeToModifier = function () {}, ShapeModifier.prototype.addShape = function (t) {
    if (!this.closed) {
      t.sh.container.addDynamicProperty(t.sh);
      var e = {
        shape: t.sh,
        data: t,
        localShapeCollection: shapeCollectionPool.newShapeCollection()
      };
      this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated();
    }
  }, ShapeModifier.prototype.init = function (t, e) {
    this.shapes = [], this.elem = t, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e), this.frameId = initialDefaultFrame, this.closed = !1, this.k = !1, this.dynamicProperties.length ? this.k = !0 : this.getValue(!0);
  }, ShapeModifier.prototype.processKeys = function () {
    this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties());
  }, extendPrototype([DynamicPropertyContainer], ShapeModifier), extendPrototype([ShapeModifier], TrimModifier), TrimModifier.prototype.initModifierProperties = function (t, e) {
    this.s = PropertyFactory.getProp(t, e.s, 0, .01, this), this.e = PropertyFactory.getProp(t, e.e, 0, .01, this), this.o = PropertyFactory.getProp(t, e.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length;
  }, TrimModifier.prototype.addShapeToModifier = function (t) {
    t.pathsData = [];
  }, TrimModifier.prototype.calculateShapeEdges = function (t, e, r, i, s) {
    var a = [];
    e <= 1 ? a.push({
      s: t,
      e: e
    }) : 1 <= t ? a.push({
      s: t - 1,
      e: e - 1
    }) : (a.push({
      s: t,
      e: 1
    }), a.push({
      s: 0,
      e: e - 1
    }));
    var n,
      o,
      h = [],
      l = a.length;
    for (n = 0; n < l; n += 1) {
      var p, m;
      if (!((o = a[n]).e * s < i || o.s * s > i + r)) p = o.s * s <= i ? 0 : (o.s * s - i) / r, m = o.e * s >= i + r ? 1 : (o.e * s - i) / r, h.push([p, m]);
    }
    return h.length || h.push([0, 0]), h;
  }, TrimModifier.prototype.releasePathsData = function (t) {
    var e,
      r = t.length;
    for (e = 0; e < r; e += 1) segmentsLengthPool.release(t[e]);
    return t.length = 0, t;
  }, TrimModifier.prototype.processShapes = function (t) {
    var e, r, i, s;
    if (this._mdf || t) {
      var a = this.o.v % 360 / 360;
      if (a < 0 && (a += 1), e = 1 < this.s.v ? 1 + a : this.s.v < 0 ? 0 + a : this.s.v + a, (r = 1 < this.e.v ? 1 + a : this.e.v < 0 ? 0 + a : this.e.v + a) < e) {
        var n = e;
        e = r, r = n;
      }
      e = 1e-4 * Math.round(1e4 * e), r = 1e-4 * Math.round(1e4 * r), this.sValue = e, this.eValue = r;
    } else e = this.sValue, r = this.eValue;
    var o,
      h,
      l,
      p,
      m,
      f = this.shapes.length,
      c = 0;
    if (r === e) for (s = 0; s < f; s += 1) this.shapes[s].localShapeCollection.releaseShapes(), this.shapes[s].shape._mdf = !0, this.shapes[s].shape.paths = this.shapes[s].localShapeCollection, this._mdf && (this.shapes[s].pathsData.length = 0);else if (1 === r && 0 === e || 0 === r && 1 === e) {
      if (this._mdf) for (s = 0; s < f; s += 1) this.shapes[s].pathsData.length = 0, this.shapes[s].shape._mdf = !0;
    } else {
      var d,
        u,
        y = [];
      for (s = 0; s < f; s += 1) if ((d = this.shapes[s]).shape._mdf || this._mdf || t || 2 === this.m) {
        if (h = (i = d.shape.paths)._length, m = 0, !d.shape._mdf && d.pathsData.length) m = d.totalShapeLength;else {
          for (l = this.releasePathsData(d.pathsData), o = 0; o < h; o += 1) p = bez.getSegmentsLength(i.shapes[o]), l.push(p), m += p.totalLength;
          d.totalShapeLength = m, d.pathsData = l;
        }
        c += m, d.shape._mdf = !0;
      } else d.shape.paths = d.localShapeCollection;
      var g,
        v = e,
        b = r,
        P = 0;
      for (s = f - 1; 0 <= s; s -= 1) if ((d = this.shapes[s]).shape._mdf) {
        for ((u = d.localShapeCollection).releaseShapes(), 2 === this.m && 1 < f ? (g = this.calculateShapeEdges(e, r, d.totalShapeLength, P, c), P += d.totalShapeLength) : g = [[v, b]], h = g.length, o = 0; o < h; o += 1) {
          v = g[o][0], b = g[o][1], y.length = 0, b <= 1 ? y.push({
            s: d.totalShapeLength * v,
            e: d.totalShapeLength * b
          }) : 1 <= v ? y.push({
            s: d.totalShapeLength * (v - 1),
            e: d.totalShapeLength * (b - 1)
          }) : (y.push({
            s: d.totalShapeLength * v,
            e: d.totalShapeLength
          }), y.push({
            s: 0,
            e: d.totalShapeLength * (b - 1)
          }));
          var x = this.addShapes(d, y[0]);
          if (y[0].s !== y[0].e) {
            if (1 < y.length) if (d.shape.paths.shapes[d.shape.paths._length - 1].c) {
              var E = x.pop();
              this.addPaths(x, u), x = this.addShapes(d, y[1], E);
            } else this.addPaths(x, u), x = this.addShapes(d, y[1]);
            this.addPaths(x, u);
          }
        }
        d.shape.paths = u;
      }
    }
  }, TrimModifier.prototype.addPaths = function (t, e) {
    var r,
      i = t.length;
    for (r = 0; r < i; r += 1) e.addShape(t[r]);
  }, TrimModifier.prototype.addSegment = function (t, e, r, i, s, a, n) {
    s.setXYAt(e[0], e[1], "o", a), s.setXYAt(r[0], r[1], "i", a + 1), n && s.setXYAt(t[0], t[1], "v", a), s.setXYAt(i[0], i[1], "v", a + 1);
  }, TrimModifier.prototype.addSegmentFromArray = function (t, e, r, i) {
    e.setXYAt(t[1], t[5], "o", r), e.setXYAt(t[2], t[6], "i", r + 1), i && e.setXYAt(t[0], t[4], "v", r), e.setXYAt(t[3], t[7], "v", r + 1);
  }, TrimModifier.prototype.addShapes = function (t, e, r) {
    var i,
      s,
      a,
      n,
      o,
      h,
      l,
      p,
      m = t.pathsData,
      f = t.shape.paths.shapes,
      c = t.shape.paths._length,
      d = 0,
      u = [],
      y = !0;
    for (p = r ? (o = r._length, r._length) : (r = shapePool.newElement(), o = 0), u.push(r), i = 0; i < c; i += 1) {
      for (h = m[i].lengths, r.c = f[i].c, a = f[i].c ? h.length : h.length + 1, s = 1; s < a; s += 1) if (d + (n = h[s - 1]).addedLength < e.s) d += n.addedLength, r.c = !1;else {
        if (d > e.e) {
          r.c = !1;
          break;
        }
        e.s <= d && e.e >= d + n.addedLength ? (this.addSegment(f[i].v[s - 1], f[i].o[s - 1], f[i].i[s], f[i].v[s], r, o, y), y = !1) : (l = bez.getNewSegment(f[i].v[s - 1], f[i].v[s], f[i].o[s - 1], f[i].i[s], (e.s - d) / n.addedLength, (e.e - d) / n.addedLength, h[s - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1), d += n.addedLength, o += 1;
      }
      if (f[i].c && h.length) {
        if (n = h[s - 1], d <= e.e) {
          var g = h[s - 1].addedLength;
          e.s <= d && e.e >= d + g ? (this.addSegment(f[i].v[s - 1], f[i].o[s - 1], f[i].i[0], f[i].v[0], r, o, y), y = !1) : (l = bez.getNewSegment(f[i].v[s - 1], f[i].v[0], f[i].o[s - 1], f[i].i[0], (e.s - d) / g, (e.e - d) / g, h[s - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1);
        } else r.c = !1;
        d += n.addedLength, o += 1;
      }
      if (r._length && (r.setXYAt(r.v[p][0], r.v[p][1], "i", p), r.setXYAt(r.v[r._length - 1][0], r.v[r._length - 1][1], "o", r._length - 1)), d > e.e) break;
      i < c - 1 && (r = shapePool.newElement(), y = !0, u.push(r), o = 0);
    }
    return u;
  }, ShapeModifiers.registerModifier("tm", TrimModifier), extendPrototype([ShapeModifier], RoundCornersModifier), RoundCornersModifier.prototype.initModifierProperties = function (t, e) {
    this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(t, e.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length;
  }, RoundCornersModifier.prototype.processPath = function (t, e) {
    var r,
      i = shapePool.newElement();
    i.c = t.c;
    var s,
      a,
      n,
      o,
      h,
      l,
      p,
      m,
      f,
      c,
      d,
      u,
      y = t._length,
      g = 0;
    for (r = 0; r < y; r += 1) s = t.v[r], n = t.o[r], a = t.i[r], s[0] === n[0] && s[1] === n[1] && s[0] === a[0] && s[1] === a[1] ? 0 !== r && r !== y - 1 || t.c ? (o = 0 === r ? t.v[y - 1] : t.v[r - 1], l = (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = d = s[0] + (o[0] - s[0]) * l, m = u = s[1] - (s[1] - o[1]) * l, f = p - (p - s[0]) * roundCorner, c = m - (m - s[1]) * roundCorner, i.setTripleAt(p, m, f, c, d, u, g), g += 1, o = r === y - 1 ? t.v[0] : t.v[r + 1], l = (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = f = s[0] + (o[0] - s[0]) * l, m = c = s[1] + (o[1] - s[1]) * l, d = p - (p - s[0]) * roundCorner, u = m - (m - s[1]) * roundCorner, i.setTripleAt(p, m, f, c, d, u, g)) : i.setTripleAt(s[0], s[1], n[0], n[1], a[0], a[1], g) : i.setTripleAt(t.v[r][0], t.v[r][1], t.o[r][0], t.o[r][1], t.i[r][0], t.i[r][1], g), g += 1;
    return i;
  }, RoundCornersModifier.prototype.processShapes = function (t) {
    var e,
      r,
      i,
      s,
      a,
      n,
      o = this.shapes.length,
      h = this.rd.v;
    if (0 !== h) for (r = 0; r < o; r += 1) {
      if (n = (a = this.shapes[r]).localShapeCollection, a.shape._mdf || this._mdf || t) for (n.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, s = a.shape.paths._length, i = 0; i < s; i += 1) n.addShape(this.processPath(e[i], h));
      a.shape.paths = a.localShapeCollection;
    }
    this.dynamicProperties.length || (this._mdf = !1);
  }, ShapeModifiers.registerModifier("rd", RoundCornersModifier), extendPrototype([ShapeModifier], PuckerAndBloatModifier), PuckerAndBloatModifier.prototype.initModifierProperties = function (t, e) {
    this.getValue = this.processKeys, this.amount = PropertyFactory.getProp(t, e.a, 0, null, this), this._isAnimated = !!this.amount.effectsSequence.length;
  }, PuckerAndBloatModifier.prototype.processPath = function (t, e) {
    var r = e / 100,
      i = [0, 0],
      s = t._length,
      a = 0;
    for (a = 0; a < s; a += 1) i[0] += t.v[a][0], i[1] += t.v[a][1];
    i[0] /= s, i[1] /= s;
    var n,
      o,
      h,
      l,
      p,
      m,
      f = shapePool.newElement();
    for (f.c = t.c, a = 0; a < s; a += 1) n = t.v[a][0] + (i[0] - t.v[a][0]) * r, o = t.v[a][1] + (i[1] - t.v[a][1]) * r, h = t.o[a][0] + (i[0] - t.o[a][0]) * -r, l = t.o[a][1] + (i[1] - t.o[a][1]) * -r, p = t.i[a][0] + (i[0] - t.i[a][0]) * -r, m = t.i[a][1] + (i[1] - t.i[a][1]) * -r, f.setTripleAt(n, o, h, l, p, m, a);
    return f;
  }, PuckerAndBloatModifier.prototype.processShapes = function (t) {
    var e,
      r,
      i,
      s,
      a,
      n,
      o = this.shapes.length,
      h = this.amount.v;
    if (0 !== h) for (r = 0; r < o; r += 1) {
      if (n = (a = this.shapes[r]).localShapeCollection, a.shape._mdf || this._mdf || t) for (n.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, s = a.shape.paths._length, i = 0; i < s; i += 1) n.addShape(this.processPath(e[i], h));
      a.shape.paths = a.localShapeCollection;
    }
    this.dynamicProperties.length || (this._mdf = !1);
  }, ShapeModifiers.registerModifier("pb", PuckerAndBloatModifier), extendPrototype([ShapeModifier], RepeaterModifier), RepeaterModifier.prototype.initModifierProperties = function (t, e) {
    this.getValue = this.processKeys, this.c = PropertyFactory.getProp(t, e.c, 0, null, this), this.o = PropertyFactory.getProp(t, e.o, 0, null, this), this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this), this.so = PropertyFactory.getProp(t, e.tr.so, 0, .01, this), this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, .01, this), this.data = e, this.dynamicProperties.length || this.getValue(!0), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new Matrix(), this.rMatrix = new Matrix(), this.sMatrix = new Matrix(), this.tMatrix = new Matrix(), this.matrix = new Matrix();
  }, RepeaterModifier.prototype.applyTransforms = function (t, e, r, i, s, a) {
    var n = a ? -1 : 1,
      o = i.s.v[0] + (1 - i.s.v[0]) * (1 - s),
      h = i.s.v[1] + (1 - i.s.v[1]) * (1 - s);
    t.translate(i.p.v[0] * n * s, i.p.v[1] * n * s, i.p.v[2]), e.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), e.rotate(-i.r.v * n * s), e.translate(i.a.v[0], i.a.v[1], i.a.v[2]), r.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), r.scale(a ? 1 / o : o, a ? 1 / h : h), r.translate(i.a.v[0], i.a.v[1], i.a.v[2]);
  }, RepeaterModifier.prototype.init = function (t, e, r, i) {
    for (this.elem = t, this.arr = e, this.pos = r, this.elemsData = i, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e[r]); 0 < r;) r -= 1, this._elements.unshift(e[r]);
    this.dynamicProperties.length ? this.k = !0 : this.getValue(!0);
  }, RepeaterModifier.prototype.resetElements = function (t) {
    var e,
      r = t.length;
    for (e = 0; e < r; e += 1) t[e]._processed = !1, "gr" === t[e].ty && this.resetElements(t[e].it);
  }, RepeaterModifier.prototype.cloneElements = function (t) {
    var e = JSON.parse(JSON.stringify(t));
    return this.resetElements(e), e;
  }, RepeaterModifier.prototype.changeGroupRender = function (t, e) {
    var r,
      i = t.length;
    for (r = 0; r < i; r += 1) t[r]._render = e, "gr" === t[r].ty && this.changeGroupRender(t[r].it, e);
  }, RepeaterModifier.prototype.processShapes = function (t) {
    var e, r, i, s, a;
    if (this._mdf || t) {
      var n,
        o = Math.ceil(this.c.v);
      if (this._groups.length < o) {
        for (; this._groups.length < o;) {
          var h = {
            it: this.cloneElements(this._elements),
            ty: "gr"
          };
          h.it.push({
            a: {
              a: 0,
              ix: 1,
              k: [0, 0]
            },
            nm: "Transform",
            o: {
              a: 0,
              ix: 7,
              k: 100
            },
            p: {
              a: 0,
              ix: 2,
              k: [0, 0]
            },
            r: {
              a: 1,
              ix: 6,
              k: [{
                s: 0,
                e: 0,
                t: 0
              }, {
                s: 0,
                e: 0,
                t: 1
              }]
            },
            s: {
              a: 0,
              ix: 3,
              k: [100, 100]
            },
            sa: {
              a: 0,
              ix: 5,
              k: 0
            },
            sk: {
              a: 0,
              ix: 4,
              k: 0
            },
            ty: "tr"
          }), this.arr.splice(0, 0, h), this._groups.splice(0, 0, h), this._currentCopies += 1;
        }
        this.elem.reloadShapes();
      }
      for (i = a = 0; i <= this._groups.length - 1; i += 1) n = a < o, this._groups[i]._render = n, this.changeGroupRender(this._groups[i].it, n), a += 1;
      this._currentCopies = o;
      var l = this.o.v,
        p = l % 1,
        m = 0 < l ? Math.floor(l) : Math.ceil(l),
        f = this.pMatrix.props,
        c = this.rMatrix.props,
        d = this.sMatrix.props;
      this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
      var u,
        y,
        g = 0;
      if (0 < l) {
        for (; g < m;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), g += 1;
        p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p, !1), g += p);
      } else if (l < 0) {
        for (; m < g;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), g -= 1;
        p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p, !0), g -= p);
      }
      for (i = 1 === this.data.m ? 0 : this._currentCopies - 1, s = 1 === this.data.m ? 1 : -1, a = this._currentCopies; a;) {
        if (y = (r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props).length, e[e.length - 1].transform.mProps._mdf = !0, e[e.length - 1].transform.op._mdf = !0, e[e.length - 1].transform.op.v = this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1)), 0 !== g) {
          for ((0 !== i && 1 === s || i !== this._currentCopies - 1 && -1 === s) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), this.matrix.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]), this.matrix.transform(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9], f[10], f[11], f[12], f[13], f[14], f[15]), u = 0; u < y; u += 1) r[u] = this.matrix.props[u];
          this.matrix.reset();
        } else for (this.matrix.reset(), u = 0; u < y; u += 1) r[u] = this.matrix.props[u];
        g += 1, a -= 1, i += s;
      }
    } else for (a = this._currentCopies, i = 0, s = 1; a;) r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props, e[e.length - 1].transform.mProps._mdf = !1, e[e.length - 1].transform.op._mdf = !1, a -= 1, i += s;
  }, RepeaterModifier.prototype.addShape = function () {}, ShapeModifiers.registerModifier("rp", RepeaterModifier), ShapeCollection.prototype.addShape = function (t) {
    this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t, this._length += 1;
  }, ShapeCollection.prototype.releaseShapes = function () {
    var t;
    for (t = 0; t < this._length; t += 1) shapePool.release(this.shapes[t]);
    this._length = 0;
  }, DashProperty.prototype.getValue = function (t) {
    if ((this.elem.globalData.frameId !== this.frameId || t) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || t, this._mdf)) {
      var e = 0,
        r = this.dataProps.length;
      for ("svg" === this.renderer && (this.dashStr = ""), e = 0; e < r; e += 1) "o" !== this.dataProps[e].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v;
    }
  }, extendPrototype([DynamicPropertyContainer], DashProperty), GradientProperty.prototype.comparePoints = function (t, e) {
    for (var r = 0, i = this.o.length / 2; r < i;) {
      if (.01 < Math.abs(t[4 * r] - t[4 * e + 2 * r])) return !1;
      r += 1;
    }
    return !0;
  }, GradientProperty.prototype.checkCollapsable = function () {
    if (this.o.length / 2 != this.c.length / 4) return !1;
    if (this.data.k.k[0].s) for (var t = 0, e = this.data.k.k.length; t < e;) {
      if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
      t += 1;
    } else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
    return !0;
  }, GradientProperty.prototype.getValue = function (t) {
    if (this.prop.getValue(), this._mdf = !1, this._cmdf = !1, this._omdf = !1, this.prop._mdf || t) {
      var e,
        r,
        i,
        s = 4 * this.data.p;
      for (e = 0; e < s; e += 1) r = e % 4 == 0 ? 100 : 255, i = Math.round(this.prop.v[e] * r), this.c[e] !== i && (this.c[e] = i, this._cmdf = !t);
      if (this.o.length) for (s = this.prop.v.length, e = 4 * this.data.p; e < s; e += 1) r = e % 2 == 0 ? 100 : 1, i = e % 2 == 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e], this.o[e - 4 * this.data.p] !== i && (this.o[e - 4 * this.data.p] = i, this._omdf = !t);
      this._mdf = !t;
    }
  }, extendPrototype([DynamicPropertyContainer], GradientProperty);
  var buildShapeString = function buildShapeString(t, e, r, i) {
      if (0 === e) return "";
      var s,
        a = t.o,
        n = t.i,
        o = t.v,
        h = " M" + i.applyToPointStringified(o[0][0], o[0][1]);
      for (s = 1; s < e; s += 1) h += " C" + i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + " " + i.applyToPointStringified(n[s][0], n[s][1]) + " " + i.applyToPointStringified(o[s][0], o[s][1]);
      return r && e && (h += " C" + i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + " " + i.applyToPointStringified(n[0][0], n[0][1]) + " " + i.applyToPointStringified(o[0][0], o[0][1]), h += "z"), h;
    },
    audioControllerFactory = function () {
      function t(t) {
        this.audios = [], this.audioFactory = t, this._volume = 1, this._isMuted = !1;
      }
      return t.prototype = {
        addAudio: function addAudio(t) {
          this.audios.push(t);
        },
        pause: function pause() {
          var t,
            e = this.audios.length;
          for (t = 0; t < e; t += 1) this.audios[t].pause();
        },
        resume: function resume() {
          var t,
            e = this.audios.length;
          for (t = 0; t < e; t += 1) this.audios[t].resume();
        },
        setRate: function setRate(t) {
          var e,
            r = this.audios.length;
          for (e = 0; e < r; e += 1) this.audios[e].setRate(t);
        },
        createAudio: function createAudio(t) {
          return this.audioFactory ? this.audioFactory(t) : Howl ? new Howl({
            src: [t]
          }) : {
            isPlaying: !1,
            play: function play() {
              this.isPlaying = !0;
            },
            seek: function seek() {
              this.isPlaying = !1;
            },
            playing: function playing() {},
            rate: function rate() {},
            setVolume: function setVolume() {}
          };
        },
        setAudioFactory: function setAudioFactory(t) {
          this.audioFactory = t;
        },
        setVolume: function setVolume(t) {
          this._volume = t, this._updateVolume();
        },
        mute: function mute() {
          this._isMuted = !0, this._updateVolume();
        },
        unmute: function unmute() {
          this._isMuted = !1, this._updateVolume();
        },
        getVolume: function getVolume() {
          return this._volume;
        },
        _updateVolume: function _updateVolume() {
          var t,
            e = this.audios.length;
          for (t = 0; t < e; t += 1) this.audios[t].volume(this._volume * (this._isMuted ? 0 : 1));
        }
      }, function () {
        return new t();
      };
    }(),
    ImagePreloader = function () {
      var s = function () {
        var t = createTag("canvas");
        t.width = 1, t.height = 1;
        var e = t.getContext("2d");
        return e.fillStyle = "rgba(0,0,0,0)", e.fillRect(0, 0, 1, 1), t;
      }();
      function t() {
        this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null);
      }
      function a(t, e, r) {
        var i = "";
        if (t.e) i = t.p;else if (e) {
          var s = t.p;
          -1 !== s.indexOf("images/") && (s = s.split("/")[1]), i = e + s;
        } else i = r, i += t.u ? t.u : "", i += t.p;
        return i;
      }
      function e() {
        this._imageLoaded = t.bind(this), this.testImageLoaded = function (t) {
          var e = 0,
            r = setInterval(function () {
              (t.getBBox().width || 500 < e) && (this._imageLoaded(), clearInterval(r)), e += 1;
            }.bind(this), 50);
        }.bind(this), this.assetsPath = "", this.path = "", this.totalImages = 0, this.loadedAssets = 0, this.imagesLoadedCb = null, this.images = [];
      }
      return e.prototype = {
        loadAssets: function loadAssets(t, e) {
          var r;
          this.imagesLoadedCb = e;
          var i = t.length;
          for (r = 0; r < i; r += 1) t[r].layers || (this.totalImages += 1, this.images.push(this._createImageData(t[r])));
        },
        setAssetsPath: function setAssetsPath(t) {
          this.assetsPath = t || "";
        },
        setPath: function setPath(t) {
          this.path = t || "";
        },
        loaded: function loaded() {
          return this.totalImages === this.loadedAssets;
        },
        destroy: function destroy() {
          this.imagesLoadedCb = null, this.images.length = 0;
        },
        getImage: function getImage(t) {
          for (var e = 0, r = this.images.length; e < r;) {
            if (this.images[e].assetData === t) return this.images[e].img;
            e += 1;
          }
          return null;
        },
        createImgData: function createImgData(t) {
          var e = a(t, this.assetsPath, this.path),
            r = createTag("img");
          r.crossOrigin = "anonymous", r.addEventListener("load", this._imageLoaded, !1), r.addEventListener("error", function () {
            i.img = s, this._imageLoaded();
          }.bind(this), !1), r.src = e;
          var i = {
            img: r,
            assetData: t
          };
          return i;
        },
        createImageData: function createImageData(t) {
          var e = a(t, this.assetsPath, this.path),
            r = createNS("image");
          isSafari ? this.testImageLoaded(r) : r.addEventListener("load", this._imageLoaded, !1), r.addEventListener("error", function () {
            i.img = s, this._imageLoaded();
          }.bind(this), !1), r.setAttributeNS("http://www.w3.org/1999/xlink", "href", e), this._elementHelper.append(r);
          var i = {
            img: r,
            assetData: t
          };
          return i;
        },
        imageLoaded: t,
        setCacheType: function setCacheType(t, e) {
          this._createImageData = "svg" === t ? (this._elementHelper = e, this.createImageData.bind(this)) : this.createImgData.bind(this);
        }
      }, e;
    }(),
    featureSupport = (fx = {
      maskType: !0
    }, (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (fx.maskType = !1), fx),
    fx,
    filtersFactory = (gx = {}, gx.createFilter = function (t) {
      var e = createNS("filter");
      return e.setAttribute("id", t), e.setAttribute("filterUnits", "objectBoundingBox"), e.setAttribute("x", "0%"), e.setAttribute("y", "0%"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e;
    }, gx.createAlphaToLuminanceFilter = function () {
      var t = createNS("feColorMatrix");
      return t.setAttribute("type", "matrix"), t.setAttribute("color-interpolation-filters", "sRGB"), t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), t;
    }, gx),
    gx,
    assetLoader = function () {
      function a(t) {
        return t.response && "object" == _typeof(t.response) ? t.response : t.response && "string" == typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : null;
      }
      return {
        load: function load(t, e, r) {
          var i,
            s = new XMLHttpRequest();
          s.open("GET", t, !0);
          try {
            s.responseType = "json";
          } catch (t) {}
          s.send(), s.onreadystatechange = function () {
            if (4 === s.readyState) if (200 === s.status) i = a(s), e(i);else try {
              i = a(s), e(i);
            } catch (t) {
              r && r(t);
            }
          };
        }
      };
    }();
  function TextAnimatorProperty(t, e, r) {
    this._isFirstFrame = !0, this._hasMaskedPath = !1, this._frameId = -1, this._textData = t, this._renderType = e, this._elem = r, this._animatorsData = createSizedArray(this._textData.a.length), this._pathData = {}, this._moreOptions = {
      alignment: {}
    }, this.renderedLetters = [], this.lettersChangedFlag = !1, this.initDynamicPropertyContainer(r);
  }
  function TextAnimatorDataProperty(t, e, r) {
    var i = {
        propType: !1
      },
      s = PropertyFactory.getProp,
      a = e.a;
    this.a = {
      r: a.r ? s(t, a.r, 0, degToRads, r) : i,
      rx: a.rx ? s(t, a.rx, 0, degToRads, r) : i,
      ry: a.ry ? s(t, a.ry, 0, degToRads, r) : i,
      sk: a.sk ? s(t, a.sk, 0, degToRads, r) : i,
      sa: a.sa ? s(t, a.sa, 0, degToRads, r) : i,
      s: a.s ? s(t, a.s, 1, .01, r) : i,
      a: a.a ? s(t, a.a, 1, 0, r) : i,
      o: a.o ? s(t, a.o, 0, .01, r) : i,
      p: a.p ? s(t, a.p, 1, 0, r) : i,
      sw: a.sw ? s(t, a.sw, 0, 0, r) : i,
      sc: a.sc ? s(t, a.sc, 1, 0, r) : i,
      fc: a.fc ? s(t, a.fc, 1, 0, r) : i,
      fh: a.fh ? s(t, a.fh, 0, 0, r) : i,
      fs: a.fs ? s(t, a.fs, 0, .01, r) : i,
      fb: a.fb ? s(t, a.fb, 0, .01, r) : i,
      t: a.t ? s(t, a.t, 0, 0, r) : i
    }, this.s = TextSelectorProp.getTextSelectorProp(t, e.s, r), this.s.t = e.s.t;
  }
  function LetterProps(t, e, r, i, s, a) {
    this.o = t, this.sw = e, this.sc = r, this.fc = i, this.m = s, this.p = a, this._mdf = {
      o: !0,
      sw: !!e,
      sc: !!r,
      fc: !!i,
      m: !0,
      p: !0
    };
  }
  function TextProperty(t, e) {
    this._frameId = initialDefaultFrame, this.pv = "", this.v = "", this.kf = !1, this._isFirstFrame = !0, this._mdf = !1, this.data = e, this.elem = t, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = !1, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = {
      ascent: 0,
      boxWidth: this.defaultBoxWidth,
      f: "",
      fStyle: "",
      fWeight: "",
      fc: "",
      j: "",
      justifyOffset: "",
      l: [],
      lh: 0,
      lineWidths: [],
      ls: "",
      of: "",
      s: "",
      sc: "",
      sw: 0,
      t: 0,
      tr: 0,
      sz: 0,
      ps: null,
      fillColorAnim: !1,
      strokeColorAnim: !1,
      strokeWidthAnim: !1,
      yOffset: 0,
      finalSize: 0,
      finalText: [],
      finalLineHeight: 0,
      __complete: !1
    }, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData);
  }
  TextAnimatorProperty.prototype.searchProperties = function () {
    var t,
      e,
      r = this._textData.a.length,
      i = PropertyFactory.getProp;
    for (t = 0; t < r; t += 1) e = this._textData.a[t], this._animatorsData[t] = new TextAnimatorDataProperty(this._elem, e, this);
    this._textData.p && "m" in this._textData.p ? (this._pathData = {
      f: i(this._elem, this._textData.p.f, 0, 0, this),
      l: i(this._elem, this._textData.p.l, 0, 0, this),
      r: this._textData.p.r,
      m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
    }, this._hasMaskedPath = !0) : this._hasMaskedPath = !1, this._moreOptions.alignment = i(this._elem, this._textData.m.a, 1, 0, this);
  }, TextAnimatorProperty.prototype.getMeasures = function (t, e) {
    if (this.lettersChangedFlag = e, this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
      this._isFirstFrame = !1;
      var r,
        i,
        s,
        a,
        n,
        o,
        h,
        l,
        p,
        m,
        f,
        c,
        d,
        u,
        y,
        g,
        v,
        b,
        P,
        x = this._moreOptions.alignment.v,
        E = this._animatorsData,
        S = this._textData,
        A = this.mHelper,
        C = this._renderType,
        _ = this.renderedLetters.length,
        T = t.l;
      if (this._hasMaskedPath) {
        if (P = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
          var k,
            D = P.v;
          for (this._pathData.r && (D = D.reverse()), n = {
            tLength: 0,
            segments: []
          }, a = D._length - 1, s = g = 0; s < a; s += 1) k = bez.buildBezierData(D.v[s], D.v[s + 1], [D.o[s][0] - D.v[s][0], D.o[s][1] - D.v[s][1]], [D.i[s + 1][0] - D.v[s + 1][0], D.i[s + 1][1] - D.v[s + 1][1]]), n.tLength += k.segmentLength, n.segments.push(k), g += k.segmentLength;
          s = a, P.v.c && (k = bez.buildBezierData(D.v[s], D.v[0], [D.o[s][0] - D.v[s][0], D.o[s][1] - D.v[s][1]], [D.i[0][0] - D.v[0][0], D.i[0][1] - D.v[0][1]]), n.tLength += k.segmentLength, n.segments.push(k), g += k.segmentLength), this._pathData.pi = n;
        }
        if (n = this._pathData.pi, o = this._pathData.f.v, m = 1, p = !(l = f = 0), u = n.segments, o < 0 && P.v.c) for (n.tLength < Math.abs(o) && (o = -Math.abs(o) % n.tLength), m = (d = u[f = u.length - 1].points).length - 1; o < 0;) o += d[m].partialLength, (m -= 1) < 0 && (m = (d = u[f -= 1].points).length - 1);
        c = (d = u[f].points)[m - 1], y = (h = d[m]).partialLength;
      }
      a = T.length, i = r = 0;
      var M,
        F,
        w,
        I,
        V,
        B = 1.2 * t.finalSize * .714,
        R = !0;
      w = E.length;
      var L,
        G,
        z,
        N,
        O,
        H,
        j,
        q,
        W,
        Y,
        X,
        K,
        $ = -1,
        Z = o,
        J = f,
        U = m,
        Q = -1,
        tt = "",
        et = this.defaultPropsArray;
      if (2 === t.j || 1 === t.j) {
        var rt = 0,
          it = 0,
          st = 2 === t.j ? -.5 : -1,
          at = 0,
          nt = !0;
        for (s = 0; s < a; s += 1) if (T[s].n) {
          for (rt && (rt += it); at < s;) T[at].animatorJustifyOffset = rt, at += 1;
          nt = !(rt = 0);
        } else {
          for (F = 0; F < w; F += 1) (M = E[F].a).t.propType && (nt && 2 === t.j && (it += M.t.v * st), (V = E[F].s.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)).length ? rt += M.t.v * V[0] * st : rt += M.t.v * V * st);
          nt = !1;
        }
        for (rt && (rt += it); at < s;) T[at].animatorJustifyOffset = rt, at += 1;
      }
      for (s = 0; s < a; s += 1) {
        if (A.reset(), N = 1, T[s].n) r = 0, i += t.yOffset, i += R ? 1 : 0, o = Z, R = !1, this._hasMaskedPath && (m = U, c = (d = u[f = J].points)[m - 1], y = (h = d[m]).partialLength, l = 0), K = W = X = tt = "", et = this.defaultPropsArray;else {
          if (this._hasMaskedPath) {
            if (Q !== T[s].line) {
              switch (t.j) {
                case 1:
                  o += g - t.lineWidths[T[s].line];
                  break;
                case 2:
                  o += (g - t.lineWidths[T[s].line]) / 2;
              }
              Q = T[s].line;
            }
            $ !== T[s].ind && (T[$] && (o += T[$].extra), o += T[s].an / 2, $ = T[s].ind), o += x[0] * T[s].an * .005;
            var ot = 0;
            for (F = 0; F < w; F += 1) (M = E[F].a).p.propType && ((V = E[F].s.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)).length ? ot += M.p.v[0] * V[0] : ot += M.p.v[0] * V), M.a.propType && ((V = E[F].s.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)).length ? ot += M.a.v[0] * V[0] : ot += M.a.v[0] * V);
            for (p = !0; p;) o + ot <= l + y || !d ? (v = (o + ot - l) / h.partialLength, G = c.point[0] + (h.point[0] - c.point[0]) * v, z = c.point[1] + (h.point[1] - c.point[1]) * v, A.translate(-x[0] * T[s].an * .005, -x[1] * B * .01), p = !1) : d && (l += h.partialLength, (m += 1) >= d.length && (m = 0, d = u[f += 1] ? u[f].points : P.v.c ? u[f = m = 0].points : (l -= h.partialLength, null)), d && (c = h, y = (h = d[m]).partialLength));
            L = T[s].an / 2 - T[s].add, A.translate(-L, 0, 0);
          } else L = T[s].an / 2 - T[s].add, A.translate(-L, 0, 0), A.translate(-x[0] * T[s].an * .005, -x[1] * B * .01, 0);
          for (F = 0; F < w; F += 1) (M = E[F].a).t.propType && (V = E[F].s.getMult(T[s].anIndexes[F], S.a[F].s.totalChars), 0 === r && 0 === t.j || (this._hasMaskedPath ? V.length ? o += M.t.v * V[0] : o += M.t.v * V : V.length ? r += M.t.v * V[0] : r += M.t.v * V));
          for (t.strokeWidthAnim && (H = t.sw || 0), t.strokeColorAnim && (O = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && (j = [t.fc[0], t.fc[1], t.fc[2]]), F = 0; F < w; F += 1) (M = E[F].a).a.propType && ((V = E[F].s.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)).length ? A.translate(-M.a.v[0] * V[0], -M.a.v[1] * V[1], M.a.v[2] * V[2]) : A.translate(-M.a.v[0] * V, -M.a.v[1] * V, M.a.v[2] * V));
          for (F = 0; F < w; F += 1) (M = E[F].a).s.propType && ((V = E[F].s.getMult(T[s].anIndexes[F], S.a[F].s.totalChars)).length ? A.scale(1 + (M.s.v[0] - 1) * V[0], 1 + (M.s.v[1] - 1) * V[1], 1) : A.scale(1 + (M.s.v[0] - 1) * V, 1 + (M.s.v[1] - 1) * V, 1));
          for (F = 0; F < w; F += 1) {
            if (M = E[F].a, V = E[F].s.getMult(T[s].anIndexes[F], S.a[F].s.totalChars), M.sk.propType && (V.length ? A.skewFromAxis(-M.sk.v * V[0], M.sa.v * V[1]) : A.skewFromAxis(-M.sk.v * V, M.sa.v * V)), M.r.propType && (V.length ? A.rotateZ(-M.r.v * V[2]) : A.rotateZ(-M.r.v * V)), M.ry.propType && (V.length ? A.rotateY(M.ry.v * V[1]) : A.rotateY(M.ry.v * V)), M.rx.propType && (V.length ? A.rotateX(M.rx.v * V[0]) : A.rotateX(M.rx.v * V)), M.o.propType && (V.length ? N += (M.o.v * V[0] - N) * V[0] : N += (M.o.v * V - N) * V), t.strokeWidthAnim && M.sw.propType && (V.length ? H += M.sw.v * V[0] : H += M.sw.v * V), t.strokeColorAnim && M.sc.propType) for (q = 0; q < 3; q += 1) V.length ? O[q] += (M.sc.v[q] - O[q]) * V[0] : O[q] += (M.sc.v[q] - O[q]) * V;
            if (t.fillColorAnim && t.fc) {
              if (M.fc.propType) for (q = 0; q < 3; q += 1) V.length ? j[q] += (M.fc.v[q] - j[q]) * V[0] : j[q] += (M.fc.v[q] - j[q]) * V;
              M.fh.propType && (j = V.length ? addHueToRGB(j, M.fh.v * V[0]) : addHueToRGB(j, M.fh.v * V)), M.fs.propType && (j = V.length ? addSaturationToRGB(j, M.fs.v * V[0]) : addSaturationToRGB(j, M.fs.v * V)), M.fb.propType && (j = V.length ? addBrightnessToRGB(j, M.fb.v * V[0]) : addBrightnessToRGB(j, M.fb.v * V));
            }
          }
          for (F = 0; F < w; F += 1) (M = E[F].a).p.propType && (V = E[F].s.getMult(T[s].anIndexes[F], S.a[F].s.totalChars), this._hasMaskedPath ? V.length ? A.translate(0, M.p.v[1] * V[0], -M.p.v[2] * V[1]) : A.translate(0, M.p.v[1] * V, -M.p.v[2] * V) : V.length ? A.translate(M.p.v[0] * V[0], M.p.v[1] * V[1], -M.p.v[2] * V[2]) : A.translate(M.p.v[0] * V, M.p.v[1] * V, -M.p.v[2] * V));
          if (t.strokeWidthAnim && (W = H < 0 ? 0 : H), t.strokeColorAnim && (Y = "rgb(" + Math.round(255 * O[0]) + "," + Math.round(255 * O[1]) + "," + Math.round(255 * O[2]) + ")"), t.fillColorAnim && t.fc && (X = "rgb(" + Math.round(255 * j[0]) + "," + Math.round(255 * j[1]) + "," + Math.round(255 * j[2]) + ")"), this._hasMaskedPath) {
            if (A.translate(0, -t.ls), A.translate(0, x[1] * B * .01 + i, 0), S.p.p) {
              b = (h.point[1] - c.point[1]) / (h.point[0] - c.point[0]);
              var ht = 180 * Math.atan(b) / Math.PI;
              h.point[0] < c.point[0] && (ht += 180), A.rotate(-ht * Math.PI / 180);
            }
            A.translate(G, z, 0), o -= x[0] * T[s].an * .005, T[s + 1] && $ !== T[s + 1].ind && (o += T[s].an / 2, o += .001 * t.tr * t.finalSize);
          } else {
            switch (A.translate(r, i, 0), t.ps && A.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
              case 1:
                A.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]), 0, 0);
                break;
              case 2:
                A.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]) / 2, 0, 0);
            }
            A.translate(0, -t.ls), A.translate(L, 0, 0), A.translate(x[0] * T[s].an * .005, x[1] * B * .01, 0), r += T[s].l + .001 * t.tr * t.finalSize;
          }
          "html" === C ? tt = A.toCSS() : "svg" === C ? tt = A.to2dCSS() : et = [A.props[0], A.props[1], A.props[2], A.props[3], A.props[4], A.props[5], A.props[6], A.props[7], A.props[8], A.props[9], A.props[10], A.props[11], A.props[12], A.props[13], A.props[14], A.props[15]], K = N;
        }
        this.lettersChangedFlag = _ <= s ? (I = new LetterProps(K, W, Y, X, tt, et), this.renderedLetters.push(I), _ += 1, !0) : (I = this.renderedLetters[s]).update(K, W, Y, X, tt, et) || this.lettersChangedFlag;
      }
    }
  }, TextAnimatorProperty.prototype.getValue = function () {
    this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties());
  }, TextAnimatorProperty.prototype.mHelper = new Matrix(), TextAnimatorProperty.prototype.defaultPropsArray = [], extendPrototype([DynamicPropertyContainer], TextAnimatorProperty), LetterProps.prototype.update = function (t, e, r, i, s, a) {
    this._mdf.o = !1, this._mdf.sw = !1, this._mdf.sc = !1, this._mdf.fc = !1, this._mdf.m = !1;
    var n = this._mdf.p = !1;
    return this.o !== t && (this.o = t, n = this._mdf.o = !0), this.sw !== e && (this.sw = e, n = this._mdf.sw = !0), this.sc !== r && (this.sc = r, n = this._mdf.sc = !0), this.fc !== i && (this.fc = i, n = this._mdf.fc = !0), this.m !== s && (this.m = s, n = this._mdf.m = !0), !a.length || this.p[0] === a[0] && this.p[1] === a[1] && this.p[4] === a[4] && this.p[5] === a[5] && this.p[12] === a[12] && this.p[13] === a[13] || (this.p = a, n = this._mdf.p = !0), n;
  }, TextProperty.prototype.defaultBoxWidth = [0, 0], TextProperty.prototype.copyData = function (t, e) {
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t;
  }, TextProperty.prototype.setCurrentData = function (t) {
    t.__complete || this.completeTextData(t), this.currentData = t, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = !0;
  }, TextProperty.prototype.searchProperty = function () {
    return this.searchKeyframes();
  }, TextProperty.prototype.searchKeyframes = function () {
    return this.kf = 1 < this.data.d.k.length, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf;
  }, TextProperty.prototype.addEffect = function (t) {
    this.effectsSequence.push(t), this.elem.addDynamicProperty(this);
  }, TextProperty.prototype.getValue = function (t) {
    if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t) {
      this.currentData.t = this.data.d.k[this.keysIndex].s.t;
      var e = this.currentData,
        r = this.keysIndex;
      if (this.lock) this.setCurrentData(this.currentData);else {
        var i;
        this.lock = !0, this._mdf = !1;
        var s = this.effectsSequence.length,
          a = t || this.data.d.k[this.keysIndex].s;
        for (i = 0; i < s; i += 1) a = r !== this.keysIndex ? this.effectsSequence[i](a, a.t) : this.effectsSequence[i](this.currentData, a.t);
        e !== a && this.setCurrentData(a), this.v = this.currentData, this.pv = this.v, this.lock = !1, this.frameId = this.elem.globalData.frameId;
      }
    }
  }, TextProperty.prototype.getKeyframeValue = function () {
    for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, r = 0, i = t.length; r <= i - 1 && !(r === i - 1 || t[r + 1].t > e);) r += 1;
    return this.keysIndex !== r && (this.keysIndex = r), this.data.d.k[this.keysIndex].s;
  }, TextProperty.prototype.buildFinalText = function (t) {
    for (var e, r = FontManager.getCombinedCharacterCodes(), i = [], s = 0, a = t.length; s < a;) e = t.charCodeAt(s), -1 !== r.indexOf(e) ? i[i.length - 1] += t.charAt(s) : 55296 <= e && e <= 56319 && 56320 <= (e = t.charCodeAt(s + 1)) && e <= 57343 ? (i.push(t.substr(s, 2)), s += 1) : i.push(t.charAt(s)), s += 1;
    return i;
  }, TextProperty.prototype.completeTextData = function (t) {
    t.__complete = !0;
    var e,
      r,
      i,
      s,
      a,
      n,
      o,
      h = this.elem.globalData.fontManager,
      l = this.data,
      p = [],
      m = 0,
      f = l.m.g,
      c = 0,
      d = 0,
      u = 0,
      y = [],
      g = 0,
      v = 0,
      b = h.getFontByName(t.f),
      P = 0,
      x = getFontProperties(b);
    t.fWeight = x.weight, t.fStyle = x.style, t.finalSize = t.s, t.finalText = this.buildFinalText(t.t), r = t.finalText.length, t.finalLineHeight = t.lh;
    var E,
      S = t.tr / 1e3 * t.finalSize;
    if (t.sz) for (var A, C, _ = !0, T = t.sz[0], k = t.sz[1]; _;) {
      g = A = 0, r = (C = this.buildFinalText(t.t)).length, S = t.tr / 1e3 * t.finalSize;
      var D = -1;
      for (e = 0; e < r; e += 1) E = C[e].charCodeAt(0), i = !1, " " === C[e] ? D = e : 13 !== E && 3 !== E || (i = !(g = 0), A += t.finalLineHeight || 1.2 * t.finalSize), T < g + (P = h.chars ? (o = h.getCharData(C[e], b.fStyle, b.fFamily), i ? 0 : o.w * t.finalSize / 100) : h.measureText(C[e], t.f, t.finalSize)) && " " !== C[e] ? (-1 === D ? r += 1 : e = D, A += t.finalLineHeight || 1.2 * t.finalSize, C.splice(e, D === e ? 1 : 0, "\r"), D = -1, g = 0) : (g += P, g += S);
      A += b.ascent * t.finalSize / 100, this.canResize && t.finalSize > this.minimumFontSize && k < A ? (t.finalSize -= 1, t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = C, r = t.finalText.length, _ = !1);
    }
    g = -S;
    var M,
      F = P = 0;
    for (e = 0; e < r; e += 1) if (i = !1, 13 === (E = (M = t.finalText[e]).charCodeAt(0)) || 3 === E ? (F = 0, y.push(g), v = v < g ? g : v, g = -2 * S, i = !(s = ""), u += 1) : s = M, P = h.chars ? (o = h.getCharData(M, b.fStyle, h.getFontByName(t.f).fFamily), i ? 0 : o.w * t.finalSize / 100) : h.measureText(s, t.f, t.finalSize), " " === M ? F += P + S : (g += P + S + F, F = 0), p.push({
      l: P,
      an: P,
      add: c,
      n: i,
      anIndexes: [],
      val: s,
      line: u,
      animatorJustifyOffset: 0
    }), 2 == f) {
      if (c += P, "" === s || " " === s || e === r - 1) {
        for ("" !== s && " " !== s || (c -= P); d <= e;) p[d].an = c, p[d].ind = m, p[d].extra = P, d += 1;
        m += 1, c = 0;
      }
    } else if (3 == f) {
      if (c += P, "" === s || e === r - 1) {
        for ("" === s && (c -= P); d <= e;) p[d].an = c, p[d].ind = m, p[d].extra = P, d += 1;
        c = 0, m += 1;
      }
    } else p[m].ind = m, p[m].extra = 0, m += 1;
    if (t.l = p, v = v < g ? g : v, y.push(g), t.sz) t.boxWidth = t.sz[0], t.justifyOffset = 0;else switch (t.boxWidth = v, t.j) {
      case 1:
        t.justifyOffset = -t.boxWidth;
        break;
      case 2:
        t.justifyOffset = -t.boxWidth / 2;
        break;
      default:
        t.justifyOffset = 0;
    }
    t.lineWidths = y;
    var w,
      I,
      V,
      B,
      R = l.a;
    n = R.length;
    var L = [];
    for (a = 0; a < n; a += 1) {
      for ((w = R[a]).a.sc && (t.strokeColorAnim = !0), w.a.sw && (t.strokeWidthAnim = !0), (w.a.fc || w.a.fh || w.a.fs || w.a.fb) && (t.fillColorAnim = !0), B = 0, V = w.s.b, e = 0; e < r; e += 1) (I = p[e]).anIndexes[a] = B, (1 == V && "" !== I.val || 2 == V && "" !== I.val && " " !== I.val || 3 == V && (I.n || " " == I.val || e == r - 1) || 4 == V && (I.n || e == r - 1)) && (1 === w.s.rn && L.push(B), B += 1);
      l.a[a].s.totalChars = B;
      var G,
        z = -1;
      if (1 === w.s.rn) for (e = 0; e < r; e += 1) z != (I = p[e]).anIndexes[a] && (z = I.anIndexes[a], G = L.splice(Math.floor(Math.random() * L.length), 1)[0]), I.anIndexes[a] = G;
    }
    t.yOffset = t.finalLineHeight || 1.2 * t.finalSize, t.ls = t.ls || 0, t.ascent = b.ascent * t.finalSize / 100;
  }, TextProperty.prototype.updateDocumentData = function (t, e) {
    e = void 0 === e ? this.keysIndex : e;
    var r = this.copyData({}, this.data.d.k[e].s);
    r = this.copyData(r, t), this.data.d.k[e].s = r, this.recalculate(e), this.elem.addDynamicProperty(this);
  }, TextProperty.prototype.recalculate = function (t) {
    var e = this.data.d.k[t].s;
    e.__complete = !1, this.keysIndex = 0, this._isFirstFrame = !0, this.getValue(e);
  }, TextProperty.prototype.canResizeFont = function (t) {
    this.canResize = t, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
  }, TextProperty.prototype.setMinimumFontSize = function (t) {
    this.minimumFontSize = Math.floor(t) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
  };
  var TextSelectorProp = function () {
      var c = Math.max,
        d = Math.min,
        u = Math.floor;
      function i(t, e) {
        this._currentTextLength = -1, this.k = !1, this.data = e, this.elem = t, this.comp = t.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(t), this.s = PropertyFactory.getProp(t, e.s || {
          k: 0
        }, 0, 0, this), this.e = "e" in e ? PropertyFactory.getProp(t, e.e, 0, 0, this) : {
          v: 100
        }, this.o = PropertyFactory.getProp(t, e.o || {
          k: 0
        }, 0, 0, this), this.xe = PropertyFactory.getProp(t, e.xe || {
          k: 0
        }, 0, 0, this), this.ne = PropertyFactory.getProp(t, e.ne || {
          k: 0
        }, 0, 0, this), this.a = PropertyFactory.getProp(t, e.a, 0, .01, this), this.dynamicProperties.length || this.getValue();
      }
      return i.prototype = {
        getMult: function getMult(t) {
          this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
          var e = 0,
            r = 0,
            i = 1,
            s = 1;
          0 < this.ne.v ? e = this.ne.v / 100 : r = -this.ne.v / 100, 0 < this.xe.v ? i = 1 - this.xe.v / 100 : s = 1 + this.xe.v / 100;
          var a = BezierFactory.getBezierEasing(e, r, i, s).get,
            n = 0,
            o = this.finalS,
            h = this.finalE,
            l = this.data.sh;
          if (2 === l) n = a(n = h === o ? h <= t ? 1 : 0 : c(0, d(.5 / (h - o) + (t - o) / (h - o), 1)));else if (3 === l) n = a(n = h === o ? h <= t ? 0 : 1 : 1 - c(0, d(.5 / (h - o) + (t - o) / (h - o), 1)));else if (4 === l) h === o ? n = 0 : (n = c(0, d(.5 / (h - o) + (t - o) / (h - o), 1))) < .5 ? n *= 2 : n = 1 - 2 * (n - .5), n = a(n);else if (5 === l) {
            if (h === o) n = 0;else {
              var p = h - o,
                m = -p / 2 + (t = d(c(0, t + .5 - o), h - o)),
                f = p / 2;
              n = Math.sqrt(1 - m * m / (f * f));
            }
            n = a(n);
          } else n = 6 === l ? a(n = h === o ? 0 : (t = d(c(0, t + .5 - o), h - o), (1 + Math.cos(Math.PI + 2 * Math.PI * t / (h - o))) / 2)) : (t >= u(o) && (n = c(0, d(t - o < 0 ? d(h, 1) - (o - t) : h - t, 1))), a(n));
          return n * this.a.v;
        },
        getValue: function getValue(t) {
          this.iterateDynamicProperties(), this._mdf = t || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, t && 2 === this.data.r && (this.e.v = this._currentTextLength);
          var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
            r = this.o.v / e,
            i = this.s.v / e + r,
            s = this.e.v / e + r;
          if (s < i) {
            var a = i;
            i = s, s = a;
          }
          this.finalS = i, this.finalE = s;
        }
      }, extendPrototype([DynamicPropertyContainer], i), {
        getTextSelectorProp: function getTextSelectorProp(t, e, r) {
          return new i(t, e, r);
        }
      };
    }(),
    poolFactory = function poolFactory(t, e, r) {
      var i = 0,
        s = t,
        a = createSizedArray(s);
      return {
        newElement: function newElement() {
          return i ? a[i -= 1] : e();
        },
        release: function release(t) {
          i === s && (a = pooling["double"](a), s *= 2), r && r(t), a[i] = t, i += 1;
        }
      };
    },
    pooling = {
      "double": function double(t) {
        return t.concat(createSizedArray(t.length));
      }
    },
    pointPool = poolFactory(8, function () {
      return createTypedArray("float32", 2);
    }),
    shapePool = (mB = poolFactory(4, function () {
      return new ShapePath();
    }, function (t) {
      var e,
        r = t._length;
      for (e = 0; e < r; e += 1) pointPool.release(t.v[e]), pointPool.release(t.i[e]), pointPool.release(t.o[e]), t.v[e] = null, t.i[e] = null, t.o[e] = null;
      t._length = 0, t.c = !1;
    }), mB.clone = function (t) {
      var e,
        r = mB.newElement(),
        i = void 0 === t._length ? t.v.length : t._length;
      for (r.setLength(i), r.c = t.c, e = 0; e < i; e += 1) r.setTripleAt(t.v[e][0], t.v[e][1], t.o[e][0], t.o[e][1], t.i[e][0], t.i[e][1], e);
      return r;
    }, mB),
    mB,
    shapeCollectionPool = (uB = {
      newShapeCollection: function newShapeCollection() {
        var t;
        t = vB ? xB[vB -= 1] : new ShapeCollection();
        return t;
      },
      release: function release(t) {
        var e,
          r = t._length;
        for (e = 0; e < r; e += 1) shapePool.release(t.shapes[e]);
        t._length = 0, vB === wB && (xB = pooling["double"](xB), wB *= 2);
        xB[vB] = t, vB += 1;
      }
    }, vB = 0, wB = 4, xB = createSizedArray(wB), uB),
    uB,
    vB,
    wB,
    xB,
    segmentsLengthPool = poolFactory(8, function () {
      return {
        lengths: [],
        totalLength: 0
      };
    }, function (t) {
      var e,
        r = t.lengths.length;
      for (e = 0; e < r; e += 1) bezierLengthPool.release(t.lengths[e]);
      t.lengths.length = 0;
    }),
    bezierLengthPool = poolFactory(8, function () {
      return {
        addedLength: 0,
        percents: createTypedArray("float32", defaultCurveSegments),
        lengths: createTypedArray("float32", defaultCurveSegments)
      };
    });
  function BaseRenderer() {}
  function SVGRenderer(t, e) {
    this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.svgElement = createNS("svg");
    var r = "";
    if (e && e.title) {
      var i = createNS("title"),
        s = createElementID();
      i.setAttribute("id", s), i.textContent = e.title, this.svgElement.appendChild(i), r += s;
    }
    if (e && e.description) {
      var a = createNS("desc"),
        n = createElementID();
      a.setAttribute("id", n), a.textContent = e.description, this.svgElement.appendChild(a), r += " " + n;
    }
    r && this.svgElement.setAttribute("aria-labelledby", r);
    var o = createNS("defs");
    this.svgElement.appendChild(o);
    var h = createNS("g");
    this.svgElement.appendChild(h), this.layerElement = h, this.renderConfig = {
      preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
      imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
      progressiveLoad: e && e.progressiveLoad || !1,
      hideOnTransparent: !(e && !1 === e.hideOnTransparent),
      viewBoxOnly: e && e.viewBoxOnly || !1,
      viewBoxSize: e && e.viewBoxSize || !1,
      className: e && e.className || "",
      id: e && e.id || "",
      focusable: e && e.focusable,
      filterSize: {
        width: e && e.filterSize && e.filterSize.width || "100%",
        height: e && e.filterSize && e.filterSize.height || "100%",
        x: e && e.filterSize && e.filterSize.x || "0%",
        y: e && e.filterSize && e.filterSize.y || "0%"
      }
    }, this.globalData = {
      _mdf: !1,
      frameNum: -1,
      defs: o,
      renderConfig: this.renderConfig
    }, this.elements = [], this.pendingElements = [], this.destroyed = !1, this.rendererType = "svg";
  }
  function CanvasRenderer(t, e) {
    this.animationItem = t, this.renderConfig = {
      clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
      context: e && e.context || null,
      progressiveLoad: e && e.progressiveLoad || !1,
      preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
      imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
      className: e && e.className || "",
      id: e && e.id || ""
    }, this.renderConfig.dpr = e && e.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
      frameNum: -1,
      _mdf: !1,
      renderConfig: this.renderConfig,
      currentGlobalAlpha: -1
    }, this.contextData = new CVContextData(), this.elements = [], this.pendingElements = [], this.transformMat = new Matrix(), this.completeLayers = !1, this.rendererType = "canvas";
  }
  function HybridRenderer(t, e) {
    this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.renderConfig = {
      className: e && e.className || "",
      imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
      hideOnTransparent: !(e && !1 === e.hideOnTransparent),
      filterSize: {
        width: e && e.filterSize && e.filterSize.width || "400%",
        height: e && e.filterSize && e.filterSize.height || "400%",
        x: e && e.filterSize && e.filterSize.x || "-100%",
        y: e && e.filterSize && e.filterSize.y || "-100%"
      }
    }, this.globalData = {
      _mdf: !1,
      frameNum: -1,
      renderConfig: this.renderConfig
    }, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0, this.rendererType = "html";
  }
  function MaskElement(t, e, r) {
    this.data = t, this.element = e, this.globalData = r, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
    var i,
      s,
      a = this.globalData.defs,
      n = this.masksProperties ? this.masksProperties.length : 0;
    this.viewData = createSizedArray(n), this.solidPath = "";
    var o,
      h,
      l,
      p,
      m,
      f,
      c = this.masksProperties,
      d = 0,
      u = [],
      y = createElementID(),
      g = "clipPath",
      v = "clip-path";
    for (i = 0; i < n; i += 1) if (("a" !== c[i].mode && "n" !== c[i].mode || c[i].inv || 100 !== c[i].o.k || c[i].o.x) && (v = g = "mask"), "s" !== c[i].mode && "i" !== c[i].mode || 0 !== d ? l = null : ((l = createNS("rect")).setAttribute("fill", "#ffffff"), l.setAttribute("width", this.element.comp.data.w || 0), l.setAttribute("height", this.element.comp.data.h || 0), u.push(l)), s = createNS("path"), "n" === c[i].mode) this.viewData[i] = {
      op: PropertyFactory.getProp(this.element, c[i].o, 0, .01, this.element),
      prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3),
      elem: s,
      lastPath: ""
    }, a.appendChild(s);else {
      var b;
      if (d += 1, s.setAttribute("fill", "s" === c[i].mode ? "#000000" : "#ffffff"), s.setAttribute("clip-rule", "nonzero"), 0 !== c[i].x.k ? (v = g = "mask", f = PropertyFactory.getProp(this.element, c[i].x, 0, null, this.element), b = createElementID(), (p = createNS("filter")).setAttribute("id", b), (m = createNS("feMorphology")).setAttribute("operator", "erode"), m.setAttribute("in", "SourceGraphic"), m.setAttribute("radius", "0"), p.appendChild(m), a.appendChild(p), s.setAttribute("stroke", "s" === c[i].mode ? "#000000" : "#ffffff")) : f = m = null, this.storedData[i] = {
        elem: s,
        x: f,
        expan: m,
        lastPath: "",
        lastOperator: "",
        filterId: b,
        lastRadius: 0
      }, "i" === c[i].mode) {
        h = u.length;
        var P = createNS("g");
        for (o = 0; o < h; o += 1) P.appendChild(u[o]);
        var x = createNS("mask");
        x.setAttribute("mask-type", "alpha"), x.setAttribute("id", y + "_" + d), x.appendChild(s), a.appendChild(x), P.setAttribute("mask", "url(" + locationHref + "#" + y + "_" + d + ")"), u.length = 0, u.push(P);
      } else u.push(s);
      c[i].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[i] = {
        elem: s,
        lastPath: "",
        op: PropertyFactory.getProp(this.element, c[i].o, 0, .01, this.element),
        prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3),
        invRect: l
      }, this.viewData[i].prop.k || this.drawPath(c[i], this.viewData[i].prop.v, this.viewData[i]);
    }
    for (this.maskElement = createNS(g), n = u.length, i = 0; i < n; i += 1) this.maskElement.appendChild(u[i]);
    0 < d && (this.maskElement.setAttribute("id", y), this.element.maskedElement.setAttribute(v, "url(" + locationHref + "#" + y + ")"), a.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this);
  }
  function HierarchyElement() {}
  function FrameElement() {}
  function TransformElement() {}
  function RenderableElement() {}
  function RenderableDOMElement() {}
  function ProcessedElement(t, e) {
    this.elem = t, this.pos = e;
  }
  function SVGStyleData(t, e) {
    this.data = t, this.type = t.ty, this.d = "", this.lvl = e, this._mdf = !1, this.closed = !0 === t.hd, this.pElem = createNS("path"), this.msElem = null;
  }
  function SVGShapeData(t, e, r) {
    this.caches = [], this.styles = [], this.transformers = t, this.lStr = "", this.sh = r, this.lvl = e, this._isAnimated = !!r.k;
    for (var i = 0, s = t.length; i < s;) {
      if (t[i].mProps.dynamicProperties.length) {
        this._isAnimated = !0;
        break;
      }
      i += 1;
    }
  }
  function SVGTransformData(t, e, r) {
    this.transform = {
      mProps: t,
      op: e,
      container: r
    }, this.elements = [], this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length;
  }
  function SVGStrokeStyleData(t, e, r) {
    this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r, this._isAnimated = !!this._isAnimated;
  }
  function SVGFillStyleData(t, e, r) {
    this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r;
  }
  function SVGGradientFillStyleData(t, e, r) {
    this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.initGradientData(t, e, r);
  }
  function SVGGradientStrokeStyleData(t, e, r) {
    this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.initGradientData(t, e, r), this._isAnimated = !!this._isAnimated;
  }
  function ShapeGroupData() {
    this.it = [], this.prevViewData = [], this.gr = createNS("g");
  }
  BaseRenderer.prototype.checkLayers = function (t) {
    var e,
      r,
      i = this.layers.length;
    for (this.completeLayers = !0, e = i - 1; 0 <= e; e -= 1) this.elements[e] || (r = this.layers[e]).ip - r.st <= t - this.layers[e].st && r.op - r.st > t - this.layers[e].st && this.buildItem(e), this.completeLayers = !!this.elements[e] && this.completeLayers;
    this.checkPendingElements();
  }, BaseRenderer.prototype.createItem = function (t) {
    switch (t.ty) {
      case 2:
        return this.createImage(t);
      case 0:
        return this.createComp(t);
      case 1:
        return this.createSolid(t);
      case 3:
        return this.createNull(t);
      case 4:
        return this.createShape(t);
      case 5:
        return this.createText(t);
      case 6:
        return this.createAudio(t);
      case 13:
        return this.createCamera(t);
      default:
        return this.createNull(t);
    }
  }, BaseRenderer.prototype.createCamera = function () {
    throw new Error("You're using a 3d camera. Try the html renderer.");
  }, BaseRenderer.prototype.createAudio = function (t) {
    return new AudioElement(t, this.globalData, this);
  }, BaseRenderer.prototype.buildAllItems = function () {
    var t,
      e = this.layers.length;
    for (t = 0; t < e; t += 1) this.buildItem(t);
    this.checkPendingElements();
  }, BaseRenderer.prototype.includeLayers = function (t) {
    var e;
    this.completeLayers = !1;
    var r,
      i = t.length,
      s = this.layers.length;
    for (e = 0; e < i; e += 1) for (r = 0; r < s;) {
      if (this.layers[r].id === t[e].id) {
        this.layers[r] = t[e];
        break;
      }
      r += 1;
    }
  }, BaseRenderer.prototype.setProjectInterface = function (t) {
    this.globalData.projectInterface = t;
  }, BaseRenderer.prototype.initItems = function () {
    this.globalData.progressiveLoad || this.buildAllItems();
  }, BaseRenderer.prototype.buildElementParenting = function (t, e, r) {
    for (var i = this.elements, s = this.layers, a = 0, n = s.length; a < n;) s[a].ind == e && (i[a] && !0 !== i[a] ? (r.push(i[a]), i[a].setAsParent(), void 0 !== s[a].parent ? this.buildElementParenting(t, s[a].parent, r) : t.setHierarchy(r)) : (this.buildItem(a), this.addPendingElement(t))), a += 1;
  }, BaseRenderer.prototype.addPendingElement = function (t) {
    this.pendingElements.push(t);
  }, BaseRenderer.prototype.searchExtraCompositions = function (t) {
    var e,
      r = t.length;
    for (e = 0; e < r; e += 1) if (t[e].xt) {
      var i = this.createComp(t[e]);
      i.initExpressions(), this.globalData.projectInterface.registerComposition(i);
    }
  }, BaseRenderer.prototype.setupGlobalData = function (t, e) {
    this.globalData.fontManager = new FontManager(), this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.audioController = this.animationItem.audioController, this.globalData.frameId = 0, this.globalData.frameRate = t.fr, this.globalData.nm = t.nm, this.globalData.compSize = {
      w: t.w,
      h: t.h
    };
  }, extendPrototype([BaseRenderer], SVGRenderer), SVGRenderer.prototype.createNull = function (t) {
    return new NullElement(t, this.globalData, this);
  }, SVGRenderer.prototype.createShape = function (t) {
    return new SVGShapeElement(t, this.globalData, this);
  }, SVGRenderer.prototype.createText = function (t) {
    return new SVGTextLottieElement(t, this.globalData, this);
  }, SVGRenderer.prototype.createImage = function (t) {
    return new IImageElement(t, this.globalData, this);
  }, SVGRenderer.prototype.createComp = function (t) {
    return new SVGCompElement(t, this.globalData, this);
  }, SVGRenderer.prototype.createSolid = function (t) {
    return new ISolidElement(t, this.globalData, this);
  }, SVGRenderer.prototype.configAnimation = function (t) {
    this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w), this.svgElement.setAttribute("height", t.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%", this.svgElement.style.transform = "translate3d(0,0,0)"), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.svgElement.setAttribute("id", this.renderConfig.id), void 0 !== this.renderConfig.focusable && this.svgElement.setAttribute("focusable", this.renderConfig.focusable), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
    var e = this.globalData.defs;
    this.setupGlobalData(t, e), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = t;
    var r = createNS("clipPath"),
      i = createNS("rect");
    i.setAttribute("width", t.w), i.setAttribute("height", t.h), i.setAttribute("x", 0), i.setAttribute("y", 0);
    var s = createElementID();
    r.setAttribute("id", s), r.appendChild(i), this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + s + ")"), e.appendChild(r), this.layers = t.layers, this.elements = createSizedArray(t.layers.length);
  }, SVGRenderer.prototype.destroy = function () {
    var t;
    this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""), this.layerElement = null, this.globalData.defs = null;
    var e = this.layers ? this.layers.length : 0;
    for (t = 0; t < e; t += 1) this.elements[t] && this.elements[t].destroy();
    this.elements.length = 0, this.destroyed = !0, this.animationItem = null;
  }, SVGRenderer.prototype.updateContainerSize = function () {}, SVGRenderer.prototype.buildItem = function (t) {
    var e = this.elements;
    if (!e[t] && 99 !== this.layers[t].ty) {
      e[t] = !0;
      var r = this.createItem(this.layers[t]);
      e[t] = r, expressionsPlugin && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(r), r.initExpressions()), this.appendElementInPos(r, t), this.layers[t].tt && (this.elements[t - 1] && !0 !== this.elements[t - 1] ? r.setMatte(e[t - 1].layerId) : (this.buildItem(t - 1), this.addPendingElement(r)));
    }
  }, SVGRenderer.prototype.checkPendingElements = function () {
    for (; this.pendingElements.length;) {
      var t = this.pendingElements.pop();
      if (t.checkParenting(), t.data.tt) for (var e = 0, r = this.elements.length; e < r;) {
        if (this.elements[e] === t) {
          t.setMatte(this.elements[e - 1].layerId);
          break;
        }
        e += 1;
      }
    }
  }, SVGRenderer.prototype.renderFrame = function (t) {
    if (this.renderedFrame !== t && !this.destroyed) {
      var e;
      null === t ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t, this.globalData._mdf = !1;
      var r = this.layers.length;
      for (this.completeLayers || this.checkLayers(t), e = r - 1; 0 <= e; e -= 1) (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
      if (this.globalData._mdf) for (e = 0; e < r; e += 1) (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
    }
  }, SVGRenderer.prototype.appendElementInPos = function (t, e) {
    var r = t.getBaseElement();
    if (r) {
      for (var i, s = 0; s < e;) this.elements[s] && !0 !== this.elements[s] && this.elements[s].getBaseElement() && (i = this.elements[s].getBaseElement()), s += 1;
      i ? this.layerElement.insertBefore(r, i) : this.layerElement.appendChild(r);
    }
  }, SVGRenderer.prototype.hide = function () {
    this.layerElement.style.display = "none";
  }, SVGRenderer.prototype.show = function () {
    this.layerElement.style.display = "block";
  }, extendPrototype([BaseRenderer], CanvasRenderer), CanvasRenderer.prototype.createShape = function (t) {
    return new CVShapeElement(t, this.globalData, this);
  }, CanvasRenderer.prototype.createText = function (t) {
    return new CVTextElement(t, this.globalData, this);
  }, CanvasRenderer.prototype.createImage = function (t) {
    return new CVImageElement(t, this.globalData, this);
  }, CanvasRenderer.prototype.createComp = function (t) {
    return new CVCompElement(t, this.globalData, this);
  }, CanvasRenderer.prototype.createSolid = function (t) {
    return new CVSolidElement(t, this.globalData, this);
  }, CanvasRenderer.prototype.createNull = SVGRenderer.prototype.createNull, CanvasRenderer.prototype.ctxTransform = function (t) {
    if (1 !== t[0] || 0 !== t[1] || 0 !== t[4] || 1 !== t[5] || 0 !== t[12] || 0 !== t[13]) if (this.renderConfig.clearCanvas) {
      this.transformMat.cloneFromProps(t);
      var e = this.contextData.cTr.props;
      this.transformMat.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]), this.contextData.cTr.cloneFromProps(this.transformMat.props);
      var r = this.contextData.cTr.props;
      this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]);
    } else this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13]);
  }, CanvasRenderer.prototype.ctxOpacity = function (t) {
    if (!this.renderConfig.clearCanvas) return this.canvasContext.globalAlpha *= t < 0 ? 0 : t, void (this.globalData.currentGlobalAlpha = this.contextData.cO);
    this.contextData.cO *= t < 0 ? 0 : t, this.globalData.currentGlobalAlpha !== this.contextData.cO && (this.canvasContext.globalAlpha = this.contextData.cO, this.globalData.currentGlobalAlpha = this.contextData.cO);
  }, CanvasRenderer.prototype.reset = function () {
    this.renderConfig.clearCanvas ? this.contextData.reset() : this.canvasContext.restore();
  }, CanvasRenderer.prototype.save = function (t) {
    if (this.renderConfig.clearCanvas) {
      t && this.canvasContext.save();
      var e,
        r = this.contextData.cTr.props;
      this.contextData._length <= this.contextData.cArrPos && this.contextData.duplicate();
      var i = this.contextData.saved[this.contextData.cArrPos];
      for (e = 0; e < 16; e += 1) i[e] = r[e];
      this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO, this.contextData.cArrPos += 1;
    } else this.canvasContext.save();
  }, CanvasRenderer.prototype.restore = function (t) {
    if (this.renderConfig.clearCanvas) {
      t && (this.canvasContext.restore(), this.globalData.blendMode = "source-over"), this.contextData.cArrPos -= 1;
      var e,
        r = this.contextData.saved[this.contextData.cArrPos],
        i = this.contextData.cTr.props;
      for (e = 0; e < 16; e += 1) i[e] = r[e];
      this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]), r = this.contextData.savedOp[this.contextData.cArrPos], this.contextData.cO = r, this.globalData.currentGlobalAlpha !== r && (this.canvasContext.globalAlpha = r, this.globalData.currentGlobalAlpha = r);
    } else this.canvasContext.restore();
  }, CanvasRenderer.prototype.configAnimation = function (t) {
    if (this.animationItem.wrapper) {
      this.animationItem.container = createTag("canvas");
      var e = this.animationItem.container.style;
      e.width = "100%", e.height = "100%";
      var r = "0px 0px 0px";
      e.transformOrigin = r, e.mozTransformOrigin = r, e.webkitTransformOrigin = r, e["-webkit-transform"] = r, this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d"), this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.animationItem.container.setAttribute("id", this.renderConfig.id);
    } else this.canvasContext = this.renderConfig.context;
    this.data = t, this.layers = t.layers, this.transformCanvas = {
      w: t.w,
      h: t.h,
      sx: 0,
      sy: 0,
      tx: 0,
      ty: 0
    }, this.setupGlobalData(t, document.body), this.globalData.canvasContext = this.canvasContext, (this.globalData.renderer = this).globalData.isDashed = !1, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.transformCanvas = this.transformCanvas, this.elements = createSizedArray(t.layers.length), this.updateContainerSize();
  }, CanvasRenderer.prototype.updateContainerSize = function () {
    var t, e, r, i;
    if (this.reset(), this.animationItem.wrapper && this.animationItem.container ? (t = this.animationItem.wrapper.offsetWidth, e = this.animationItem.wrapper.offsetHeight, this.animationItem.container.setAttribute("width", t * this.renderConfig.dpr), this.animationItem.container.setAttribute("height", e * this.renderConfig.dpr)) : (t = this.canvasContext.canvas.width * this.renderConfig.dpr, e = this.canvasContext.canvas.height * this.renderConfig.dpr), -1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") || -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice")) {
      var s = this.renderConfig.preserveAspectRatio.split(" "),
        a = s[1] || "meet",
        n = s[0] || "xMidYMid",
        o = n.substr(0, 4),
        h = n.substr(4);
      r = t / e, i = this.transformCanvas.w / this.transformCanvas.h, this.transformCanvas.sy = r < i && "meet" === a || i < r && "slice" === a ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), t / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = e / (this.transformCanvas.h / this.renderConfig.dpr), e / (this.transformCanvas.h / this.renderConfig.dpr)), this.transformCanvas.tx = "xMid" === o && (i < r && "meet" === a || r < i && "slice" === a) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === o && (i < r && "meet" === a || r < i && "slice" === a) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) * this.renderConfig.dpr : 0, this.transformCanvas.ty = "YMid" === h && (r < i && "meet" === a || i < r && "slice" === a) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === h && (r < i && "meet" === a || i < r && "slice" === a) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) * this.renderConfig.dpr : 0;
    } else "none" === this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr)) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0;
    this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1], this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip(), this.renderFrame(this.renderedFrame, !0);
  }, CanvasRenderer.prototype.destroy = function () {
    var t;
    for (this.renderConfig.clearCanvas && this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""), t = (this.layers ? this.layers.length : 0) - 1; 0 <= t; t -= 1) this.elements[t] && this.elements[t].destroy();
    this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0;
  }, CanvasRenderer.prototype.renderFrame = function (t, e) {
    if ((this.renderedFrame !== t || !0 !== this.renderConfig.clearCanvas || e) && !this.destroyed && -1 !== t) {
      var r;
      this.renderedFrame = t, this.globalData.frameNum = t - this.animationItem._isFirstFrame, this.globalData.frameId += 1, this.globalData._mdf = !this.renderConfig.clearCanvas || e, this.globalData.projectInterface.currentFrame = t;
      var i = this.layers.length;
      for (this.completeLayers || this.checkLayers(t), r = 0; r < i; r += 1) (this.completeLayers || this.elements[r]) && this.elements[r].prepareFrame(t - this.layers[r].st);
      if (this.globalData._mdf) {
        for (!0 === this.renderConfig.clearCanvas ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(), r = i - 1; 0 <= r; r -= 1) (this.completeLayers || this.elements[r]) && this.elements[r].renderFrame();
        !0 !== this.renderConfig.clearCanvas && this.restore();
      }
    }
  }, CanvasRenderer.prototype.buildItem = function (t) {
    var e = this.elements;
    if (!e[t] && 99 !== this.layers[t].ty) {
      var r = this.createItem(this.layers[t], this, this.globalData);
      (e[t] = r).initExpressions();
    }
  }, CanvasRenderer.prototype.checkPendingElements = function () {
    for (; this.pendingElements.length;) {
      this.pendingElements.pop().checkParenting();
    }
  }, CanvasRenderer.prototype.hide = function () {
    this.animationItem.container.style.display = "none";
  }, CanvasRenderer.prototype.show = function () {
    this.animationItem.container.style.display = "block";
  }, extendPrototype([BaseRenderer], HybridRenderer), HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem, HybridRenderer.prototype.checkPendingElements = function () {
    for (; this.pendingElements.length;) {
      this.pendingElements.pop().checkParenting();
    }
  }, HybridRenderer.prototype.appendElementInPos = function (t, e) {
    var r = t.getBaseElement();
    if (r) {
      var i = this.layers[e];
      if (i.ddd && this.supports3d) this.addTo3dContainer(r, e);else if (this.threeDElements) this.addTo3dContainer(r, e);else {
        for (var s, a, n = 0; n < e;) this.elements[n] && !0 !== this.elements[n] && this.elements[n].getBaseElement && (a = this.elements[n], s = (this.layers[n].ddd ? this.getThreeDContainerByPos(n) : a.getBaseElement()) || s), n += 1;
        s ? i.ddd && this.supports3d || this.layerElement.insertBefore(r, s) : i.ddd && this.supports3d || this.layerElement.appendChild(r);
      }
    }
  }, HybridRenderer.prototype.createShape = function (t) {
    return this.supports3d ? new HShapeElement(t, this.globalData, this) : new SVGShapeElement(t, this.globalData, this);
  }, HybridRenderer.prototype.createText = function (t) {
    return this.supports3d ? new HTextElement(t, this.globalData, this) : new SVGTextLottieElement(t, this.globalData, this);
  }, HybridRenderer.prototype.createCamera = function (t) {
    return this.camera = new HCameraElement(t, this.globalData, this), this.camera;
  }, HybridRenderer.prototype.createImage = function (t) {
    return this.supports3d ? new HImageElement(t, this.globalData, this) : new IImageElement(t, this.globalData, this);
  }, HybridRenderer.prototype.createComp = function (t) {
    return this.supports3d ? new HCompElement(t, this.globalData, this) : new SVGCompElement(t, this.globalData, this);
  }, HybridRenderer.prototype.createSolid = function (t) {
    return this.supports3d ? new HSolidElement(t, this.globalData, this) : new ISolidElement(t, this.globalData, this);
  }, HybridRenderer.prototype.createNull = SVGRenderer.prototype.createNull, HybridRenderer.prototype.getThreeDContainerByPos = function (t) {
    for (var e = 0, r = this.threeDElements.length; e < r;) {
      if (this.threeDElements[e].startPos <= t && this.threeDElements[e].endPos >= t) return this.threeDElements[e].perspectiveElem;
      e += 1;
    }
    return null;
  }, HybridRenderer.prototype.createThreeDContainer = function (t, e) {
    var r,
      i,
      s = createTag("div");
    styleDiv(s);
    var a = createTag("div");
    if (styleDiv(a), "3d" === e) {
      (r = s.style).width = this.globalData.compSize.w + "px", r.height = this.globalData.compSize.h + "px";
      var n = "50% 50%";
      r.webkitTransformOrigin = n, r.mozTransformOrigin = n, r.transformOrigin = n;
      var o = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
      (i = a.style).transform = o, i.webkitTransform = o;
    }
    s.appendChild(a);
    var h = {
      container: a,
      perspectiveElem: s,
      startPos: t,
      endPos: t,
      type: e
    };
    return this.threeDElements.push(h), h;
  }, HybridRenderer.prototype.build3dContainers = function () {
    var t,
      e,
      r = this.layers.length,
      i = "";
    for (t = 0; t < r; t += 1) this.layers[t].ddd && 3 !== this.layers[t].ty ? "3d" !== i && (i = "3d", e = this.createThreeDContainer(t, "3d")) : "2d" !== i && (i = "2d", e = this.createThreeDContainer(t, "2d")), e.endPos = Math.max(e.endPos, t);
    for (t = (r = this.threeDElements.length) - 1; 0 <= t; t -= 1) this.resizerElem.appendChild(this.threeDElements[t].perspectiveElem);
  }, HybridRenderer.prototype.addTo3dContainer = function (t, e) {
    for (var r = 0, i = this.threeDElements.length; r < i;) {
      if (e <= this.threeDElements[r].endPos) {
        for (var s, a = this.threeDElements[r].startPos; a < e;) this.elements[a] && this.elements[a].getBaseElement && (s = this.elements[a].getBaseElement()), a += 1;
        s ? this.threeDElements[r].container.insertBefore(t, s) : this.threeDElements[r].container.appendChild(t);
        break;
      }
      r += 1;
    }
  }, HybridRenderer.prototype.configAnimation = function (t) {
    var e = createTag("div"),
      r = this.animationItem.wrapper,
      i = e.style;
    i.width = t.w + "px", i.height = t.h + "px", styleDiv(this.resizerElem = e), i.transformStyle = "flat", i.mozTransformStyle = "flat", i.webkitTransformStyle = "flat", this.renderConfig.className && e.setAttribute("class", this.renderConfig.className), r.appendChild(e), i.overflow = "hidden";
    var s = createNS("svg");
    s.setAttribute("width", "1"), s.setAttribute("height", "1"), styleDiv(s), this.resizerElem.appendChild(s);
    var a = createNS("defs");
    s.appendChild(a), this.data = t, this.setupGlobalData(t, s), this.globalData.defs = a, this.layers = t.layers, this.layerElement = this.resizerElem, this.build3dContainers(), this.updateContainerSize();
  }, HybridRenderer.prototype.destroy = function () {
    var t;
    this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""), this.animationItem.container = null, this.globalData.defs = null;
    var e = this.layers ? this.layers.length : 0;
    for (t = 0; t < e; t += 1) this.elements[t].destroy();
    this.elements.length = 0, this.destroyed = !0, this.animationItem = null;
  }, HybridRenderer.prototype.updateContainerSize = function () {
    var t,
      e,
      r,
      i,
      s = this.animationItem.wrapper.offsetWidth,
      a = this.animationItem.wrapper.offsetHeight;
    i = s / a < this.globalData.compSize.w / this.globalData.compSize.h ? (t = s / this.globalData.compSize.w, e = s / this.globalData.compSize.w, r = 0, (a - this.globalData.compSize.h * (s / this.globalData.compSize.w)) / 2) : (t = a / this.globalData.compSize.h, e = a / this.globalData.compSize.h, r = (s - this.globalData.compSize.w * (a / this.globalData.compSize.h)) / 2, 0);
    var n = this.resizerElem.style;
    n.webkitTransform = "matrix3d(" + t + ",0,0,0,0," + e + ",0,0,0,0,1,0," + r + "," + i + ",0,1)", n.transform = n.webkitTransform;
  }, HybridRenderer.prototype.renderFrame = SVGRenderer.prototype.renderFrame, HybridRenderer.prototype.hide = function () {
    this.resizerElem.style.display = "none";
  }, HybridRenderer.prototype.show = function () {
    this.resizerElem.style.display = "block";
  }, HybridRenderer.prototype.initItems = function () {
    if (this.buildAllItems(), this.camera) this.camera.setup();else {
      var t,
        e = this.globalData.compSize.w,
        r = this.globalData.compSize.h,
        i = this.threeDElements.length;
      for (t = 0; t < i; t += 1) {
        var s = this.threeDElements[t].perspectiveElem.style;
        s.webkitPerspective = Math.sqrt(Math.pow(e, 2) + Math.pow(r, 2)) + "px", s.perspective = s.webkitPerspective;
      }
    }
  }, HybridRenderer.prototype.searchExtraCompositions = function (t) {
    var e,
      r = t.length,
      i = createTag("div");
    for (e = 0; e < r; e += 1) if (t[e].xt) {
      var s = this.createComp(t[e], i, this.globalData.comp, null);
      s.initExpressions(), this.globalData.projectInterface.registerComposition(s);
    }
  }, MaskElement.prototype.getMaskProperty = function (t) {
    return this.viewData[t].prop;
  }, MaskElement.prototype.renderFrame = function (t) {
    var e,
      r = this.element.finalTransform.mat,
      i = this.masksProperties.length;
    for (e = 0; e < i; e += 1) if ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]), (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v), "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && this.viewData[e].invRect.setAttribute("transform", r.getInverseMatrix().to2dCSS()), this.storedData[e].x && (this.storedData[e].x._mdf || t))) {
      var s = this.storedData[e].expan;
      this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode", this.storedData[e].elem.setAttribute("filter", "url(" + locationHref + "#" + this.storedData[e].filterId + ")")), s.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate", this.storedData[e].elem.setAttribute("filter", null)), this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v));
    }
  }, MaskElement.prototype.getMaskelement = function () {
    return this.maskElement;
  }, MaskElement.prototype.createLayerSolidPath = function () {
    var t = "M0,0 ";
    return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " ";
  }, MaskElement.prototype.drawPath = function (t, e, r) {
    var i,
      s,
      a = " M" + e.v[0][0] + "," + e.v[0][1];
    for (s = e._length, i = 1; i < s; i += 1) a += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[i][0] + "," + e.i[i][1] + " " + e.v[i][0] + "," + e.v[i][1];
    if (e.c && 1 < s && (a += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), r.lastPath !== a) {
      var n = "";
      r.elem && (e.c && (n = t.inv ? this.solidPath + a : a), r.elem.setAttribute("d", n)), r.lastPath = a;
    }
  }, MaskElement.prototype.destroy = function () {
    this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null;
  }, HierarchyElement.prototype = {
    initHierarchy: function initHierarchy() {
      this.hierarchy = [], this._isParent = !1, this.checkParenting();
    },
    setHierarchy: function setHierarchy(t) {
      this.hierarchy = t;
    },
    setAsParent: function setAsParent() {
      this._isParent = !0;
    },
    checkParenting: function checkParenting() {
      void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, []);
    }
  }, FrameElement.prototype = {
    initFrame: function initFrame() {
      this._isFirstFrame = !1, this.dynamicProperties = [], this._mdf = !1;
    },
    prepareProperties: function prepareProperties(t, e) {
      var r,
        i = this.dynamicProperties.length;
      for (r = 0; r < i; r += 1) (e || this._isParent && "transform" === this.dynamicProperties[r].propType) && (this.dynamicProperties[r].getValue(), this.dynamicProperties[r]._mdf && (this.globalData._mdf = !0, this._mdf = !0));
    },
    addDynamicProperty: function addDynamicProperty(t) {
      -1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t);
    }
  }, TransformElement.prototype = {
    initTransform: function initTransform() {
      this.finalTransform = {
        mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : {
          o: 0
        },
        _matMdf: !1,
        _opMdf: !1,
        mat: new Matrix()
      }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.data.ty;
    },
    renderTransform: function renderTransform() {
      if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
        var t,
          e = this.finalTransform.mat,
          r = 0,
          i = this.hierarchy.length;
        if (!this.finalTransform._matMdf) for (; r < i;) {
          if (this.hierarchy[r].finalTransform.mProp._mdf) {
            this.finalTransform._matMdf = !0;
            break;
          }
          r += 1;
        }
        if (this.finalTransform._matMdf) for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), r = 0; r < i; r += 1) t = this.hierarchy[r].finalTransform.mProp.v.props, e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
      }
    },
    globalToLocal: function globalToLocal(t) {
      var e = [];
      e.push(this.finalTransform);
      for (var r, i = !0, s = this.comp; i;) s.finalTransform ? (s.data.hasMask && e.splice(0, 0, s.finalTransform), s = s.comp) : i = !1;
      var a,
        n = e.length;
      for (r = 0; r < n; r += 1) a = e[r].mat.applyToPointArray(0, 0, 0), t = [t[0] - a[0], t[1] - a[1], 0];
      return t;
    },
    mHelper: new Matrix()
  }, RenderableElement.prototype = {
    initRenderable: function initRenderable() {
      this.isInRange = !1, this.hidden = !1, this.isTransparent = !1, this.renderableComponents = [];
    },
    addRenderableComponent: function addRenderableComponent(t) {
      -1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t);
    },
    removeRenderableComponent: function removeRenderableComponent(t) {
      -1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1);
    },
    prepareRenderableFrame: function prepareRenderableFrame(t) {
      this.checkLayerLimits(t);
    },
    checkTransparency: function checkTransparency() {
      this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0, this.hide()) : this.isTransparent && (this.isTransparent = !1, this.show());
    },
    checkLayerLimits: function checkLayerLimits(t) {
      this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? !0 !== this.isInRange && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : !1 !== this.isInRange && (this.globalData._mdf = !0, this.isInRange = !1, this.hide());
    },
    renderRenderable: function renderRenderable() {
      var t,
        e = this.renderableComponents.length;
      for (t = 0; t < e; t += 1) this.renderableComponents[t].renderFrame(this._isFirstFrame);
    },
    sourceRectAtTime: function sourceRectAtTime() {
      return {
        top: 0,
        left: 0,
        width: 100,
        height: 100
      };
    },
    getLayerSize: function getLayerSize() {
      return 5 === this.data.ty ? {
        w: this.data.textData.width,
        h: this.data.textData.height
      } : {
        w: this.data.width,
        h: this.data.height
      };
    }
  }, extendPrototype([RenderableElement, createProxyFunction({
    initElement: function initElement(t, e, r) {
      this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide();
    },
    hide: function hide() {
      this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none", this.hidden = !0);
    },
    show: function show() {
      this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"), this.hidden = !1, this._isFirstFrame = !0);
    },
    renderFrame: function renderFrame() {
      this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1));
    },
    renderInnerContent: function renderInnerContent() {},
    prepareFrame: function prepareFrame(t) {
      this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.checkTransparency();
    },
    destroy: function destroy() {
      this.innerElem = null, this.destroyBaseElement();
    }
  })], RenderableDOMElement), SVGStyleData.prototype.reset = function () {
    this.d = "", this._mdf = !1;
  }, SVGShapeData.prototype.setAsAnimated = function () {
    this._isAnimated = !0;
  }, extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData), extendPrototype([DynamicPropertyContainer], SVGFillStyleData), SVGGradientFillStyleData.prototype.initGradientData = function (t, e, r) {
    this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.s = PropertyFactory.getProp(t, e.s, 1, null, this), this.e = PropertyFactory.getProp(t, e.e, 1, null, this), this.h = PropertyFactory.getProp(t, e.h || {
      k: 0
    }, 0, .01, this), this.a = PropertyFactory.getProp(t, e.a || {
      k: 0
    }, 0, degToRads, this), this.g = new GradientProperty(t, e.g, this), this.style = r, this.stops = [], this.setGradientData(r.pElem, e), this.setGradientOpacity(e, r), this._isAnimated = !!this._isAnimated;
  }, SVGGradientFillStyleData.prototype.setGradientData = function (t, e) {
    var r = createElementID(),
      i = createNS(1 === e.t ? "linearGradient" : "radialGradient");
    i.setAttribute("id", r), i.setAttribute("spreadMethod", "pad"), i.setAttribute("gradientUnits", "userSpaceOnUse");
    var s,
      a,
      n,
      o = [];
    for (n = 4 * e.g.p, a = 0; a < n; a += 4) s = createNS("stop"), i.appendChild(s), o.push(s);
    t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(" + locationHref + "#" + r + ")"), this.gf = i, this.cst = o;
  }, SVGGradientFillStyleData.prototype.setGradientOpacity = function (t, e) {
    if (this.g._hasOpacity && !this.g._collapsable) {
      var r,
        i,
        s,
        a = createNS("mask"),
        n = createNS("path");
      a.appendChild(n);
      var o = createElementID(),
        h = createElementID();
      a.setAttribute("id", h);
      var l = createNS(1 === t.t ? "linearGradient" : "radialGradient");
      l.setAttribute("id", o), l.setAttribute("spreadMethod", "pad"), l.setAttribute("gradientUnits", "userSpaceOnUse"), s = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
      var p = this.stops;
      for (i = 4 * t.g.p; i < s; i += 2) (r = createNS("stop")).setAttribute("stop-color", "rgb(255,255,255)"), l.appendChild(r), p.push(r);
      n.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(" + locationHref + "#" + o + ")"), this.of = l, this.ms = a, this.ost = p, this.maskId = h, e.msElem = n;
    }
  }, extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData), extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);
  var SVGElementsRenderer = function () {
    var y = new Matrix(),
      g = new Matrix();
    function e(t, e, r) {
      (r || e.transform.op._mdf) && e.transform.container.setAttribute("opacity", e.transform.op.v), (r || e.transform.mProps._mdf) && e.transform.container.setAttribute("transform", e.transform.mProps.v.to2dCSS());
    }
    function r(t, e, r) {
      var i,
        s,
        a,
        n,
        o,
        h,
        l,
        p,
        m,
        f,
        c,
        d = e.styles.length,
        u = e.lvl;
      for (h = 0; h < d; h += 1) {
        if (n = e.sh._mdf || r, e.styles[h].lvl < u) {
          for (p = g.reset(), f = u - e.styles[h].lvl, c = e.transformers.length - 1; !n && 0 < f;) n = e.transformers[c].mProps._mdf || n, f -= 1, c -= 1;
          if (n) for (f = u - e.styles[h].lvl, c = e.transformers.length - 1; 0 < f;) m = e.transformers[c].mProps.v.props, p.transform(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]), f -= 1, c -= 1;
        } else p = y;
        if (s = (l = e.sh.paths)._length, n) {
          for (a = "", i = 0; i < s; i += 1) (o = l.shapes[i]) && o._length && (a += buildShapeString(o, o._length, o.c, p));
          e.caches[h] = a;
        } else a = e.caches[h];
        e.styles[h].d += !0 === t.hd ? "" : a, e.styles[h]._mdf = n || e.styles[h]._mdf;
      }
    }
    function i(t, e, r) {
      var i = e.style;
      (e.c._mdf || r) && i.pElem.setAttribute("fill", "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("fill-opacity", e.o.v);
    }
    function s(t, e, r) {
      a(t, e, r), n(t, e, r);
    }
    function a(t, e, r) {
      var i,
        s,
        a,
        n,
        o,
        h = e.gf,
        l = e.g._hasOpacity,
        p = e.s.v,
        m = e.e.v;
      if (e.o._mdf || r) {
        var f = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
        e.style.pElem.setAttribute(f, e.o.v);
      }
      if (e.s._mdf || r) {
        var c = 1 === t.t ? "x1" : "cx",
          d = "x1" === c ? "y1" : "cy";
        h.setAttribute(c, p[0]), h.setAttribute(d, p[1]), l && !e.g._collapsable && (e.of.setAttribute(c, p[0]), e.of.setAttribute(d, p[1]));
      }
      if (e.g._cmdf || r) {
        i = e.cst;
        var u = e.g.c;
        for (a = i.length, s = 0; s < a; s += 1) (n = i[s]).setAttribute("offset", u[4 * s] + "%"), n.setAttribute("stop-color", "rgb(" + u[4 * s + 1] + "," + u[4 * s + 2] + "," + u[4 * s + 3] + ")");
      }
      if (l && (e.g._omdf || r)) {
        var y = e.g.o;
        for (a = (i = e.g._collapsable ? e.cst : e.ost).length, s = 0; s < a; s += 1) n = i[s], e.g._collapsable || n.setAttribute("offset", y[2 * s] + "%"), n.setAttribute("stop-opacity", y[2 * s + 1]);
      }
      if (1 === t.t) (e.e._mdf || r) && (h.setAttribute("x2", m[0]), h.setAttribute("y2", m[1]), l && !e.g._collapsable && (e.of.setAttribute("x2", m[0]), e.of.setAttribute("y2", m[1])));else if ((e.s._mdf || e.e._mdf || r) && (o = Math.sqrt(Math.pow(p[0] - m[0], 2) + Math.pow(p[1] - m[1], 2)), h.setAttribute("r", o), l && !e.g._collapsable && e.of.setAttribute("r", o)), e.e._mdf || e.h._mdf || e.a._mdf || r) {
        o || (o = Math.sqrt(Math.pow(p[0] - m[0], 2) + Math.pow(p[1] - m[1], 2)));
        var g = Math.atan2(m[1] - p[1], m[0] - p[0]),
          v = e.h.v;
        1 <= v ? v = .99 : v <= -1 && (v = -.99);
        var b = o * v,
          P = Math.cos(g + e.a.v) * b + p[0],
          x = Math.sin(g + e.a.v) * b + p[1];
        h.setAttribute("fx", P), h.setAttribute("fy", x), l && !e.g._collapsable && (e.of.setAttribute("fx", P), e.of.setAttribute("fy", x));
      }
    }
    function n(t, e, r) {
      var i = e.style,
        s = e.d;
      s && (s._mdf || r) && s.dashStr && (i.pElem.setAttribute("stroke-dasharray", s.dashStr), i.pElem.setAttribute("stroke-dashoffset", s.dashoffset[0])), e.c && (e.c._mdf || r) && i.pElem.setAttribute("stroke", "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("stroke-opacity", e.o.v), (e.w._mdf || r) && (i.pElem.setAttribute("stroke-width", e.w.v), i.msElem && i.msElem.setAttribute("stroke-width", e.w.v));
    }
    return {
      createRenderFunction: function createRenderFunction(t) {
        switch (t.ty) {
          case "fl":
            return i;
          case "gf":
            return a;
          case "gs":
            return s;
          case "st":
            return n;
          case "sh":
          case "el":
          case "rc":
          case "sr":
            return r;
          case "tr":
            return e;
          default:
            return null;
        }
      }
    };
  }();
  function ShapeTransformManager() {
    this.sequences = {}, this.sequenceList = [], this.transform_key_count = 0;
  }
  function CVShapeData(t, e, r, i) {
    this.styledShapes = [], this.tr = [0, 0, 0, 0, 0, 0];
    var s,
      a = 4;
    "rc" === e.ty ? a = 5 : "el" === e.ty ? a = 6 : "sr" === e.ty && (a = 7), this.sh = ShapePropertyFactory.getShapeProp(t, e, a, t);
    var n,
      o = r.length;
    for (s = 0; s < o; s += 1) r[s].closed || (n = {
      transforms: i.addTransformSequence(r[s].transforms),
      trNodes: []
    }, this.styledShapes.push(n), r[s].elements.push(n));
  }
  function BaseElement() {}
  function NullElement(t, e, r) {
    this.initFrame(), this.initBaseData(t, e, r), this.initFrame(), this.initTransform(t, e, r), this.initHierarchy();
  }
  function SVGBaseElement() {}
  function IShapeElement() {}
  function ITextElement() {}
  function ICompElement() {}
  function IImageElement(t, e, r) {
    this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r), this.sourceRect = {
      top: 0,
      left: 0,
      width: this.assetData.w,
      height: this.assetData.h
    };
  }
  function ISolidElement(t, e, r) {
    this.initElement(t, e, r);
  }
  function AudioElement(t, e, r) {
    this.initFrame(), this.initRenderable(), this.assetData = e.getAssetData(t.refId), this.initBaseData(t, e, r), this._isPlaying = !1, this._canPlay = !1;
    var i = this.globalData.getAssetsPath(this.assetData);
    this.audio = this.globalData.audioController.createAudio(i), this._currentTime = 0, this.globalData.audioController.addAudio(this), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
      _placeholder: !0
    };
  }
  function SVGCompElement(t, e, r) {
    this.layers = t.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
      _placeholder: !0
    };
  }
  function SVGTextLottieElement(t, e, r) {
    this.textSpans = [], this.renderType = "svg", this.initElement(t, e, r);
  }
  function SVGShapeElement(t, e, r) {
    this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(t, e, r), this.prevViewData = [];
  }
  function SVGTintFilter(t, e) {
    this.filterManager = e;
    var r = createNS("feColorMatrix");
    if (r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), r.setAttribute("result", "f1"), t.appendChild(r), (r = createNS("feColorMatrix")).setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), r.setAttribute("result", "f2"), t.appendChild(r), this.matrixFilter = r, 100 !== e.effectElements[2].p.v || e.effectElements[2].p.k) {
      var i,
        s = createNS("feMerge");
      t.appendChild(s), (i = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), s.appendChild(i), (i = createNS("feMergeNode")).setAttribute("in", "f2"), s.appendChild(i);
    }
  }
  function SVGFillFilter(t, e) {
    this.filterManager = e;
    var r = createNS("feColorMatrix");
    r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), t.appendChild(r), this.matrixFilter = r;
  }
  function SVGGaussianBlurEffect(t, e) {
    t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "300%"), t.setAttribute("height", "300%"), this.filterManager = e;
    var r = createNS("feGaussianBlur");
    t.appendChild(r), this.feGaussianBlur = r;
  }
  function SVGStrokeEffect(t, e) {
    this.initialized = !1, this.filterManager = e, this.elem = t, this.paths = [];
  }
  function SVGTritoneFilter(t, e) {
    this.filterManager = e;
    var r = createNS("feColorMatrix");
    r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), r.setAttribute("result", "f1"), t.appendChild(r);
    var i = createNS("feComponentTransfer");
    i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), this.matrixFilter = i;
    var s = createNS("feFuncR");
    s.setAttribute("type", "table"), i.appendChild(s), this.feFuncR = s;
    var a = createNS("feFuncG");
    a.setAttribute("type", "table"), i.appendChild(a), this.feFuncG = a;
    var n = createNS("feFuncB");
    n.setAttribute("type", "table"), i.appendChild(n), this.feFuncB = n;
  }
  function SVGProLevelsFilter(t, e) {
    this.filterManager = e;
    var r = this.filterManager.effectElements,
      i = createNS("feComponentTransfer");
    (r[10].p.k || 0 !== r[10].p.v || r[11].p.k || 1 !== r[11].p.v || r[12].p.k || 1 !== r[12].p.v || r[13].p.k || 0 !== r[13].p.v || r[14].p.k || 1 !== r[14].p.v) && (this.feFuncR = this.createFeFunc("feFuncR", i)), (r[17].p.k || 0 !== r[17].p.v || r[18].p.k || 1 !== r[18].p.v || r[19].p.k || 1 !== r[19].p.v || r[20].p.k || 0 !== r[20].p.v || r[21].p.k || 1 !== r[21].p.v) && (this.feFuncG = this.createFeFunc("feFuncG", i)), (r[24].p.k || 0 !== r[24].p.v || r[25].p.k || 1 !== r[25].p.v || r[26].p.k || 1 !== r[26].p.v || r[27].p.k || 0 !== r[27].p.v || r[28].p.k || 1 !== r[28].p.v) && (this.feFuncB = this.createFeFunc("feFuncB", i)), (r[31].p.k || 0 !== r[31].p.v || r[32].p.k || 1 !== r[32].p.v || r[33].p.k || 1 !== r[33].p.v || r[34].p.k || 0 !== r[34].p.v || r[35].p.k || 1 !== r[35].p.v) && (this.feFuncA = this.createFeFunc("feFuncA", i)), (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), i = createNS("feComponentTransfer")), (r[3].p.k || 0 !== r[3].p.v || r[4].p.k || 1 !== r[4].p.v || r[5].p.k || 1 !== r[5].p.v || r[6].p.k || 0 !== r[6].p.v || r[7].p.k || 1 !== r[7].p.v) && (i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), this.feFuncRComposed = this.createFeFunc("feFuncR", i), this.feFuncGComposed = this.createFeFunc("feFuncG", i), this.feFuncBComposed = this.createFeFunc("feFuncB", i));
  }
  function SVGDropShadowEffect(t, e) {
    var r = e.container.globalData.renderConfig.filterSize;
    t.setAttribute("x", r.x), t.setAttribute("y", r.y), t.setAttribute("width", r.width), t.setAttribute("height", r.height), this.filterManager = e;
    var i = createNS("feGaussianBlur");
    i.setAttribute("in", "SourceAlpha"), i.setAttribute("result", "drop_shadow_1"), i.setAttribute("stdDeviation", "0"), this.feGaussianBlur = i, t.appendChild(i);
    var s = createNS("feOffset");
    s.setAttribute("dx", "25"), s.setAttribute("dy", "0"), s.setAttribute("in", "drop_shadow_1"), s.setAttribute("result", "drop_shadow_2"), this.feOffset = s, t.appendChild(s);
    var a = createNS("feFlood");
    a.setAttribute("flood-color", "#00ff00"), a.setAttribute("flood-opacity", "1"), a.setAttribute("result", "drop_shadow_3"), this.feFlood = a, t.appendChild(a);
    var n = createNS("feComposite");
    n.setAttribute("in", "drop_shadow_3"), n.setAttribute("in2", "drop_shadow_2"), n.setAttribute("operator", "in"), n.setAttribute("result", "drop_shadow_4"), t.appendChild(n);
    var o,
      h = createNS("feMerge");
    t.appendChild(h), o = createNS("feMergeNode"), h.appendChild(o), (o = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), this.feMergeNode = o, this.feMerge = h, this.originalNodeAdded = !1, h.appendChild(o);
  }
  ShapeTransformManager.prototype = {
    addTransformSequence: function addTransformSequence(t) {
      var e,
        r = t.length,
        i = "_";
      for (e = 0; e < r; e += 1) i += t[e].transform.key + "_";
      var s = this.sequences[i];
      return s || (s = {
        transforms: [].concat(t),
        finalTransform: new Matrix(),
        _mdf: !1
      }, this.sequences[i] = s, this.sequenceList.push(s)), s;
    },
    processSequence: function processSequence(t, e) {
      for (var r, i = 0, s = t.transforms.length, a = e; i < s && !e;) {
        if (t.transforms[i].transform.mProps._mdf) {
          a = !0;
          break;
        }
        i += 1;
      }
      if (a) for (t.finalTransform.reset(), i = s - 1; 0 <= i; i -= 1) r = t.transforms[i].transform.mProps.v.props, t.finalTransform.transform(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15]);
      t._mdf = a;
    },
    processSequences: function processSequences(t) {
      var e,
        r = this.sequenceList.length;
      for (e = 0; e < r; e += 1) this.processSequence(this.sequenceList[e], t);
    },
    getNewKey: function getNewKey() {
      return this.transform_key_count += 1, "_" + this.transform_key_count;
    }
  }, CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated, BaseElement.prototype = {
    checkMasks: function checkMasks() {
      if (!this.data.hasMask) return !1;
      for (var t = 0, e = this.data.masksProperties.length; t < e;) {
        if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl) return !0;
        t += 1;
      }
      return !1;
    },
    initExpressions: function initExpressions() {
      this.layerInterface = LayerExpressionInterface(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
      var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
      this.layerInterface.registerEffectsInterface(t), 0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = TextExpressionInterface(this), this.layerInterface.text = this.layerInterface.textInterface);
    },
    setBlendMode: function setBlendMode() {
      var t = getBlendMode(this.data.bm);
      (this.baseElement || this.layerElement).style["mix-blend-mode"] = t;
    },
    initBaseData: function initBaseData(t, e, r) {
      this.globalData = e, this.comp = r, this.data = t, this.layerId = createElementID(), this.data.sr || (this.data.sr = 1), this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties);
    },
    getType: function getType() {
      return this.type;
    },
    sourceRectAtTime: function sourceRectAtTime() {}
  }, NullElement.prototype.prepareFrame = function (t) {
    this.prepareProperties(t, !0);
  }, NullElement.prototype.renderFrame = function () {}, NullElement.prototype.getBaseElement = function () {
    return null;
  }, NullElement.prototype.destroy = function () {}, NullElement.prototype.sourceRectAtTime = function () {}, NullElement.prototype.hide = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement), SVGBaseElement.prototype = {
    initRendererElement: function initRendererElement() {
      this.layerElement = createNS("g");
    },
    createContainerElements: function createContainerElements() {
      this.matteElement = createNS("g"), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = !1;
      var t,
        e,
        r,
        i = null;
      if (this.data.td) {
        if (3 == this.data.td || 1 == this.data.td) {
          var s = createNS("mask");
          s.setAttribute("id", this.layerId), s.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"), s.appendChild(this.layerElement), i = s, this.globalData.defs.appendChild(s), featureSupport.maskType || 1 != this.data.td || (s.setAttribute("mask-type", "luminance"), t = createElementID(), e = filtersFactory.createFilter(t), this.globalData.defs.appendChild(e), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), (r = createNS("g")).appendChild(this.layerElement), i = r, s.appendChild(r), r.setAttribute("filter", "url(" + locationHref + "#" + t + ")"));
        } else if (2 == this.data.td) {
          var a = createNS("mask");
          a.setAttribute("id", this.layerId), a.setAttribute("mask-type", "alpha");
          var n = createNS("g");
          a.appendChild(n), t = createElementID(), e = filtersFactory.createFilter(t);
          var o = createNS("feComponentTransfer");
          o.setAttribute("in", "SourceGraphic"), e.appendChild(o);
          var h = createNS("feFuncA");
          h.setAttribute("type", "table"), h.setAttribute("tableValues", "1.0 0.0"), o.appendChild(h), this.globalData.defs.appendChild(e);
          var l = createNS("rect");
          l.setAttribute("width", this.comp.data.w), l.setAttribute("height", this.comp.data.h), l.setAttribute("x", "0"), l.setAttribute("y", "0"), l.setAttribute("fill", "#ffffff"), l.setAttribute("opacity", "0"), n.setAttribute("filter", "url(" + locationHref + "#" + t + ")"), n.appendChild(l), n.appendChild(this.layerElement), i = n, featureSupport.maskType || (a.setAttribute("mask-type", "luminance"), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), r = createNS("g"), n.appendChild(l), r.appendChild(this.layerElement), i = r, n.appendChild(r)), this.globalData.defs.appendChild(a);
        }
      } else this.data.tt ? (this.matteElement.appendChild(this.layerElement), i = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
      if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 === this.data.ty && !this.data.hd) {
        var p = createNS("clipPath"),
          m = createNS("path");
        m.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
        var f = createElementID();
        if (p.setAttribute("id", f), p.appendChild(m), this.globalData.defs.appendChild(p), this.checkMasks()) {
          var c = createNS("g");
          c.setAttribute("clip-path", "url(" + locationHref + "#" + f + ")"), c.appendChild(this.layerElement), this.transformedElement = c, i ? i.appendChild(this.transformedElement) : this.baseElement = this.transformedElement;
        } else this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + f + ")");
      }
      0 !== this.data.bm && this.setBlendMode();
    },
    renderElement: function renderElement() {
      this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v);
    },
    destroyBaseElement: function destroyBaseElement() {
      this.layerElement = null, this.matteElement = null, this.maskManager.destroy();
    },
    getBaseElement: function getBaseElement() {
      return this.data.hd ? null : this.baseElement;
    },
    createRenderableComponents: function createRenderableComponents() {
      this.maskManager = new MaskElement(this.data, this, this.globalData), this.renderableEffectsManager = new SVGEffects(this);
    },
    setMatte: function setMatte(t) {
      this.matteElement && this.matteElement.setAttribute("mask", "url(" + locationHref + "#" + t + ")");
    }
  }, IShapeElement.prototype = {
    addShapeToModifiers: function addShapeToModifiers(t) {
      var e,
        r = this.shapeModifiers.length;
      for (e = 0; e < r; e += 1) this.shapeModifiers[e].addShape(t);
    },
    isShapeInAnimatedModifiers: function isShapeInAnimatedModifiers(t) {
      for (var e = this.shapeModifiers.length; 0 < e;) if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;
      return !1;
    },
    renderModifiers: function renderModifiers() {
      if (this.shapeModifiers.length) {
        var t,
          e = this.shapes.length;
        for (t = 0; t < e; t += 1) this.shapes[t].sh.reset();
        for (t = (e = this.shapeModifiers.length) - 1; 0 <= t; t -= 1) this.shapeModifiers[t].processShapes(this._isFirstFrame);
      }
    },
    lcEnum: {
      1: "butt",
      2: "round",
      3: "square"
    },
    ljEnum: {
      1: "miter",
      2: "round",
      3: "bevel"
    },
    searchProcessedElement: function searchProcessedElement(t) {
      for (var e = this.processedElements, r = 0, i = e.length; r < i;) {
        if (e[r].elem === t) return e[r].pos;
        r += 1;
      }
      return 0;
    },
    addProcessedElement: function addProcessedElement(t, e) {
      for (var r = this.processedElements, i = r.length; i;) if (r[i -= 1].elem === t) return void (r[i].pos = e);
      r.push(new ProcessedElement(t, e));
    },
    prepareFrame: function prepareFrame(t) {
      this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange);
    }
  }, ITextElement.prototype.initElement = function (t, e, r) {
    this.lettersChangedFlag = !0, this.initFrame(), this.initBaseData(t, e, r), this.textProperty = new TextProperty(this, t.t, this.dynamicProperties), this.textAnimator = new TextAnimatorProperty(t.t, this.renderType, this), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties);
  }, ITextElement.prototype.prepareFrame = function (t) {
    this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = !1, this.textProperty._mdf = !1);
  }, ITextElement.prototype.createPathShape = function (t, e) {
    var r,
      i,
      s = e.length,
      a = "";
    for (r = 0; r < s; r += 1) i = e[r].ks.k, a += buildShapeString(i, i.i.length, !0, t);
    return a;
  }, ITextElement.prototype.updateDocumentData = function (t, e) {
    this.textProperty.updateDocumentData(t, e);
  }, ITextElement.prototype.canResizeFont = function (t) {
    this.textProperty.canResizeFont(t);
  }, ITextElement.prototype.setMinimumFontSize = function (t) {
    this.textProperty.setMinimumFontSize(t);
  }, ITextElement.prototype.applyTextPropertiesToMatrix = function (t, e, r, i, s) {
    switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j) {
      case 1:
        e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]), 0, 0);
        break;
      case 2:
        e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]) / 2, 0, 0);
    }
    e.translate(i, s, 0);
  }, ITextElement.prototype.buildColor = function (t) {
    return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")";
  }, ITextElement.prototype.emptyProp = new LetterProps(), ITextElement.prototype.destroy = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement), ICompElement.prototype.initElement = function (t, e, r) {
    this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), !this.data.xt && e.progressiveLoad || this.buildAllItems(), this.hide();
  }, ICompElement.prototype.prepareFrame = function (t) {
    if (this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.isInRange || this.data.xt) {
      if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;else {
        var e = this.tm.v;
        e === this.data.op && (e = this.data.op - 1), this.renderedFrame = e;
      }
      var r,
        i = this.elements.length;
      for (this.completeLayers || this.checkLayers(this.renderedFrame), r = i - 1; 0 <= r; r -= 1) (this.completeLayers || this.elements[r]) && (this.elements[r].prepareFrame(this.renderedFrame - this.layers[r].st), this.elements[r]._mdf && (this._mdf = !0));
    }
  }, ICompElement.prototype.renderInnerContent = function () {
    var t,
      e = this.layers.length;
    for (t = 0; t < e; t += 1) (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
  }, ICompElement.prototype.setElements = function (t) {
    this.elements = t;
  }, ICompElement.prototype.getElements = function () {
    return this.elements;
  }, ICompElement.prototype.destroyElements = function () {
    var t,
      e = this.layers.length;
    for (t = 0; t < e; t += 1) this.elements[t] && this.elements[t].destroy();
  }, ICompElement.prototype.destroy = function () {
    this.destroyElements(), this.destroyBaseElement();
  }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement), IImageElement.prototype.createContent = function () {
    var t = this.globalData.getAssetsPath(this.assetData);
    this.innerElem = createNS("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.innerElem);
  }, IImageElement.prototype.sourceRectAtTime = function () {
    return this.sourceRect;
  }, extendPrototype([IImageElement], ISolidElement), ISolidElement.prototype.createContent = function () {
    var t = createNS("rect");
    t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t);
  }, AudioElement.prototype.prepareFrame = function (t) {
    if (this.prepareRenderableFrame(t, !0), this.prepareProperties(t, !0), this.tm._placeholder) this._currentTime = t / this.data.sr;else {
      var e = this.tm.v;
      this._currentTime = e;
    }
  }, extendPrototype([RenderableElement, BaseElement, FrameElement], AudioElement), AudioElement.prototype.renderFrame = function () {
    this.isInRange && this._canPlay && (this._isPlaying ? (!this.audio.playing() || .1 < Math.abs(this._currentTime / this.globalData.frameRate - this.audio.seek())) && this.audio.seek(this._currentTime / this.globalData.frameRate) : (this.audio.play(), this.audio.seek(this._currentTime / this.globalData.frameRate), this._isPlaying = !0));
  }, AudioElement.prototype.show = function () {}, AudioElement.prototype.hide = function () {
    this.audio.pause(), this._isPlaying = !1;
  }, AudioElement.prototype.pause = function () {
    this.audio.pause(), this._isPlaying = !1, this._canPlay = !1;
  }, AudioElement.prototype.resume = function () {
    this._canPlay = !0;
  }, AudioElement.prototype.setRate = function (t) {
    this.audio.rate(t);
  }, AudioElement.prototype.volume = function (t) {
    this.audio.volume(t);
  }, AudioElement.prototype.getBaseElement = function () {
    return null;
  }, AudioElement.prototype.destroy = function () {}, AudioElement.prototype.sourceRectAtTime = function () {}, AudioElement.prototype.initExpressions = function () {}, extendPrototype([SVGRenderer, ICompElement, SVGBaseElement], SVGCompElement), extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextLottieElement), SVGTextLottieElement.prototype.createContent = function () {
    this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS("text"));
  }, SVGTextLottieElement.prototype.buildTextContents = function (t) {
    for (var e = 0, r = t.length, i = [], s = ""; e < r;) t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3) ? (i.push(s), s = "") : s += t[e], e += 1;
    return i.push(s), i;
  }, SVGTextLottieElement.prototype.buildNewText = function () {
    var t,
      e,
      r = this.textProperty.currentData;
    this.renderedLetters = createSizedArray(r ? r.l.length : 0), r.fc ? this.layerElement.setAttribute("fill", this.buildColor(r.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"), r.sc && (this.layerElement.setAttribute("stroke", this.buildColor(r.sc)), this.layerElement.setAttribute("stroke-width", r.sw)), this.layerElement.setAttribute("font-size", r.finalSize);
    var i = this.globalData.fontManager.getFontByName(r.f);
    if (i.fClass) this.layerElement.setAttribute("class", i.fClass);else {
      this.layerElement.setAttribute("font-family", i.fFamily);
      var s = r.fWeight,
        a = r.fStyle;
      this.layerElement.setAttribute("font-style", a), this.layerElement.setAttribute("font-weight", s);
    }
    this.layerElement.setAttribute("aria-label", r.t);
    var n,
      o = r.l || [],
      h = !!this.globalData.fontManager.chars;
    e = o.length;
    var l,
      p = this.mHelper,
      m = "",
      f = this.data.singleShape,
      c = 0,
      d = 0,
      u = !0,
      y = .001 * r.tr * r.finalSize;
    if (!f || h || r.sz) {
      var g,
        v,
        b = this.textSpans.length;
      for (t = 0; t < e; t += 1) h && f && 0 !== t || (n = t < b ? this.textSpans[t] : createNS(h ? "path" : "text"), b <= t && (n.setAttribute("stroke-linecap", "butt"), n.setAttribute("stroke-linejoin", "round"), n.setAttribute("stroke-miterlimit", "4"), this.textSpans[t] = n, this.layerElement.appendChild(n)), n.style.display = "inherit"), p.reset(), p.scale(r.finalSize / 100, r.finalSize / 100), f && (o[t].n && (c = -y, d += r.yOffset, d += u ? 1 : 0, u = !1), this.applyTextPropertiesToMatrix(r, p, o[t].line, c, d), c += o[t].l || 0, c += y), h ? (l = (g = (v = this.globalData.fontManager.getCharData(r.finalText[t], i.fStyle, this.globalData.fontManager.getFontByName(r.f).fFamily)) && v.data || {}).shapes ? g.shapes[0].it : [], f ? m += this.createPathShape(p, l) : n.setAttribute("d", this.createPathShape(p, l))) : (f && n.setAttribute("transform", "translate(" + p.props[12] + "," + p.props[13] + ")"), n.textContent = o[t].val, n.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"));
      f && n && n.setAttribute("d", m);
    } else {
      var P = this.textContainer,
        x = "start";
      switch (r.j) {
        case 1:
          x = "end";
          break;
        case 2:
          x = "middle";
          break;
        default:
          x = "start";
      }
      P.setAttribute("text-anchor", x), P.setAttribute("letter-spacing", y);
      var E = this.buildTextContents(r.finalText);
      for (e = E.length, d = r.ps ? r.ps[1] + r.ascent : 0, t = 0; t < e; t += 1) (n = this.textSpans[t] || createNS("tspan")).textContent = E[t], n.setAttribute("x", 0), n.setAttribute("y", d), n.style.display = "inherit", P.appendChild(n), this.textSpans[t] = n, d += r.finalLineHeight;
      this.layerElement.appendChild(P);
    }
    for (; t < this.textSpans.length;) this.textSpans[t].style.display = "none", t += 1;
    this._sizeChanged = !0;
  }, SVGTextLottieElement.prototype.sourceRectAtTime = function () {
    if (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged) {
      this._sizeChanged = !1;
      var t = this.layerElement.getBBox();
      this.bbox = {
        top: t.y,
        left: t.x,
        width: t.width,
        height: t.height
      };
    }
    return this.bbox;
  }, SVGTextLottieElement.prototype.renderInnerContent = function () {
    if (!this.data.singleShape && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
      var t, e;
      this._sizeChanged = !0;
      var r,
        i,
        s = this.textAnimator.renderedLetters,
        a = this.textProperty.currentData.l;
      for (e = a.length, t = 0; t < e; t += 1) a[t].n || (r = s[t], i = this.textSpans[t], r._mdf.m && i.setAttribute("transform", r.m), r._mdf.o && i.setAttribute("opacity", r.o), r._mdf.sw && i.setAttribute("stroke-width", r.sw), r._mdf.sc && i.setAttribute("stroke", r.sc), r._mdf.fc && i.setAttribute("fill", r.fc));
    }
  }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement), SVGShapeElement.prototype.initSecondaryElement = function () {}, SVGShapeElement.prototype.identityMatrix = new Matrix(), SVGShapeElement.prototype.buildExpressionInterface = function () {}, SVGShapeElement.prototype.createContent = function () {
    this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes();
  }, SVGShapeElement.prototype.filterUniqueShapes = function () {
    var t,
      e,
      r,
      i,
      s = this.shapes.length,
      a = this.stylesList.length,
      n = [],
      o = !1;
    for (r = 0; r < a; r += 1) {
      for (i = this.stylesList[r], o = !1, t = n.length = 0; t < s; t += 1) -1 !== (e = this.shapes[t]).styles.indexOf(i) && (n.push(e), o = e._isAnimated || o);
      1 < n.length && o && this.setShapesAsAnimated(n);
    }
  }, SVGShapeElement.prototype.setShapesAsAnimated = function (t) {
    var e,
      r = t.length;
    for (e = 0; e < r; e += 1) t[e].setAsAnimated();
  }, SVGShapeElement.prototype.createStyleElement = function (t, e) {
    var r,
      i = new SVGStyleData(t, e),
      s = i.pElem;
    if ("st" === t.ty) r = new SVGStrokeStyleData(this, t, i);else if ("fl" === t.ty) r = new SVGFillStyleData(this, t, i);else if ("gf" === t.ty || "gs" === t.ty) {
      r = new ("gf" === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this, t, i), this.globalData.defs.appendChild(r.gf), r.maskId && (this.globalData.defs.appendChild(r.ms), this.globalData.defs.appendChild(r.of), s.setAttribute("mask", "url(" + locationHref + "#" + r.maskId + ")"));
    }
    return "st" !== t.ty && "gs" !== t.ty || (s.setAttribute("stroke-linecap", this.lcEnum[t.lc] || "round"), s.setAttribute("stroke-linejoin", this.ljEnum[t.lj] || "round"), s.setAttribute("fill-opacity", "0"), 1 === t.lj && s.setAttribute("stroke-miterlimit", t.ml)), 2 === t.r && s.setAttribute("fill-rule", "evenodd"), t.ln && s.setAttribute("id", t.ln), t.cl && s.setAttribute("class", t.cl), t.bm && (s.style["mix-blend-mode"] = getBlendMode(t.bm)), this.stylesList.push(i), this.addToAnimatedContents(t, r), r;
  }, SVGShapeElement.prototype.createGroupElement = function (t) {
    var e = new ShapeGroupData();
    return t.ln && e.gr.setAttribute("id", t.ln), t.cl && e.gr.setAttribute("class", t.cl), t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)), e;
  }, SVGShapeElement.prototype.createTransformElement = function (t, e) {
    var r = TransformPropertyFactory.getTransformProperty(this, t, this),
      i = new SVGTransformData(r, r.o, e);
    return this.addToAnimatedContents(t, i), i;
  }, SVGShapeElement.prototype.createShapeElement = function (t, e, r) {
    var i = 4;
    "rc" === t.ty ? i = 5 : "el" === t.ty ? i = 6 : "sr" === t.ty && (i = 7);
    var s = new SVGShapeData(e, r, ShapePropertyFactory.getShapeProp(this, t, i, this));
    return this.shapes.push(s), this.addShapeToModifiers(s), this.addToAnimatedContents(t, s), s;
  }, SVGShapeElement.prototype.addToAnimatedContents = function (t, e) {
    for (var r = 0, i = this.animatedContents.length; r < i;) {
      if (this.animatedContents[r].element === e) return;
      r += 1;
    }
    this.animatedContents.push({
      fn: SVGElementsRenderer.createRenderFunction(t),
      element: e,
      data: t
    });
  }, SVGShapeElement.prototype.setElementStyles = function (t) {
    var e,
      r = t.styles,
      i = this.stylesList.length;
    for (e = 0; e < i; e += 1) this.stylesList[e].closed || r.push(this.stylesList[e]);
  }, SVGShapeElement.prototype.reloadShapes = function () {
    var t;
    this._isFirstFrame = !0;
    var e = this.itemsData.length;
    for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
    for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
    this.renderModifiers();
  }, SVGShapeElement.prototype.searchShapes = function (t, e, r, i, s, a, n) {
    var o,
      h,
      l,
      p,
      m,
      f,
      c = [].concat(a),
      d = t.length - 1,
      u = [],
      y = [];
    for (o = d; 0 <= o; o -= 1) {
      if ((f = this.searchProcessedElement(t[o])) ? e[o] = r[f - 1] : t[o]._render = n, "fl" === t[o].ty || "st" === t[o].ty || "gf" === t[o].ty || "gs" === t[o].ty) f ? e[o].style.closed = !1 : e[o] = this.createStyleElement(t[o], s), t[o]._render && i.appendChild(e[o].style.pElem), u.push(e[o].style);else if ("gr" === t[o].ty) {
        if (f) for (l = e[o].it.length, h = 0; h < l; h += 1) e[o].prevViewData[h] = e[o].it[h];else e[o] = this.createGroupElement(t[o]);
        this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, s + 1, c, n), t[o]._render && i.appendChild(e[o].gr);
      } else "tr" === t[o].ty ? (f || (e[o] = this.createTransformElement(t[o], i)), p = e[o].transform, c.push(p)) : "sh" === t[o].ty || "rc" === t[o].ty || "el" === t[o].ty || "sr" === t[o].ty ? (f || (e[o] = this.createShapeElement(t[o], c, s)), this.setElementStyles(e[o])) : "tm" === t[o].ty || "rd" === t[o].ty || "ms" === t[o].ty || "pb" === t[o].ty ? (f ? (m = e[o]).closed = !1 : ((m = ShapeModifiers.getModifier(t[o].ty)).init(this, t[o]), e[o] = m, this.shapeModifiers.push(m)), y.push(m)) : "rp" === t[o].ty && (f ? (m = e[o]).closed = !0 : (m = ShapeModifiers.getModifier(t[o].ty), (e[o] = m).init(this, t, o, e), this.shapeModifiers.push(m), n = !1), y.push(m));
      this.addProcessedElement(t[o], o + 1);
    }
    for (d = u.length, o = 0; o < d; o += 1) u[o].closed = !0;
    for (d = y.length, o = 0; o < d; o += 1) y[o].closed = !0;
  }, SVGShapeElement.prototype.renderInnerContent = function () {
    var t;
    this.renderModifiers();
    var e = this.stylesList.length;
    for (t = 0; t < e; t += 1) this.stylesList[t].reset();
    for (this.renderShape(), t = 0; t < e; t += 1) (this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d), this.stylesList[t].d = "M0 0" + this.stylesList[t].d), this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"));
  }, SVGShapeElement.prototype.renderShape = function () {
    var t,
      e,
      r = this.animatedContents.length;
    for (t = 0; t < r; t += 1) e = this.animatedContents[t], (this._isFirstFrame || e.element._isAnimated) && !0 !== e.data && e.fn(e.data, e.element, this._isFirstFrame);
  }, SVGShapeElement.prototype.destroy = function () {
    this.destroyBaseElement(), this.shapesData = null, this.itemsData = null;
  }, SVGTintFilter.prototype.renderFrame = function (t) {
    if (t || this.filterManager._mdf) {
      var e = this.filterManager.effectElements[0].p.v,
        r = this.filterManager.effectElements[1].p.v,
        i = this.filterManager.effectElements[2].p.v / 100;
      this.matrixFilter.setAttribute("values", r[0] - e[0] + " 0 0 0 " + e[0] + " " + (r[1] - e[1]) + " 0 0 0 " + e[1] + " " + (r[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 " + i + " 0");
    }
  }, SVGFillFilter.prototype.renderFrame = function (t) {
    if (t || this.filterManager._mdf) {
      var e = this.filterManager.effectElements[2].p.v,
        r = this.filterManager.effectElements[6].p.v;
      this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + r + " 0");
    }
  }, SVGGaussianBlurEffect.prototype.renderFrame = function (t) {
    if (t || this.filterManager._mdf) {
      var e = .3 * this.filterManager.effectElements[0].p.v,
        r = this.filterManager.effectElements[1].p.v,
        i = 3 == r ? 0 : e,
        s = 2 == r ? 0 : e;
      this.feGaussianBlur.setAttribute("stdDeviation", i + " " + s);
      var a = 1 == this.filterManager.effectElements[2].p.v ? "wrap" : "duplicate";
      this.feGaussianBlur.setAttribute("edgeMode", a);
    }
  }, SVGStrokeEffect.prototype.initialize = function () {
    var t,
      e,
      r,
      i,
      s = this.elem.layerElement.children || this.elem.layerElement.childNodes;
    for (1 === this.filterManager.effectElements[1].p.v ? (i = this.elem.maskManager.masksProperties.length, r = 0) : i = (r = this.filterManager.effectElements[0].p.v - 1) + 1, (e = createNS("g")).setAttribute("fill", "none"), e.setAttribute("stroke-linecap", "round"), e.setAttribute("stroke-dashoffset", 1); r < i; r += 1) t = createNS("path"), e.appendChild(t), this.paths.push({
      p: t,
      m: r
    });
    if (3 === this.filterManager.effectElements[10].p.v) {
      var a = createNS("mask"),
        n = createElementID();
      a.setAttribute("id", n), a.setAttribute("mask-type", "alpha"), a.appendChild(e), this.elem.globalData.defs.appendChild(a);
      var o = createNS("g");
      for (o.setAttribute("mask", "url(" + locationHref + "#" + n + ")"); s[0];) o.appendChild(s[0]);
      this.elem.layerElement.appendChild(o), this.masker = a, e.setAttribute("stroke", "#fff");
    } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
      if (2 === this.filterManager.effectElements[10].p.v) for (s = this.elem.layerElement.children || this.elem.layerElement.childNodes; s.length;) this.elem.layerElement.removeChild(s[0]);
      this.elem.layerElement.appendChild(e), this.elem.layerElement.removeAttribute("mask"), e.setAttribute("stroke", "#fff");
    }
    this.initialized = !0, this.pathMasker = e;
  }, SVGStrokeEffect.prototype.renderFrame = function (t) {
    var e;
    this.initialized || this.initialize();
    var r,
      i,
      s = this.paths.length;
    for (e = 0; e < s; e += 1) if (-1 !== this.paths[e].m && (r = this.elem.maskManager.viewData[this.paths[e].m], i = this.paths[e].p, (t || this.filterManager._mdf || r.prop._mdf) && i.setAttribute("d", r.lastPath), t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || r.prop._mdf)) {
      var a;
      if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
        var n = .01 * Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v),
          o = .01 * Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v),
          h = i.getTotalLength();
        a = "0 0 0 " + h * n + " ";
        var l,
          p = h * (o - n),
          m = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * .01,
          f = Math.floor(p / m);
        for (l = 0; l < f; l += 1) a += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * .01 + " ";
        a += "0 " + 10 * h + " 0 0";
      } else a = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * .01;
      i.setAttribute("stroke-dasharray", a);
    }
    if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v), (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf)) {
      var c = this.filterManager.effectElements[3].p.v;
      this.pathMasker.setAttribute("stroke", "rgb(" + bmFloor(255 * c[0]) + "," + bmFloor(255 * c[1]) + "," + bmFloor(255 * c[2]) + ")");
    }
  }, SVGTritoneFilter.prototype.renderFrame = function (t) {
    if (t || this.filterManager._mdf) {
      var e = this.filterManager.effectElements[0].p.v,
        r = this.filterManager.effectElements[1].p.v,
        i = this.filterManager.effectElements[2].p.v,
        s = i[0] + " " + r[0] + " " + e[0],
        a = i[1] + " " + r[1] + " " + e[1],
        n = i[2] + " " + r[2] + " " + e[2];
      this.feFuncR.setAttribute("tableValues", s), this.feFuncG.setAttribute("tableValues", a), this.feFuncB.setAttribute("tableValues", n);
    }
  }, SVGProLevelsFilter.prototype.createFeFunc = function (t, e) {
    var r = createNS(t);
    return r.setAttribute("type", "table"), e.appendChild(r), r;
  }, SVGProLevelsFilter.prototype.getTableValue = function (t, e, r, i, s) {
    for (var a, n, o = 0, h = Math.min(t, e), l = Math.max(t, e), p = Array.call(null, {
        length: 256
      }), m = 0, f = s - i, c = e - t; o <= 256;) n = (a = o / 256) <= h ? c < 0 ? s : i : l <= a ? c < 0 ? i : s : i + f * Math.pow((a - t) / c, 1 / r), p[m] = n, m += 1, o += 256 / 255;
    return p.join(" ");
  }, SVGProLevelsFilter.prototype.renderFrame = function (t) {
    if (t || this.filterManager._mdf) {
      var e,
        r = this.filterManager.effectElements;
      this.feFuncRComposed && (t || r[3].p._mdf || r[4].p._mdf || r[5].p._mdf || r[6].p._mdf || r[7].p._mdf) && (e = this.getTableValue(r[3].p.v, r[4].p.v, r[5].p.v, r[6].p.v, r[7].p.v), this.feFuncRComposed.setAttribute("tableValues", e), this.feFuncGComposed.setAttribute("tableValues", e), this.feFuncBComposed.setAttribute("tableValues", e)), this.feFuncR && (t || r[10].p._mdf || r[11].p._mdf || r[12].p._mdf || r[13].p._mdf || r[14].p._mdf) && (e = this.getTableValue(r[10].p.v, r[11].p.v, r[12].p.v, r[13].p.v, r[14].p.v), this.feFuncR.setAttribute("tableValues", e)), this.feFuncG && (t || r[17].p._mdf || r[18].p._mdf || r[19].p._mdf || r[20].p._mdf || r[21].p._mdf) && (e = this.getTableValue(r[17].p.v, r[18].p.v, r[19].p.v, r[20].p.v, r[21].p.v), this.feFuncG.setAttribute("tableValues", e)), this.feFuncB && (t || r[24].p._mdf || r[25].p._mdf || r[26].p._mdf || r[27].p._mdf || r[28].p._mdf) && (e = this.getTableValue(r[24].p.v, r[25].p.v, r[26].p.v, r[27].p.v, r[28].p.v), this.feFuncB.setAttribute("tableValues", e)), this.feFuncA && (t || r[31].p._mdf || r[32].p._mdf || r[33].p._mdf || r[34].p._mdf || r[35].p._mdf) && (e = this.getTableValue(r[31].p.v, r[32].p.v, r[33].p.v, r[34].p.v, r[35].p.v), this.feFuncA.setAttribute("tableValues", e));
    }
  }, SVGDropShadowEffect.prototype.renderFrame = function (t) {
    if (t || this.filterManager._mdf) {
      if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4), t || this.filterManager.effectElements[0].p._mdf) {
        var e = this.filterManager.effectElements[0].p.v;
        this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])));
      }
      if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255), t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
        var r = this.filterManager.effectElements[3].p.v,
          i = (this.filterManager.effectElements[2].p.v - 90) * degToRads,
          s = r * Math.cos(i),
          a = r * Math.sin(i);
        this.feOffset.setAttribute("dx", s), this.feOffset.setAttribute("dy", a);
      }
    }
  };
  var _svgMatteSymbols = [];
  function SVGMatte3Effect(t, e, r) {
    this.initialized = !1, this.filterManager = e, this.filterElem = t, (this.elem = r).matteElement = createNS("g"), r.matteElement.appendChild(r.layerElement), r.matteElement.appendChild(r.transformedElement), r.baseElement = r.matteElement;
  }
  function SVGEffects(t) {
    var e,
      r,
      i = t.data.ef ? t.data.ef.length : 0,
      s = createElementID(),
      a = filtersFactory.createFilter(s),
      n = 0;
    for (this.filters = [], e = 0; e < i; e += 1) r = null, 20 === t.data.ef[e].ty ? (n += 1, r = new SVGTintFilter(a, t.effectsManager.effectElements[e])) : 21 === t.data.ef[e].ty ? (n += 1, r = new SVGFillFilter(a, t.effectsManager.effectElements[e])) : 22 === t.data.ef[e].ty ? r = new SVGStrokeEffect(t, t.effectsManager.effectElements[e]) : 23 === t.data.ef[e].ty ? (n += 1, r = new SVGTritoneFilter(a, t.effectsManager.effectElements[e])) : 24 === t.data.ef[e].ty ? (n += 1, r = new SVGProLevelsFilter(a, t.effectsManager.effectElements[e])) : 25 === t.data.ef[e].ty ? (n += 1, r = new SVGDropShadowEffect(a, t.effectsManager.effectElements[e])) : 28 === t.data.ef[e].ty ? r = new SVGMatte3Effect(a, t.effectsManager.effectElements[e], t) : 29 === t.data.ef[e].ty && (n += 1, r = new SVGGaussianBlurEffect(a, t.effectsManager.effectElements[e])), r && this.filters.push(r);
    n && (t.globalData.defs.appendChild(a), t.layerElement.setAttribute("filter", "url(" + locationHref + "#" + s + ")")), this.filters.length && t.addRenderableComponent(this);
  }
  function CVContextData() {
    var t;
    this.saved = [], this.cArrPos = 0, this.cTr = new Matrix(), this.cO = 1;
    for (this.savedOp = createTypedArray("float32", 15), t = 0; t < 15; t += 1) this.saved[t] = createTypedArray("float32", 16);
    this._length = 15;
  }
  function CVBaseElement() {}
  function CVImageElement(t, e, r) {
    this.assetData = e.getAssetData(t.refId), this.img = e.imageLoader.getImage(this.assetData), this.initElement(t, e, r);
  }
  function CVCompElement(t, e, r) {
    this.completeLayers = !1, this.layers = t.layers, this.pendingElements = [], this.elements = createSizedArray(this.layers.length), this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
      _placeholder: !0
    };
  }
  function CVMaskElement(t, e) {
    var r;
    this.data = t, this.element = e, this.masksProperties = this.data.masksProperties || [], this.viewData = createSizedArray(this.masksProperties.length);
    var i = this.masksProperties.length,
      s = !1;
    for (r = 0; r < i; r += 1) "n" !== this.masksProperties[r].mode && (s = !0), this.viewData[r] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[r], 3);
    (this.hasMasks = s) && this.element.addRenderableComponent(this);
  }
  function CVShapeElement(t, e, r) {
    this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.itemsData = [], this.prevViewData = [], this.shapeModifiers = [], this.processedElements = [], this.transformsManager = new ShapeTransformManager(), this.initElement(t, e, r);
  }
  function CVSolidElement(t, e, r) {
    this.initElement(t, e, r);
  }
  function CVTextElement(t, e, r) {
    this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = {
      fill: "rgba(0,0,0,0)",
      stroke: "rgba(0,0,0,0)",
      sWidth: 0,
      fValue: ""
    }, this.initElement(t, e, r);
  }
  function CVEffects() {}
  function HBaseElement() {}
  function HSolidElement(t, e, r) {
    this.initElement(t, e, r);
  }
  function HCompElement(t, e, r) {
    this.layers = t.layers, this.supports3d = !t.hasMask, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
      _placeholder: !0
    };
  }
  function HShapeElement(t, e, r) {
    this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.shapesContainer = createNS("g"), this.initElement(t, e, r), this.prevViewData = [], this.currentBBox = {
      x: 999999,
      y: -999999,
      h: 0,
      w: 0
    };
  }
  function HTextElement(t, e, r) {
    this.textSpans = [], this.textPaths = [], this.currentBBox = {
      x: 999999,
      y: -999999,
      h: 0,
      w: 0
    }, this.renderType = "svg", this.isMasked = !1, this.initElement(t, e, r);
  }
  function HImageElement(t, e, r) {
    this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r);
  }
  function HCameraElement(t, e, r) {
    this.initFrame(), this.initBaseData(t, e, r), this.initHierarchy();
    var i = PropertyFactory.getProp;
    if (this.pe = i(this, t.pe, 0, 0, this), t.ks.p.s ? (this.px = i(this, t.ks.p.x, 1, 0, this), this.py = i(this, t.ks.p.y, 1, 0, this), this.pz = i(this, t.ks.p.z, 1, 0, this)) : this.p = i(this, t.ks.p, 1, 0, this), t.ks.a && (this.a = i(this, t.ks.a, 1, 0, this)), t.ks.or.k.length && t.ks.or.k[0].to) {
      var s,
        a = t.ks.or.k.length;
      for (s = 0; s < a; s += 1) t.ks.or.k[s].to = null, t.ks.or.k[s].ti = null;
    }
    this.or = i(this, t.ks.or, 1, degToRads, this), this.or.sh = !0, this.rx = i(this, t.ks.rx, 0, degToRads, this), this.ry = i(this, t.ks.ry, 0, degToRads, this), this.rz = i(this, t.ks.rz, 0, degToRads, this), this.mat = new Matrix(), this._prevMat = new Matrix(), this._isFirstFrame = !0, this.finalTransform = {
      mProp: this
    };
  }
  function HEffects() {}
  SVGMatte3Effect.prototype.findSymbol = function (t) {
    for (var e = 0, r = _svgMatteSymbols.length; e < r;) {
      if (_svgMatteSymbols[e] === t) return _svgMatteSymbols[e];
      e += 1;
    }
    return null;
  }, SVGMatte3Effect.prototype.replaceInParent = function (t, e) {
    var r = t.layerElement.parentNode;
    if (r) {
      for (var i, s = r.children, a = 0, n = s.length; a < n && s[a] !== t.layerElement;) a += 1;
      a <= n - 2 && (i = s[a + 1]);
      var o = createNS("use");
      o.setAttribute("href", "#" + e), i ? r.insertBefore(o, i) : r.appendChild(o);
    }
  }, SVGMatte3Effect.prototype.setElementAsMask = function (t, e) {
    if (!this.findSymbol(e)) {
      var r = createElementID(),
        i = createNS("mask");
      i.setAttribute("id", e.layerId), i.setAttribute("mask-type", "alpha"), _svgMatteSymbols.push(e);
      var s = t.globalData.defs;
      s.appendChild(i);
      var a = createNS("symbol");
      a.setAttribute("id", r), this.replaceInParent(e, r), a.appendChild(e.layerElement), s.appendChild(a);
      var n = createNS("use");
      n.setAttribute("href", "#" + r), i.appendChild(n), e.data.hd = !1, e.show();
    }
    t.setMatte(e.layerId);
  }, SVGMatte3Effect.prototype.initialize = function () {
    for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, r = 0, i = e.length; r < i;) e[r] && e[r].data.ind === t && this.setElementAsMask(this.elem, e[r]), r += 1;
    this.initialized = !0;
  }, SVGMatte3Effect.prototype.renderFrame = function () {
    this.initialized || this.initialize();
  }, SVGEffects.prototype.renderFrame = function (t) {
    var e,
      r = this.filters.length;
    for (e = 0; e < r; e += 1) this.filters[e].renderFrame(t);
  }, CVContextData.prototype.duplicate = function () {
    var t = 2 * this._length,
      e = this.savedOp;
    this.savedOp = createTypedArray("float32", t), this.savedOp.set(e);
    var r = 0;
    for (r = this._length; r < t; r += 1) this.saved[r] = createTypedArray("float32", 16);
    this._length = t;
  }, CVContextData.prototype.reset = function () {
    this.cArrPos = 0, this.cTr.reset(), this.cO = 1;
  }, CVBaseElement.prototype = {
    createElements: function createElements() {},
    initRendererElement: function initRendererElement() {},
    createContainerElements: function createContainerElements() {
      this.canvasContext = this.globalData.canvasContext, this.renderableEffectsManager = new CVEffects(this);
    },
    createContent: function createContent() {},
    setBlendMode: function setBlendMode() {
      var t = this.globalData;
      if (t.blendMode !== this.data.bm) {
        t.blendMode = this.data.bm;
        var e = getBlendMode(this.data.bm);
        t.canvasContext.globalCompositeOperation = e;
      }
    },
    createRenderableComponents: function createRenderableComponents() {
      this.maskManager = new CVMaskElement(this.data, this);
    },
    hideElement: function hideElement() {
      this.hidden || this.isInRange && !this.isTransparent || (this.hidden = !0);
    },
    showElement: function showElement() {
      this.isInRange && !this.isTransparent && (this.hidden = !1, this._isFirstFrame = !0, this.maskManager._isFirstFrame = !0);
    },
    renderFrame: function renderFrame() {
      if (!this.hidden && !this.data.hd) {
        this.renderTransform(), this.renderRenderable(), this.setBlendMode();
        var t = 0 === this.data.ty;
        this.globalData.renderer.save(t), this.globalData.renderer.ctxTransform(this.finalTransform.mat.props), this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v), this.renderInnerContent(), this.globalData.renderer.restore(t), this.maskManager.hasMasks && this.globalData.renderer.restore(!0), this._isFirstFrame && (this._isFirstFrame = !1);
      }
    },
    destroy: function destroy() {
      this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager.destroy();
    },
    mHelper: new Matrix()
  }, CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement, CVBaseElement.prototype.show = CVBaseElement.prototype.showElement, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement), CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVImageElement.prototype.createContent = function () {
    if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
      var t = createTag("canvas");
      t.width = this.assetData.w, t.height = this.assetData.h;
      var e,
        r,
        i = t.getContext("2d"),
        s = this.img.width,
        a = this.img.height,
        n = s / a,
        o = this.assetData.w / this.assetData.h,
        h = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
      o < n && "xMidYMid slice" === h || n < o && "xMidYMid slice" !== h ? e = (r = a) * o : r = (e = s) / o, i.drawImage(this.img, (s - e) / 2, (a - r) / 2, e, r, 0, 0, this.assetData.w, this.assetData.h), this.img = t;
    }
  }, CVImageElement.prototype.renderInnerContent = function () {
    this.canvasContext.drawImage(this.img, 0, 0);
  }, CVImageElement.prototype.destroy = function () {
    this.img = null;
  }, extendPrototype([CanvasRenderer, ICompElement, CVBaseElement], CVCompElement), CVCompElement.prototype.renderInnerContent = function () {
    var t,
      e = this.canvasContext;
    for (e.beginPath(), e.moveTo(0, 0), e.lineTo(this.data.w, 0), e.lineTo(this.data.w, this.data.h), e.lineTo(0, this.data.h), e.lineTo(0, 0), e.clip(), t = this.layers.length - 1; 0 <= t; t -= 1) (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
  }, CVCompElement.prototype.destroy = function () {
    var t;
    for (t = this.layers.length - 1; 0 <= t; t -= 1) this.elements[t] && this.elements[t].destroy();
    this.layers = null, this.elements = null;
  }, CVMaskElement.prototype.renderFrame = function () {
    if (this.hasMasks) {
      var t,
        e,
        r,
        i,
        s = this.element.finalTransform.mat,
        a = this.element.canvasContext,
        n = this.masksProperties.length;
      for (a.beginPath(), t = 0; t < n; t += 1) if ("n" !== this.masksProperties[t].mode) {
        var o;
        this.masksProperties[t].inv && (a.moveTo(0, 0), a.lineTo(this.element.globalData.compSize.w, 0), a.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h), a.lineTo(0, this.element.globalData.compSize.h), a.lineTo(0, 0)), i = this.viewData[t].v, e = s.applyToPointArray(i.v[0][0], i.v[0][1], 0), a.moveTo(e[0], e[1]);
        var h = i._length;
        for (o = 1; o < h; o += 1) r = s.applyToTriplePoints(i.o[o - 1], i.i[o], i.v[o]), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
        r = s.applyToTriplePoints(i.o[o - 1], i.i[0], i.v[0]), a.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
      }
      this.element.globalData.renderer.save(!0), a.clip();
    }
  }, CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty, CVMaskElement.prototype.destroy = function () {
    this.element = null;
  }, extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement), CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement, CVShapeElement.prototype.transformHelper = {
    opacity: 1,
    _opMdf: !1
  }, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createContent = function () {
    this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []);
  }, CVShapeElement.prototype.createStyleElement = function (t, e) {
    var r = {
        data: t,
        type: t.ty,
        preTransforms: this.transformsManager.addTransformSequence(e),
        transforms: [],
        elements: [],
        closed: !0 === t.hd
      },
      i = {};
    if ("fl" === t.ty || "st" === t.ty ? (i.c = PropertyFactory.getProp(this, t.c, 1, 255, this), i.c.k || (r.co = "rgb(" + bmFloor(i.c.v[0]) + "," + bmFloor(i.c.v[1]) + "," + bmFloor(i.c.v[2]) + ")")) : "gf" !== t.ty && "gs" !== t.ty || (i.s = PropertyFactory.getProp(this, t.s, 1, null, this), i.e = PropertyFactory.getProp(this, t.e, 1, null, this), i.h = PropertyFactory.getProp(this, t.h || {
      k: 0
    }, 0, .01, this), i.a = PropertyFactory.getProp(this, t.a || {
      k: 0
    }, 0, degToRads, this), i.g = new GradientProperty(this, t.g, this)), i.o = PropertyFactory.getProp(this, t.o, 0, .01, this), "st" === t.ty || "gs" === t.ty) {
      if (r.lc = this.lcEnum[t.lc] || "round", r.lj = this.ljEnum[t.lj] || "round", 1 == t.lj && (r.ml = t.ml), i.w = PropertyFactory.getProp(this, t.w, 0, null, this), i.w.k || (r.wi = i.w.v), t.d) {
        var s = new DashProperty(this, t.d, "canvas", this);
        i.d = s, i.d.k || (r.da = i.d.dashArray, r["do"] = i.d.dashoffset[0]);
      }
    } else r.r = 2 === t.r ? "evenodd" : "nonzero";
    return this.stylesList.push(r), i.style = r, i;
  }, CVShapeElement.prototype.createGroupElement = function () {
    return {
      it: [],
      prevViewData: []
    };
  }, CVShapeElement.prototype.createTransformElement = function (t) {
    return {
      transform: {
        opacity: 1,
        _opMdf: !1,
        key: this.transformsManager.getNewKey(),
        op: PropertyFactory.getProp(this, t.o, 0, .01, this),
        mProps: TransformPropertyFactory.getTransformProperty(this, t, this)
      }
    };
  }, CVShapeElement.prototype.createShapeElement = function (t) {
    var e = new CVShapeData(this, t, this.stylesList, this.transformsManager);
    return this.shapes.push(e), this.addShapeToModifiers(e), e;
  }, CVShapeElement.prototype.reloadShapes = function () {
    var t;
    this._isFirstFrame = !0;
    var e = this.itemsData.length;
    for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
    for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
    this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame);
  }, CVShapeElement.prototype.addTransformToStyleList = function (t) {
    var e,
      r = this.stylesList.length;
    for (e = 0; e < r; e += 1) this.stylesList[e].closed || this.stylesList[e].transforms.push(t);
  }, CVShapeElement.prototype.removeTransformFromStyleList = function () {
    var t,
      e = this.stylesList.length;
    for (t = 0; t < e; t += 1) this.stylesList[t].closed || this.stylesList[t].transforms.pop();
  }, CVShapeElement.prototype.closeStyles = function (t) {
    var e,
      r = t.length;
    for (e = 0; e < r; e += 1) t[e].closed = !0;
  }, CVShapeElement.prototype.searchShapes = function (t, e, r, i, s) {
    var a,
      n,
      o,
      h,
      l,
      p,
      m = t.length - 1,
      f = [],
      c = [],
      d = [].concat(s);
    for (a = m; 0 <= a; a -= 1) {
      if ((h = this.searchProcessedElement(t[a])) ? e[a] = r[h - 1] : t[a]._shouldRender = i, "fl" === t[a].ty || "st" === t[a].ty || "gf" === t[a].ty || "gs" === t[a].ty) h ? e[a].style.closed = !1 : e[a] = this.createStyleElement(t[a], d), f.push(e[a].style);else if ("gr" === t[a].ty) {
        if (h) for (o = e[a].it.length, n = 0; n < o; n += 1) e[a].prevViewData[n] = e[a].it[n];else e[a] = this.createGroupElement(t[a]);
        this.searchShapes(t[a].it, e[a].it, e[a].prevViewData, i, d);
      } else "tr" === t[a].ty ? (h || (p = this.createTransformElement(t[a]), e[a] = p), d.push(e[a]), this.addTransformToStyleList(e[a])) : "sh" === t[a].ty || "rc" === t[a].ty || "el" === t[a].ty || "sr" === t[a].ty ? h || (e[a] = this.createShapeElement(t[a])) : "tm" === t[a].ty || "rd" === t[a].ty || "pb" === t[a].ty ? (h ? (l = e[a]).closed = !1 : ((l = ShapeModifiers.getModifier(t[a].ty)).init(this, t[a]), e[a] = l, this.shapeModifiers.push(l)), c.push(l)) : "rp" === t[a].ty && (h ? (l = e[a]).closed = !0 : (l = ShapeModifiers.getModifier(t[a].ty), (e[a] = l).init(this, t, a, e), this.shapeModifiers.push(l), i = !1), c.push(l));
      this.addProcessedElement(t[a], a + 1);
    }
    for (this.removeTransformFromStyleList(), this.closeStyles(f), m = c.length, a = 0; a < m; a += 1) c[a].closed = !0;
  }, CVShapeElement.prototype.renderInnerContent = function () {
    this.transformHelper.opacity = 1, this.transformHelper._opMdf = !1, this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0);
  }, CVShapeElement.prototype.renderShapeTransform = function (t, e) {
    (t._opMdf || e.op._mdf || this._isFirstFrame) && (e.opacity = t.opacity, e.opacity *= e.op.v, e._opMdf = !0);
  }, CVShapeElement.prototype.drawLayer = function () {
    var t,
      e,
      r,
      i,
      s,
      a,
      n,
      o,
      h,
      l = this.stylesList.length,
      p = this.globalData.renderer,
      m = this.globalData.canvasContext;
    for (t = 0; t < l; t += 1) if (("st" !== (o = (h = this.stylesList[t]).type) && "gs" !== o || 0 !== h.wi) && h.data._shouldRender && 0 !== h.coOp && 0 !== this.globalData.currentGlobalAlpha) {
      for (p.save(), a = h.elements, "st" === o || "gs" === o ? (m.strokeStyle = "st" === o ? h.co : h.grd, m.lineWidth = h.wi, m.lineCap = h.lc, m.lineJoin = h.lj, m.miterLimit = h.ml || 0) : m.fillStyle = "fl" === o ? h.co : h.grd, p.ctxOpacity(h.coOp), "st" !== o && "gs" !== o && m.beginPath(), p.ctxTransform(h.preTransforms.finalTransform.props), r = a.length, e = 0; e < r; e += 1) {
        for ("st" !== o && "gs" !== o || (m.beginPath(), h.da && (m.setLineDash(h.da), m.lineDashOffset = h["do"])), s = (n = a[e].trNodes).length, i = 0; i < s; i += 1) "m" === n[i].t ? m.moveTo(n[i].p[0], n[i].p[1]) : "c" === n[i].t ? m.bezierCurveTo(n[i].pts[0], n[i].pts[1], n[i].pts[2], n[i].pts[3], n[i].pts[4], n[i].pts[5]) : m.closePath();
        "st" !== o && "gs" !== o || (m.stroke(), h.da && m.setLineDash(this.dashResetter));
      }
      "st" !== o && "gs" !== o && m.fill(h.r), p.restore();
    }
  }, CVShapeElement.prototype.renderShape = function (t, e, r, i) {
    var s, a;
    for (a = t, s = e.length - 1; 0 <= s; s -= 1) "tr" === e[s].ty ? (a = r[s].transform, this.renderShapeTransform(t, a)) : "sh" === e[s].ty || "el" === e[s].ty || "rc" === e[s].ty || "sr" === e[s].ty ? this.renderPath(e[s], r[s]) : "fl" === e[s].ty ? this.renderFill(e[s], r[s], a) : "st" === e[s].ty ? this.renderStroke(e[s], r[s], a) : "gf" === e[s].ty || "gs" === e[s].ty ? this.renderGradientFill(e[s], r[s], a) : "gr" === e[s].ty ? this.renderShape(a, e[s].it, r[s].it) : e[s].ty;
    i && this.drawLayer();
  }, CVShapeElement.prototype.renderStyledShape = function (t, e) {
    if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
      var r,
        i,
        s,
        a = t.trNodes,
        n = e.paths,
        o = n._length;
      a.length = 0;
      var h = t.transforms.finalTransform;
      for (s = 0; s < o; s += 1) {
        var l = n.shapes[s];
        if (l && l.v) {
          for (i = l._length, r = 1; r < i; r += 1) 1 === r && a.push({
            t: "m",
            p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
          }), a.push({
            t: "c",
            pts: h.applyToTriplePoints(l.o[r - 1], l.i[r], l.v[r])
          });
          1 === i && a.push({
            t: "m",
            p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
          }), l.c && i && (a.push({
            t: "c",
            pts: h.applyToTriplePoints(l.o[r - 1], l.i[0], l.v[0])
          }), a.push({
            t: "z"
          }));
        }
      }
      t.trNodes = a;
    }
  }, CVShapeElement.prototype.renderPath = function (t, e) {
    if (!0 !== t.hd && t._shouldRender) {
      var r,
        i = e.styledShapes.length;
      for (r = 0; r < i; r += 1) this.renderStyledShape(e.styledShapes[r], e.sh);
    }
  }, CVShapeElement.prototype.renderFill = function (t, e, r) {
    var i = e.style;
    (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity);
  }, CVShapeElement.prototype.renderGradientFill = function (t, e, r) {
    var i,
      s = e.style;
    if (!s.grd || e.g._mdf || e.s._mdf || e.e._mdf || 1 !== t.t && (e.h._mdf || e.a._mdf)) {
      var a,
        n = this.globalData.canvasContext,
        o = e.s.v,
        h = e.e.v;
      if (1 === t.t) i = n.createLinearGradient(o[0], o[1], h[0], h[1]);else {
        var l = Math.sqrt(Math.pow(o[0] - h[0], 2) + Math.pow(o[1] - h[1], 2)),
          p = Math.atan2(h[1] - o[1], h[0] - o[0]),
          m = e.h.v;
        1 <= m ? m = .99 : m <= -1 && (m = -.99);
        var f = l * m,
          c = Math.cos(p + e.a.v) * f + o[0],
          d = Math.sin(p + e.a.v) * f + o[1];
        i = n.createRadialGradient(c, d, 0, o[0], o[1], l);
      }
      var u = t.g.p,
        y = e.g.c,
        g = 1;
      for (a = 0; a < u; a += 1) e.g._hasOpacity && e.g._collapsable && (g = e.g.o[2 * a + 1]), i.addColorStop(y[4 * a] / 100, "rgba(" + y[4 * a + 1] + "," + y[4 * a + 2] + "," + y[4 * a + 3] + "," + g + ")");
      s.grd = i;
    }
    s.coOp = e.o.v * r.opacity;
  }, CVShapeElement.prototype.renderStroke = function (t, e, r) {
    var i = e.style,
      s = e.d;
    s && (s._mdf || this._isFirstFrame) && (i.da = s.dashArray, i["do"] = s.dashoffset[0]), (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity), (e.w._mdf || this._isFirstFrame) && (i.wi = e.w.v);
  }, CVShapeElement.prototype.destroy = function () {
    this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.itemsData.length = 0;
  }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement), CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVSolidElement.prototype.renderInnerContent = function () {
    var t = this.canvasContext;
    t.fillStyle = this.data.sc, t.fillRect(0, 0, this.data.sw, this.data.sh);
  }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement), CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d"), CVTextElement.prototype.buildNewText = function () {
    var t = this.textProperty.currentData;
    this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
    var e = !1;
    t.fc ? (e = !0, this.values.fill = this.buildColor(t.fc)) : this.values.fill = "rgba(0,0,0,0)", this.fill = e;
    var r = !1;
    t.sc && (r = !0, this.values.stroke = this.buildColor(t.sc), this.values.sWidth = t.sw);
    var i,
      s,
      a,
      n,
      o,
      h,
      l,
      p,
      m,
      f,
      c,
      d,
      u = this.globalData.fontManager.getFontByName(t.f),
      y = t.l,
      g = this.mHelper;
    this.stroke = r, this.values.fValue = t.finalSize + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily, s = t.finalText.length;
    var v = this.data.singleShape,
      b = .001 * t.tr * t.finalSize,
      P = 0,
      x = 0,
      E = !0,
      S = 0;
    for (i = 0; i < s; i += 1) {
      for (n = (a = this.globalData.fontManager.getCharData(t.finalText[i], u.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily)) && a.data || {}, g.reset(), v && y[i].n && (P = -b, x += t.yOffset, x += E ? 1 : 0, E = !1), m = (l = n.shapes ? n.shapes[0].it : []).length, g.scale(t.finalSize / 100, t.finalSize / 100), v && this.applyTextPropertiesToMatrix(t, g, y[i].line, P, x), c = createSizedArray(m), p = 0; p < m; p += 1) {
        for (h = l[p].ks.k.i.length, f = l[p].ks.k, d = [], o = 1; o < h; o += 1) 1 === o && d.push(g.applyToX(f.v[0][0], f.v[0][1], 0), g.applyToY(f.v[0][0], f.v[0][1], 0)), d.push(g.applyToX(f.o[o - 1][0], f.o[o - 1][1], 0), g.applyToY(f.o[o - 1][0], f.o[o - 1][1], 0), g.applyToX(f.i[o][0], f.i[o][1], 0), g.applyToY(f.i[o][0], f.i[o][1], 0), g.applyToX(f.v[o][0], f.v[o][1], 0), g.applyToY(f.v[o][0], f.v[o][1], 0));
        d.push(g.applyToX(f.o[o - 1][0], f.o[o - 1][1], 0), g.applyToY(f.o[o - 1][0], f.o[o - 1][1], 0), g.applyToX(f.i[0][0], f.i[0][1], 0), g.applyToY(f.i[0][0], f.i[0][1], 0), g.applyToX(f.v[0][0], f.v[0][1], 0), g.applyToY(f.v[0][0], f.v[0][1], 0)), c[p] = d;
      }
      v && (P += y[i].l, P += b), this.textSpans[S] ? this.textSpans[S].elem = c : this.textSpans[S] = {
        elem: c
      }, S += 1;
    }
  }, CVTextElement.prototype.renderInnerContent = function () {
    var t,
      e,
      r,
      i,
      s,
      a,
      n = this.canvasContext;
    n.font = this.values.fValue, n.lineCap = "butt", n.lineJoin = "miter", n.miterLimit = 4, this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
    var o,
      h = this.textAnimator.renderedLetters,
      l = this.textProperty.currentData.l;
    e = l.length;
    var p,
      m,
      f = null,
      c = null,
      d = null;
    for (t = 0; t < e; t += 1) if (!l[t].n) {
      if ((o = h[t]) && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(o.p), this.globalData.renderer.ctxOpacity(o.o)), this.fill) {
        for (o && o.fc ? f !== o.fc && (f = o.fc, n.fillStyle = o.fc) : f !== this.values.fill && (f = this.values.fill, n.fillStyle = this.values.fill), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i; r += 1) for (a = (m = p[r]).length, this.globalData.canvasContext.moveTo(m[0], m[1]), s = 2; s < a; s += 6) this.globalData.canvasContext.bezierCurveTo(m[s], m[s + 1], m[s + 2], m[s + 3], m[s + 4], m[s + 5]);
        this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill();
      }
      if (this.stroke) {
        for (o && o.sw ? d !== o.sw && (d = o.sw, n.lineWidth = o.sw) : d !== this.values.sWidth && (d = this.values.sWidth, n.lineWidth = this.values.sWidth), o && o.sc ? c !== o.sc && (c = o.sc, n.strokeStyle = o.sc) : c !== this.values.stroke && (c = this.values.stroke, n.strokeStyle = this.values.stroke), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i; r += 1) for (a = (m = p[r]).length, this.globalData.canvasContext.moveTo(m[0], m[1]), s = 2; s < a; s += 6) this.globalData.canvasContext.bezierCurveTo(m[s], m[s + 1], m[s + 2], m[s + 3], m[s + 4], m[s + 5]);
        this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke();
      }
      o && this.globalData.renderer.restore();
    }
  }, CVEffects.prototype.renderFrame = function () {}, HBaseElement.prototype = {
    checkBlendMode: function checkBlendMode() {},
    initRendererElement: function initRendererElement() {
      this.baseElement = createTag(this.data.tg || "div"), this.data.hasMask ? (this.svgElement = createNS("svg"), this.layerElement = createNS("g"), this.maskedElement = this.layerElement, this.svgElement.appendChild(this.layerElement), this.baseElement.appendChild(this.svgElement)) : this.layerElement = this.baseElement, styleDiv(this.baseElement);
    },
    createContainerElements: function createContainerElements() {
      this.renderableEffectsManager = new CVEffects(this), this.transformedElement = this.baseElement, this.maskedElement = this.layerElement, this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 !== this.data.bm && this.setBlendMode();
    },
    renderElement: function renderElement() {
      var t = this.transformedElement ? this.transformedElement.style : {};
      if (this.finalTransform._matMdf) {
        var e = this.finalTransform.mat.toCSS();
        t.transform = e, t.webkitTransform = e;
      }
      this.finalTransform._opMdf && (t.opacity = this.finalTransform.mProp.o.v);
    },
    renderFrame: function renderFrame() {
      this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1));
    },
    destroy: function destroy() {
      this.layerElement = null, this.transformedElement = null, this.matteElement && (this.matteElement = null), this.maskManager && (this.maskManager.destroy(), this.maskManager = null);
    },
    createRenderableComponents: function createRenderableComponents() {
      this.maskManager = new MaskElement(this.data, this, this.globalData);
    },
    addEffects: function addEffects() {},
    setMatte: function setMatte() {}
  }, HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement, HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy, HBaseElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement), HSolidElement.prototype.createContent = function () {
    var t;
    this.data.hasMask ? ((t = createNS("rect")).setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.svgElement.setAttribute("width", this.data.sw), this.svgElement.setAttribute("height", this.data.sh)) : ((t = createTag("div")).style.width = this.data.sw + "px", t.style.height = this.data.sh + "px", t.style.backgroundColor = this.data.sc), this.layerElement.appendChild(t);
  }, extendPrototype([HybridRenderer, ICompElement, HBaseElement], HCompElement), HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements, HCompElement.prototype.createContainerElements = function () {
    this._createBaseContainerElements(), this.data.hasMask ? (this.svgElement.setAttribute("width", this.data.w), this.svgElement.setAttribute("height", this.data.h), this.transformedElement = this.baseElement) : this.transformedElement = this.layerElement;
  }, HCompElement.prototype.addTo3dContainer = function (t, e) {
    for (var r, i = 0; i < e;) this.elements[i] && this.elements[i].getBaseElement && (r = this.elements[i].getBaseElement()), i += 1;
    r ? this.layerElement.insertBefore(t, r) : this.layerElement.appendChild(t);
  }, extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement), HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent, HShapeElement.prototype.createContent = function () {
    var t;
    if (this.baseElement.style.fontSize = 0, this.data.hasMask) this.layerElement.appendChild(this.shapesContainer), t = this.svgElement;else {
      t = createNS("svg");
      var e = this.comp.data ? this.comp.data : this.globalData.compSize;
      t.setAttribute("width", e.w), t.setAttribute("height", e.h), t.appendChild(this.shapesContainer), this.layerElement.appendChild(t);
    }
    this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], !0), this.filterUniqueShapes(), this.shapeCont = t;
  }, HShapeElement.prototype.getTransformedPoint = function (t, e) {
    var r,
      i = t.length;
    for (r = 0; r < i; r += 1) e = t[r].mProps.v.applyToPointArray(e[0], e[1], 0);
    return e;
  }, HShapeElement.prototype.calculateShapeBoundingBox = function (t, e) {
    var r,
      i,
      s,
      a,
      n,
      o = t.sh.v,
      h = t.transformers,
      l = o._length;
    if (!(l <= 1)) {
      for (r = 0; r < l - 1; r += 1) i = this.getTransformedPoint(h, o.v[r]), s = this.getTransformedPoint(h, o.o[r]), a = this.getTransformedPoint(h, o.i[r + 1]), n = this.getTransformedPoint(h, o.v[r + 1]), this.checkBounds(i, s, a, n, e);
      o.c && (i = this.getTransformedPoint(h, o.v[r]), s = this.getTransformedPoint(h, o.o[r]), a = this.getTransformedPoint(h, o.i[0]), n = this.getTransformedPoint(h, o.v[0]), this.checkBounds(i, s, a, n, e));
    }
  }, HShapeElement.prototype.checkBounds = function (t, e, r, i, s) {
    this.getBoundsOfCurve(t, e, r, i);
    var a = this.shapeBoundingBox;
    s.x = bmMin(a.left, s.x), s.xMax = bmMax(a.right, s.xMax), s.y = bmMin(a.top, s.y), s.yMax = bmMax(a.bottom, s.yMax);
  }, HShapeElement.prototype.shapeBoundingBox = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }, HShapeElement.prototype.tempBoundingBox = {
    x: 0,
    xMax: 0,
    y: 0,
    yMax: 0,
    width: 0,
    height: 0
  }, HShapeElement.prototype.getBoundsOfCurve = function (t, e, r, i) {
    for (var s, a, n, o, h, l, p, m = [[t[0], i[0]], [t[1], i[1]]], f = 0; f < 2; ++f) a = 6 * t[f] - 12 * e[f] + 6 * r[f], s = -3 * t[f] + 9 * e[f] - 9 * r[f] + 3 * i[f], n = 3 * e[f] - 3 * t[f], a |= 0, n |= 0, 0 === (s |= 0) && 0 === a || (0 === s ? 0 < (o = -n / a) && o < 1 && m[f].push(this.calculateF(o, t, e, r, i, f)) : 0 <= (h = a * a - 4 * n * s) && (0 < (l = (-a + bmSqrt(h)) / (2 * s)) && l < 1 && m[f].push(this.calculateF(l, t, e, r, i, f)), 0 < (p = (-a - bmSqrt(h)) / (2 * s)) && p < 1 && m[f].push(this.calculateF(p, t, e, r, i, f))));
    this.shapeBoundingBox.left = bmMin.apply(null, m[0]), this.shapeBoundingBox.top = bmMin.apply(null, m[1]), this.shapeBoundingBox.right = bmMax.apply(null, m[0]), this.shapeBoundingBox.bottom = bmMax.apply(null, m[1]);
  }, HShapeElement.prototype.calculateF = function (t, e, r, i, s, a) {
    return bmPow(1 - t, 3) * e[a] + 3 * bmPow(1 - t, 2) * t * r[a] + 3 * (1 - t) * bmPow(t, 2) * i[a] + bmPow(t, 3) * s[a];
  }, HShapeElement.prototype.calculateBoundingBox = function (t, e) {
    var r,
      i = t.length;
    for (r = 0; r < i; r += 1) t[r] && t[r].sh ? this.calculateShapeBoundingBox(t[r], e) : t[r] && t[r].it && this.calculateBoundingBox(t[r].it, e);
  }, HShapeElement.prototype.currentBoxContains = function (t) {
    return this.currentBBox.x <= t.x && this.currentBBox.y <= t.y && this.currentBBox.width + this.currentBBox.x >= t.x + t.width && this.currentBBox.height + this.currentBBox.y >= t.y + t.height;
  }, HShapeElement.prototype.renderInnerContent = function () {
    if (this._renderShapeFrame(), !this.hidden && (this._isFirstFrame || this._mdf)) {
      var t = this.tempBoundingBox,
        e = 999999;
      if (t.x = e, t.xMax = -e, t.y = e, t.yMax = -e, this.calculateBoundingBox(this.itemsData, t), t.width = t.xMax < t.x ? 0 : t.xMax - t.x, t.height = t.yMax < t.y ? 0 : t.yMax - t.y, this.currentBoxContains(t)) return;
      var r = !1;
      if (this.currentBBox.w !== t.width && (this.currentBBox.w = t.width, this.shapeCont.setAttribute("width", t.width), r = !0), this.currentBBox.h !== t.height && (this.currentBBox.h = t.height, this.shapeCont.setAttribute("height", t.height), r = !0), r || this.currentBBox.x !== t.x || this.currentBBox.y !== t.y) {
        this.currentBBox.w = t.width, this.currentBBox.h = t.height, this.currentBBox.x = t.x, this.currentBBox.y = t.y, this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h);
        var i = this.shapeCont.style,
          s = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)";
        i.transform = s, i.webkitTransform = s;
      }
    }
  }, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement), HTextElement.prototype.createContent = function () {
    if (this.isMasked = this.checkMasks(), this.isMasked) {
      this.renderType = "svg", this.compW = this.comp.data.w, this.compH = this.comp.data.h, this.svgElement.setAttribute("width", this.compW), this.svgElement.setAttribute("height", this.compH);
      var t = createNS("g");
      this.maskedElement.appendChild(t), this.innerElem = t;
    } else this.renderType = "html", this.innerElem = this.layerElement;
    this.checkParenting();
  }, HTextElement.prototype.buildNewText = function () {
    var t = this.textProperty.currentData;
    this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
    var e = this.innerElem.style,
      r = t.fc ? this.buildColor(t.fc) : "rgba(0,0,0,0)";
    e.fill = r, e.color = r, t.sc && (e.stroke = this.buildColor(t.sc), e.strokeWidth = t.sw + "px");
    var i,
      s,
      a = this.globalData.fontManager.getFontByName(t.f);
    if (!this.globalData.fontManager.chars) if (e.fontSize = t.finalSize + "px", e.lineHeight = t.finalSize + "px", a.fClass) this.innerElem.className = a.fClass;else {
      e.fontFamily = a.fFamily;
      var n = t.fWeight,
        o = t.fStyle;
      e.fontStyle = o, e.fontWeight = n;
    }
    var h,
      l,
      p,
      m = t.l;
    s = m.length;
    var f,
      c = this.mHelper,
      d = "",
      u = 0;
    for (i = 0; i < s; i += 1) {
      if (this.globalData.fontManager.chars ? (this.textPaths[u] ? h = this.textPaths[u] : ((h = createNS("path")).setAttribute("stroke-linecap", "butt"), h.setAttribute("stroke-linejoin", "round"), h.setAttribute("stroke-miterlimit", "4")), this.isMasked || (this.textSpans[u] ? p = (l = this.textSpans[u]).children[0] : ((l = createTag("div")).style.lineHeight = 0, (p = createNS("svg")).appendChild(h), styleDiv(l)))) : this.isMasked ? h = this.textPaths[u] ? this.textPaths[u] : createNS("text") : this.textSpans[u] ? (l = this.textSpans[u], h = this.textPaths[u]) : (styleDiv(l = createTag("span")), styleDiv(h = createTag("span")), l.appendChild(h)), this.globalData.fontManager.chars) {
        var y,
          g = this.globalData.fontManager.getCharData(t.finalText[i], a.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
        if (y = g ? g.data : null, c.reset(), y && y.shapes && (f = y.shapes[0].it, c.scale(t.finalSize / 100, t.finalSize / 100), d = this.createPathShape(c, f), h.setAttribute("d", d)), this.isMasked) this.innerElem.appendChild(h);else {
          if (this.innerElem.appendChild(l), y && y.shapes) {
            document.body.appendChild(p);
            var v = p.getBBox();
            p.setAttribute("width", v.width + 2), p.setAttribute("height", v.height + 2), p.setAttribute("viewBox", v.x - 1 + " " + (v.y - 1) + " " + (v.width + 2) + " " + (v.height + 2));
            var b = p.style,
              P = "translate(" + (v.x - 1) + "px," + (v.y - 1) + "px)";
            b.transform = P, b.webkitTransform = P, m[i].yOffset = v.y - 1;
          } else p.setAttribute("width", 1), p.setAttribute("height", 1);
          l.appendChild(p);
        }
      } else if (h.textContent = m[i].val, h.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.isMasked) this.innerElem.appendChild(h);else {
        this.innerElem.appendChild(l);
        var x = h.style,
          E = "translate3d(0," + -t.finalSize / 1.2 + "px,0)";
        x.transform = E, x.webkitTransform = E;
      }
      this.isMasked ? this.textSpans[u] = h : this.textSpans[u] = l, this.textSpans[u].style.display = "block", this.textPaths[u] = h, u += 1;
    }
    for (; u < this.textSpans.length;) this.textSpans[u].style.display = "none", u += 1;
  }, HTextElement.prototype.renderInnerContent = function () {
    var t;
    if (this.data.singleShape) {
      if (!this._isFirstFrame && !this.lettersChangedFlag) return;
      if (this.isMasked && this.finalTransform._matMdf) {
        this.svgElement.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH), t = this.svgElement.style;
        var e = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)";
        t.transform = e, t.webkitTransform = e;
      }
    }
    if (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag) {
      var r,
        i,
        s,
        a,
        n,
        o = 0,
        h = this.textAnimator.renderedLetters,
        l = this.textProperty.currentData.l;
      for (i = l.length, r = 0; r < i; r += 1) l[r].n ? o += 1 : (a = this.textSpans[r], n = this.textPaths[r], s = h[o], o += 1, s._mdf.m && (this.isMasked ? a.setAttribute("transform", s.m) : (a.style.webkitTransform = s.m, a.style.transform = s.m)), a.style.opacity = s.o, s.sw && s._mdf.sw && n.setAttribute("stroke-width", s.sw), s.sc && s._mdf.sc && n.setAttribute("stroke", s.sc), s.fc && s._mdf.fc && (n.setAttribute("fill", s.fc), n.style.color = s.fc));
      if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
        var p = this.innerElem.getBBox();
        this.currentBBox.w !== p.width && (this.currentBBox.w = p.width, this.svgElement.setAttribute("width", p.width)), this.currentBBox.h !== p.height && (this.currentBBox.h = p.height, this.svgElement.setAttribute("height", p.height));
        if (this.currentBBox.w !== p.width + 2 || this.currentBBox.h !== p.height + 2 || this.currentBBox.x !== p.x - 1 || this.currentBBox.y !== p.y - 1) {
          this.currentBBox.w = p.width + 2, this.currentBBox.h = p.height + 2, this.currentBBox.x = p.x - 1, this.currentBBox.y = p.y - 1, this.svgElement.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), t = this.svgElement.style;
          var m = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)";
          t.transform = m, t.webkitTransform = m;
        }
      }
    }
  }, extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement), HImageElement.prototype.createContent = function () {
    var t = this.globalData.getAssetsPath(this.assetData),
      e = new Image();
    this.data.hasMask ? (this.imageElem = createNS("image"), this.imageElem.setAttribute("width", this.assetData.w + "px"), this.imageElem.setAttribute("height", this.assetData.h + "px"), this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.imageElem), this.baseElement.setAttribute("width", this.assetData.w), this.baseElement.setAttribute("height", this.assetData.h)) : this.layerElement.appendChild(e), e.crossOrigin = "anonymous", e.src = t, this.data.ln && this.baseElement.setAttribute("id", this.data.ln);
  }, extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement), HCameraElement.prototype.setup = function () {
    var t,
      e,
      r,
      i,
      s = this.comp.threeDElements.length;
    for (t = 0; t < s; t += 1) if ("3d" === (e = this.comp.threeDElements[t]).type) {
      r = e.perspectiveElem.style, i = e.container.style;
      var a = this.pe.v + "px",
        n = "0px 0px 0px",
        o = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
      r.perspective = a, r.webkitPerspective = a, i.transformOrigin = n, i.mozTransformOrigin = n, i.webkitTransformOrigin = n, r.transform = o, r.webkitTransform = o;
    }
  }, HCameraElement.prototype.createElements = function () {}, HCameraElement.prototype.hide = function () {}, HCameraElement.prototype.renderFrame = function () {
    var t,
      e,
      r = this._isFirstFrame;
    if (this.hierarchy) for (e = this.hierarchy.length, t = 0; t < e; t += 1) r = this.hierarchy[t].finalTransform.mProp._mdf || r;
    if (r || this.pe._mdf || this.p && this.p._mdf || this.px && (this.px._mdf || this.py._mdf || this.pz._mdf) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || this.a && this.a._mdf) {
      if (this.mat.reset(), this.hierarchy) for (t = e = this.hierarchy.length - 1; 0 <= t; t -= 1) {
        var i = this.hierarchy[t].finalTransform.mProp;
        this.mat.translate(-i.p.v[0], -i.p.v[1], i.p.v[2]), this.mat.rotateX(-i.or.v[0]).rotateY(-i.or.v[1]).rotateZ(i.or.v[2]), this.mat.rotateX(-i.rx.v).rotateY(-i.ry.v).rotateZ(i.rz.v), this.mat.scale(1 / i.s.v[0], 1 / i.s.v[1], 1 / i.s.v[2]), this.mat.translate(i.a.v[0], i.a.v[1], i.a.v[2]);
      }
      if (this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v), this.a) {
        var s;
        s = this.p ? [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]] : [this.px.v - this.a.v[0], this.py.v - this.a.v[1], this.pz.v - this.a.v[2]];
        var a = Math.sqrt(Math.pow(s[0], 2) + Math.pow(s[1], 2) + Math.pow(s[2], 2)),
          n = [s[0] / a, s[1] / a, s[2] / a],
          o = Math.sqrt(n[2] * n[2] + n[0] * n[0]),
          h = Math.atan2(n[1], o),
          l = Math.atan2(n[0], -n[2]);
        this.mat.rotateY(l).rotateX(-h);
      }
      this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]), this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0), this.mat.translate(0, 0, this.pe.v);
      var p = !this._prevMat.equals(this.mat);
      if ((p || this.pe._mdf) && this.comp.threeDElements) {
        var m, f, c;
        for (e = this.comp.threeDElements.length, t = 0; t < e; t += 1) if ("3d" === (m = this.comp.threeDElements[t]).type) {
          if (p) {
            var d = this.mat.toCSS();
            (c = m.container.style).transform = d, c.webkitTransform = d;
          }
          this.pe._mdf && ((f = m.perspectiveElem.style).perspective = this.pe.v + "px", f.webkitPerspective = this.pe.v + "px");
        }
        this.mat.clone(this._prevMat);
      }
    }
    this._isFirstFrame = !1;
  }, HCameraElement.prototype.prepareFrame = function (t) {
    this.prepareProperties(t, !0);
  }, HCameraElement.prototype.destroy = function () {}, HCameraElement.prototype.getBaseElement = function () {
    return null;
  }, HEffects.prototype.renderFrame = function () {};
  var animationManager = function () {
      var t = {},
        s = [],
        i = 0,
        a = 0,
        n = 0,
        o = !0,
        h = !1;
      function r(t) {
        for (var e = 0, r = t.target; e < a;) s[e].animation === r && (s.splice(e, 1), e -= 1, a -= 1, r.isPaused || m()), e += 1;
      }
      function l(t, e) {
        if (!t) return null;
        for (var r = 0; r < a;) {
          if (s[r].elem === t && null !== s[r].elem) return s[r].animation;
          r += 1;
        }
        var i = new AnimationItem();
        return f(i, t), i.setData(t, e), i;
      }
      function p() {
        n += 1, d();
      }
      function m() {
        n -= 1;
      }
      function f(t, e) {
        t.addEventListener("destroy", r), t.addEventListener("_active", p), t.addEventListener("_idle", m), s.push({
          elem: e,
          animation: t
        }), a += 1;
      }
      function c(t) {
        var e,
          r = t - i;
        for (e = 0; e < a; e += 1) s[e].animation.advanceTime(r);
        i = t, n && !h ? window.requestAnimationFrame(c) : o = !0;
      }
      function e(t) {
        i = t, window.requestAnimationFrame(c);
      }
      function d() {
        !h && n && o && (window.requestAnimationFrame(e), o = !1);
      }
      return t.registerAnimation = l, t.loadAnimation = function (t) {
        var e = new AnimationItem();
        return f(e, null), e.setParams(t), e;
      }, t.setSpeed = function (t, e) {
        var r;
        for (r = 0; r < a; r += 1) s[r].animation.setSpeed(t, e);
      }, t.setDirection = function (t, e) {
        var r;
        for (r = 0; r < a; r += 1) s[r].animation.setDirection(t, e);
      }, t.play = function (t) {
        var e;
        for (e = 0; e < a; e += 1) s[e].animation.play(t);
      }, t.pause = function (t) {
        var e;
        for (e = 0; e < a; e += 1) s[e].animation.pause(t);
      }, t.stop = function (t) {
        var e;
        for (e = 0; e < a; e += 1) s[e].animation.stop(t);
      }, t.togglePause = function (t) {
        var e;
        for (e = 0; e < a; e += 1) s[e].animation.togglePause(t);
      }, t.searchAnimations = function (t, e, r) {
        var i,
          s = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))),
          a = s.length;
        for (i = 0; i < a; i += 1) r && s[i].setAttribute("data-bm-type", r), l(s[i], t);
        if (e && 0 === a) {
          r || (r = "svg");
          var n = document.getElementsByTagName("body")[0];
          n.innerText = "";
          var o = createTag("div");
          o.style.width = "100%", o.style.height = "100%", o.setAttribute("data-bm-type", r), n.appendChild(o), l(o, t);
        }
      }, t.resize = function () {
        var t;
        for (t = 0; t < a; t += 1) s[t].animation.resize();
      }, t.goToAndStop = function (t, e, r) {
        var i;
        for (i = 0; i < a; i += 1) s[i].animation.goToAndStop(t, e, r);
      }, t.destroy = function (t) {
        var e;
        for (e = a - 1; 0 <= e; e -= 1) s[e].animation.destroy(t);
      }, t.freeze = function () {
        h = !0;
      }, t.unfreeze = function () {
        h = !1, d();
      }, t.setVolume = function (t, e) {
        var r;
        for (r = 0; r < a; r += 1) s[r].animation.setVolume(t, e);
      }, t.mute = function (t) {
        var e;
        for (e = 0; e < a; e += 1) s[e].animation.mute(t);
      }, t.unmute = function (t) {
        var e;
        for (e = 0; e < a; e += 1) s[e].animation.unmute(t);
      }, t.getRegisteredAnimations = function () {
        var t,
          e = s.length,
          r = [];
        for (t = 0; t < e; t += 1) r.push(s[t].animation);
        return r;
      }, t;
    }(),
    AnimationItem = function AnimationItem() {
      this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.firstFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = createElementID(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.isSubframeEnabled = subframeEnabled, this.segments = [], this._idle = !0, this._completedLoop = !1, this.projectInterface = ProjectInterface(), this.imagePreloader = new ImagePreloader(), this.audioController = audioControllerFactory();
    };
  extendPrototype([BaseEvent], AnimationItem), AnimationItem.prototype.setParams = function (t) {
    (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
    var e = "svg";
    switch (t.animType ? e = t.animType : t.renderer && (e = t.renderer), e) {
      case "canvas":
        this.renderer = new CanvasRenderer(this, t.rendererSettings);
        break;
      case "svg":
        this.renderer = new SVGRenderer(this, t.rendererSettings);
        break;
      default:
        this.renderer = new HybridRenderer(this, t.rendererSettings);
    }
    this.imagePreloader.setCacheType(e, this.renderer.globalData.defs), this.renderer.setProjectInterface(this.projectInterface), this.animType = e, "" === t.loop || null === t.loop || void 0 === t.loop || !0 === t.loop ? this.loop = !0 : !1 === t.loop ? this.loop = !1 : this.loop = parseInt(t.loop, 10), this.autoplay = !("autoplay" in t) || t.autoplay, this.name = t.name ? t.name : "", this.autoloadSegments = !Object.prototype.hasOwnProperty.call(t, "autoloadSegments") || t.autoloadSegments, this.assetsPath = t.assetsPath, this.initialSegment = t.initialSegment, t.audioFactory && this.audioController.setAudioFactory(t.audioFactory), t.animationData ? this.configAnimation(t.animationData) : t.path && (-1 !== t.path.lastIndexOf("\\") ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1), this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), assetLoader.load(t.path, this.configAnimation.bind(this), function () {
      this.trigger("data_failed");
    }.bind(this)));
  }, AnimationItem.prototype.setData = function (t, e) {
    e && "object" != _typeof(e) && (e = JSON.parse(e));
    var r = {
        wrapper: t,
        animationData: e
      },
      i = t.attributes;
    r.path = i.getNamedItem("data-animation-path") ? i.getNamedItem("data-animation-path").value : i.getNamedItem("data-bm-path") ? i.getNamedItem("data-bm-path").value : i.getNamedItem("bm-path") ? i.getNamedItem("bm-path").value : "", r.animType = i.getNamedItem("data-anim-type") ? i.getNamedItem("data-anim-type").value : i.getNamedItem("data-bm-type") ? i.getNamedItem("data-bm-type").value : i.getNamedItem("bm-type") ? i.getNamedItem("bm-type").value : i.getNamedItem("data-bm-renderer") ? i.getNamedItem("data-bm-renderer").value : i.getNamedItem("bm-renderer") ? i.getNamedItem("bm-renderer").value : "canvas";
    var s = i.getNamedItem("data-anim-loop") ? i.getNamedItem("data-anim-loop").value : i.getNamedItem("data-bm-loop") ? i.getNamedItem("data-bm-loop").value : i.getNamedItem("bm-loop") ? i.getNamedItem("bm-loop").value : "";
    "false" === s ? r.loop = !1 : "true" === s ? r.loop = !0 : "" !== s && (r.loop = parseInt(s, 10));
    var a = i.getNamedItem("data-anim-autoplay") ? i.getNamedItem("data-anim-autoplay").value : i.getNamedItem("data-bm-autoplay") ? i.getNamedItem("data-bm-autoplay").value : !i.getNamedItem("bm-autoplay") || i.getNamedItem("bm-autoplay").value;
    r.autoplay = "false" !== a, r.name = i.getNamedItem("data-name") ? i.getNamedItem("data-name").value : i.getNamedItem("data-bm-name") ? i.getNamedItem("data-bm-name").value : i.getNamedItem("bm-name") ? i.getNamedItem("bm-name").value : "", "false" === (i.getNamedItem("data-anim-prerender") ? i.getNamedItem("data-anim-prerender").value : i.getNamedItem("data-bm-prerender") ? i.getNamedItem("data-bm-prerender").value : i.getNamedItem("bm-prerender") ? i.getNamedItem("bm-prerender").value : "") && (r.prerender = !1), this.setParams(r);
  }, AnimationItem.prototype.includeLayers = function (t) {
    t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip));
    var e,
      r,
      i = this.animationData.layers,
      s = i.length,
      a = t.layers,
      n = a.length;
    for (r = 0; r < n; r += 1) for (e = 0; e < s;) {
      if (i[e].id === a[r].id) {
        i[e] = a[r];
        break;
      }
      e += 1;
    }
    if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets) for (s = t.assets.length, e = 0; e < s; e += 1) this.animationData.assets.push(t.assets[e]);
    this.animationData.__complete = !1, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(t.layers), expressionsPlugin && expressionsPlugin.initExpressions(this), this.loadNextSegment();
  }, AnimationItem.prototype.loadNextSegment = function () {
    var t = this.animationData.segments;
    if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger("data_ready"), void (this.timeCompleted = this.totalFrames);
    var e = t.shift();
    this.timeCompleted = e.time * this.frameRate;
    var r = this.path + this.fileName + "_" + this.segmentPos + ".json";
    this.segmentPos += 1, assetLoader.load(r, this.includeLayers.bind(this), function () {
      this.trigger("data_failed");
    }.bind(this));
  }, AnimationItem.prototype.loadSegments = function () {
    this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment();
  }, AnimationItem.prototype.imagesLoaded = function () {
    this.trigger("loaded_images"), this.checkLoaded();
  }, AnimationItem.prototype.preloadImages = function () {
    this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this));
  }, AnimationItem.prototype.configAnimation = function (t) {
    if (this.renderer) try {
      this.animationData = t, this.initialSegment ? (this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0]), this.firstFrame = Math.round(this.initialSegment[0])) : (this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.firstFrame = Math.round(this.animationData.ip)), this.renderer.configAnimation(t), t.assets || (t.assets = []), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.frameMult = this.animationData.fr / 1e3, this.renderer.searchExtraCompositions(t.assets), this.trigger("config_ready"), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded(), this.isPaused && this.audioController.pause();
    } catch (t) {
      this.triggerConfigError(t);
    }
  }, AnimationItem.prototype.waitForFontsLoaded = function () {
    this.renderer && (this.renderer.globalData.fontManager.isLoaded ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20));
  }, AnimationItem.prototype.checkLoaded = function () {
    this.isLoaded || !this.renderer.globalData.fontManager.isLoaded || !this.imagePreloader.loaded() && "canvas" === this.renderer.rendererType || (this.isLoaded = !0, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.initItems(), setTimeout(function () {
      this.trigger("DOMLoaded");
    }.bind(this), 0), this.gotoFrame(), this.autoplay && this.play());
  }, AnimationItem.prototype.resize = function () {
    this.renderer.updateContainerSize();
  }, AnimationItem.prototype.setSubframe = function (t) {
    this.isSubframeEnabled = !!t;
  }, AnimationItem.prototype.gotoFrame = function () {
    this.currentFrame = this.isSubframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame();
  }, AnimationItem.prototype.renderFrame = function () {
    if (!1 !== this.isLoaded) try {
      this.renderer.renderFrame(this.currentFrame + this.firstFrame);
    } catch (t) {
      this.triggerRenderFrameError(t);
    }
  }, AnimationItem.prototype.play = function (t) {
    t && this.name !== t || !0 === this.isPaused && (this.isPaused = !1, this.audioController.resume(), this._idle && (this._idle = !1, this.trigger("_active")));
  }, AnimationItem.prototype.pause = function (t) {
    t && this.name !== t || !1 === this.isPaused && (this.isPaused = !0, this._idle = !0, this.trigger("_idle"), this.audioController.pause());
  }, AnimationItem.prototype.togglePause = function (t) {
    t && this.name !== t || (!0 === this.isPaused ? this.play() : this.pause());
  }, AnimationItem.prototype.stop = function (t) {
    t && this.name !== t || (this.pause(), this.playCount = 0, this._completedLoop = !1, this.setCurrentRawFrameValue(0));
  }, AnimationItem.prototype.goToAndStop = function (t, e, r) {
    r && this.name !== r || (e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier), this.pause());
  }, AnimationItem.prototype.goToAndPlay = function (t, e, r) {
    this.goToAndStop(t, e, r), this.play();
  }, AnimationItem.prototype.advanceTime = function (t) {
    if (!0 !== this.isPaused && !1 !== this.isLoaded) {
      var e = this.currentRawFrame + t * this.frameModifier,
        r = !1;
      e >= this.totalFrames - 1 && 0 < this.frameModifier ? this.loop && this.playCount !== this.loop ? e >= this.totalFrames ? (this.playCount += 1, this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames), this._completedLoop = !0, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || (r = !0, e = this.totalFrames - 1) : e < 0 ? this.checkSegments(e % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && !0 !== this.loop ? (r = !0, e = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0)) : this.setCurrentRawFrameValue(e), r && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger("complete"));
    }
  }, AnimationItem.prototype.adjustSegment = function (t, e) {
    this.playCount = 0, t[1] < t[0] ? (0 < this.frameModifier && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.totalFrames = t[0] - t[1], this.timeCompleted = this.totalFrames, this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.totalFrames = t[1] - t[0], this.timeCompleted = this.totalFrames, this.firstFrame = t[0], this.setCurrentRawFrameValue(.001 + e)), this.trigger("segmentStart");
  }, AnimationItem.prototype.setSegment = function (t, e) {
    var r = -1;
    this.isPaused && (this.currentRawFrame + this.firstFrame < t ? r = t : this.currentRawFrame + this.firstFrame > e && (r = e - t)), this.firstFrame = t, this.totalFrames = e - t, this.timeCompleted = this.totalFrames, -1 !== r && this.goToAndStop(r, !0);
  }, AnimationItem.prototype.playSegments = function (t, e) {
    if (e && (this.segments.length = 0), "object" == _typeof(t[0])) {
      var r,
        i = t.length;
      for (r = 0; r < i; r += 1) this.segments.push(t[r]);
    } else this.segments.push(t);
    this.segments.length && e && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play();
  }, AnimationItem.prototype.resetSegments = function (t) {
    this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0);
  }, AnimationItem.prototype.checkSegments = function (t) {
    return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0);
  }, AnimationItem.prototype.destroy = function (t) {
    t && this.name !== t || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = null, this.onLoopComplete = null, this.onComplete = null, this.onSegmentStart = null, this.onDestroy = null, this.renderer = null, this.renderer = null, this.imagePreloader = null, this.projectInterface = null);
  }, AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
    this.currentRawFrame = t, this.gotoFrame();
  }, AnimationItem.prototype.setSpeed = function (t) {
    this.playSpeed = t, this.updaFrameModifier();
  }, AnimationItem.prototype.setDirection = function (t) {
    this.playDirection = t < 0 ? -1 : 1, this.updaFrameModifier();
  }, AnimationItem.prototype.setVolume = function (t, e) {
    e && this.name !== e || this.audioController.setVolume(t);
  }, AnimationItem.prototype.getVolume = function () {
    return this.audioController.getVolume();
  }, AnimationItem.prototype.mute = function (t) {
    t && this.name !== t || this.audioController.mute();
  }, AnimationItem.prototype.unmute = function (t) {
    t && this.name !== t || this.audioController.unmute();
  }, AnimationItem.prototype.updaFrameModifier = function () {
    this.frameModifier = this.frameMult * this.playSpeed * this.playDirection, this.audioController.setRate(this.playSpeed * this.playDirection);
  }, AnimationItem.prototype.getPath = function () {
    return this.path;
  }, AnimationItem.prototype.getAssetsPath = function (t) {
    var e = "";
    if (t.e) e = t.p;else if (this.assetsPath) {
      var r = t.p;
      -1 !== r.indexOf("images/") && (r = r.split("/")[1]), e = this.assetsPath + r;
    } else e = this.path, e += t.u ? t.u : "", e += t.p;
    return e;
  }, AnimationItem.prototype.getAssetData = function (t) {
    for (var e = 0, r = this.assets.length; e < r;) {
      if (t === this.assets[e].id) return this.assets[e];
      e += 1;
    }
    return null;
  }, AnimationItem.prototype.hide = function () {
    this.renderer.hide();
  }, AnimationItem.prototype.show = function () {
    this.renderer.show();
  }, AnimationItem.prototype.getDuration = function (t) {
    return t ? this.totalFrames : this.totalFrames / this.frameRate;
  }, AnimationItem.prototype.trigger = function (t) {
    if (this._cbs && this._cbs[t]) switch (t) {
      case "enterFrame":
        this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameModifier));
        break;
      case "loopComplete":
        this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
        break;
      case "complete":
        this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
        break;
      case "segmentStart":
        this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
        break;
      case "destroy":
        this.triggerEvent(t, new BMDestroyEvent(t, this));
        break;
      default:
        this.triggerEvent(t);
    }
    "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)), "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)), "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)), "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this));
  }, AnimationItem.prototype.triggerRenderFrameError = function (t) {
    var e = new BMRenderFrameErrorEvent(t, this.currentFrame);
    this.triggerEvent("error", e), this.onError && this.onError.call(this, e);
  }, AnimationItem.prototype.triggerConfigError = function (t) {
    var e = new BMConfigErrorEvent(t, this.currentFrame);
    this.triggerEvent("error", e), this.onError && this.onError.call(this, e);
  };
  var Expressions = (KX = {}, KX.initExpressions = function (t) {
      var e = 0,
        r = [];
      function i() {
        var t,
          e = r.length;
        for (t = 0; t < e; t += 1) r[t].release();
        r.length = 0;
      }
      t.renderer.compInterface = CompExpressionInterface(t.renderer), t.renderer.globalData.projectInterface.registerComposition(t.renderer), t.renderer.globalData.pushExpression = function () {
        e += 1;
      }, t.renderer.globalData.popExpression = function () {
        0 == (e -= 1) && i();
      }, t.renderer.globalData.registerExpressionProperty = function (t) {
        -1 === r.indexOf(t) && r.push(t);
      };
    }, KX),
    KX;
  expressionsPlugin = Expressions;
  var ExpressionManager = function () {
      var ob = {},
        Math = BMMath,
        window = null,
        document = null;
      function $bm_isInstanceOfArray(t) {
        return t.constructor === Array || t.constructor === Float32Array;
      }
      function isNumerable(t, e) {
        return "number" === t || "boolean" === t || "string" === t || e instanceof Number;
      }
      function $bm_neg(t) {
        var e = _typeof(t);
        if ("number" === e || "boolean" === e || t instanceof Number) return -t;
        if ($bm_isInstanceOfArray(t)) {
          var r,
            i = t.length,
            s = [];
          for (r = 0; r < i; r += 1) s[r] = -t[r];
          return s;
        }
        return t.propType ? t.v : -t;
      }
      var easeInBez = BezierFactory.getBezierEasing(.333, 0, .833, .833, "easeIn").get,
        easeOutBez = BezierFactory.getBezierEasing(.167, .167, .667, 1, "easeOut").get,
        easeInOutBez = BezierFactory.getBezierEasing(.33, 0, .667, 1, "easeInOut").get;
      function sum(t, e) {
        var r = _typeof(t),
          i = _typeof(e);
        if ("string" === r || "string" === i) return t + e;
        if (isNumerable(r, t) && isNumerable(i, e)) return t + e;
        if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] += e, t;
        if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t + e[0], e;
        if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
          for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;) ("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] + e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;
          return o;
        }
        return 0;
      }
      var add = sum;
      function sub(t, e) {
        var r = _typeof(t),
          i = _typeof(e);
        if (isNumerable(r, t) && isNumerable(i, e)) return "string" === r && (t = parseInt(t, 10)), "string" === i && (e = parseInt(e, 10)), t - e;
        if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] -= e, t;
        if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t - e[0], e;
        if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
          for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;) ("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] - e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;
          return o;
        }
        return 0;
      }
      function mul(t, e) {
        var r,
          i,
          s,
          a = _typeof(t),
          n = _typeof(e);
        if (isNumerable(a, t) && isNumerable(n, e)) return t * e;
        if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
          for (s = t.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t[i] * e;
          return r;
        }
        if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
          for (s = e.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t * e[i];
          return r;
        }
        return 0;
      }
      function div(t, e) {
        var r,
          i,
          s,
          a = _typeof(t),
          n = _typeof(e);
        if (isNumerable(a, t) && isNumerable(n, e)) return t / e;
        if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
          for (s = t.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t[i] / e;
          return r;
        }
        if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
          for (s = e.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t / e[i];
          return r;
        }
        return 0;
      }
      function mod(t, e) {
        return "string" == typeof t && (t = parseInt(t, 10)), "string" == typeof e && (e = parseInt(e, 10)), t % e;
      }
      var $bm_sum = sum,
        $bm_sub = sub,
        $bm_mul = mul,
        $bm_div = div,
        $bm_mod = mod;
      function clamp(t, e, r) {
        if (r < e) {
          var i = r;
          r = e, e = i;
        }
        return Math.min(Math.max(t, e), r);
      }
      function radiansToDegrees(t) {
        return t / degToRads;
      }
      var radians_to_degrees = radiansToDegrees;
      function degreesToRadians(t) {
        return t * degToRads;
      }
      var degrees_to_radians = radiansToDegrees,
        helperLengthArray = [0, 0, 0, 0, 0, 0];
      function length(t, e) {
        if ("number" == typeof t || t instanceof Number) return e = e || 0, Math.abs(t - e);
        var r;
        e || (e = helperLengthArray);
        var i = Math.min(t.length, e.length),
          s = 0;
        for (r = 0; r < i; r += 1) s += Math.pow(e[r] - t[r], 2);
        return Math.sqrt(s);
      }
      function normalize(t) {
        return div(t, length(t));
      }
      function rgbToHsl(t) {
        var e,
          r,
          i = t[0],
          s = t[1],
          a = t[2],
          n = Math.max(i, s, a),
          o = Math.min(i, s, a),
          h = (n + o) / 2;
        if (n === o) r = e = 0;else {
          var l = n - o;
          switch (r = .5 < h ? l / (2 - n - o) : l / (n + o), n) {
            case i:
              e = (s - a) / l + (s < a ? 6 : 0);
              break;
            case s:
              e = (a - i) / l + 2;
              break;
            case a:
              e = (i - s) / l + 4;
          }
          e /= 6;
        }
        return [e, r, h, t[3]];
      }
      function hue2rgb(t, e, r) {
        return r < 0 && (r += 1), 1 < r && (r -= 1), r < 1 / 6 ? t + 6 * (e - t) * r : r < .5 ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t;
      }
      function hslToRgb(t) {
        var e,
          r,
          i,
          s = t[0],
          a = t[1],
          n = t[2];
        if (0 === a) r = i = e = n;else {
          var o = n < .5 ? n * (1 + a) : n + a - n * a,
            h = 2 * n - o;
          e = hue2rgb(h, o, s + 1 / 3), r = hue2rgb(h, o, s), i = hue2rgb(h, o, s - 1 / 3);
        }
        return [e, r, i, t[3]];
      }
      function linear(t, e, r, i, s) {
        if (void 0 !== i && void 0 !== s || (i = e, s = r, e = 0, r = 1), r < e) {
          var a = r;
          r = e, e = a;
        }
        if (t <= e) return i;
        if (r <= t) return s;
        var n,
          o = r === e ? 0 : (t - e) / (r - e);
        if (!i.length) return i + (s - i) * o;
        var h = i.length,
          l = createTypedArray("float32", h);
        for (n = 0; n < h; n += 1) l[n] = i[n] + (s[n] - i[n]) * o;
        return l;
      }
      function random(t, e) {
        if (void 0 === e && (void 0 === t ? (t = 0, e = 1) : (e = t, t = void 0)), e.length) {
          var r,
            i = e.length;
          t || (t = createTypedArray("float32", i));
          var s = createTypedArray("float32", i),
            a = BMMath.random();
          for (r = 0; r < i; r += 1) s[r] = t[r] + a * (e[r] - t[r]);
          return s;
        }
        return void 0 === t && (t = 0), t + BMMath.random() * (e - t);
      }
      function createPath(t, e, r, i) {
        var s,
          a = t.length,
          n = shapePool.newElement();
        n.setPathData(!!i, a);
        var o,
          h,
          l = [0, 0];
        for (s = 0; s < a; s += 1) o = e && e[s] ? e[s] : l, h = r && r[s] ? r[s] : l, n.setTripleAt(t[s][0], t[s][1], h[0] + t[s][0], h[1] + t[s][1], o[0] + t[s][0], o[1] + t[s][1], s, !0);
        return n;
      }
      function initiateExpression(elem, data, property) {
        var val = data.x,
          needsVelocity = /velocity(?![\w\d])/.test(val),
          _needsRandom = -1 !== val.indexOf("random"),
          elemType = elem.data.ty,
          transform,
          $bm_transform,
          content,
          effect,
          thisProperty = property;
        thisProperty.valueAtTime = thisProperty.getValueAtTime, Object.defineProperty(thisProperty, "value", {
          get: function get() {
            return thisProperty.v;
          }
        }), elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate, elem.comp.displayStartTime = 0;
        var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
          outPoint = elem.data.op / elem.comp.globalData.frameRate,
          width = elem.data.sw ? elem.data.sw : 0,
          height = elem.data.sh ? elem.data.sh : 0,
          name = elem.data.nm,
          loopIn,
          loop_in,
          loopOut,
          loop_out,
          smooth,
          toWorld,
          fromWorld,
          fromComp,
          toComp,
          fromCompToSurface,
          position,
          rotation,
          anchorPoint,
          scale,
          thisLayer,
          thisComp,
          mask,
          valueAtTime,
          velocityAtTime,
          scoped_bm_rt,
          expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0],
          numKeys = property.kf ? data.k.length : 0,
          active = !this.data || !0 !== this.data.hd,
          wiggle = function (t, e) {
            var r,
              i,
              s = this.pv.length ? this.pv.length : 1,
              a = createTypedArray("float32", s);
            var n = Math.floor(5 * time);
            for (i = r = 0; r < n;) {
              for (i = 0; i < s; i += 1) a[i] += -e + 2 * e * BMMath.random();
              r += 1;
            }
            var o = 5 * time,
              h = o - Math.floor(o),
              l = createTypedArray("float32", s);
            if (1 < s) {
              for (i = 0; i < s; i += 1) l[i] = this.pv[i] + a[i] + (-e + 2 * e * BMMath.random()) * h;
              return l;
            }
            return this.pv + a[0] + (-e + 2 * e * BMMath.random()) * h;
          }.bind(this);
        function loopInDuration(t, e) {
          return loopIn(t, e, !0);
        }
        function loopOutDuration(t, e) {
          return loopOut(t, e, !0);
        }
        thisProperty.loopIn && (loopIn = thisProperty.loopIn.bind(thisProperty), loop_in = loopIn), thisProperty.loopOut && (loopOut = thisProperty.loopOut.bind(thisProperty), loop_out = loopOut), thisProperty.smooth && (smooth = thisProperty.smooth.bind(thisProperty)), this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)), this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
        var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface),
          time,
          velocity,
          value,
          text,
          textIndex,
          textTotal,
          selectorValue;
        function lookAt(t, e) {
          var r = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
            i = Math.atan2(r[0], Math.sqrt(r[1] * r[1] + r[2] * r[2])) / degToRads;
          return [-Math.atan2(r[1], r[2]) / degToRads, i, 0];
        }
        function easeOut(t, e, r, i, s) {
          return applyEase(easeOutBez, t, e, r, i, s);
        }
        function easeIn(t, e, r, i, s) {
          return applyEase(easeInBez, t, e, r, i, s);
        }
        function ease(t, e, r, i, s) {
          return applyEase(easeInOutBez, t, e, r, i, s);
        }
        function applyEase(t, e, r, i, s, a) {
          void 0 === s ? (s = r, a = i) : e = (e - r) / (i - r), 1 < e ? e = 1 : e < 0 && (e = 0);
          var n = t(e);
          if ($bm_isInstanceOfArray(s)) {
            var o,
              h = s.length,
              l = createTypedArray("float32", h);
            for (o = 0; o < h; o += 1) l[o] = (a[o] - s[o]) * n + s[o];
            return l;
          }
          return (a - s) * n + s;
        }
        function nearestKey(t) {
          var e,
            r,
            i,
            s = data.k.length;
          if (data.k.length && "number" != typeof data.k[0]) {
            if (r = -1, (t *= elem.comp.globalData.frameRate) < data.k[0].t) r = 1, i = data.k[0].t;else {
              for (e = 0; e < s - 1; e += 1) {
                if (t === data.k[e].t) {
                  r = e + 1, i = data.k[e].t;
                  break;
                }
                if (t > data.k[e].t && t < data.k[e + 1].t) {
                  i = t - data.k[e].t > data.k[e + 1].t - t ? (r = e + 2, data.k[e + 1].t) : (r = e + 1, data.k[e].t);
                  break;
                }
              }
              -1 === r && (r = e + 1, i = data.k[e].t);
            }
          } else i = r = 0;
          var a = {};
          return a.index = r, a.time = i / elem.comp.globalData.frameRate, a;
        }
        function key(t) {
          var e, r, i;
          if (!data.k.length || "number" == typeof data.k[0]) throw new Error("The property has no keyframe at index " + t);
          t -= 1, e = {
            time: data.k[t].t / elem.comp.globalData.frameRate,
            value: []
          };
          var s = Object.prototype.hasOwnProperty.call(data.k[t], "s") ? data.k[t].s : data.k[t - 1].e;
          for (i = s.length, r = 0; r < i; r += 1) e[r] = s[r], e.value[r] = s[r];
          return e;
        }
        function framesToTime(t, e) {
          return e || (e = elem.comp.globalData.frameRate), t / e;
        }
        function timeToFrames(t, e) {
          return t || 0 === t || (t = time), e || (e = elem.comp.globalData.frameRate), t * e;
        }
        function seedRandom(t) {
          BMMath.seedrandom(randSeed + t);
        }
        function sourceRectAtTime() {
          return elem.sourceRectAtTime();
        }
        function substring(t, e) {
          return "string" == typeof value ? void 0 === e ? value.substring(t) : value.substring(t, e) : "";
        }
        function substr(t, e) {
          return "string" == typeof value ? void 0 === e ? value.substr(t) : value.substr(t, e) : "";
        }
        function posterizeTime(t) {
          time = 0 === t ? 0 : Math.floor(time * t) / t, value = valueAtTime(time);
        }
        var index = elem.data.ind,
          hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
          parent,
          randSeed = Math.floor(1e6 * Math.random()),
          globalData = elem.globalData;
        function executeExpression(t) {
          return value = t, _needsRandom && seedRandom(randSeed), this.frameExpressionId === elem.globalData.frameId && "textSelector" !== this.propType ? value : ("textSelector" === this.propType && (textIndex = this.textIndex, textTotal = this.textTotal, selectorValue = this.selectorValue), thisLayer || (text = elem.layerInterface.text, thisLayer = elem.layerInterface, thisComp = elem.comp.compInterface, toWorld = thisLayer.toWorld.bind(thisLayer), fromWorld = thisLayer.fromWorld.bind(thisLayer), fromComp = thisLayer.fromComp.bind(thisLayer), toComp = thisLayer.toComp.bind(thisLayer), mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null, fromCompToSurface = fromComp), transform || (transform = elem.layerInterface("ADBE Transform Group"), ($bm_transform = transform) && (anchorPoint = transform.anchorPoint)), 4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")), effect || (effect = thisLayer(4)), (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) && !parent && (parent = elem.hierarchy[0].layerInterface), time = this.comp.renderedFrame / this.comp.globalData.frameRate, needsVelocity && (velocity = velocityAtTime(time)), expression_function(), this.frameExpressionId = elem.globalData.frameId, "shape" === scoped_bm_rt.propType && (scoped_bm_rt = scoped_bm_rt.v), scoped_bm_rt);
        }
        return executeExpression;
      }
      return ob.initiateExpression = initiateExpression, ob;
    }(),
    expressionHelpers = {
      searchExpressions: function searchExpressions(t, e, r) {
        e.x && (r.k = !0, r.x = !0, r.initiateExpression = ExpressionManager.initiateExpression, r.effectsSequence.push(r.initiateExpression(t, e, r).bind(r)));
      },
      getSpeedAtTime: function getSpeedAtTime(t) {
        var e = this.getValueAtTime(t),
          r = this.getValueAtTime(t + -.01),
          i = 0;
        if (e.length) {
          var s;
          for (s = 0; s < e.length; s += 1) i += Math.pow(r[s] - e[s], 2);
          i = 100 * Math.sqrt(i);
        } else i = 0;
        return i;
      },
      getVelocityAtTime: function getVelocityAtTime(t) {
        if (void 0 !== this.vel) return this.vel;
        var e,
          r,
          i = this.getValueAtTime(t),
          s = this.getValueAtTime(t + -.001);
        if (i.length) for (e = createTypedArray("float32", i.length), r = 0; r < i.length; r += 1) e[r] = (s[r] - i[r]) / -.001;else e = (s - i) / -.001;
        return e;
      },
      getValueAtTime: function getValueAtTime(t) {
        return t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0, this._cachingAtTime.value = this.interpolateValue(t, this._cachingAtTime), this._cachingAtTime.lastFrame = t), this._cachingAtTime.value;
      },
      getStaticValueAtTime: function getStaticValueAtTime() {
        return this.pv;
      },
      setGroupProperty: function setGroupProperty(t) {
        this.propertyGroup = t;
      }
    };
  !function () {
    function o(t, e, r) {
      if (!this.k || !this.keyframes) return this.pv;
      t = t ? t.toLowerCase() : "";
      var i,
        s,
        a,
        n,
        o,
        h = this.comp.renderedFrame,
        l = this.keyframes,
        p = l[l.length - 1].t;
      if (h <= p) return this.pv;
      if (r ? s = p - (i = e ? Math.abs(p - this.elem.comp.globalData.frameRate * e) : Math.max(0, p - this.elem.data.ip)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = p - (s = l[l.length - 1 - e].t)), "pingpong" === t) {
        if (Math.floor((h - s) / i) % 2 != 0) return this.getValueAtTime((i - (h - s) % i + s) / this.comp.globalData.frameRate, 0);
      } else {
        if ("offset" === t) {
          var m = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
            f = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
            c = this.getValueAtTime(((h - s) % i + s) / this.comp.globalData.frameRate, 0),
            d = Math.floor((h - s) / i);
          if (this.pv.length) {
            for (n = (o = new Array(m.length)).length, a = 0; a < n; a += 1) o[a] = (f[a] - m[a]) * d + c[a];
            return o;
          }
          return (f - m) * d + c;
        }
        if ("continue" === t) {
          var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
            y = this.getValueAtTime((p - .001) / this.comp.globalData.frameRate, 0);
          if (this.pv.length) {
            for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1) o[a] = u[a] + (u[a] - y[a]) * ((h - p) / this.comp.globalData.frameRate) / 5e-4;
            return o;
          }
          return u + (h - p) / .001 * (u - y);
        }
      }
      return this.getValueAtTime(((h - s) % i + s) / this.comp.globalData.frameRate, 0);
    }
    function h(t, e, r) {
      if (!this.k) return this.pv;
      t = t ? t.toLowerCase() : "";
      var i,
        s,
        a,
        n,
        o,
        h = this.comp.renderedFrame,
        l = this.keyframes,
        p = l[0].t;
      if (p <= h) return this.pv;
      if (r ? s = p + (i = e ? Math.abs(this.elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - p)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = (s = l[e].t) - p), "pingpong" === t) {
        if (Math.floor((p - h) / i) % 2 == 0) return this.getValueAtTime(((p - h) % i + p) / this.comp.globalData.frameRate, 0);
      } else {
        if ("offset" === t) {
          var m = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
            f = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
            c = this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0),
            d = Math.floor((p - h) / i) + 1;
          if (this.pv.length) {
            for (n = (o = new Array(m.length)).length, a = 0; a < n; a += 1) o[a] = c[a] - (f[a] - m[a]) * d;
            return o;
          }
          return c - (f - m) * d;
        }
        if ("continue" === t) {
          var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
            y = this.getValueAtTime((p + .001) / this.comp.globalData.frameRate, 0);
          if (this.pv.length) {
            for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1) o[a] = u[a] + (u[a] - y[a]) * (p - h) / .001;
            return o;
          }
          return u + (u - y) * (p - h) / .001;
        }
      }
      return this.getValueAtTime((i - ((p - h) % i + p)) / this.comp.globalData.frameRate, 0);
    }
    function l(t, e) {
      if (!this.k) return this.pv;
      if (t = .5 * (t || .4), (e = Math.floor(e || 5)) <= 1) return this.pv;
      var r,
        i,
        s = this.comp.renderedFrame / this.comp.globalData.frameRate,
        a = s - t,
        n = 1 < e ? (s + t - a) / (e - 1) : 1,
        o = 0,
        h = 0;
      for (r = this.pv.length ? createTypedArray("float32", this.pv.length) : 0; o < e;) {
        if (i = this.getValueAtTime(a + o * n), this.pv.length) for (h = 0; h < this.pv.length; h += 1) r[h] += i[h];else r += i;
        o += 1;
      }
      if (this.pv.length) for (h = 0; h < this.pv.length; h += 1) r[h] /= e;else r /= e;
      return r;
    }
    var s = TransformPropertyFactory.getTransformProperty;
    TransformPropertyFactory.getTransformProperty = function (t, e, r) {
      var i = s(t, e, r);
      return i.dynamicProperties.length ? i.getValueAtTime = function (t) {
        this._transformCachingAtTime || (this._transformCachingAtTime = {
          v: new Matrix()
        });
        var e = this._transformCachingAtTime.v;
        if (e.cloneFromProps(this.pre.props), this.appliedTransformations < 1) {
          var r = this.a.getValueAtTime(t);
          e.translate(-r[0] * this.a.mult, -r[1] * this.a.mult, r[2] * this.a.mult);
        }
        if (this.appliedTransformations < 2) {
          var i = this.s.getValueAtTime(t);
          e.scale(i[0] * this.s.mult, i[1] * this.s.mult, i[2] * this.s.mult);
        }
        if (this.sk && this.appliedTransformations < 3) {
          var s = this.sk.getValueAtTime(t),
            a = this.sa.getValueAtTime(t);
          e.skewFromAxis(-s * this.sk.mult, a * this.sa.mult);
        }
        if (this.r && this.appliedTransformations < 4) {
          var n = this.r.getValueAtTime(t);
          e.rotate(-n * this.r.mult);
        } else if (!this.r && this.appliedTransformations < 4) {
          var o = this.rz.getValueAtTime(t),
            h = this.ry.getValueAtTime(t),
            l = this.rx.getValueAtTime(t),
            p = this.or.getValueAtTime(t);
          e.rotateZ(-o * this.rz.mult).rotateY(h * this.ry.mult).rotateX(l * this.rx.mult).rotateZ(-p[2] * this.or.mult).rotateY(p[1] * this.or.mult).rotateX(p[0] * this.or.mult);
        }
        if (this.data.p && this.data.p.s) {
          var m = this.px.getValueAtTime(t),
            f = this.py.getValueAtTime(t);
          if (this.data.p.z) {
            var c = this.pz.getValueAtTime(t);
            e.translate(m * this.px.mult, f * this.py.mult, -c * this.pz.mult);
          } else e.translate(m * this.px.mult, f * this.py.mult, 0);
        } else {
          var d = this.p.getValueAtTime(t);
          e.translate(d[0] * this.p.mult, d[1] * this.p.mult, -d[2] * this.p.mult);
        }
        return e;
      }.bind(i) : i.getValueAtTime = function () {
        return this.v.clone(new Matrix());
      }.bind(i), i.setGroupProperty = expressionHelpers.setGroupProperty, i;
    };
    var p = PropertyFactory.getProp;
    PropertyFactory.getProp = function (t, e, r, i, s) {
      var a = p(t, e, r, i, s);
      a.kf ? a.getValueAtTime = expressionHelpers.getValueAtTime.bind(a) : a.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(a), a.setGroupProperty = expressionHelpers.setGroupProperty, a.loopOut = o, a.loopIn = h, a.smooth = l, a.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(a), a.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(a), a.numKeys = 1 === e.a ? e.k.length : 0, a.propertyIndex = e.ix;
      var n = 0;
      return 0 !== r && (n = createTypedArray("float32", 1 === e.a ? e.k[0].s.length : e.k.length)), a._cachingAtTime = {
        lastFrame: initialDefaultFrame,
        lastIndex: 0,
        value: n
      }, expressionHelpers.searchExpressions(t, e, a), a.k && s.addDynamicProperty(a), a;
    };
    var t = ShapePropertyFactory.getConstructorFunction(),
      e = ShapePropertyFactory.getKeyframedConstructorFunction();
    function r() {}
    r.prototype = {
      vertices: function vertices(t, e) {
        this.k && this.getValue();
        var r,
          i = this.v;
        void 0 !== e && (i = this.getValueAtTime(e, 0));
        var s = i._length,
          a = i[t],
          n = i.v,
          o = createSizedArray(s);
        for (r = 0; r < s; r += 1) o[r] = "i" === t || "o" === t ? [a[r][0] - n[r][0], a[r][1] - n[r][1]] : [a[r][0], a[r][1]];
        return o;
      },
      points: function points(t) {
        return this.vertices("v", t);
      },
      inTangents: function inTangents(t) {
        return this.vertices("i", t);
      },
      outTangents: function outTangents(t) {
        return this.vertices("o", t);
      },
      isClosed: function isClosed() {
        return this.v.c;
      },
      pointOnPath: function pointOnPath(t, e) {
        var r = this.v;
        void 0 !== e && (r = this.getValueAtTime(e, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(r));
        for (var i, s = this._segmentsLength, a = s.lengths, n = s.totalLength * t, o = 0, h = a.length, l = 0; o < h;) {
          if (l + a[o].addedLength > n) {
            var p = o,
              m = r.c && o === h - 1 ? 0 : o + 1,
              f = (n - l) / a[o].addedLength;
            i = bez.getPointInSegment(r.v[p], r.v[m], r.o[p], r.i[m], f, a[o]);
            break;
          }
          l += a[o].addedLength, o += 1;
        }
        return i || (i = r.c ? [r.v[0][0], r.v[0][1]] : [r.v[r._length - 1][0], r.v[r._length - 1][1]]), i;
      },
      vectorOnPath: function vectorOnPath(t, e, r) {
        1 == t ? t = this.v.c : 0 == t && (t = .999);
        var i = this.pointOnPath(t, e),
          s = this.pointOnPath(t + .001, e),
          a = s[0] - i[0],
          n = s[1] - i[1],
          o = Math.sqrt(Math.pow(a, 2) + Math.pow(n, 2));
        return 0 === o ? [0, 0] : "tangent" === r ? [a / o, n / o] : [-n / o, a / o];
      },
      tangentOnPath: function tangentOnPath(t, e) {
        return this.vectorOnPath(t, e, "tangent");
      },
      normalOnPath: function normalOnPath(t, e) {
        return this.vectorOnPath(t, e, "normal");
      },
      setGroupProperty: expressionHelpers.setGroupProperty,
      getValueAtTime: expressionHelpers.getStaticValueAtTime
    }, extendPrototype([r], t), extendPrototype([r], e), e.prototype.getValueAtTime = function (t) {
      return this._cachingAtTime || (this._cachingAtTime = {
        shapeValue: shapePool.clone(this.pv),
        lastIndex: 0,
        lastTime: initialDefaultFrame
      }), t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0, this._cachingAtTime.lastTime = t, this.interpolateShape(t, this._cachingAtTime.shapeValue, this._cachingAtTime)), this._cachingAtTime.shapeValue;
    }, e.prototype.initiateExpression = ExpressionManager.initiateExpression;
    var n = ShapePropertyFactory.getShapeProp;
    ShapePropertyFactory.getShapeProp = function (t, e, r, i, s) {
      var a = n(t, e, r, i, s);
      return a.propertyIndex = e.ix, a.lock = !1, 3 === r ? expressionHelpers.searchExpressions(t, e.pt, a) : 4 === r && expressionHelpers.searchExpressions(t, e.ks, a), a.k && t.addDynamicProperty(a), a;
    };
  }(), TextProperty.prototype.getExpressionValue = function (t, e) {
    var r = this.calculateExpression(e);
    if (t.t === r) return t;
    var i = {};
    return this.copyData(i, t), i.t = r.toString(), i.__complete = !1, i;
  }, TextProperty.prototype.searchProperty = function () {
    var t = this.searchKeyframes(),
      e = this.searchExpressions();
    return this.kf = t || e, this.kf;
  }, TextProperty.prototype.searchExpressions = function () {
    return this.data.d.x ? (this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this), this.addEffect(this.getExpressionValue.bind(this)), !0) : null;
  };
  var ShapePathInterface = function ShapePathInterface(t, e, r) {
      var i = e.sh;
      function s(t) {
        return "Shape" === t || "shape" === t || "Path" === t || "path" === t || "ADBE Vector Shape" === t || 2 === t ? s.path : null;
      }
      var a = propertyGroupFactory(s, r);
      return i.setGroupProperty(PropertyInterface("Path", a)), Object.defineProperties(s, {
        path: {
          get: function get() {
            return i.k && i.getValue(), i;
          }
        },
        shape: {
          get: function get() {
            return i.k && i.getValue(), i;
          }
        },
        _name: {
          value: t.nm
        },
        ix: {
          value: t.ix
        },
        propertyIndex: {
          value: t.ix
        },
        mn: {
          value: t.mn
        },
        propertyGroup: {
          value: r
        }
      }), s;
    },
    propertyGroupFactory = function propertyGroupFactory(e, r) {
      return function (t) {
        return (t = void 0 === t ? 1 : t) <= 0 ? e : r(t - 1);
      };
    },
    PropertyInterface = function PropertyInterface(t, e) {
      var r = {
        _name: t
      };
      return function (t) {
        return (t = void 0 === t ? 1 : t) <= 0 ? r : e(t - 1);
      };
    },
    ShapeExpressionInterface = function () {
      function n(t, e, r) {
        var i,
          s = [],
          a = t ? t.length : 0;
        for (i = 0; i < a; i += 1) "gr" === t[i].ty ? s.push(o(t[i], e[i], r)) : "fl" === t[i].ty ? s.push(h(t[i], e[i], r)) : "st" === t[i].ty ? s.push(l(t[i], e[i], r)) : "tm" === t[i].ty ? s.push(p(t[i], e[i], r)) : "tr" === t[i].ty || ("el" === t[i].ty ? s.push(f(t[i], e[i], r)) : "sr" === t[i].ty ? s.push(c(t[i], e[i], r)) : "sh" === t[i].ty ? s.push(ShapePathInterface(t[i], e[i], r)) : "rc" === t[i].ty ? s.push(d(t[i], e[i], r)) : "rd" === t[i].ty ? s.push(u(t[i], e[i], r)) : "rp" === t[i].ty && s.push(y(t[i], e[i], r)));
        return s;
      }
      function o(t, e, r) {
        var i = function i(t) {
          switch (t) {
            case "ADBE Vectors Group":
            case "Contents":
            case 2:
              return i.content;
            default:
              return i.transform;
          }
        };
        i.propertyGroup = propertyGroupFactory(i, r);
        var s = function (t, e, r) {
            var i,
              s = function s(t) {
                for (var e = 0, r = i.length; e < r;) {
                  if (i[e]._name === t || i[e].mn === t || i[e].propertyIndex === t || i[e].ix === t || i[e].ind === t) return i[e];
                  e += 1;
                }
                return "number" == typeof t ? i[t - 1] : null;
              };
            s.propertyGroup = propertyGroupFactory(s, r), i = n(t.it, e.it, s.propertyGroup), s.numProperties = i.length;
            var a = m(t.it[t.it.length - 1], e.it[e.it.length - 1], s.propertyGroup);
            return s.transform = a, s.propertyIndex = t.cix, s._name = t.nm, s;
          }(t, e, i.propertyGroup),
          a = m(t.it[t.it.length - 1], e.it[e.it.length - 1], i.propertyGroup);
        return i.content = s, i.transform = a, Object.defineProperty(i, "_name", {
          get: function get() {
            return t.nm;
          }
        }), i.numProperties = t.np, i.propertyIndex = t.ix, i.nm = t.nm, i.mn = t.mn, i;
      }
      function h(t, e, r) {
        function i(t) {
          return "Color" === t || "color" === t ? i.color : "Opacity" === t || "opacity" === t ? i.opacity : null;
        }
        return Object.defineProperties(i, {
          color: {
            get: ExpressionPropertyInterface(e.c)
          },
          opacity: {
            get: ExpressionPropertyInterface(e.o)
          },
          _name: {
            value: t.nm
          },
          mn: {
            value: t.mn
          }
        }), e.c.setGroupProperty(PropertyInterface("Color", r)), e.o.setGroupProperty(PropertyInterface("Opacity", r)), i;
      }
      function l(t, e, r) {
        var i,
          s = propertyGroupFactory(l, r),
          a = propertyGroupFactory(h, s);
        var n,
          o = t.d ? t.d.length : 0,
          h = {};
        for (i = 0; i < o; i += 1) n = i, Object.defineProperty(h, t.d[n].nm, {
          get: ExpressionPropertyInterface(e.d.dataProps[n].p)
        }), e.d.dataProps[i].p.setGroupProperty(a);
        function l(t) {
          return "Color" === t || "color" === t ? l.color : "Opacity" === t || "opacity" === t ? l.opacity : "Stroke Width" === t || "stroke width" === t ? l.strokeWidth : null;
        }
        return Object.defineProperties(l, {
          color: {
            get: ExpressionPropertyInterface(e.c)
          },
          opacity: {
            get: ExpressionPropertyInterface(e.o)
          },
          strokeWidth: {
            get: ExpressionPropertyInterface(e.w)
          },
          dash: {
            get: function get() {
              return h;
            }
          },
          _name: {
            value: t.nm
          },
          mn: {
            value: t.mn
          }
        }), e.c.setGroupProperty(PropertyInterface("Color", s)), e.o.setGroupProperty(PropertyInterface("Opacity", s)), e.w.setGroupProperty(PropertyInterface("Stroke Width", s)), l;
      }
      function p(e, t, r) {
        function i(t) {
          return t === e.e.ix || "End" === t || "end" === t ? i.end : t === e.s.ix ? i.start : t === e.o.ix ? i.offset : null;
        }
        var s = propertyGroupFactory(i, r);
        return i.propertyIndex = e.ix, t.s.setGroupProperty(PropertyInterface("Start", s)), t.e.setGroupProperty(PropertyInterface("End", s)), t.o.setGroupProperty(PropertyInterface("Offset", s)), i.propertyIndex = e.ix, i.propertyGroup = r, Object.defineProperties(i, {
          start: {
            get: ExpressionPropertyInterface(t.s)
          },
          end: {
            get: ExpressionPropertyInterface(t.e)
          },
          offset: {
            get: ExpressionPropertyInterface(t.o)
          },
          _name: {
            value: e.nm
          }
        }), i.mn = e.mn, i;
      }
      function m(e, t, r) {
        function i(t) {
          return e.a.ix === t || "Anchor Point" === t ? i.anchorPoint : e.o.ix === t || "Opacity" === t ? i.opacity : e.p.ix === t || "Position" === t ? i.position : e.r.ix === t || "Rotation" === t || "ADBE Vector Rotation" === t ? i.rotation : e.s.ix === t || "Scale" === t ? i.scale : e.sk && e.sk.ix === t || "Skew" === t ? i.skew : e.sa && e.sa.ix === t || "Skew Axis" === t ? i.skewAxis : null;
        }
        var s = propertyGroupFactory(i, r);
        return t.transform.mProps.o.setGroupProperty(PropertyInterface("Opacity", s)), t.transform.mProps.p.setGroupProperty(PropertyInterface("Position", s)), t.transform.mProps.a.setGroupProperty(PropertyInterface("Anchor Point", s)), t.transform.mProps.s.setGroupProperty(PropertyInterface("Scale", s)), t.transform.mProps.r.setGroupProperty(PropertyInterface("Rotation", s)), t.transform.mProps.sk && (t.transform.mProps.sk.setGroupProperty(PropertyInterface("Skew", s)), t.transform.mProps.sa.setGroupProperty(PropertyInterface("Skew Angle", s))), t.transform.op.setGroupProperty(PropertyInterface("Opacity", s)), Object.defineProperties(i, {
          opacity: {
            get: ExpressionPropertyInterface(t.transform.mProps.o)
          },
          position: {
            get: ExpressionPropertyInterface(t.transform.mProps.p)
          },
          anchorPoint: {
            get: ExpressionPropertyInterface(t.transform.mProps.a)
          },
          scale: {
            get: ExpressionPropertyInterface(t.transform.mProps.s)
          },
          rotation: {
            get: ExpressionPropertyInterface(t.transform.mProps.r)
          },
          skew: {
            get: ExpressionPropertyInterface(t.transform.mProps.sk)
          },
          skewAxis: {
            get: ExpressionPropertyInterface(t.transform.mProps.sa)
          },
          _name: {
            value: e.nm
          }
        }), i.ty = "tr", i.mn = e.mn, i.propertyGroup = r, i;
      }
      function f(e, t, r) {
        function i(t) {
          return e.p.ix === t ? i.position : e.s.ix === t ? i.size : null;
        }
        var s = propertyGroupFactory(i, r);
        i.propertyIndex = e.ix;
        var a = "tm" === t.sh.ty ? t.sh.prop : t.sh;
        return a.s.setGroupProperty(PropertyInterface("Size", s)), a.p.setGroupProperty(PropertyInterface("Position", s)), Object.defineProperties(i, {
          size: {
            get: ExpressionPropertyInterface(a.s)
          },
          position: {
            get: ExpressionPropertyInterface(a.p)
          },
          _name: {
            value: e.nm
          }
        }), i.mn = e.mn, i;
      }
      function c(e, t, r) {
        function i(t) {
          return e.p.ix === t ? i.position : e.r.ix === t ? i.rotation : e.pt.ix === t ? i.points : e.or.ix === t || "ADBE Vector Star Outer Radius" === t ? i.outerRadius : e.os.ix === t ? i.outerRoundness : !e.ir || e.ir.ix !== t && "ADBE Vector Star Inner Radius" !== t ? e.is && e.is.ix === t ? i.innerRoundness : null : i.innerRadius;
        }
        var s = propertyGroupFactory(i, r),
          a = "tm" === t.sh.ty ? t.sh.prop : t.sh;
        return i.propertyIndex = e.ix, a.or.setGroupProperty(PropertyInterface("Outer Radius", s)), a.os.setGroupProperty(PropertyInterface("Outer Roundness", s)), a.pt.setGroupProperty(PropertyInterface("Points", s)), a.p.setGroupProperty(PropertyInterface("Position", s)), a.r.setGroupProperty(PropertyInterface("Rotation", s)), e.ir && (a.ir.setGroupProperty(PropertyInterface("Inner Radius", s)), a.is.setGroupProperty(PropertyInterface("Inner Roundness", s))), Object.defineProperties(i, {
          position: {
            get: ExpressionPropertyInterface(a.p)
          },
          rotation: {
            get: ExpressionPropertyInterface(a.r)
          },
          points: {
            get: ExpressionPropertyInterface(a.pt)
          },
          outerRadius: {
            get: ExpressionPropertyInterface(a.or)
          },
          outerRoundness: {
            get: ExpressionPropertyInterface(a.os)
          },
          innerRadius: {
            get: ExpressionPropertyInterface(a.ir)
          },
          innerRoundness: {
            get: ExpressionPropertyInterface(a.is)
          },
          _name: {
            value: e.nm
          }
        }), i.mn = e.mn, i;
      }
      function d(e, t, r) {
        function i(t) {
          return e.p.ix === t ? i.position : e.r.ix === t ? i.roundness : e.s.ix === t || "Size" === t || "ADBE Vector Rect Size" === t ? i.size : null;
        }
        var s = propertyGroupFactory(i, r),
          a = "tm" === t.sh.ty ? t.sh.prop : t.sh;
        return i.propertyIndex = e.ix, a.p.setGroupProperty(PropertyInterface("Position", s)), a.s.setGroupProperty(PropertyInterface("Size", s)), a.r.setGroupProperty(PropertyInterface("Rotation", s)), Object.defineProperties(i, {
          position: {
            get: ExpressionPropertyInterface(a.p)
          },
          roundness: {
            get: ExpressionPropertyInterface(a.r)
          },
          size: {
            get: ExpressionPropertyInterface(a.s)
          },
          _name: {
            value: e.nm
          }
        }), i.mn = e.mn, i;
      }
      function u(e, t, r) {
        function i(t) {
          return e.r.ix === t || "Round Corners 1" === t ? i.radius : null;
        }
        var s = propertyGroupFactory(i, r),
          a = t;
        return i.propertyIndex = e.ix, a.rd.setGroupProperty(PropertyInterface("Radius", s)), Object.defineProperties(i, {
          radius: {
            get: ExpressionPropertyInterface(a.rd)
          },
          _name: {
            value: e.nm
          }
        }), i.mn = e.mn, i;
      }
      function y(e, t, r) {
        function i(t) {
          return e.c.ix === t || "Copies" === t ? i.copies : e.o.ix === t || "Offset" === t ? i.offset : null;
        }
        var s = propertyGroupFactory(i, r),
          a = t;
        return i.propertyIndex = e.ix, a.c.setGroupProperty(PropertyInterface("Copies", s)), a.o.setGroupProperty(PropertyInterface("Offset", s)), Object.defineProperties(i, {
          copies: {
            get: ExpressionPropertyInterface(a.c)
          },
          offset: {
            get: ExpressionPropertyInterface(a.o)
          },
          _name: {
            value: e.nm
          }
        }), i.mn = e.mn, i;
      }
      return function (t, e, i) {
        var s;
        function r(t) {
          if ("number" == typeof t) return 0 === (t = void 0 === t ? 1 : t) ? i : s[t - 1];
          for (var e = 0, r = s.length; e < r;) {
            if (s[e]._name === t) return s[e];
            e += 1;
          }
          return null;
        }
        return r.propertyGroup = propertyGroupFactory(r, function () {
          return i;
        }), s = n(t, e, r.propertyGroup), r.numProperties = s.length, r._name = "Contents", r;
      };
    }(),
    TextExpressionInterface = function TextExpressionInterface(e) {
      var r;
      function i(t) {
        switch (t) {
          case "ADBE Text Document":
            return i.sourceText;
          default:
            return null;
        }
      }
      return Object.defineProperty(i, "sourceText", {
        get: function get() {
          e.textProperty.getValue();
          var t = e.textProperty.currentData.t;
          return void 0 !== t && (e.textProperty.currentData.t = void 0, (r = new String(t)).value = t || new String(t)), r;
        }
      }), i;
    },
    LayerExpressionInterface = function () {
      function s(t) {
        var e = new Matrix();
        void 0 !== t ? this._elem.finalTransform.mProp.getValueAtTime(t).clone(e) : this._elem.finalTransform.mProp.applyToMatrix(e);
        return e;
      }
      function a(t, e) {
        var r = this.getMatrix(e);
        return r.props[12] = 0, r.props[13] = 0, r.props[14] = 0, this.applyPoint(r, t);
      }
      function n(t, e) {
        var r = this.getMatrix(e);
        return this.applyPoint(r, t);
      }
      function o(t, e) {
        var r = this.getMatrix(e);
        return r.props[12] = 0, r.props[13] = 0, r.props[14] = 0, this.invertPoint(r, t);
      }
      function h(t, e) {
        var r = this.getMatrix(e);
        return this.invertPoint(r, t);
      }
      function l(t, e) {
        if (this._elem.hierarchy && this._elem.hierarchy.length) {
          var r,
            i = this._elem.hierarchy.length;
          for (r = 0; r < i; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(t);
        }
        return t.applyToPointArray(e[0], e[1], e[2] || 0);
      }
      function p(t, e) {
        if (this._elem.hierarchy && this._elem.hierarchy.length) {
          var r,
            i = this._elem.hierarchy.length;
          for (r = 0; r < i; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(t);
        }
        return t.inversePoint(e);
      }
      function m(t) {
        var e = new Matrix();
        if (e.reset(), this._elem.finalTransform.mProp.applyToMatrix(e), this._elem.hierarchy && this._elem.hierarchy.length) {
          var r,
            i = this._elem.hierarchy.length;
          for (r = 0; r < i; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(e);
          return e.inversePoint(t);
        }
        return e.inversePoint(t);
      }
      function f() {
        return [1, 1, 1, 1];
      }
      return function (e) {
        var r;
        function i(t) {
          switch (t) {
            case "ADBE Root Vectors Group":
            case "Contents":
            case 2:
              return i.shapeInterface;
            case 1:
            case 6:
            case "Transform":
            case "transform":
            case "ADBE Transform Group":
              return r;
            case 4:
            case "ADBE Effect Parade":
            case "effects":
            case "Effects":
              return i.effect;
            case "ADBE Text Properties":
              return i.textInterface;
            default:
              return null;
          }
        }
        i.getMatrix = s, i.invertPoint = p, i.applyPoint = l, i.toWorld = n, i.toWorldVec = a, i.fromWorld = h, i.fromWorldVec = o, i.toComp = n, i.fromComp = m, i.sampleImage = f, i.sourceRectAtTime = e.sourceRectAtTime.bind(e);
        var t = getDescriptor(r = TransformExpressionInterface((i._elem = e).finalTransform.mProp), "anchorPoint");
        return Object.defineProperties(i, {
          hasParent: {
            get: function get() {
              return e.hierarchy.length;
            }
          },
          parent: {
            get: function get() {
              return e.hierarchy[0].layerInterface;
            }
          },
          rotation: getDescriptor(r, "rotation"),
          scale: getDescriptor(r, "scale"),
          position: getDescriptor(r, "position"),
          opacity: getDescriptor(r, "opacity"),
          anchorPoint: t,
          anchor_point: t,
          transform: {
            get: function get() {
              return r;
            }
          },
          active: {
            get: function get() {
              return e.isInRange;
            }
          }
        }), i.startTime = e.data.st, i.index = e.data.ind, i.source = e.data.refId, i.height = 0 === e.data.ty ? e.data.h : 100, i.width = 0 === e.data.ty ? e.data.w : 100, i.inPoint = e.data.ip / e.comp.globalData.frameRate, i.outPoint = e.data.op / e.comp.globalData.frameRate, i._name = e.data.nm, i.registerMaskInterface = function (t) {
          i.mask = new MaskManagerInterface(t, e);
        }, i.registerEffectsInterface = function (t) {
          i.effect = t;
        }, i;
      };
    }(),
    CompExpressionInterface = function CompExpressionInterface(i) {
      function t(t) {
        for (var e = 0, r = i.layers.length; e < r;) {
          if (i.layers[e].nm === t || i.layers[e].ind === t) return i.elements[e].layerInterface;
          e += 1;
        }
        return null;
      }
      return Object.defineProperty(t, "_name", {
        value: i.data.nm
      }), (t.layer = t).pixelAspect = 1, t.height = i.data.h || i.globalData.compSize.h, t.width = i.data.w || i.globalData.compSize.w, t.pixelAspect = 1, t.frameDuration = 1 / i.globalData.frameRate, t.displayStartTime = 0, t.numLayers = i.layers.length, t;
    },
    TransformExpressionInterface = function TransformExpressionInterface(t) {
      function e(t) {
        switch (t) {
          case "scale":
          case "Scale":
          case "ADBE Scale":
          case 6:
            return e.scale;
          case "rotation":
          case "Rotation":
          case "ADBE Rotation":
          case "ADBE Rotate Z":
          case 10:
            return e.rotation;
          case "ADBE Rotate X":
            return e.xRotation;
          case "ADBE Rotate Y":
            return e.yRotation;
          case "position":
          case "Position":
          case "ADBE Position":
          case 2:
            return e.position;
          case "ADBE Position_0":
            return e.xPosition;
          case "ADBE Position_1":
            return e.yPosition;
          case "ADBE Position_2":
            return e.zPosition;
          case "anchorPoint":
          case "AnchorPoint":
          case "Anchor Point":
          case "ADBE AnchorPoint":
          case 1:
            return e.anchorPoint;
          case "opacity":
          case "Opacity":
          case 11:
            return e.opacity;
          default:
            return null;
        }
      }
      var r, i, s, a;
      return Object.defineProperty(e, "rotation", {
        get: ExpressionPropertyInterface(t.r || t.rz)
      }), Object.defineProperty(e, "zRotation", {
        get: ExpressionPropertyInterface(t.rz || t.r)
      }), Object.defineProperty(e, "xRotation", {
        get: ExpressionPropertyInterface(t.rx)
      }), Object.defineProperty(e, "yRotation", {
        get: ExpressionPropertyInterface(t.ry)
      }), Object.defineProperty(e, "scale", {
        get: ExpressionPropertyInterface(t.s)
      }), t.p ? a = ExpressionPropertyInterface(t.p) : (r = ExpressionPropertyInterface(t.px), i = ExpressionPropertyInterface(t.py), t.pz && (s = ExpressionPropertyInterface(t.pz))), Object.defineProperty(e, "position", {
        get: function get() {
          return t.p ? a() : [r(), i(), s ? s() : 0];
        }
      }), Object.defineProperty(e, "xPosition", {
        get: ExpressionPropertyInterface(t.px)
      }), Object.defineProperty(e, "yPosition", {
        get: ExpressionPropertyInterface(t.py)
      }), Object.defineProperty(e, "zPosition", {
        get: ExpressionPropertyInterface(t.pz)
      }), Object.defineProperty(e, "anchorPoint", {
        get: ExpressionPropertyInterface(t.a)
      }), Object.defineProperty(e, "opacity", {
        get: ExpressionPropertyInterface(t.o)
      }), Object.defineProperty(e, "skew", {
        get: ExpressionPropertyInterface(t.sk)
      }), Object.defineProperty(e, "skewAxis", {
        get: ExpressionPropertyInterface(t.sa)
      }), Object.defineProperty(e, "orientation", {
        get: ExpressionPropertyInterface(t.or)
      }), e;
    },
    ProjectInterface = function () {
      function e(t) {
        this.compositions.push(t);
      }
      return function () {
        function t(t) {
          for (var e = 0, r = this.compositions.length; e < r;) {
            if (this.compositions[e].data && this.compositions[e].data.nm === t) return this.compositions[e].prepareFrame && this.compositions[e].data.xt && this.compositions[e].prepareFrame(this.currentFrame), this.compositions[e].compInterface;
            e += 1;
          }
          return null;
        }
        return t.compositions = [], t.currentFrame = 0, t.registerComposition = e, t;
      };
    }(),
    EffectsExpressionInterface = function () {
      function l(s, t, e, r) {
        function i(t) {
          for (var e = s.ef, r = 0, i = e.length; r < i;) {
            if (t === e[r].nm || t === e[r].mn || t === e[r].ix) return 5 === e[r].ty ? o[r] : o[r]();
            r += 1;
          }
          throw new Error();
        }
        var a,
          n = propertyGroupFactory(i, e),
          o = [],
          h = s.ef.length;
        for (a = 0; a < h; a += 1) 5 === s.ef[a].ty ? o.push(l(s.ef[a], t.effectElements[a], t.effectElements[a].propertyGroup, r)) : o.push(p(t.effectElements[a], s.ef[a].ty, r, n));
        return "ADBE Color Control" === s.mn && Object.defineProperty(i, "color", {
          get: function get() {
            return o[0]();
          }
        }), Object.defineProperties(i, {
          numProperties: {
            get: function get() {
              return s.np;
            }
          },
          _name: {
            value: s.nm
          },
          propertyGroup: {
            value: n
          }
        }), i.enabled = 0 !== s.en, i.active = i.enabled, i;
      }
      function p(t, e, r, i) {
        var s = ExpressionPropertyInterface(t.p);
        return t.p.setGroupProperty && t.p.setGroupProperty(PropertyInterface("", i)), function () {
          return 10 === e ? r.comp.compInterface(t.p.v) : s();
        };
      }
      return {
        createEffectsInterface: function createEffectsInterface(t, e) {
          if (t.effectsManager) {
            var r,
              i = [],
              s = t.data.ef,
              a = t.effectsManager.effectElements.length;
            for (r = 0; r < a; r += 1) i.push(l(s[r], t.effectsManager.effectElements[r], e, t));
            var n = t.data.ef || [],
              o = function o(t) {
                for (r = 0, a = n.length; r < a;) {
                  if (t === n[r].nm || t === n[r].mn || t === n[r].ix) return i[r];
                  r += 1;
                }
                return null;
              };
            return Object.defineProperty(o, "numProperties", {
              get: function get() {
                return n.length;
              }
            }), o;
          }
          return null;
        }
      };
    }(),
    MaskManagerInterface = function () {
      function t(t, e) {
        this._mask = t, this._data = e;
      }
      Object.defineProperty(t.prototype, "maskPath", {
        get: function get() {
          return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop;
        }
      }), Object.defineProperty(t.prototype, "maskOpacity", {
        get: function get() {
          return this._mask.op.k && this._mask.op.getValue(), 100 * this._mask.op.v;
        }
      });
      return function (e) {
        var r,
          i = createSizedArray(e.viewData.length),
          s = e.viewData.length;
        for (r = 0; r < s; r += 1) i[r] = new t(e.viewData[r], e.masksProperties[r]);
        return function (t) {
          for (r = 0; r < s;) {
            if (e.masksProperties[r].nm === t) return i[r];
            r += 1;
          }
          return null;
        };
      };
    }(),
    ExpressionPropertyInterface = function () {
      var s = {
          pv: 0,
          v: 0,
          mult: 1
        },
        n = {
          pv: [0, 0, 0],
          v: [0, 0, 0],
          mult: 1
        };
      function o(i, s, a) {
        Object.defineProperty(i, "velocity", {
          get: function get() {
            return s.getVelocityAtTime(s.comp.currentFrame);
          }
        }), i.numKeys = s.keyframes ? s.keyframes.length : 0, i.key = function (t) {
          if (!i.numKeys) return 0;
          var e = "";
          e = "s" in s.keyframes[t - 1] ? s.keyframes[t - 1].s : "e" in s.keyframes[t - 2] ? s.keyframes[t - 2].e : s.keyframes[t - 2].s;
          var r = "unidimensional" === a ? new Number(e) : Object.assign({}, e);
          return r.time = s.keyframes[t - 1].t / s.elem.comp.globalData.frameRate, r.value = "unidimensional" === a ? e[0] : e, r;
        }, i.valueAtTime = s.getValueAtTime, i.speedAtTime = s.getSpeedAtTime, i.velocityAtTime = s.getVelocityAtTime, i.propertyGroup = s.propertyGroup;
      }
      function e() {
        return s;
      }
      return function (t) {
        return t ? "unidimensional" === t.propType ? function (t) {
          t && "pv" in t || (t = s);
          var e = 1 / t.mult,
            r = t.pv * e,
            i = new Number(r);
          return i.value = r, o(i, t, "unidimensional"), function () {
            return t.k && t.getValue(), r = t.v * e, i.value !== r && ((i = new Number(r)).value = r, o(i, t, "unidimensional")), i;
          };
        }(t) : function (e) {
          e && "pv" in e || (e = n);
          var r = 1 / e.mult,
            i = e.data && e.data.l || e.pv.length,
            s = createTypedArray("float32", i),
            a = createTypedArray("float32", i);
          return s.value = a, o(s, e, "multidimensional"), function () {
            e.k && e.getValue();
            for (var t = 0; t < i; t += 1) a[t] = e.v[t] * r, s[t] = a[t];
            return s;
          };
        }(t) : e;
      };
    }();
  function SliderEffect(t, e, r) {
    this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
  }
  function AngleEffect(t, e, r) {
    this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
  }
  function ColorEffect(t, e, r) {
    this.p = PropertyFactory.getProp(e, t.v, 1, 0, r);
  }
  function PointEffect(t, e, r) {
    this.p = PropertyFactory.getProp(e, t.v, 1, 0, r);
  }
  function LayerIndexEffect(t, e, r) {
    this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
  }
  function MaskIndexEffect(t, e, r) {
    this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
  }
  function CheckboxEffect(t, e, r) {
    this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
  }
  function NoValueEffect() {
    this.p = {};
  }
  function EffectsManager(t, e) {
    var r,
      i = t.ef || [];
    this.effectElements = [];
    var s,
      a = i.length;
    for (r = 0; r < a; r += 1) s = new GroupEffect(i[r], e), this.effectElements.push(s);
  }
  function GroupEffect(t, e) {
    this.init(t, e);
  }
  !function () {
    !function () {
      function t(t, e) {
        return this.textIndex = t + 1, this.textTotal = e, this.v = this.getValue() * this.mult, this.v;
      }
    }();
    var i = TextSelectorProp.getTextSelectorProp;
    TextSelectorProp.getTextSelectorProp = function (t, e, r) {
      return 1 === e.t ? new TextExpressionSelectorPropFactory(t, e, r) : i(t, e, r);
    };
  }(), extendPrototype([DynamicPropertyContainer], GroupEffect), GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties, GroupEffect.prototype.init = function (t, e) {
    var r;
    this.data = t, this.effectElements = [], this.initDynamicPropertyContainer(e);
    var i,
      s = this.data.ef.length,
      a = this.data.ef;
    for (r = 0; r < s; r += 1) {
      switch (i = null, a[r].ty) {
        case 0:
          i = new SliderEffect(a[r], e, this);
          break;
        case 1:
          i = new AngleEffect(a[r], e, this);
          break;
        case 2:
          i = new ColorEffect(a[r], e, this);
          break;
        case 3:
          i = new PointEffect(a[r], e, this);
          break;
        case 4:
        case 7:
          i = new CheckboxEffect(a[r], e, this);
          break;
        case 10:
          i = new LayerIndexEffect(a[r], e, this);
          break;
        case 11:
          i = new MaskIndexEffect(a[r], e, this);
          break;
        case 5:
          i = new EffectsManager(a[r], e, this);
          break;
        default:
          i = new NoValueEffect(a[r], e, this);
      }
      i && this.effectElements.push(i);
    }
  };
  var lottie = {};
  function setLocationHref(t) {
    locationHref = t;
  }
  function searchAnimations() {
    !0 === standalone ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations();
  }
  function setSubframeRendering(t) {
    subframeEnabled = t;
  }
  function loadAnimation(t) {
    return !0 === standalone && (t.animationData = JSON.parse(animationData)), animationManager.loadAnimation(t);
  }
  function setQuality(t) {
    if ("string" == typeof t) switch (t) {
      case "high":
        defaultCurveSegments = 200;
        break;
      default:
      case "medium":
        defaultCurveSegments = 50;
        break;
      case "low":
        defaultCurveSegments = 10;
    } else !isNaN(t) && 1 < t && (defaultCurveSegments = t);
    roundValues(!(50 <= defaultCurveSegments));
  }
  function inBrowser() {
    return "undefined" != typeof navigator;
  }
  function installPlugin(t, e) {
    "expressions" === t && (expressionsPlugin = e);
  }
  function getFactory(t) {
    switch (t) {
      case "propertyFactory":
        return PropertyFactory;
      case "shapePropertyFactory":
        return ShapePropertyFactory;
      case "matrix":
        return Matrix;
      default:
        return null;
    }
  }
  function checkReady() {
    "complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations());
  }
  function getQueryVariable(t) {
    for (var e = queryString.split("&"), r = 0; r < e.length; r += 1) {
      var i = e[r].split("=");
      if (decodeURIComponent(i[0]) == t) return decodeURIComponent(i[1]);
    }
    return null;
  }
  lottie.play = animationManager.play, lottie.pause = animationManager.pause, lottie.setLocationHref = setLocationHref, lottie.togglePause = animationManager.togglePause, lottie.setSpeed = animationManager.setSpeed, lottie.setDirection = animationManager.setDirection, lottie.stop = animationManager.stop, lottie.searchAnimations = searchAnimations, lottie.registerAnimation = animationManager.registerAnimation, lottie.loadAnimation = loadAnimation, lottie.setSubframeRendering = setSubframeRendering, lottie.resize = animationManager.resize, lottie.goToAndStop = animationManager.goToAndStop, lottie.destroy = animationManager.destroy, lottie.setQuality = setQuality, lottie.inBrowser = inBrowser, lottie.installPlugin = installPlugin, lottie.freeze = animationManager.freeze, lottie.unfreeze = animationManager.unfreeze, lottie.setVolume = animationManager.setVolume, lottie.mute = animationManager.mute, lottie.unmute = animationManager.unmute, lottie.getRegisteredAnimations = animationManager.getRegisteredAnimations, lottie.__getFactory = getFactory, lottie.version = "5.7.6";
  var standalone = "__[STANDALONE]__",
    animationData = "__[ANIMATIONDATA]__",
    renderer = "",
    queryString;
  if (standalone) {
    var scripts = document.getElementsByTagName("script"),
      index = scripts.length - 1,
      myScript = scripts[index] || {
        src: ""
      };
    queryString = myScript.src.replace(/^[^\?]+\??/, ""), renderer = getQueryVariable("renderer");
  }
  var readyStateCheckInterval = setInterval(checkReady, 100);
  return lottie;
});
"use strict";
!function (l, m) {
  l(function () {
    "use strict";

    function n(v, w) {
      return null != v && null != w && v.toLowerCase() === w.toLowerCase();
    }
    function o(v, w) {
      var x,
        y,
        z = v.length;
      if (!z || !w) return !1;
      for (x = w.toLowerCase(), y = 0; y < z; ++y) if (x === v[y].toLowerCase()) return !0;
      return !1;
    }
    function p(v) {
      for (var w in v) u.call(v, w) && (v[w] = new RegExp(v[w], "i"));
    }
    function q(v) {
      return (v || "").substr(0, 500);
    }
    function r(v, w) {
      this.ua = q(v), this._cache = {}, this.maxPhoneWidth = w || 600;
    }
    var s = {
        mobileDetectRules: {
          phones: {
            iPhone: "\\biPhone\\b|\\biPod\\b",
            BlackBerry: "BlackBerry|\\bBB10\\b|rim[0-9]+",
            HTC: "HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m|Android [0-9.]+; Pixel",
            Nexus: "Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 6",
            Dell: "Dell[;]? (Streak|Aero|Venue|Venue Pro|Flash|Smoke|Mini 3iX)|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b",
            Motorola: "Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b|XT1068|XT1092|XT1052",
            Samsung: "\\bSamsung\\b|SM-G950F|SM-G955F|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205|SM-G9350|SM-J120F|SM-G920F|SM-G920V|SM-G930F|SM-N910C|SM-A310F|GT-I9190|SM-J500FN|SM-G903F|SM-J330F",
            LG: "\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802|MS323|M257)",
            Sony: "SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533",
            Asus: "Asus.*Galaxy|PadFone.*Mobile",
            NokiaLumia: "Lumia [0-9]{3,4}",
            Micromax: "Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b",
            Palm: "PalmSource|Palm",
            Vertu: "Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature",
            Pantech: "PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790",
            Fly: "IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250",
            Wiko: "KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA(?!nna)|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM",
            iMobile: "i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)",
            SimValley: "\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b",
            Wolfgang: "AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q",
            Alcatel: "Alcatel",
            Nintendo: "Nintendo (3DS|Switch)",
            Amoi: "Amoi",
            INQ: "INQ",
            GenericPhone: "Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser"
          },
          tablets: {
            iPad: "iPad|iPad.*Mobile",
            NexusTablet: "Android.*Nexus[\\s]+(7|9|10)",
            GoogleTablet: "Android.*Pixel C",
            SamsungTablet: "SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-T116BU|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T815|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715|SM-T560|SM-T670|SM-T677|SM-T377|SM-T567|SM-T357T|SM-T555|SM-T561|SM-T713|SM-T719|SM-T813|SM-T819|SM-T580|SM-T355Y?|SM-T280|SM-T817A|SM-T820|SM-W700|SM-P580|SM-T587|SM-P350|SM-P555M|SM-P355M|SM-T113NU|SM-T815Y|SM-T585|SM-T285|SM-T825|SM-W708",
            Kindle: "Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI|KFARWI|KFFOWI|KFGIWI|KFMEWI)\\b|Android.*Silk/[0-9.]+ like Chrome/[0-9.]+ (?!Mobile)",
            SurfaceTablet: "Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)",
            HPTablet: "HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10",
            AsusTablet: "^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K011 | K017 | K01E |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C|P01Y|PO1MA|P01Z|\\bP027\\b|\\bP024\\b|\\bP00C\\b",
            BlackBerryTablet: "PlayBook|RIM Tablet",
            HTCtablet: "HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410",
            MotorolaTablet: "xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617",
            NookTablet: "Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2",
            AcerTablet: "Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b|\\bA3-A20\\b|\\bA3-A30",
            ToshibaTablet: "Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO",
            LGTablet: "\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b",
            FujitsuTablet: "Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b",
            PrestigioTablet: "PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002",
            LenovoTablet: "Lenovo TAB|Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|YT3-850M|YT3-X90L|YT3-X90F|YT3-X90X|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)|TB-X103F|TB-X304F|TB-X304L|TB-8703F|Tab2A7-10F",
            DellTablet: "Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7",
            YarvikTablet: "Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b",
            MedionTablet: "Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB",
            ArnovaTablet: "97G4|AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2",
            IntensoTablet: "INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004",
            IRUTablet: "M702pro",
            MegafonTablet: "MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b",
            EbodaTablet: "E-Boda (Supreme|Impresspeed|Izzycomm|Essential)",
            AllViewTablet: "Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)",
            ArchosTablet: "\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|c|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b",
            AinolTablet: "NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark",
            NokiaLumiaTablet: "Lumia 2520",
            SonyTablet: "Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP612|SOT31",
            PhilipsTablet: "\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b",
            CubeTablet: "Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT",
            CobyTablet: "MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010",
            MIDTablet: "M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733|MID4X10",
            MSITablet: "MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b",
            SMiTTablet: "Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)",
            RockChipTablet: "Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A",
            FlyTablet: "IQ310|Fly Vision",
            bqTablet: "Android.*(bq)?.*(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris ([E|M]10|M8))|Maxwell.*Lite|Maxwell.*Plus",
            HuaweiTablet: "MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim|M2-A01L|BAH-L09|BAH-W09",
            NecTablet: "\\bN-06D|\\bN-08D",
            PantechTablet: "Pantech.*P4100",
            BronchoTablet: "Broncho.*(N701|N708|N802|a710)",
            VersusTablet: "TOUCHPAD.*[78910]|\\bTOUCHTAB\\b",
            ZyncTablet: "z1000|Z99 2G|z99|z930|z999|z990|z909|Z919|z900",
            PositivoTablet: "TB07STA|TB10STA|TB07FTA|TB10FTA",
            NabiTablet: "Android.*\\bNabi",
            KoboTablet: "Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build",
            DanewTablet: "DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b",
            TexetTablet: "NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE",
            PlaystationTablet: "Playstation.*(Portable|Vita)",
            TrekstorTablet: "ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab",
            PyleAudioTablet: "\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b",
            AdvanTablet: "Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ",
            DanyTechTablet: "Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1",
            GalapadTablet: "Android.*\\bG1\\b",
            MicromaxTablet: "Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b",
            KarbonnTablet: "Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b",
            AllFineTablet: "Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide",
            PROSCANTablet: "\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b",
            YONESTablet: "BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026",
            ChangJiaTablet: "TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503",
            GUTablet: "TX-A1301|TX-M9002|Q702|kf026",
            PointOfViewTablet: "TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10",
            OvermaxTablet: "OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)|Qualcore 1027",
            HCLTablet: "HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync",
            DPSTablet: "DPS Dream 9|DPS Dual 7",
            VistureTablet: "V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10",
            CrestaTablet: "CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989",
            MediatekTablet: "\\bMT8125|MT8389|MT8135|MT8377\\b",
            ConcordeTablet: "Concorde([ ]+)?Tab|ConCorde ReadMan",
            GoCleverTablet: "GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042",
            ModecomTablet: "FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003",
            VoninoTablet: "\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b",
            ECSTablet: "V07OT2|TM105A|S10OT1|TR10CS1",
            StorexTablet: "eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab",
            VodafoneTablet: "SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7|VF-1497",
            EssentielBTablet: "Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2",
            RossMoorTablet: "RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711",
            iMobileTablet: "i-mobile i-note",
            TolinoTablet: "tolino tab [0-9.]+|tolino shine",
            AudioSonicTablet: "\\bC-22Q|T7-QC|T-17B|T-17P\\b",
            AMPETablet: "Android.* A78 ",
            SkkTablet: "Android.* (SKYPAD|PHOENIX|CYCLOPS)",
            TecnoTablet: "TECNO P9|TECNO DP8D",
            JXDTablet: "Android.* \\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b",
            iJoyTablet: "Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)",
            FX2Tablet: "FX2 PAD7|FX2 PAD10",
            XoroTablet: "KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151",
            ViewsonicTablet: "ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a",
            VerizonTablet: "QTAQZ3|QTAIR7|QTAQTZ3|QTASUN1|QTASUN2|QTAXIA1",
            OdysTablet: "LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10",
            CaptivaTablet: "CAPTIVA PAD",
            IconbitTablet: "NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S",
            TeclastTablet: "T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi",
            OndaTablet: "\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+",
            JaytechTablet: "TPC-PA762",
            BlaupunktTablet: "Endeavour 800NG|Endeavour 1010",
            DigmaTablet: "\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b",
            EvolioTablet: "ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b",
            LavaTablet: "QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b",
            AocTablet: "MW0811|MW0812|MW0922|MTK8382|MW1031|MW0831|MW0821|MW0931|MW0712",
            MpmanTablet: "MP11 OCTA|MP10 OCTA|MPQC1114|MPQC1004|MPQC994|MPQC974|MPQC973|MPQC804|MPQC784|MPQC780|\\bMPG7\\b|MPDCG75|MPDCG71|MPDC1006|MP101DC|MPDC9000|MPDC905|MPDC706HD|MPDC706|MPDC705|MPDC110|MPDC100|MPDC99|MPDC97|MPDC88|MPDC8|MPDC77|MP709|MID701|MID711|MID170|MPDC703|MPQC1010",
            CelkonTablet: "CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b",
            WolderTablet: "miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b",
            MediacomTablet: "M-MPI10C3G|M-SP10EG|M-SP10EGP|M-SP10HXAH|M-SP7HXAH|M-SP10HXBH|M-SP8HXAH|M-SP8MXA",
            MiTablet: "\\bMI PAD\\b|\\bHM NOTE 1W\\b",
            NibiruTablet: "Nibiru M1|Nibiru Jupiter One",
            NexoTablet: "NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI",
            LeaderTablet: "TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100",
            UbislateTablet: "UbiSlate[\\s]?7C",
            PocketBookTablet: "Pocketbook",
            KocasoTablet: "\\b(TB-1207)\\b",
            HisenseTablet: "\\b(F5281|E2371)\\b",
            Hudl: "Hudl HT7S3|Hudl 2",
            TelstraTablet: "T-Hub2",
            GenericTablet: "Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bTP750\\b|\\bQTAQZ3\\b|WVT101|TM1088|KT107"
          },
          oss: {
            AndroidOS: "Android",
            BlackBerryOS: "blackberry|\\bBB10\\b|rim tablet os",
            PalmOS: "PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino",
            SymbianOS: "Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b",
            WindowsMobileOS: "Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Window Mobile|Windows Phone [0-9.]+|WCE;",
            WindowsPhoneOS: "Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;",
            iOS: "\\biPhone.*Mobile|\\biPod|\\biPad|AppleCoreMedia",
            MeeGoOS: "MeeGo",
            MaemoOS: "Maemo",
            JavaOS: "J2ME/|\\bMIDP\\b|\\bCLDC\\b",
            webOS: "webOS|hpwOS",
            badaOS: "\\bBada\\b",
            BREWOS: "BREW"
          },
          uas: {
            Chrome: "\\bCrMo\\b|CriOS|Android.*Chrome/[.0-9]* (Mobile)?",
            Dolfin: "\\bDolfin\\b",
            Opera: "Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR/[0-9.]+|Coast/[0-9.]+",
            Skyfire: "Skyfire",
            Edge: "Mobile Safari/[.0-9]* Edge",
            IE: "IEMobile|MSIEMobile",
            Firefox: "fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS",
            Bolt: "bolt",
            TeaShark: "teashark",
            Blazer: "Blazer",
            Safari: "Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari",
            UCBrowser: "UC.*Browser|UCWEB",
            baiduboxapp: "baiduboxapp",
            baidubrowser: "baidubrowser",
            DiigoBrowser: "DiigoBrowser",
            Puffin: "Puffin",
            Mercury: "\\bMercury\\b",
            ObigoBrowser: "Obigo",
            NetFront: "NF-Browser",
            GenericBrowser: "NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger",
            PaleMoon: "Android.*PaleMoon|Mobile.*PaleMoon"
          },
          props: {
            Mobile: "Mobile/[VER]",
            Build: "Build/[VER]",
            Version: "Version/[VER]",
            VendorID: "VendorID/[VER]",
            iPad: "iPad.*CPU[a-z ]+[VER]",
            iPhone: "iPhone.*CPU[a-z ]+[VER]",
            iPod: "iPod.*CPU[a-z ]+[VER]",
            Kindle: "Kindle/[VER]",
            Chrome: ["Chrome/[VER]", "CriOS/[VER]", "CrMo/[VER]"],
            Coast: ["Coast/[VER]"],
            Dolfin: "Dolfin/[VER]",
            Firefox: ["Firefox/[VER]", "FxiOS/[VER]"],
            Fennec: "Fennec/[VER]",
            Edge: "Edge/[VER]",
            IE: ["IEMobile/[VER];", "IEMobile [VER]", "MSIE [VER];", "Trident/[0-9.]+;.*rv:[VER]"],
            NetFront: "NetFront/[VER]",
            NokiaBrowser: "NokiaBrowser/[VER]",
            Opera: [" OPR/[VER]", "Opera Mini/[VER]", "Version/[VER]"],
            "Opera Mini": "Opera Mini/[VER]",
            "Opera Mobi": "Version/[VER]",
            UCBrowser: ["UCWEB[VER]", "UC.*Browser/[VER]"],
            MQQBrowser: "MQQBrowser/[VER]",
            MicroMessenger: "MicroMessenger/[VER]",
            baiduboxapp: "baiduboxapp/[VER]",
            baidubrowser: "baidubrowser/[VER]",
            SamsungBrowser: "SamsungBrowser/[VER]",
            Iron: "Iron/[VER]",
            Safari: ["Version/[VER]", "Safari/[VER]"],
            Skyfire: "Skyfire/[VER]",
            Tizen: "Tizen/[VER]",
            Webkit: "webkit[ /][VER]",
            PaleMoon: "PaleMoon/[VER]",
            Gecko: "Gecko/[VER]",
            Trident: "Trident/[VER]",
            Presto: "Presto/[VER]",
            Goanna: "Goanna/[VER]",
            iOS: " \\bi?OS\\b [VER][ ;]{1}",
            Android: "Android [VER]",
            BlackBerry: ["BlackBerry[\\w]+/[VER]", "BlackBerry.*Version/[VER]", "Version/[VER]"],
            BREW: "BREW [VER]",
            Java: "Java/[VER]",
            "Windows Phone OS": ["Windows Phone OS [VER]", "Windows Phone [VER]"],
            "Windows Phone": "Windows Phone [VER]",
            "Windows CE": "Windows CE/[VER]",
            "Windows NT": "Windows NT [VER]",
            Symbian: ["SymbianOS/[VER]", "Symbian/[VER]"],
            webOS: ["webOS/[VER]", "hpwOS/[VER];"]
          },
          utils: {
            Bot: "Googlebot|facebookexternalhit|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|YandexMobileBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom",
            MobileBot: "Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker/M1A1-R2D2",
            DesktopMode: "WPDesktop",
            TV: "SonyDTV|HbbTV",
            WebKit: "(webkit)[ /]([\\w.]+)",
            Console: "\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|Nintendo Switch|PLAYSTATION|Xbox)\\b",
            Watch: "SM-V700"
          }
        },
        detectMobileBrowsers: {
          fullPattern: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
          shortPattern: /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
          tabletPattern: /android|ipad|playbook|silk/i
        }
      },
      t,
      u = Object.prototype.hasOwnProperty;
    return s.FALLBACK_PHONE = "UnknownPhone", s.FALLBACK_TABLET = "UnknownTablet", s.FALLBACK_MOBILE = "UnknownMobile", t = "isArray" in Array ? Array.isArray : function (v) {
      return "[object Array]" === Object.prototype.toString.call(v);
    }, function () {
      var v,
        w,
        x,
        y,
        z,
        A,
        B = s.mobileDetectRules;
      for (v in B.props) if (u.call(B.props, v)) {
        for (w = B.props[v], t(w) || (w = [w]), z = w.length, y = 0; y < z; ++y) x = w[y], A = x.indexOf("[VER]"), 0 <= A && (x = x.substring(0, A) + "([\\w._\\+]+)" + x.substring(A + 5)), w[y] = new RegExp(x, "i");
        B.props[v] = w;
      }
      p(B.oss), p(B.phones), p(B.tablets), p(B.uas), p(B.utils), B.oss0 = {
        WindowsPhoneOS: B.oss.WindowsPhoneOS,
        WindowsMobileOS: B.oss.WindowsMobileOS
      };
    }(), s.findMatch = function (v, w) {
      for (var x in v) if (u.call(v, x) && v[x].test(w)) return x;
      return null;
    }, s.findMatches = function (v, w) {
      var x = [];
      for (var y in v) u.call(v, y) && v[y].test(w) && x.push(y);
      return x;
    }, s.getVersionStr = function (v, w) {
      var x,
        y,
        z,
        A,
        B = s.mobileDetectRules.props;
      if (u.call(B, v)) for (x = B[v], z = x.length, y = 0; y < z; ++y) if (A = x[y].exec(w), null !== A) return A[1];
      return null;
    }, s.getVersion = function (v, w) {
      var x = s.getVersionStr(v, w);
      return x ? s.prepareVersionNo(x) : NaN;
    }, s.prepareVersionNo = function (v) {
      var w;
      return w = v.split(/[a-z._ \/\-]/i), 1 === w.length && (v = w[0]), 1 < w.length && (v = w[0] + ".", w.shift(), v += w.join("")), +v;
    }, s.isMobileFallback = function (v) {
      return s.detectMobileBrowsers.fullPattern.test(v) || s.detectMobileBrowsers.shortPattern.test(v.substr(0, 4));
    }, s.isTabletFallback = function (v) {
      return s.detectMobileBrowsers.tabletPattern.test(v);
    }, s.prepareDetectionCache = function (v, w, x) {
      if (v.mobile === m) {
        var y, z, A;
        return (z = s.findMatch(s.mobileDetectRules.tablets, w)) ? (v.mobile = v.tablet = z, void (v.phone = null)) : (y = s.findMatch(s.mobileDetectRules.phones, w)) ? (v.mobile = v.phone = y, void (v.tablet = null)) : void (s.isMobileFallback(w) ? (A = r.isPhoneSized(x), A === m ? (v.mobile = s.FALLBACK_MOBILE, v.tablet = v.phone = null) : A ? (v.mobile = v.phone = s.FALLBACK_PHONE, v.tablet = null) : (v.mobile = v.tablet = s.FALLBACK_TABLET, v.phone = null)) : s.isTabletFallback(w) ? (v.mobile = v.tablet = s.FALLBACK_TABLET, v.phone = null) : v.mobile = v.tablet = v.phone = null);
      }
    }, s.mobileGrade = function (v) {
      var w = null !== v.mobile();
      return v.os("iOS") && 4.3 <= v.version("iPad") || v.os("iOS") && 3.1 <= v.version("iPhone") || v.os("iOS") && 3.1 <= v.version("iPod") || 2.1 < v.version("Android") && v.is("Webkit") || 7 <= v.version("Windows Phone OS") || v.is("BlackBerry") && 6 <= v.version("BlackBerry") || v.match("Playbook.*Tablet") || 1.4 <= v.version("webOS") && v.match("Palm|Pre|Pixi") || v.match("hp.*TouchPad") || v.is("Firefox") && 12 <= v.version("Firefox") || v.is("Chrome") && v.is("AndroidOS") && 4 <= v.version("Android") || v.is("Skyfire") && 4.1 <= v.version("Skyfire") && v.is("AndroidOS") && 2.3 <= v.version("Android") || v.is("Opera") && 11 < v.version("Opera Mobi") && v.is("AndroidOS") || v.is("MeeGoOS") || v.is("Tizen") || v.is("Dolfin") && 2 <= v.version("Bada") || (v.is("UC Browser") || v.is("Dolfin")) && 2.3 <= v.version("Android") || v.match("Kindle Fire") || v.is("Kindle") && 3 <= v.version("Kindle") || v.is("AndroidOS") && v.is("NookTablet") || 11 <= v.version("Chrome") && !w || 5 <= v.version("Safari") && !w || 4 <= v.version("Firefox") && !w || 7 <= v.version("MSIE") && !w || 10 <= v.version("Opera") && !w ? "A" : v.os("iOS") && 4.3 > v.version("iPad") || v.os("iOS") && 3.1 > v.version("iPhone") || v.os("iOS") && 3.1 > v.version("iPod") || v.is("Blackberry") && 5 <= v.version("BlackBerry") && 6 > v.version("BlackBerry") || 5 <= v.version("Opera Mini") && 6.5 >= v.version("Opera Mini") && (2.3 <= v.version("Android") || v.is("iOS")) || v.match("NokiaN8|NokiaC7|N97.*Series60|Symbian/3") || 11 <= v.version("Opera Mobi") && v.is("SymbianOS") ? "B" : (5 > v.version("BlackBerry") || v.match("MSIEMobile|Windows CE.*Mobile") || 5.2 >= v.version("Windows Mobile"), "C");
    }, s.detectOS = function (v) {
      return s.findMatch(s.mobileDetectRules.oss0, v) || s.findMatch(s.mobileDetectRules.oss, v);
    }, s.getDeviceSmallerSide = function () {
      return window.screen.width < window.screen.height ? window.screen.width : window.screen.height;
    }, r.prototype = {
      constructor: r,
      mobile: function mobile() {
        return s.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.mobile;
      },
      phone: function phone() {
        return s.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.phone;
      },
      tablet: function tablet() {
        return s.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.tablet;
      },
      userAgent: function userAgent() {
        return this._cache.userAgent === m && (this._cache.userAgent = s.findMatch(s.mobileDetectRules.uas, this.ua)), this._cache.userAgent;
      },
      userAgents: function userAgents() {
        return this._cache.userAgents === m && (this._cache.userAgents = s.findMatches(s.mobileDetectRules.uas, this.ua)), this._cache.userAgents;
      },
      os: function os() {
        return this._cache.os === m && (this._cache.os = s.detectOS(this.ua)), this._cache.os;
      },
      version: function version(v) {
        return s.getVersion(v, this.ua);
      },
      versionStr: function versionStr(v) {
        return s.getVersionStr(v, this.ua);
      },
      is: function is(v) {
        return o(this.userAgents(), v) || n(v, this.os()) || n(v, this.phone()) || n(v, this.tablet()) || o(s.findMatches(s.mobileDetectRules.utils, this.ua), v);
      },
      match: function match(v) {
        return v instanceof RegExp || (v = new RegExp(v, "i")), v.test(this.ua);
      },
      isPhoneSized: function isPhoneSized(v) {
        return r.isPhoneSized(v || this.maxPhoneWidth);
      },
      mobileGrade: function mobileGrade() {
        return this._cache.grade === m && (this._cache.grade = s.mobileGrade(this)), this._cache.grade;
      }
    }, r.isPhoneSized = "undefined" != typeof window && window.screen ? function (v) {
      return 0 > v ? m : s.getDeviceSmallerSide() <= v;
    } : function () {}, r._impl = s, r.version = "1.4.2 2018-06-10", r;
  });
}(function () {
  if ("undefined" != typeof module && module.exports) return function (m) {
    module.exports = m();
  };
  if ("function" == typeof define && define.amd) return define;
  if ("undefined" != typeof window) return function (m) {
    window.MobileDetect = m();
  };
  throw new Error("unknown environment");
}());
document.addEventListener('DOMContentLoaded', function () {

  // function navMenu_Init() {
  //   var body = document.querySelector('body');
  //   var dObj = document.querySelector('nav');
  //   var dMenubtn = document.querySelector('nav .nav-btn');
  //   var dAllLink = document.querySelectorAll('nav .nav-menu a');
  //   var dMenuClose = document.querySelector('nav .nav-close');

  //   dMenubtn.addEventListener('click', function() {
  //     dObj.classList.toggle('nav--active');
  //     body.classList.toggle('_freeze');
  //   })

  //   // dMenuClose.addEventListener('click', function() {
  //   //   dObj.classList.remove('nav--active');
  //   //   body.classList.remove('_freeze');
  //   // })

  //   for(let i=0; i<dAllLink.length; i++) {
  //     dAllLink[i].addEventListener('click', function() {
  //       dObj.classList.remove('nav--active');
  //       body.classList.remove('_freeze');
  //     })
  //   }
  // }
  // navMenu_Init();
});
//# sourceMappingURL=lib.js.map

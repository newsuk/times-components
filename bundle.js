/******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // identity function for calling harmony imports with the correct context
  /******/
  /******/ /******/ __webpack_require__.i = function(value) {
    return value;
  }; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter
        /******/
      });
      /******/
    }
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter = module && module.__esModule
      ? /******/ function getDefault() {
          return module["default"];
        }
      : /******/ function getModuleExports() {
          return module;
        };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 70));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function(module, exports) {
      // shim for using process in browser
      var process = (module.exports = {});

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      var cachedSetTimeout;
      var cachedClearTimeout;

      function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
      }
      function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
      }
      (function() {
        try {
          if (typeof setTimeout === "function") {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === "function") {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if (
          (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
          setTimeout
        ) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if (
          (cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) &&
          clearTimeout
        ) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;

      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }

      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }

      process.nextTick = function(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };

      // v8 likes predictible objects
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      process.title = "browser";
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ""; // empty string to avoid regexp issues
      process.versions = {};

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;

      process.listeners = function(name) {
        return [];
      };

      process.binding = function(name) {
        throw new Error("process.binding is not supported");
      };

      process.cwd = function() {
        return "/";
      };
      process.chdir = function(dir) {
        throw new Error("process.chdir is not supported");
      };
      process.umask = function() {
        return 0;
      };

      /***/
    },
    /* 1 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      var Animated = (function() {
        function Animated() {
          _classCallCheck(this, Animated);
        }
        _createClass(Animated, [
          {
            key: "__attach",
            value: function __attach() {}
          },
          {
            key: "__detach",
            value: function __detach() {}
          },
          {
            key: "__getValue",
            value: function __getValue() {}
          },
          {
            key: "__getAnimatedValue",
            value: function __getAnimatedValue() {
              return this.__getValue();
            }
          },
          {
            key: "__addChild",
            value: function __addChild(child) {}
          },
          {
            key: "__removeChild",
            value: function __removeChild(child) {}
          },
          {
            key: "__getChildren",
            value: function __getChildren() {
              return [];
            }
          }
        ]);
        return Animated;
      })();

      module.exports = Animated;

      /***/
    },
    /* 2 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

        var emptyFunction = __webpack_require__(16);

        /**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

        var warning = emptyFunction;

        if (process.env.NODE_ENV !== "production") {
          (function() {
            var printWarning = function printWarning(format) {
              for (
                var _len = arguments.length,
                  args = Array(_len > 1 ? _len - 1 : 0),
                  _key = 1;
                _key < _len;
                _key++
              ) {
                args[_key - 1] = arguments[_key];
              }

              var argIndex = 0;
              var message =
                "Warning: " +
                format.replace(/%s/g, function() {
                  return args[argIndex++];
                });
              if (typeof console !== "undefined") {
                console.error(message);
              }
              try {
                // --- Welcome to debugging React ---
                // This error was thrown as a convenience so that you can use this stack
                // to find the callsite that caused this warning to fire.
                throw new Error(message);
              } catch (x) {}
            };

            warning = function warning(condition, format) {
              if (format === undefined) {
                throw new Error(
                  "`warning(condition, format, ...args)` requires a warning " +
                    "message argument"
                );
              }

              if (format.indexOf("Failed Composite propType: ") === 0) {
                return; // Ignore CompositeComponent proptype check.
              }

              if (!condition) {
                for (
                  var _len2 = arguments.length,
                    args = Array(_len2 > 2 ? _len2 - 2 : 0),
                    _key2 = 2;
                  _key2 < _len2;
                  _key2++
                ) {
                  args[_key2 - 2] = arguments[_key2];
                }

                printWarning.apply(undefined, [format].concat(args));
              }
            };
          })();
        }

        module.exports = warning;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 3 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var Animated = __webpack_require__(1);
      var AnimatedWithChildren = (function(_Animated) {
        _inherits(AnimatedWithChildren, _Animated);

        function AnimatedWithChildren() {
          _classCallCheck(this, AnimatedWithChildren);
          var _this = _possibleConstructorReturn(
            this,
            (AnimatedWithChildren.__proto__ ||
              Object.getPrototypeOf(AnimatedWithChildren))
              .call(this)
          );

          _this._children = [];
          return _this;
        }
        _createClass(AnimatedWithChildren, [
          {
            key: "__addChild",
            value: function __addChild(child) {
              if (this._children.length === 0) {
                this.__attach();
              }
              this._children.push(child);
            }
          },
          {
            key: "__removeChild",
            value: function __removeChild(child) {
              var index = this._children.indexOf(child);
              if (index === -1) {
                console.warn("Trying to remove a child that doesn't exist");
                return;
              }
              this._children.splice(index, 1);
              if (this._children.length === 0) {
                this.__detach();
              }
            }
          },
          {
            key: "__getChildren",
            value: function __getChildren() {
              return this._children;
            }
          }
        ]);
        return AnimatedWithChildren;
      })(Animated);

      module.exports = AnimatedWithChildren;

      /***/
    },
    /* 4 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

        /**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

        var validateFormat = function validateFormat(format) {};

        if (process.env.NODE_ENV !== "production") {
          validateFormat = function validateFormat(format) {
            if (format === undefined) {
              throw new Error("invariant requires an error message argument");
            }
          };
        }

        function invariant(condition, format, a, b, c, d, e, f) {
          validateFormat(format);

          if (!condition) {
            var error;
            if (format === undefined) {
              error = new Error(
                "Minified exception occurred; use the non-minified dev environment " +
                  "for the full error message and additional helpful warnings."
              );
            } else {
              var args = [a, b, c, d, e, f];
              var argIndex = 0;
              error = new Error(
                format.replace(/%s/g, function() {
                  return args[argIndex++];
                })
              );
              error.name = "Invariant Violation";
            }

            error.framesToPop = 1; // we don't care about invariant's own frame
            throw error;
          }
        }

        module.exports = invariant;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 5 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

      /**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

      function reactProdInvariant(code) {
        var argCount = arguments.length - 1;

        var message =
          "Minified React error #" +
          code +
          "; visit " +
          "http://facebook.github.io/react/docs/error-decoder.html?invariant=" +
          code;

        for (var argIdx = 0; argIdx < argCount; argIdx++) {
          message += "&args[]=" + encodeURIComponent(arguments[argIdx + 1]);
        }

        message +=
          " for the full message or use the non-minified dev environment" +
          " for full errors and additional helpful warnings.";

        var error = new Error(message);
        error.name = "Invariant Violation";
        error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

        throw error;
      }

      module.exports = reactProdInvariant;

      /***/
    },
    /* 6 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(global) {
        var _createClass = (function() {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        })();
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          }
          return call &&
            (typeof call === "object" || typeof call === "function")
            ? call
            : self;
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof superClass
            );
          }
          subClass.prototype = Object.create(
            superClass && superClass.prototype,
            {
              constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
              }
            }
          );
          if (superClass)
            Object.setPrototypeOf
              ? Object.setPrototypeOf(subClass, superClass)
              : (subClass.__proto__ = superClass);
        }

        var AnimatedWithChildren = __webpack_require__(3);
        var InteractionManager = __webpack_require__(25);
        var AnimatedInterpolation = __webpack_require__(11);
        var Interpolation = __webpack_require__(9);
        var Animation = __webpack_require__(8);
        var guid = __webpack_require__(15);
        var Set = global.Set || __webpack_require__(48);

        function _flush(rootNode) {
          var animatedStyles = new Set();
          function findAnimatedStyles(node) {
            if (typeof node.update === "function") {
              animatedStyles.add(node);
            } else {
              node.__getChildren().forEach(findAnimatedStyles);
            }
          }
          findAnimatedStyles(rootNode);
          animatedStyles.forEach(function(animatedStyle) {
            return animatedStyle.update();
          });
        }
        var AnimatedValue = (function(_AnimatedWithChildren) {
          _inherits(AnimatedValue, _AnimatedWithChildren);

          function AnimatedValue(value) {
            _classCallCheck(this, AnimatedValue);
            var _this = _possibleConstructorReturn(
              this,
              (AnimatedValue.__proto__ || Object.getPrototypeOf(AnimatedValue))
                .call(this)
            );

            _this._value = value;
            _this._offset = 0;
            _this._animation = null;
            _this._listeners = {};
            return _this;
          }
          _createClass(AnimatedValue, [
            {
              key: "__detach",
              value: function __detach() {
                this.stopAnimation();
              }
            },
            {
              key: "__getValue",
              value: function __getValue() {
                return this._value + this._offset;
              }
            },
            {
              key: "setValue",
              value: function setValue(value) {
                if (this._animation) {
                  this._animation.stop();
                  this._animation = null;
                }
                this._updateValue(value);
              }
            },
            {
              key: "setOffset",
              value: function setOffset(offset) {
                this._offset = offset;
              }
            },
            {
              key: "flattenOffset",
              value: function flattenOffset() {
                this._value += this._offset;
                this._offset = 0;
              }
            },
            {
              key: "addListener",
              value: function addListener(callback) {
                var id = guid();
                this._listeners[id] = callback;
                return id;
              }
            },
            {
              key: "removeListener",
              value: function removeListener(id) {
                delete this._listeners[id];
              }
            },
            {
              key: "removeAllListeners",
              value: function removeAllListeners() {
                this._listeners = {};
              }
            },
            {
              key: "stopAnimation",
              value: function stopAnimation(callback) {
                this.stopTracking();
                this._animation && this._animation.stop();
                this._animation = null;
                callback && callback(this.__getValue());
              }
            },
            {
              key: "interpolate",
              value: function interpolate(config) {
                return new AnimatedInterpolation(
                  this,
                  Interpolation.create(config)
                );
              }
            },
            {
              key: "animate",
              value: function animate(animation, callback) {
                var _this2 = this;
                var handle = null;
                if (animation.__isInteraction) {
                  handle = InteractionManager.current.createInteractionHandle();
                }
                var previousAnimation = this._animation;
                this._animation && this._animation.stop();
                this._animation = animation;
                animation.start(
                  this._value,
                  function(value) {
                    _this2._updateValue(value);
                  },
                  function(result) {
                    _this2._animation = null;
                    if (handle !== null) {
                      InteractionManager.current.clearInteractionHandle(handle);
                    }
                    callback && callback(result);
                  },
                  previousAnimation
                );
              }
            },
            {
              key: "stopTracking",
              value: function stopTracking() {
                this._tracking && this._tracking.__detach();
                this._tracking = null;
              }
            },
            {
              key: "track",
              value: function track(tracking) {
                this.stopTracking();
                this._tracking = tracking;
              }
            },
            {
              key: "_updateValue",
              value: function _updateValue(value) {
                this._value = value;
                _flush(this);
                for (var key in this._listeners) {
                  this._listeners[key]({ value: this.__getValue() });
                }
              }
            }
          ]);
          return AnimatedValue;
        })(AnimatedWithChildren);

        module.exports = AnimatedValue;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(21)));

      /***/
    },
    /* 7 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

        var _assign = __webpack_require__(17);

        var ReactCurrentOwner = __webpack_require__(14);

        var warning = __webpack_require__(2);
        var canDefineProperty = __webpack_require__(18);
        var hasOwnProperty = Object.prototype.hasOwnProperty;

        var REACT_ELEMENT_TYPE = __webpack_require__(30);

        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };

        var specialPropKeyWarningShown, specialPropRefWarningShown;

        function hasValidRef(config) {
          if (process.env.NODE_ENV !== "production") {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== undefined;
        }

        function hasValidKey(config) {
          if (process.env.NODE_ENV !== "production") {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== undefined;
        }

        function defineKeyPropWarningGetter(props, displayName) {
          var warnAboutAccessingKey = function() {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              process.env.NODE_ENV !== "production"
                ? warning(
                    false,
                    "%s: `key` is not a prop. Trying to access it will result " +
                      "in `undefined` being returned. If you need to access the same " +
                      "value within the child component, you should pass it as a different " +
                      "prop. (https://fb.me/react-special-props)",
                    displayName
                  )
                : void 0;
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }

        function defineRefPropWarningGetter(props, displayName) {
          var warnAboutAccessingRef = function() {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              process.env.NODE_ENV !== "production"
                ? warning(
                    false,
                    "%s: `ref` is not a prop. Trying to access it will result " +
                      "in `undefined` being returned. If you need to access the same " +
                      "value within the child component, you should pass it as a different " +
                      "prop. (https://fb.me/react-special-props)",
                    displayName
                  )
                : void 0;
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }

        /**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
        var ReactElement = function(
          type,
          key,
          ref,
          self,
          source,
          owner,
          props
        ) {
          var element = {
            // This tag allow us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,

            // Built-in properties that belong on the element
            type: type,
            key: key,
            ref: ref,
            props: props,

            // Record the component responsible for creating this element.
            _owner: owner
          };

          if (process.env.NODE_ENV !== "production") {
            // The validation flag is currently mutative. We put it on
            // an external backing store so that we can freeze the whole object.
            // This can be replaced with a WeakMap once they are implemented in
            // commonly used development environments.
            element._store = {};

            // To make comparing ReactElements easier for testing purposes, we make
            // the validation flag non-enumerable (where possible, which should
            // include every environment we run tests in), so the test framework
            // ignores it.
            if (canDefineProperty) {
              Object.defineProperty(element._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: false
              });
              // self and source are DEV only properties.
              Object.defineProperty(element, "_self", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: self
              });
              // Two elements created in two different places should be considered
              // equal for testing purposes and therefore we hide it from enumeration.
              Object.defineProperty(element, "_source", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: source
              });
            } else {
              element._store.validated = false;
              element._self = self;
              element._source = source;
            }
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }

          return element;
        };

        /**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/react-api.html#createelement
 */
        ReactElement.createElement = function(type, config, children) {
          var propName;

          // Reserved names are extracted
          var props = {};

          var key = null;
          var ref = null;
          var self = null;
          var source = null;

          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
            }
            if (hasValidKey(config)) {
              key = "" + config.key;
            }

            self = config.__self === undefined ? null : config.__self;
            source = config.__source === undefined ? null : config.__source;
            // Remaining properties are added to a new props object
            for (propName in config) {
              if (
                hasOwnProperty.call(config, propName) &&
                !RESERVED_PROPS.hasOwnProperty(propName)
              ) {
                props[propName] = config[propName];
              }
            }
          }

          // Children can be more than one argument, and those are transferred onto
          // the newly allocated props object.
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            if (process.env.NODE_ENV !== "production") {
              if (Object.freeze) {
                Object.freeze(childArray);
              }
            }
            props.children = childArray;
          }

          // Resolve default props
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          if (process.env.NODE_ENV !== "production") {
            if (key || ref) {
              if (
                typeof props.$$typeof === "undefined" ||
                props.$$typeof !== REACT_ELEMENT_TYPE
              ) {
                var displayName = typeof type === "function"
                  ? type.displayName || type.name || "Unknown"
                  : type;
                if (key) {
                  defineKeyPropWarningGetter(props, displayName);
                }
                if (ref) {
                  defineRefPropWarningGetter(props, displayName);
                }
              }
            }
          }
          return ReactElement(
            type,
            key,
            ref,
            self,
            source,
            ReactCurrentOwner.current,
            props
          );
        };

        /**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/react-api.html#createfactory
 */
        ReactElement.createFactory = function(type) {
          var factory = ReactElement.createElement.bind(null, type);
          // Expose the type on the factory and the prototype so that it can be
          // easily accessed on elements. E.g. `<Foo />.type === Foo`.
          // This should not be named `constructor` since this may not be the function
          // that created the element, and it may not even be a constructor.
          // Legacy hook TODO: Warn if this is accessed
          factory.type = type;
          return factory;
        };

        ReactElement.cloneAndReplaceKey = function(oldElement, newKey) {
          var newElement = ReactElement(
            oldElement.type,
            newKey,
            oldElement.ref,
            oldElement._self,
            oldElement._source,
            oldElement._owner,
            oldElement.props
          );

          return newElement;
        };

        /**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/react-api.html#cloneelement
 */
        ReactElement.cloneElement = function(element, config, children) {
          var propName;

          // Original props are copied
          var props = _assign({}, element.props);

          // Reserved names are extracted
          var key = element.key;
          var ref = element.ref;
          // Self is preserved since the owner is preserved.
          var self = element._self;
          // Source is preserved since cloneElement is unlikely to be targeted by a
          // transpiler, and the original source is probably a better indicator of the
          // true owner.
          var source = element._source;

          // Owner will be preserved, unless ref is overridden
          var owner = element._owner;

          if (config != null) {
            if (hasValidRef(config)) {
              // Silently steal the ref from the parent.
              ref = config.ref;
              owner = ReactCurrentOwner.current;
            }
            if (hasValidKey(config)) {
              key = "" + config.key;
            }

            // Remaining properties override existing props
            var defaultProps;
            if (element.type && element.type.defaultProps) {
              defaultProps = element.type.defaultProps;
            }
            for (propName in config) {
              if (
                hasOwnProperty.call(config, propName) &&
                !RESERVED_PROPS.hasOwnProperty(propName)
              ) {
                if (
                  config[propName] === undefined &&
                  defaultProps !== undefined
                ) {
                  // Resolve default props
                  props[propName] = defaultProps[propName];
                } else {
                  props[propName] = config[propName];
                }
              }
            }
          }

          // Children can be more than one argument, and those are transferred onto
          // the newly allocated props object.
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            props.children = childArray;
          }

          return ReactElement(
            element.type,
            key,
            ref,
            self,
            source,
            owner,
            props
          );
        };

        /**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
        ReactElement.isValidElement = function(object) {
          return (
            typeof object === "object" &&
            object !== null &&
            object.$$typeof === REACT_ELEMENT_TYPE
          );
        };

        module.exports = ReactElement;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 8 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      var Animation = (function() {
        function Animation() {
          _classCallCheck(this, Animation);
        }
        _createClass(Animation, [
          {
            key: "start",
            value: function start(
              fromValue,
              onUpdate,
              onEnd,
              previousAnimation
            ) {}
          },
          {
            key: "stop",
            value: function stop() {}
          },
          {
            key: "__debouncedOnEnd",
            value: function __debouncedOnEnd(result) {
              var onEnd = this.__onEnd;
              this.__onEnd = null;
              onEnd && onEnd(result);
            }
          }
        ]);
        return Animation;
      })();

      module.exports = Animation;

      /***/
    },
    /* 9 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _extends =
        Object.assign ||
        function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var normalizeColor = __webpack_require__(56);

      var invariant = __webpack_require__(10);

      var linear = function linear(t) {
        return t;
      };
      var Interpolation = (function() {
        function Interpolation() {
          _classCallCheck(this, Interpolation);
        }
        _createClass(Interpolation, null, [
          {
            key: "create",
            value: function create(config) {
              if (
                config.outputRange &&
                typeof config.outputRange[0] === "string"
              ) {
                return createInterpolationFromStringOutputRange(config);
              }

              var outputRange = config.outputRange;
              checkInfiniteRange("outputRange", outputRange);

              var inputRange = config.inputRange;
              checkInfiniteRange("inputRange", inputRange);
              checkValidInputRange(inputRange);

              invariant(
                inputRange.length === outputRange.length,
                "inputRange (" +
                  inputRange.length +
                  ") and outputRange (" +
                  outputRange.length +
                  ") must have the same length"
              );

              var easing = config.easing || linear;

              var extrapolateLeft = "extend";
              if (config.extrapolateLeft !== undefined) {
                extrapolateLeft = config.extrapolateLeft;
              } else if (config.extrapolate !== undefined) {
                extrapolateLeft = config.extrapolate;
              }

              var extrapolateRight = "extend";
              if (config.extrapolateRight !== undefined) {
                extrapolateRight = config.extrapolateRight;
              } else if (config.extrapolate !== undefined) {
                extrapolateRight = config.extrapolate;
              }

              return function(input) {
                invariant(
                  typeof input === "number",
                  "Cannot interpolation an input which is not a number"
                );

                var range = findRange(input, inputRange);
                return interpolate(
                  input,
                  inputRange[range],
                  inputRange[range + 1],
                  outputRange[range],
                  outputRange[range + 1],
                  easing,
                  extrapolateLeft,
                  extrapolateRight
                );
              };
            }
          }
        ]);
        return Interpolation;
      })();

      function interpolate(
        input,
        inputMin,
        inputMax,
        outputMin,
        outputMax,
        easing,
        extrapolateLeft,
        extrapolateRight
      ) {
        var result = input;

        if (result < inputMin) {
          if (extrapolateLeft === "identity") {
            return result;
          } else if (extrapolateLeft === "clamp") {
            result = inputMin;
          } else if (extrapolateLeft === "extend") {
          }
        }

        if (result > inputMax) {
          if (extrapolateRight === "identity") {
            return result;
          } else if (extrapolateRight === "clamp") {
            result = inputMax;
          } else if (extrapolateRight === "extend") {
          }
        }

        if (outputMin === outputMax) {
          return outputMin;
        }

        if (inputMin === inputMax) {
          if (input <= inputMin) {
            return outputMin;
          }
          return outputMax;
        }

        if (inputMin === -Infinity) {
          result = -result;
        } else if (inputMax === Infinity) {
          result = result - inputMin;
        } else {
          result = (result - inputMin) / (inputMax - inputMin);
        }

        result = easing(result);

        if (outputMin === -Infinity) {
          result = -result;
        } else if (outputMax === Infinity) {
          result = result + outputMin;
        } else {
          result = result * (outputMax - outputMin) + outputMin;
        }

        return result;
      }

      function colorToRgba(input) {
        var int32Color = normalizeColor(input);
        if (int32Color === null) {
          return input;
        }

        int32Color = int32Color || 0;

        var r = (int32Color & 0xff000000) >>> 24;
        var g = (int32Color & 0x00ff0000) >>> 16;
        var b = (int32Color & 0x0000ff00) >>> 8;
        var a = (int32Color & 0x000000ff) / 255;

        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
      }

      var stringShapeRegex = /[0-9\.-]+/g;

      function createInterpolationFromStringOutputRange(config) {
        var outputRange = config.outputRange;
        invariant(outputRange.length >= 2, "Bad output range");
        outputRange = outputRange.map(colorToRgba);
        checkPattern(outputRange);

        var outputRanges = outputRange[0]
          .match(stringShapeRegex)
          .map(function() {
            return [];
          });
        outputRange.forEach(function(value) {
          value.match(stringShapeRegex).forEach(function(number, i) {
            outputRanges[i].push(+number);
          });
        });

        var interpolations = outputRange[0]
          .match(stringShapeRegex)
          .map(function(value, i) {
            return Interpolation.create(
              _extends({}, config, {
                outputRange: outputRanges[i]
              })
            );
          });

        var shouldRound = /^rgb/.test(outputRange[0]);

        return function(input) {
          var i = 0;

          return outputRange[0].replace(stringShapeRegex, function() {
            var val = interpolations[i++](input);
            return String(shouldRound && i < 4 ? Math.round(val) : val);
          });
        };
      }

      function checkPattern(arr) {
        var pattern = arr[0].replace(stringShapeRegex, "");
        for (var i = 1; i < arr.length; ++i) {
          invariant(
            pattern === arr[i].replace(stringShapeRegex, ""),
            "invalid pattern " + arr[0] + " and " + arr[i]
          );
        }
      }

      function findRange(input, inputRange) {
        for (var i = 1; i < inputRange.length - 1; ++i) {
          if (inputRange[i] >= input) {
            break;
          }
        }
        return i - 1;
      }

      function checkValidInputRange(arr) {
        invariant(arr.length >= 2, "inputRange must have at least 2 elements");
        for (var i = 1; i < arr.length; ++i) {
          invariant(
            arr[i] >= arr[i - 1],
            "inputRange must be monotonically increasing " + arr
          );
        }
      }

      function checkInfiniteRange(name, arr) {
        invariant(arr.length >= 2, name + " must have at least 2 elements");
        invariant(
          arr.length !== 2 || arr[0] !== -Infinity || arr[1] !== Infinity,
          name + "cannot be ]-infinity;+infinity[ " + arr
        );
      }

      module.exports = Interpolation;

      /***/
    },
    /* 10 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

        /**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

        var invariant = function(condition, format, a, b, c, d, e, f) {
          if (process.env.NODE_ENV !== "production") {
            if (format === undefined) {
              throw new Error("invariant requires an error message argument");
            }
          }

          if (!condition) {
            var error;
            if (format === undefined) {
              error = new Error(
                "Minified exception occurred; use the non-minified dev environment " +
                  "for the full error message and additional helpful warnings."
              );
            } else {
              var args = [a, b, c, d, e, f];
              var argIndex = 0;
              error = new Error(
                format.replace(/%s/g, function() {
                  return args[argIndex++];
                })
              );
              error.name = "Invariant Violation";
            }

            error.framesToPop = 1; // we don't care about invariant's own frame
            throw error;
          }
        };

        module.exports = invariant;

        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 11 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var Animated = __webpack_require__(1);
      var AnimatedWithChildren = __webpack_require__(3);
      var invariant = __webpack_require__(10);
      var Interpolation = __webpack_require__(9);
      var guid = __webpack_require__(15);
      var AnimatedInterpolation = (function(_AnimatedWithChildren) {
        _inherits(AnimatedInterpolation, _AnimatedWithChildren);

        function AnimatedInterpolation(parent, interpolation) {
          _classCallCheck(this, AnimatedInterpolation);
          var _this = _possibleConstructorReturn(
            this,
            (AnimatedInterpolation.__proto__ ||
              Object.getPrototypeOf(AnimatedInterpolation))
              .call(this)
          );

          _this._parent = parent;
          _this._interpolation = interpolation;
          _this._listeners = {};
          return _this;
        }
        _createClass(AnimatedInterpolation, [
          {
            key: "__getValue",
            value: function __getValue() {
              var parentValue = this._parent.__getValue();
              invariant(
                typeof parentValue === "number",
                "Cannot interpolate an input which is not a number."
              );

              return this._interpolation(parentValue);
            }
          },
          {
            key: "addListener",
            value: function addListener(callback) {
              var _this2 = this;
              if (!this._parentListener) {
                this._parentListener = this._parent.addListener(function() {
                  for (var key in _this2._listeners) {
                    _this2._listeners[key]({ value: _this2.__getValue() });
                  }
                });
              }
              var id = guid();
              this._listeners[id] = callback;
              return id;
            }
          },
          {
            key: "removeListener",
            value: function removeListener(id) {
              delete this._listeners[id];
            }
          },
          {
            key: "interpolate",
            value: function interpolate(config) {
              return new AnimatedInterpolation(
                this,
                Interpolation.create(config)
              );
            }
          },
          {
            key: "__attach",
            value: function __attach() {
              this._parent.__addChild(this);
            }
          },
          {
            key: "__detach",
            value: function __detach() {
              this._parent.__removeChild(this);
              this._parentListener = this._parent.removeListener(
                this._parentListener
              );
            }
          }
        ]);
        return AnimatedInterpolation;
      })(AnimatedWithChildren);

      module.exports = AnimatedInterpolation;

      /***/
    },
    /* 12 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(global) {
        var CancelAnimationFrame = {
          current: function current(id) {
            return global.cancelAnimationFrame(id);
          },
          inject: function inject(injected) {
            CancelAnimationFrame.current = injected;
          }
        };

        module.exports = CancelAnimationFrame;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(21)));

      /***/
    },
    /* 13 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(global) {
        var RequestAnimationFrame = {
          current: function current(cb) {
            return global.requestAnimationFrame(cb);
          },
          inject: function inject(injected) {
            RequestAnimationFrame.current = injected;
          }
        };

        module.exports = RequestAnimationFrame;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(21)));

      /***/
    },
    /* 14 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

      /**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
      var ReactCurrentOwner = {
        /**
   * @internal
   * @type {ReactComponent}
   */
        current: null
      };

      module.exports = ReactCurrentOwner;

      /***/
    },
    /* 15 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _uniqueId = 0;

      module.exports = function uniqueId() {
        return String(_uniqueId++);
      };

      /***/
    },
    /* 16 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

      function makeEmptyFunction(arg) {
        return function() {
          return arg;
        };
      }

      /**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
      var emptyFunction = function emptyFunction() {};

      emptyFunction.thatReturns = makeEmptyFunction;
      emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
      emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
      emptyFunction.thatReturnsNull = makeEmptyFunction(null);
      emptyFunction.thatReturnsThis = function() {
        return this;
      };
      emptyFunction.thatReturnsArgument = function(arg) {
        return arg;
      };

      module.exports = emptyFunction;

      /***/
    },
    /* 17 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /*
object-assign
(c) Sindre Sorhus
@license MIT
*/

      /* eslint-disable no-unused-vars */
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;

      function toObject(val) {
        if (val === null || val === undefined) {
          throw new TypeError(
            "Object.assign cannot be called with null or undefined"
          );
        }

        return Object(val);
      }

      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }

          // Detect buggy property enumeration order in older V8 versions.

          // https://bugs.chromium.org/p/v8/issues/detail?id=4118
          var test1 = new String("abc"); // eslint-disable-line no-new-wrappers
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }

          // https://bugs.chromium.org/p/v8/issues/detail?id=3056
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }

          // https://bugs.chromium.org/p/v8/issues/detail?id=3056
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (
            Object.keys(Object.assign({}, test3)).join("") !==
            "abcdefghijklmnopqrst"
          ) {
            return false;
          }

          return true;
        } catch (err) {
          // We don't expect any of the above to throw, but better to be safe.
          return false;
        }
      }

      module.exports = shouldUseNative()
        ? Object.assign
        : function(target, source) {
            var from;
            var to = toObject(target);
            var symbols;

            for (var s = 1; s < arguments.length; s++) {
              from = Object(arguments[s]);

              for (var key in from) {
                if (hasOwnProperty.call(from, key)) {
                  to[key] = from[key];
                }
              }

              if (getOwnPropertySymbols) {
                symbols = getOwnPropertySymbols(from);
                for (var i = 0; i < symbols.length; i++) {
                  if (propIsEnumerable.call(from, symbols[i])) {
                    to[symbols[i]] = from[symbols[i]];
                  }
                }
              }
            }

            return to;
          };

      /***/
    },
    /* 18 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

        var canDefineProperty = false;
        if (process.env.NODE_ENV !== "production") {
          try {
            // $FlowFixMe https://github.com/facebook/flow/issues/285
            Object.defineProperty({}, "x", { get: function() {} });
            canDefineProperty = true;
          } catch (x) {
            // IE will fail on defineProperty
          }
        }

        module.exports = canDefineProperty;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 19 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

      function getComponentName(instanceOrFiber) {
        if (typeof instanceOrFiber.getName === "function") {
          // Stack reconciler
          var instance = instanceOrFiber;
          return instance.getName();
        }
        if (typeof instanceOrFiber.tag === "number") {
          // Fiber reconciler
          var fiber = instanceOrFiber;
          var type = fiber.type;

          if (typeof type === "string") {
            return type;
          }
          if (typeof type === "function") {
            return type.displayName || type.name;
          }
        }
        return null;
      }

      module.exports = getComponentName;

      /***/
    },
    /* 20 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

      /* global Symbol */

      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator"; // Before Symbol spec.

      /**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
      function getIteratorFn(maybeIterable) {
        var iteratorFn =
          maybeIterable &&
          ((ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL]) ||
            maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }

      module.exports = getIteratorFn;

      /***/
    },
    /* 21 */
    /***/ function(module, exports) {
      var g;

      // This works in non-strict mode
      g = (function() {
        return this;
      })();

      try {
        // This works if eval is allowed (see CSP)
        g = g || Function("return this")() || (1, eval)("this");
      } catch (e) {
        // This works if the window reference is available
        if (typeof window === "object") g = window;
      }

      // g can still be undefined, but nothing to do about it...
      // We return undefined, instead of nothing here, so it's
      // easier to handle this case. if(!global) { ...}

      module.exports = g;

      /***/
    },
    /* 22 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _extends =
        Object.assign ||
        function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var Animated = __webpack_require__(1);
      var AnimatedStyle = __webpack_require__(41);
      var AnimatedProps = (function(_Animated) {
        _inherits(AnimatedProps, _Animated);

        function AnimatedProps(props, callback) {
          _classCallCheck(this, AnimatedProps);
          var _this = _possibleConstructorReturn(
            this,
            (AnimatedProps.__proto__ || Object.getPrototypeOf(AnimatedProps))
              .call(this)
          );

          if (props.style) {
            props = _extends({}, props, {
              style: new AnimatedStyle(props.style)
            });
          }
          _this._props = props;
          _this._callback = callback;
          _this.__attach();
          return _this;
        }
        _createClass(AnimatedProps, [
          {
            key: "__getValue",
            value: function __getValue() {
              var props = {};
              for (var key in this._props) {
                var value = this._props[key];
                if (value instanceof Animated) {
                  props[key] = value.__getValue();
                } else {
                  props[key] = value;
                }
              }
              return props;
            }
          },
          {
            key: "__getAnimatedValue",
            value: function __getAnimatedValue() {
              var props = {};
              for (var key in this._props) {
                var value = this._props[key];
                if (value instanceof Animated) {
                  props[key] = value.__getAnimatedValue();
                }
              }
              return props;
            }
          },
          {
            key: "__attach",
            value: function __attach() {
              for (var key in this._props) {
                var value = this._props[key];
                if (value instanceof Animated) {
                  value.__addChild(this);
                }
              }
            }
          },
          {
            key: "__detach",
            value: function __detach() {
              for (var key in this._props) {
                var value = this._props[key];
                if (value instanceof Animated) {
                  value.__removeChild(this);
                }
              }
            }
          },
          {
            key: "update",
            value: function update() {
              this._callback();
            }
          }
        ]);
        return AnimatedProps;
      })(Animated);

      module.exports = AnimatedProps;

      /***/
    },
    /* 23 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var ApplyAnimatedValues = {
        current: function ApplyAnimatedValues(instance, props) {
          if (instance.setNativeProps) {
            instance.setNativeProps(props);
          } else {
            return false;
          }
        },
        inject: function inject(apply) {
          ApplyAnimatedValues.current = apply;
        }
      };

      module.exports = ApplyAnimatedValues;

      /***/
    },
    /* 24 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var FlattenStyle = {
        current: function current(style) {
          return style;
        },
        inject: function inject(flatten) {
          FlattenStyle.current = flatten;
        }
      };

      module.exports = FlattenStyle;

      /***/
    },
    /* 25 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var InteractionManager = {
        current: {
          createInteractionHandle: function createInteractionHandle() {},
          clearInteractionHandle: function clearInteractionHandle() {}
        },

        inject: function inject(manager) {
          InteractionManager.current = manager;
        }
      };

      module.exports = InteractionManager;

      /***/
    },
    /* 26 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

        var emptyObject = {};

        if (process.env.NODE_ENV !== "production") {
          Object.freeze(emptyObject);
        }

        module.exports = emptyObject;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 27 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

        var _prodInvariant = __webpack_require__(5),
          _assign = __webpack_require__(17);

        var ReactNoopUpdateQueue = __webpack_require__(33);

        var canDefineProperty = __webpack_require__(18);
        var emptyObject = __webpack_require__(26);
        var invariant = __webpack_require__(4);
        var warning = __webpack_require__(2);

        /**
 * Base class helpers for the updating state of a component.
 */
        function ReactComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          // We initialize the default updater but the real one gets injected by the
          // renderer.
          this.updater = updater || ReactNoopUpdateQueue;
        }

        ReactComponent.prototype.isReactComponent = {};

        /**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
        ReactComponent.prototype.setState = function(partialState, callback) {
          !(
            typeof partialState === "object" ||
            typeof partialState === "function" ||
            partialState == null
          )
            ? process.env.NODE_ENV !== "production"
              ? invariant(
                  false,
                  "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
                )
              : _prodInvariant("85")
            : void 0;
          this.updater.enqueueSetState(
            this,
            partialState,
            callback,
            "setState"
          );
        };

        /**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
        ReactComponent.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };

        /**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
        if (process.env.NODE_ENV !== "production") {
          var deprecatedAPIs = {
            isMounted: [
              "isMounted",
              "Instead, make sure to clean up subscriptions and pending requests in " +
                "componentWillUnmount to prevent memory leaks."
            ],
            replaceState: [
              "replaceState",
              "Refactor your code to use setState instead (see " +
                "https://github.com/facebook/react/issues/3236)."
            ]
          };
          var defineDeprecationWarning = function(methodName, info) {
            if (canDefineProperty) {
              Object.defineProperty(ReactComponent.prototype, methodName, {
                get: function() {
                  process.env.NODE_ENV !== "production"
                    ? warning(
                        false,
                        "%s(...) is deprecated in plain JavaScript React classes. %s",
                        info[0],
                        info[1]
                      )
                    : void 0;
                  return undefined;
                }
              });
            }
          };
          for (var fnName in deprecatedAPIs) {
            if (deprecatedAPIs.hasOwnProperty(fnName)) {
              defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
            }
          }
        }

        /**
 * Base class helpers for the updating state of a component.
 */
        function ReactPureComponent(props, context, updater) {
          // Duplicated from ReactComponent.
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          // We initialize the default updater but the real one gets injected by the
          // renderer.
          this.updater = updater || ReactNoopUpdateQueue;
        }

        function ComponentDummy() {}
        ComponentDummy.prototype = ReactComponent.prototype;
        ReactPureComponent.prototype = new ComponentDummy();
        ReactPureComponent.prototype.constructor = ReactPureComponent;
        // Avoid an extra prototype jump for these methods.
        _assign(ReactPureComponent.prototype, ReactComponent.prototype);
        ReactPureComponent.prototype.isPureReactComponent = true;

        module.exports = {
          Component: ReactComponent,
          PureComponent: ReactPureComponent
        };
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 28 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

        var _prodInvariant = __webpack_require__(5);

        var ReactCurrentOwner = __webpack_require__(14);

        var _require = __webpack_require__(32),
          getStackAddendumByWorkInProgressFiber =
            _require.getStackAddendumByWorkInProgressFiber,
          describeComponentFrame = _require.describeComponentFrame;

        var invariant = __webpack_require__(4);
        var warning = __webpack_require__(2);
        var getComponentName = __webpack_require__(19);

        function isNative(fn) {
          // Based on isNative() from Lodash
          var funcToString = Function.prototype.toString;
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var reIsNative = RegExp(
            "^" +
              funcToString
                // Take an example native function source for comparison
                .call(hasOwnProperty)
                // Strip regex characters so we can use it for regex
                .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
                // Remove hasOwnProperty from the template to make it generic
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  "$1.*?"
                ) +
              "$"
          );
          try {
            var source = funcToString.call(fn);
            return reIsNative.test(source);
          } catch (err) {
            return false;
          }
        }

        var canUseCollections =
          // Array.from
          typeof Array.from === "function" &&
          // Map
          typeof Map === "function" &&
          isNative(Map) &&
          // Map.prototype.keys
          Map.prototype != null &&
          typeof Map.prototype.keys === "function" &&
          isNative(Map.prototype.keys) &&
          // Set
          typeof Set === "function" &&
          isNative(Set) &&
          // Set.prototype.keys
          Set.prototype != null &&
          typeof Set.prototype.keys === "function" &&
          isNative(Set.prototype.keys);

        var setItem;
        var getItem;
        var removeItem;
        var getItemIDs;
        var addRoot;
        var removeRoot;
        var getRootIDs;

        if (canUseCollections) {
          var itemMap = new Map();
          var rootIDSet = new Set();

          setItem = function(id, item) {
            itemMap.set(id, item);
          };
          getItem = function(id) {
            return itemMap.get(id);
          };
          removeItem = function(id) {
            itemMap["delete"](id);
          };
          getItemIDs = function() {
            return Array.from(itemMap.keys());
          };

          addRoot = function(id) {
            rootIDSet.add(id);
          };
          removeRoot = function(id) {
            rootIDSet["delete"](id);
          };
          getRootIDs = function() {
            return Array.from(rootIDSet.keys());
          };
        } else {
          var itemByKey = {};
          var rootByKey = {};

          // Use non-numeric keys to prevent V8 performance issues:
          // https://github.com/facebook/react/pull/7232
          var getKeyFromID = function(id) {
            return "." + id;
          };
          var getIDFromKey = function(key) {
            return parseInt(key.substr(1), 10);
          };

          setItem = function(id, item) {
            var key = getKeyFromID(id);
            itemByKey[key] = item;
          };
          getItem = function(id) {
            var key = getKeyFromID(id);
            return itemByKey[key];
          };
          removeItem = function(id) {
            var key = getKeyFromID(id);
            delete itemByKey[key];
          };
          getItemIDs = function() {
            return Object.keys(itemByKey).map(getIDFromKey);
          };

          addRoot = function(id) {
            var key = getKeyFromID(id);
            rootByKey[key] = true;
          };
          removeRoot = function(id) {
            var key = getKeyFromID(id);
            delete rootByKey[key];
          };
          getRootIDs = function() {
            return Object.keys(rootByKey).map(getIDFromKey);
          };
        }

        var unmountedIDs = [];

        function purgeDeep(id) {
          var item = getItem(id);
          if (item) {
            var childIDs = item.childIDs;

            removeItem(id);
            childIDs.forEach(purgeDeep);
          }
        }

        function getDisplayName(element) {
          if (element == null) {
            return "#empty";
          } else if (
            typeof element === "string" ||
            typeof element === "number"
          ) {
            return "#text";
          } else if (typeof element.type === "string") {
            return element.type;
          } else {
            return element.type.displayName || element.type.name || "Unknown";
          }
        }

        function describeID(id) {
          var name = ReactComponentTreeHook.getDisplayName(id);
          var element = ReactComponentTreeHook.getElement(id);
          var ownerID = ReactComponentTreeHook.getOwnerID(id);
          var ownerName = void 0;

          if (ownerID) {
            ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
          }
          process.env.NODE_ENV !== "production"
            ? warning(
                element,
                "ReactComponentTreeHook: Missing React element for debugID %s when " +
                  "building stack",
                id
              )
            : void 0;
          return describeComponentFrame(
            name || "",
            element && element._source,
            ownerName || ""
          );
        }

        var ReactComponentTreeHook = {
          onSetChildren: function(id, nextChildIDs) {
            var item = getItem(id);
            invariant(item, "Item must have been set");
            item.childIDs = nextChildIDs;

            for (var i = 0; i < nextChildIDs.length; i++) {
              var nextChildID = nextChildIDs[i];
              var nextChild = getItem(nextChildID);
              !nextChild
                ? process.env.NODE_ENV !== "production"
                  ? invariant(
                      false,
                      "Expected hook events to fire for the child before its parent includes it in onSetChildren()."
                    )
                  : _prodInvariant("140")
                : void 0;
              !(
                nextChild.childIDs != null ||
                typeof nextChild.element !== "object" ||
                nextChild.element == null
              )
                ? process.env.NODE_ENV !== "production"
                  ? invariant(
                      false,
                      "Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren()."
                    )
                  : _prodInvariant("141")
                : void 0;
              !nextChild.isMounted
                ? process.env.NODE_ENV !== "production"
                  ? invariant(
                      false,
                      "Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren()."
                    )
                  : _prodInvariant("71")
                : void 0;
              if (nextChild.parentID == null) {
                nextChild.parentID = id;
                // TODO: This shouldn't be necessary but mounting a new root during in
                // componentWillMount currently causes not-yet-mounted components to
                // be purged from our tree data so their parent id is missing.
              }
              !(nextChild.parentID === id)
                ? process.env.NODE_ENV !== "production"
                  ? invariant(
                      false,
                      "Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).",
                      nextChildID,
                      nextChild.parentID,
                      id
                    )
                  : _prodInvariant("142", nextChildID, nextChild.parentID, id)
                : void 0;
            }
          },
          onBeforeMountComponent: function(id, element, parentID) {
            var item = {
              element: element,
              parentID: parentID,
              text: null,
              childIDs: [],
              isMounted: false,
              updateCount: 0
            };
            setItem(id, item);
          },
          onBeforeUpdateComponent: function(id, element) {
            var item = getItem(id);
            if (!item || !item.isMounted) {
              // We may end up here as a result of setState() in componentWillUnmount().
              // In this case, ignore the element.
              return;
            }
            item.element = element;
          },
          onMountComponent: function(id) {
            var item = getItem(id);
            invariant(item, "Item must have been set");
            item.isMounted = true;
            var isRoot = item.parentID === 0;
            if (isRoot) {
              addRoot(id);
            }
          },
          onUpdateComponent: function(id) {
            var item = getItem(id);
            if (!item || !item.isMounted) {
              // We may end up here as a result of setState() in componentWillUnmount().
              // In this case, ignore the element.
              return;
            }
            item.updateCount++;
          },
          onUnmountComponent: function(id) {
            var item = getItem(id);
            if (item) {
              // We need to check if it exists.
              // `item` might not exist if it is inside an error boundary, and a sibling
              // error boundary child threw while mounting. Then this instance never
              // got a chance to mount, but it still gets an unmounting event during
              // the error boundary cleanup.
              item.isMounted = false;
              var isRoot = item.parentID === 0;
              if (isRoot) {
                removeRoot(id);
              }
            }
            unmountedIDs.push(id);
          },
          purgeUnmountedComponents: function() {
            if (ReactComponentTreeHook._preventPurging) {
              // Should only be used for testing.
              return;
            }

            for (var i = 0; i < unmountedIDs.length; i++) {
              var id = unmountedIDs[i];
              purgeDeep(id);
            }
            unmountedIDs.length = 0;
          },
          isMounted: function(id) {
            var item = getItem(id);
            return item ? item.isMounted : false;
          },
          getCurrentStackAddendum: function(topElement) {
            var info = "";
            if (topElement) {
              var name = getDisplayName(topElement);
              var owner = topElement._owner;
              info += describeComponentFrame(
                name,
                topElement._source,
                owner && getComponentName(owner)
              );
            }

            var currentOwner = ReactCurrentOwner.current;
            if (currentOwner) {
              if (typeof currentOwner.tag === "number") {
                var workInProgress = currentOwner;
                // Safe because if current owner exists, we are reconciling,
                // and it is guaranteed to be the work-in-progress version.
                info += getStackAddendumByWorkInProgressFiber(workInProgress);
              } else if (typeof currentOwner._debugID === "number") {
                info += ReactComponentTreeHook.getStackAddendumByID(
                  currentOwner._debugID
                );
              }
            }
            return info;
          },
          getStackAddendumByID: function(id) {
            var info = "";
            while (id) {
              info += describeID(id);
              id = ReactComponentTreeHook.getParentID(id);
            }
            return info;
          },
          getChildIDs: function(id) {
            var item = getItem(id);
            return item ? item.childIDs : [];
          },
          getDisplayName: function(id) {
            var element = ReactComponentTreeHook.getElement(id);
            if (!element) {
              return null;
            }
            return getDisplayName(element);
          },
          getElement: function(id) {
            var item = getItem(id);
            return item ? item.element : null;
          },
          getOwnerID: function(id) {
            var element = ReactComponentTreeHook.getElement(id);
            if (!element || !element._owner) {
              return null;
            }
            return element._owner._debugID;
          },
          getParentID: function(id) {
            var item = getItem(id);
            return item ? item.parentID : null;
          },
          getSource: function(id) {
            var item = getItem(id);
            var element = item ? item.element : null;
            var source = element != null ? element._source : null;
            return source;
          },
          getText: function(id) {
            var element = ReactComponentTreeHook.getElement(id);
            if (typeof element === "string") {
              return element;
            } else if (typeof element === "number") {
              return "" + element;
            } else {
              return null;
            }
          },
          getUpdateCount: function(id) {
            var item = getItem(id);
            return item ? item.updateCount : 0;
          },

          getRootIDs: getRootIDs,
          getRegisteredIDs: getItemIDs
        };

        module.exports = ReactComponentTreeHook;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 29 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

        var ReactDebugCurrentFrame = {};

        if (process.env.NODE_ENV !== "production") {
          var _require = __webpack_require__(28),
            getStackAddendumByID = _require.getStackAddendumByID,
            getCurrentStackAddendum = _require.getCurrentStackAddendum;

          var _require2 = __webpack_require__(32),
            getStackAddendumByWorkInProgressFiber =
              _require2.getStackAddendumByWorkInProgressFiber;

          // Component that is being worked on

          ReactDebugCurrentFrame.current = null;

          // Element that is being cloned or created
          ReactDebugCurrentFrame.element = null;

          ReactDebugCurrentFrame.getStackAddendum = function() {
            var stack = null;
            var current = ReactDebugCurrentFrame.current;
            var element = ReactDebugCurrentFrame.element;
            if (current !== null) {
              if (typeof current === "number") {
                // DebugID from Stack.
                var debugID = current;
                stack = getStackAddendumByID(debugID);
              } else if (typeof current.tag === "number") {
                // This is a Fiber.
                // The stack will only be correct if this is a work in progress
                // version and we're calling it during reconciliation.
                var workInProgress = current;
                stack = getStackAddendumByWorkInProgressFiber(workInProgress);
              }
            } else if (element !== null) {
              stack = getCurrentStackAddendum(element);
            }
            return stack;
          };
        }

        module.exports = ReactDebugCurrentFrame;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 30 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

      // The Symbol used to tag the ReactElement type. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.

      var REACT_ELEMENT_TYPE =
        (typeof Symbol === "function" &&
          Symbol["for"] &&
          Symbol["for"]("react.element")) ||
        0xeac7;

      module.exports = REACT_ELEMENT_TYPE;

      /***/
    },
    /* 31 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

        /**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

        var ReactCurrentOwner = __webpack_require__(14);
        var ReactElement = __webpack_require__(7);

        var checkReactTypeSpec = __webpack_require__(67);

        var canDefineProperty = __webpack_require__(18);
        var getComponentName = __webpack_require__(19);
        var getIteratorFn = __webpack_require__(20);

        if (process.env.NODE_ENV !== "production") {
          var warning = __webpack_require__(2);
          var ReactDebugCurrentFrame = __webpack_require__(29);

          var _require = __webpack_require__(28),
            getCurrentStackAddendum = _require.getCurrentStackAddendum;
        }

        function getDeclarationErrorAddendum() {
          if (ReactCurrentOwner.current) {
            var name = getComponentName(ReactCurrentOwner.current);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }

        function getSourceInfoErrorAddendum(elementProps) {
          if (
            elementProps !== null &&
            elementProps !== undefined &&
            elementProps.__source !== undefined
          ) {
            var source = elementProps.__source;
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return (
              "\n\nCheck your code at " + fileName + ":" + lineNumber + "."
            );
          }
          return "";
        }

        /**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
        var ownerHasKeyUseWarning = {};

        function getCurrentComponentErrorInfo(parentType) {
          var info = getDeclarationErrorAddendum();

          if (!info) {
            var parentName = typeof parentType === "string"
              ? parentType
              : parentType.displayName || parentType.name;
            if (parentName) {
              info =
                "\n\nCheck the top-level render call using <" +
                parentName +
                ">.";
            }
          }
          return info;
        }

        /**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
        function validateExplicitKey(element, parentType) {
          if (
            !element._store ||
            element._store.validated ||
            element.key != null
          ) {
            return;
          }
          element._store.validated = true;

          var memoizer =
            ownerHasKeyUseWarning.uniqueKey ||
            (ownerHasKeyUseWarning.uniqueKey = {});

          var currentComponentErrorInfo = getCurrentComponentErrorInfo(
            parentType
          );
          if (memoizer[currentComponentErrorInfo]) {
            return;
          }
          memoizer[currentComponentErrorInfo] = true;

          // Usually the current owner is the offender, but if it accepts children as a
          // property, it may be the creator of the child that's responsible for
          // assigning it a key.
          var childOwner = "";
          if (
            element &&
            element._owner &&
            element._owner !== ReactCurrentOwner.current
          ) {
            // Give the component that originally created this child.
            childOwner =
              " It was passed a child from " +
              getComponentName(element._owner) +
              ".";
          }

          process.env.NODE_ENV !== "production"
            ? warning(
                false,
                'Each child in an array or iterator should have a unique "key" prop.' +
                  "%s%s See https://fb.me/react-warning-keys for more information.%s",
                currentComponentErrorInfo,
                childOwner,
                getCurrentStackAddendum(element)
              )
            : void 0;
        }

        /**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
        function validateChildKeys(node, parentType) {
          if (typeof node !== "object") {
            return;
          }
          if (Array.isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (ReactElement.isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (ReactElement.isValidElement(node)) {
            // This element was passed in a valid location.
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            // Entry iterators provide implicit keys.
            if (iteratorFn) {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (ReactElement.isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }

        /**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
        function validatePropTypes(element) {
          var componentClass = element.type;
          if (typeof componentClass !== "function") {
            return;
          }
          var name = componentClass.displayName || componentClass.name;

          // ReactNative `View.propTypes` have been deprecated in favor of `ViewPropTypes`.
          // In their place a temporary getter has been added with a deprecated warning message.
          // Avoid triggering that warning during validation using the temporary workaround, __propTypesSecretDontUseThesePlease.
          // TODO (bvaughn) Revert this particular change any time after April 1 ReactNative RC is tagged.
          var propTypes = typeof componentClass.__propTypesSecretDontUseThesePlease ===
            "object"
            ? componentClass.__propTypesSecretDontUseThesePlease
            : componentClass.propTypes;

          if (propTypes) {
            checkReactTypeSpec(propTypes, element.props, "prop", name);
          }
          if (typeof componentClass.getDefaultProps === "function") {
            process.env.NODE_ENV !== "production"
              ? warning(
                  componentClass.getDefaultProps.isReactClassApproved,
                  "getDefaultProps is only used on classic React.createClass " +
                    "definitions. Use a static property named `defaultProps` instead."
                )
              : void 0;
          }
        }

        var ReactElementValidator = {
          createElement: function(type, props, children) {
            var validType =
              typeof type === "string" || typeof type === "function";
            // We warn in this case but don't throw. We expect the element creation to
            // succeed and there will likely be errors in render.
            if (!validType) {
              var info = "";
              if (
                type === undefined ||
                (typeof type === "object" &&
                  type !== null &&
                  Object.keys(type).length === 0)
              ) {
                info +=
                  " You likely forgot to export your component from the file " +
                  "it's defined in.";
              }

              var sourceInfo = getSourceInfoErrorAddendum(props);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }

              info += getCurrentStackAddendum();

              process.env.NODE_ENV !== "production"
                ? warning(
                    false,
                    "React.createElement: type is invalid -- expected a string (for " +
                      "built-in components) or a class/function (for composite " +
                      "components) but got: %s.%s",
                    type == null ? type : typeof type,
                    info
                  )
                : void 0;
            }

            var element = ReactElement.createElement.apply(this, arguments);

            // The result can be nullish if a mock or a custom function is used.
            // TODO: Drop this when these are no longer allowed as the type argument.
            if (element == null) {
              return element;
            }

            if (process.env.NODE_ENV !== "production") {
              ReactDebugCurrentFrame.element = element;
            }

            // Skip key warning if the type isn't valid since our key validation logic
            // doesn't expect a non-string/function type and can throw confusing errors.
            // We don't want exception behavior to differ between dev and prod.
            // (Rendering will throw with a helpful message and as soon as the type is
            // fixed, the key warnings will appear.)
            if (validType) {
              for (var i = 2; i < arguments.length; i++) {
                validateChildKeys(arguments[i], type);
              }
            }

            validatePropTypes(element);

            if (process.env.NODE_ENV !== "production") {
              ReactDebugCurrentFrame.element = null;
            }

            return element;
          },

          createFactory: function(type) {
            var validatedFactory = ReactElementValidator.createElement.bind(
              null,
              type
            );
            // Legacy hook TODO: Warn if this is accessed
            validatedFactory.type = type;

            if (process.env.NODE_ENV !== "production") {
              if (canDefineProperty) {
                Object.defineProperty(validatedFactory, "type", {
                  enumerable: false,
                  get: function() {
                    process.env.NODE_ENV !== "production"
                      ? warning(
                          false,
                          "Factory.type is deprecated. Access the class directly " +
                            "before passing it to createFactory."
                        )
                      : void 0;
                    Object.defineProperty(this, "type", {
                      value: type
                    });
                    return type;
                  }
                });
              }
            }

            return validatedFactory;
          },

          cloneElement: function(element, props, children) {
            var newElement = ReactElement.cloneElement.apply(this, arguments);
            if (process.env.NODE_ENV !== "production") {
              ReactDebugCurrentFrame.element = newElement;
            }
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], newElement.type);
            }
            validatePropTypes(newElement);
            if (process.env.NODE_ENV !== "production") {
              ReactDebugCurrentFrame.element = null;
            }
            return newElement;
          }
        };

        module.exports = ReactElementValidator;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 32 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

      var ReactTypeOfWork = __webpack_require__(65);
      var IndeterminateComponent = ReactTypeOfWork.IndeterminateComponent,
        FunctionalComponent = ReactTypeOfWork.FunctionalComponent,
        ClassComponent = ReactTypeOfWork.ClassComponent,
        HostComponent = ReactTypeOfWork.HostComponent;

      var getComponentName = __webpack_require__(19);

      function describeComponentFrame(name, source, ownerName) {
        return (
          "\n    in " +
          (name || "Unknown") +
          (source
            ? " (at " +
                source.fileName.replace(/^.*[\\\/]/, "") +
                ":" +
                source.lineNumber +
                ")"
            : ownerName ? " (created by " + ownerName + ")" : "")
        );
      }

      function describeFiber(fiber) {
        switch (fiber.tag) {
          case IndeterminateComponent:
          case FunctionalComponent:
          case ClassComponent:
          case HostComponent:
            var owner = fiber._debugOwner;
            var source = fiber._debugSource;
            var name = getComponentName(fiber);
            var ownerName = null;
            if (owner) {
              ownerName = getComponentName(owner);
            }
            return describeComponentFrame(name, source, ownerName);
          default:
            return "";
        }
      }

      // This function can only be called with a work-in-progress fiber and
      // only during begin or complete phase. Do not call it under any other
      // circumstances.
      function getStackAddendumByWorkInProgressFiber(workInProgress) {
        var info = "";
        var node = workInProgress;
        do {
          info += describeFiber(node);
          // Otherwise this return pointer might point to the wrong tree:
          node = node["return"];
        } while (node);
        return info;
      }

      module.exports = {
        getStackAddendumByWorkInProgressFiber: getStackAddendumByWorkInProgressFiber,
        describeComponentFrame: describeComponentFrame
      };

      /***/
    },
    /* 33 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

        var warning = __webpack_require__(2);

        function warnNoop(publicInstance, callerName) {
          if (process.env.NODE_ENV !== "production") {
            var constructor = publicInstance.constructor;
            process.env.NODE_ENV !== "production"
              ? warning(
                  false,
                  "%s(...): Can only update a mounted or mounting component. " +
                    "This usually means you called %s() on an unmounted component. " +
                    "This is a no-op.\n\nPlease check the code for the %s component.",
                  callerName,
                  callerName,
                  (constructor &&
                    (constructor.displayName || constructor.name)) ||
                    "ReactClass"
                )
              : void 0;
          }
        }

        /**
 * This is the abstract API for an update queue.
 */
        var ReactNoopUpdateQueue = {
          /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
          isMounted: function(publicInstance) {
            return false;
          },

          /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
          enqueueForceUpdate: function(publicInstance, callback, callerName) {
            warnNoop(publicInstance, "forceUpdate");
          },

          /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
          enqueueReplaceState: function(
            publicInstance,
            completeState,
            callback,
            callerName
          ) {
            warnNoop(publicInstance, "replaceState");
          },

          /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
          enqueueSetState: function(
            publicInstance,
            partialState,
            callback,
            callerName
          ) {
            warnNoop(publicInstance, "setState");
          }
        };

        module.exports = ReactNoopUpdateQueue;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 34 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

      var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";

      module.exports = ReactPropTypesSecret;

      /***/
    },
    /* 35 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

        var _prodInvariant = __webpack_require__(5);

        var ReactPropTypesSecret = __webpack_require__(34);

        var invariant = __webpack_require__(4);
        var warning = __webpack_require__(2);

        var loggedTypeFailures = {};

        /**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
        function checkPropTypes(
          typeSpecs,
          values,
          location,
          componentName,
          getStack
        ) {
          if (process.env.NODE_ENV !== "production") {
            for (var typeSpecName in typeSpecs) {
              if (typeSpecs.hasOwnProperty(typeSpecName)) {
                var error;
                // Prop type validation may throw. In case they do, we don't want to
                // fail the render phase where it didn't fail before. So we log it.
                // After these have been cleaned up, we'll let them throw.
                try {
                  // This is intentionally an invariant that gets caught. It's the same
                  // behavior as without this statement except with a better message.
                  !(typeof typeSpecs[typeSpecName] === "function")
                    ? process.env.NODE_ENV !== "production"
                      ? invariant(
                          false,
                          "%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",
                          componentName || "React class",
                          location,
                          typeSpecName
                        )
                      : _prodInvariant(
                          "84",
                          componentName || "React class",
                          location,
                          typeSpecName
                        )
                    : void 0;
                  error = typeSpecs[typeSpecName](
                    values,
                    typeSpecName,
                    componentName,
                    location,
                    null,
                    ReactPropTypesSecret
                  );
                } catch (ex) {
                  error = ex;
                }
                process.env.NODE_ENV !== "production"
                  ? warning(
                      !error || error instanceof Error,
                      "%s: type specification of %s `%s` is invalid; the type checker " +
                        "function must return `null` or an `Error` but returned a %s. " +
                        "You may have forgotten to pass an argument to the type checker " +
                        "creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and " +
                        "shape all require an argument).",
                      componentName || "React class",
                      location,
                      typeSpecName,
                      typeof error
                    )
                  : void 0;
                if (
                  error instanceof Error &&
                  !(error.message in loggedTypeFailures)
                ) {
                  // Only monitor this failure once because there tends to be a lot of the
                  // same error.
                  loggedTypeFailures[error.message] = true;

                  var stack = getStack ? getStack() : "";

                  process.env.NODE_ENV !== "production"
                    ? warning(
                        false,
                        "Failed %s type: %s%s",
                        location,
                        error.message,
                        stack != null ? stack : ""
                      )
                    : void 0;
                }
              }
            }
          }
        }

        module.exports = checkPropTypes;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 36 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      module.exports = __webpack_require__(60);

      /***/
    },
    /* 37 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      var _react = __webpack_require__(36);
      var _react2 = _interopRequireDefault(_react);
      var _reactNative = __webpack_require__(57);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var index = 0;
      var BrightcoveVideo = (function(_Component) {
        _inherits(BrightcoveVideo, _Component);
        function BrightcoveVideo(props) {
          _classCallCheck(this, BrightcoveVideo);
          var _this = _possibleConstructorReturn(
            this,
            (BrightcoveVideo.__proto__ ||
              Object.getPrototypeOf(BrightcoveVideo))
              .call(this, props)
          );

          index++;

          _this.state = {
            id: props.videoId + "-" + props.accountId + "-" + index,
            accountId: props.accountId,
            videoId: props.videoId,
            errors: [].concat(BrightcoveVideo.globalErrors),
            playerStatus: "paused",
            playheadPosition: 0
          };
          return _this;
        }
        _createClass(
          BrightcoveVideo,
          [
            {
              key: "componentDidMount",
              value: function componentDidMount() {
                var _this2 = this;
                if (this.state.errors.length) {
                  return;
                }

                if (!BrightcoveVideo.players) {
                  BrightcoveVideo.players = [];

                  var s = this.createScript();

                  s.onload = function() {
                    BrightcoveVideo.players.forEach(function(player) {
                      return player.initVideoJS(player.state.id);
                    });
                  };

                  s.onerror = function(err) {
                    var uriErr = {
                      code: "",
                      message:
                        "The script " + err.target.src + " is not accessible."
                    };

                    BrightcoveVideo.globalErrors.push(uriErr);

                    _this2.emitError(uriErr);
                  };

                  this.appendScript(s);
                }

                this.init();
              }
            },
            {
              key: "createScript",
              value: function createScript() {
                var s = document.createElement("script");
                s.src = BrightcoveVideo.getScriptUrl(this.props.accountId);

                return s;
              }
            },
            {
              key: "appendScript",
              value: function appendScript(s) {
                document.body.appendChild(s);
              }
            },
            {
              key: "emitState",
              value: function emitState() {
                if (this.props.onChange) {
                  this.props.onChange(this.state);
                }
              }
            },
            {
              key: "emitError",
              value: function emitError(err) {
                var errors = [].concat(this.state.errors);
                errors.push(err);
                this.setState({ errors: errors });

                if (this.props.onError) {
                  this.props.onError(err);
                }
              }
            },
            {
              key: "onError",
              value: function onError(player) {
                this.emitError(player.error());
              }
            },
            {
              key: "onPlay",
              value: function onPlay(player) {
                this.setState({
                  playerStatus: "playing",
                  playheadPosition: player.currentTime()
                });

                this.emitState();
              }
            },
            {
              key: "onPause",
              value: function onPause(player) {
                this.setState({
                  playerStatus: "paused",
                  playheadPosition: player.currentTime()
                });

                this.emitState();
              }
            },
            {
              key: "onSeeked",
              value: function onSeeked(player) {
                this.setState({
                  playheadPosition: player.currentTime()
                });

                this.emitState();
              }
            },
            {
              key: "initVideoJS",
              value: function initVideoJS(id) {
                var player = videojs(id);
                var handler = BrightcoveVideo.handlePlayerReady.bind(
                  player,
                  this
                );

                player.ready(handler);
                player.on("error", this.onError.bind(this, player));
              }
            },
            {
              key: "initVideo",
              value: function initVideo(id) {
                bc(document.getElementById(id));
                this.initVideoJS(id);
              }
            },
            {
              key: "init",
              value: function init() {
                if (window.bc && window.videojs) {
                  this.initVideo(this.state.id);
                } else {
                  BrightcoveVideo.players.push(this);
                }
              }
            },
            {
              key: "render",
              value: function render() {
                if (this.state.errors.length) {
                  var errorItems = this.state.errors.map(function(error, i) {
                    return _react2.default.createElement(
                      "li",
                      { key: i, style: { color: "white" } },
                      error.code,
                      " - ",
                      error.message
                    );
                  });

                  return _react2.default.createElement(
                    _reactNative.View,
                    {
                      style: {
                        width: this.props.width,
                        height: this.props.height,
                        backgroundColor: "red"
                      }
                    },
                    _react2.default.createElement("ul", null, errorItems)
                  );
                }

                return _react2.default.createElement(
                  "div",
                  null,
                  _react2.default.createElement("video", {
                    id: this.state.id,
                    width: this.props.width,
                    height: this.props.height,
                    "data-embed": "default",
                    "data-video-id": this.props.videoId,
                    "data-account": this.props.accountId,
                    "data-player": "default",
                    "data-application-id": true,
                    className: "video-js",
                    controls: true
                  })
                );
              }
            }
          ],
          [
            {
              key: "handlePlayerReady",
              value: function handlePlayerReady(context) {
                this.on("play", context.onPlay.bind(context, this));
                this.on("pause", context.onPause.bind(context, this));
                this.on("seeked", context.onSeeked.bind(context, this));
              }
            },
            {
              key: "getScriptUrl",
              value: function getScriptUrl(accountId) {
                return (
                  "//players.brightcove.net/" +
                  accountId +
                  "/default_default/index.min.js"
                );
              }
            }
          ]
        );
        return BrightcoveVideo;
      })(_react.Component);

      BrightcoveVideo.globalErrors = [];

      BrightcoveVideo.defaultProps = {
        width: 320,
        height: 180
      };
      exports.default = BrightcoveVideo;

      /***/
    },
    /* 38 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var AnimatedWithChildren = __webpack_require__(3);
      var Animated = __webpack_require__(1);
      var AnimatedValue = __webpack_require__(6);
      var Interpolation = __webpack_require__(9);
      var AnimatedInterpolation = __webpack_require__(11);
      var AnimatedAddition = (function(_AnimatedWithChildren) {
        _inherits(AnimatedAddition, _AnimatedWithChildren);

        function AnimatedAddition(a, b) {
          _classCallCheck(this, AnimatedAddition);
          var _this = _possibleConstructorReturn(
            this,
            (AnimatedAddition.__proto__ ||
              Object.getPrototypeOf(AnimatedAddition))
              .call(this)
          );

          _this._a = typeof a === "number" ? new AnimatedValue(a) : a;
          _this._b = typeof b === "number" ? new AnimatedValue(b) : b;
          _this._listeners = {};
          return _this;
        }
        _createClass(AnimatedAddition, [
          {
            key: "__getValue",
            value: function __getValue() {
              return this._a.__getValue() + this._b.__getValue();
            }
          },
          {
            key: "addListener",
            value: function addListener(callback) {
              var _this2 = this;
              if (!this._aListener && this._a.addListener) {
                this._aListener = this._a.addListener(function() {
                  for (var key in _this2._listeners) {
                    _this2._listeners[key]({ value: _this2.__getValue() });
                  }
                });
              }
              if (!this._bListener && this._b.addListener) {
                this._bListener = this._b.addListener(function() {
                  for (var key in _this2._listeners) {
                    _this2._listeners[key]({ value: _this2.__getValue() });
                  }
                });
              }
              var id = guid();
              this._listeners[id] = callback;
              return id;
            }
          },
          {
            key: "removeListener",
            value: function removeListener(id) {
              delete this._listeners[id];
            }
          },
          {
            key: "interpolate",
            value: function interpolate(config) {
              return new AnimatedInterpolation(
                this,
                Interpolation.create(config)
              );
            }
          },
          {
            key: "__attach",
            value: function __attach() {
              this._a.__addChild(this);
              this._b.__addChild(this);
            }
          },
          {
            key: "__detach",
            value: function __detach() {
              this._a.__removeChild(this);
              this._b.__removeChild(this);
            }
          }
        ]);
        return AnimatedAddition;
      })(AnimatedWithChildren);

      module.exports = AnimatedAddition;

      /***/
    },
    /* 39 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var Animated = __webpack_require__(1);
      var AnimatedWithChildren = __webpack_require__(3);
      var AnimatedInterpolation = __webpack_require__(11);
      var Interpolation = __webpack_require__(9);
      var AnimatedModulo = (function(_AnimatedWithChildren) {
        _inherits(AnimatedModulo, _AnimatedWithChildren);

        function AnimatedModulo(a, modulus) {
          _classCallCheck(this, AnimatedModulo);
          var _this = _possibleConstructorReturn(
            this,
            (AnimatedModulo.__proto__ || Object.getPrototypeOf(AnimatedModulo))
              .call(this)
          );

          _this._a = a;
          _this._modulus = modulus;
          _this._listeners = {};
          return _this;
        }
        _createClass(AnimatedModulo, [
          {
            key: "__getValue",
            value: function __getValue() {
              return (
                (this._a.__getValue() % this._modulus + this._modulus) %
                this._modulus
              );
            }
          },
          {
            key: "addListener",
            value: function addListener(callback) {
              var _this2 = this;
              if (!this._aListener) {
                this._aListener = this._a.addListener(function() {
                  for (var key in _this2._listeners) {
                    _this2._listeners[key]({ value: _this2.__getValue() });
                  }
                });
              }
              var id = guid();
              this._listeners[id] = callback;
              return id;
            }
          },
          {
            key: "removeListener",
            value: function removeListener(id) {
              delete this._listeners[id];
            }
          },
          {
            key: "interpolate",
            value: function interpolate(config) {
              return new AnimatedInterpolation(
                this,
                Interpolation.create(config)
              );
            }
          },
          {
            key: "__attach",
            value: function __attach() {
              this._a.__addChild(this);
            }
          },
          {
            key: "__detach",
            value: function __detach() {
              this._a.__removeChild(this);
            }
          }
        ]);
        return AnimatedModulo;
      })(AnimatedWithChildren);

      module.exports = AnimatedModulo;

      /***/
    },
    /* 40 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var AnimatedWithChildren = __webpack_require__(3);
      var Animated = __webpack_require__(1);
      var AnimatedValue = __webpack_require__(6);
      var AnimatedInterpolation = __webpack_require__(11);
      var Interpolation = __webpack_require__(9);
      var AnimatedMultiplication = (function(_AnimatedWithChildren) {
        _inherits(AnimatedMultiplication, _AnimatedWithChildren);

        function AnimatedMultiplication(a, b) {
          _classCallCheck(this, AnimatedMultiplication);
          var _this = _possibleConstructorReturn(
            this,
            (AnimatedMultiplication.__proto__ ||
              Object.getPrototypeOf(AnimatedMultiplication))
              .call(this)
          );

          _this._a = typeof a === "number" ? new AnimatedValue(a) : a;
          _this._b = typeof b === "number" ? new AnimatedValue(b) : b;
          _this._listeners = {};
          return _this;
        }
        _createClass(AnimatedMultiplication, [
          {
            key: "__getValue",
            value: function __getValue() {
              return this._a.__getValue() * this._b.__getValue();
            }
          },
          {
            key: "addListener",
            value: function addListener(callback) {
              var _this2 = this;
              if (!this._aListener && this._a.addListener) {
                this._aListener = this._a.addListener(function() {
                  for (var key in _this2._listeners) {
                    _this2._listeners[key]({ value: _this2.__getValue() });
                  }
                });
              }
              if (!this._bListener && this._b.addListener) {
                this._bListener = this._b.addListener(function() {
                  for (var key in _this2._listeners) {
                    _this2._listeners[key]({ value: _this2.__getValue() });
                  }
                });
              }
              var id = guid();
              this._listeners[id] = callback;
              return id;
            }
          },
          {
            key: "removeListener",
            value: function removeListener(id) {
              delete this._listeners[id];
            }
          },
          {
            key: "interpolate",
            value: function interpolate(config) {
              return new AnimatedInterpolation(
                this,
                Interpolation.create(config)
              );
            }
          },
          {
            key: "__attach",
            value: function __attach() {
              this._a.__addChild(this);
              this._b.__addChild(this);
            }
          },
          {
            key: "__detach",
            value: function __detach() {
              this._a.__removeChild(this);
              this._b.__removeChild(this);
            }
          }
        ]);
        return AnimatedMultiplication;
      })(AnimatedWithChildren);

      module.exports = AnimatedMultiplication;

      /***/
    },
    /* 41 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _extends =
        Object.assign ||
        function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var Animated = __webpack_require__(1);
      var AnimatedWithChildren = __webpack_require__(3);
      var AnimatedTransform = __webpack_require__(44);
      var FlattenStyle = __webpack_require__(24);
      var AnimatedStyle = (function(_AnimatedWithChildren) {
        _inherits(AnimatedStyle, _AnimatedWithChildren);

        function AnimatedStyle(style) {
          _classCallCheck(this, AnimatedStyle);
          var _this = _possibleConstructorReturn(
            this,
            (AnimatedStyle.__proto__ || Object.getPrototypeOf(AnimatedStyle))
              .call(this)
          );

          style = FlattenStyle.current(style) || {};
          if (style.transform && !(style.transform instanceof Animated)) {
            style = _extends({}, style, {
              transform: new AnimatedTransform(style.transform)
            });
          }
          _this._style = style;
          return _this;
        }
        _createClass(AnimatedStyle, [
          {
            key: "__getValue",
            value: function __getValue() {
              var style = {};
              for (var key in this._style) {
                var value = this._style[key];
                if (value instanceof Animated) {
                  style[key] = value.__getValue();
                } else {
                  style[key] = value;
                }
              }
              return style;
            }
          },
          {
            key: "__getAnimatedValue",
            value: function __getAnimatedValue() {
              var style = {};
              for (var key in this._style) {
                var value = this._style[key];
                if (value instanceof Animated) {
                  style[key] = value.__getAnimatedValue();
                }
              }
              return style;
            }
          },
          {
            key: "__attach",
            value: function __attach() {
              for (var key in this._style) {
                var value = this._style[key];
                if (value instanceof Animated) {
                  value.__addChild(this);
                }
              }
            }
          },
          {
            key: "__detach",
            value: function __detach() {
              for (var key in this._style) {
                var value = this._style[key];
                if (value instanceof Animated) {
                  value.__removeChild(this);
                }
              }
            }
          }
        ]);
        return AnimatedStyle;
      })(AnimatedWithChildren);

      module.exports = AnimatedStyle;

      /***/
    },
    /* 42 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var Animated = __webpack_require__(1);
      var AnimatedWithChildren = __webpack_require__(3);
      var AnimatedTemplate = (function(_AnimatedWithChildren) {
        _inherits(AnimatedTemplate, _AnimatedWithChildren);

        function AnimatedTemplate(strings, values) {
          _classCallCheck(this, AnimatedTemplate);
          var _this = _possibleConstructorReturn(
            this,
            (AnimatedTemplate.__proto__ ||
              Object.getPrototypeOf(AnimatedTemplate))
              .call(this)
          );

          _this._strings = strings;
          _this._values = values;
          return _this;
        }
        _createClass(AnimatedTemplate, [
          {
            key: "__transformValue",
            value: function __transformValue(value) {
              if (value instanceof Animated) {
                return value.__getValue();
              } else {
                return value;
              }
            }
          },
          {
            key: "__getValue",
            value: function __getValue() {
              var value = this._strings[0];
              for (var i = 0; i < this._values.length; ++i) {
                value +=
                  this.__transformValue(this._values[i]) + this._strings[1 + i];
              }
              return value;
            }
          },
          {
            key: "__attach",
            value: function __attach() {
              for (var i = 0; i < this._values.length; ++i) {
                if (this._values[i] instanceof Animated) {
                  this._values[i].__addChild(this);
                }
              }
            }
          },
          {
            key: "__detach",
            value: function __detach() {
              for (var i = 0; i < this._values.length; ++i) {
                if (this._values[i] instanceof Animated) {
                  this._values[i].__removeChild(this);
                }
              }
            }
          }
        ]);
        return AnimatedTemplate;
      })(AnimatedWithChildren);

      module.exports = AnimatedTemplate;

      /***/
    },
    /* 43 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _extends =
        Object.assign ||
        function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var Animated = __webpack_require__(1);
      var AnimatedValue = __webpack_require__(6);
      var AnimatedTracking = (function(_Animated) {
        _inherits(AnimatedTracking, _Animated);

        function AnimatedTracking(
          value,
          parent,
          animationClass,
          animationConfig,
          callback
        ) {
          _classCallCheck(this, AnimatedTracking);
          var _this = _possibleConstructorReturn(
            this,
            (AnimatedTracking.__proto__ ||
              Object.getPrototypeOf(AnimatedTracking))
              .call(this)
          );

          _this._value = value;
          _this._parent = parent;
          _this._animationClass = animationClass;
          _this._animationConfig = animationConfig;
          _this._callback = callback;
          _this.__attach();
          return _this;
        }
        _createClass(AnimatedTracking, [
          {
            key: "__getValue",
            value: function __getValue() {
              return this._parent.__getValue();
            }
          },
          {
            key: "__attach",
            value: function __attach() {
              this._parent.__addChild(this);
            }
          },
          {
            key: "__detach",
            value: function __detach() {
              this._parent.__removeChild(this);
            }
          },
          {
            key: "update",
            value: function update() {
              this._value.animate(
                new this._animationClass(
                  _extends({}, this._animationConfig, {
                    toValue: this._animationConfig.toValue.__getValue()
                  })
                ),
                this._callback
              );
            }
          }
        ]);
        return AnimatedTracking;
      })(Animated);

      module.exports = AnimatedTracking;

      /***/
    },
    /* 44 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var Animated = __webpack_require__(1);
      var AnimatedWithChildren = __webpack_require__(3);
      var AnimatedTransform = (function(_AnimatedWithChildren) {
        _inherits(AnimatedTransform, _AnimatedWithChildren);

        function AnimatedTransform(transforms) {
          _classCallCheck(this, AnimatedTransform);
          var _this = _possibleConstructorReturn(
            this,
            (AnimatedTransform.__proto__ ||
              Object.getPrototypeOf(AnimatedTransform))
              .call(this)
          );

          _this._transforms = transforms;
          return _this;
        }
        _createClass(AnimatedTransform, [
          {
            key: "__getValue",
            value: function __getValue() {
              return this._transforms.map(function(transform) {
                var result = {};
                for (var key in transform) {
                  var value = transform[key];
                  if (value instanceof Animated) {
                    result[key] = value.__getValue();
                  } else {
                    result[key] = value;
                  }
                }
                return result;
              });
            }
          },
          {
            key: "__getAnimatedValue",
            value: function __getAnimatedValue() {
              return this._transforms.map(function(transform) {
                var result = {};
                for (var key in transform) {
                  var value = transform[key];
                  if (value instanceof Animated) {
                    result[key] = value.__getAnimatedValue();
                  } else {
                    result[key] = value;
                  }
                }
                return result;
              });
            }
          },
          {
            key: "__attach",
            value: function __attach() {
              var _this2 = this;
              this._transforms.forEach(function(transform) {
                for (var key in transform) {
                  var value = transform[key];
                  if (value instanceof Animated) {
                    value.__addChild(_this2);
                  }
                }
              });
            }
          },
          {
            key: "__detach",
            value: function __detach() {
              var _this3 = this;
              this._transforms.forEach(function(transform) {
                for (var key in transform) {
                  var value = transform[key];
                  if (value instanceof Animated) {
                    value.__removeChild(_this3);
                  }
                }
              });
            }
          }
        ]);
        return AnimatedTransform;
      })(AnimatedWithChildren);

      module.exports = AnimatedTransform;

      /***/
    },
    /* 45 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var Animated = __webpack_require__(1);
      var AnimatedValue = __webpack_require__(6);
      var AnimatedWithChildren = __webpack_require__(3);
      var invariant = __webpack_require__(10);
      var guid = __webpack_require__(15);
      var AnimatedValueXY = (function(_AnimatedWithChildren) {
        _inherits(AnimatedValueXY, _AnimatedWithChildren);

        function AnimatedValueXY(valueIn) {
          _classCallCheck(this, AnimatedValueXY);
          var _this = _possibleConstructorReturn(
            this,
            (AnimatedValueXY.__proto__ ||
              Object.getPrototypeOf(AnimatedValueXY))
              .call(this)
          );

          var value = valueIn || { x: 0, y: 0 };
          if (typeof value.x === "number" && typeof value.y === "number") {
            _this.x = new AnimatedValue(value.x);
            _this.y = new AnimatedValue(value.y);
          } else {
            invariant(
              value.x instanceof AnimatedValue &&
                value.y instanceof AnimatedValue,
              "AnimatedValueXY must be initalized with an object of numbers or " +
                "AnimatedValues."
            );

            _this.x = value.x;
            _this.y = value.y;
          }
          _this._listeners = {};
          return _this;
        }
        _createClass(AnimatedValueXY, [
          {
            key: "setValue",
            value: function setValue(value) {
              this.x.setValue(value.x);
              this.y.setValue(value.y);
            }
          },
          {
            key: "setOffset",
            value: function setOffset(offset) {
              this.x.setOffset(offset.x);
              this.y.setOffset(offset.y);
            }
          },
          {
            key: "flattenOffset",
            value: function flattenOffset() {
              this.x.flattenOffset();
              this.y.flattenOffset();
            }
          },
          {
            key: "__getValue",
            value: function __getValue() {
              return {
                x: this.x.__getValue(),
                y: this.y.__getValue()
              };
            }
          },
          {
            key: "stopAnimation",
            value: function stopAnimation(callback) {
              this.x.stopAnimation();
              this.y.stopAnimation();
              callback && callback(this.__getValue());
            }
          },
          {
            key: "addListener",
            value: function addListener(callback) {
              var _this2 = this;
              var id = guid();
              var jointCallback = function jointCallback(_ref) {
                var number = _ref.value;
                callback(_this2.__getValue());
              };
              this._listeners[id] = {
                x: this.x.addListener(jointCallback),
                y: this.y.addListener(jointCallback)
              };

              return id;
            }
          },
          {
            key: "removeListener",
            value: function removeListener(id) {
              this.x.removeListener(this._listeners[id].x);
              this.y.removeListener(this._listeners[id].y);
              delete this._listeners[id];
            }
          },
          {
            key: "getLayout",
            value: function getLayout() {
              return {
                left: this.x,
                top: this.y
              };
            }
          },
          {
            key: "getTranslateTransform",
            value: function getTranslateTransform() {
              return [{ translateX: this.x }, { translateY: this.y }];
            }
          }
        ]);
        return AnimatedValueXY;
      })(AnimatedWithChildren);

      module.exports = AnimatedValueXY;

      /***/
    },
    /* 46 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var Animation = __webpack_require__(8);
      var RequestAnimationFrame = __webpack_require__(13);
      var CancelAnimationFrame = __webpack_require__(12);
      var DecayAnimation = (function(_Animation) {
        _inherits(DecayAnimation, _Animation);

        function DecayAnimation(config) {
          _classCallCheck(this, DecayAnimation);
          var _this = _possibleConstructorReturn(
            this,
            (DecayAnimation.__proto__ || Object.getPrototypeOf(DecayAnimation))
              .call(this)
          );

          _this._deceleration = config.deceleration !== undefined
            ? config.deceleration
            : 0.998;
          _this._velocity = config.velocity;
          _this.__isInteraction = config.isInteraction !== undefined
            ? config.isInteraction
            : true;
          return _this;
        }
        _createClass(DecayAnimation, [
          {
            key: "start",
            value: function start(fromValue, onUpdate, onEnd) {
              this.__active = true;
              this._lastValue = fromValue;
              this._fromValue = fromValue;
              this._onUpdate = onUpdate;
              this.__onEnd = onEnd;
              this._startTime = Date.now();
              this._animationFrame = RequestAnimationFrame.current(
                this.onUpdate.bind(this)
              );
            }
          },
          {
            key: "onUpdate",
            value: function onUpdate() {
              var now = Date.now();

              var value =
                this._fromValue +
                this._velocity /
                  (1 - this._deceleration) *
                  (1 -
                    Math.exp(
                      -(1 - this._deceleration) * (now - this._startTime)
                    ));

              this._onUpdate(value);

              if (Math.abs(this._lastValue - value) < 0.1) {
                this.__debouncedOnEnd({ finished: true });
                return;
              }

              this._lastValue = value;
              if (this.__active) {
                this._animationFrame = RequestAnimationFrame.current(
                  this.onUpdate.bind(this)
                );
              }
            }
          },
          {
            key: "stop",
            value: function stop() {
              this.__active = false;
              CancelAnimationFrame.current(this._animationFrame);
              this.__debouncedOnEnd({ finished: false });
            }
          }
        ]);
        return DecayAnimation;
      })(Animation);

      module.exports = DecayAnimation;

      /***/
    },
    /* 47 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var _bezier = __webpack_require__(52);
      var Easing = (function() {
        function Easing() {
          _classCallCheck(this, Easing);
        }
        _createClass(Easing, null, [
          {
            key: "step0",
            value: function step0(n) {
              return n > 0 ? 1 : 0;
            }
          },
          {
            key: "step1",
            value: function step1(n) {
              return n >= 1 ? 1 : 0;
            }
          },
          {
            key: "linear",
            value: function linear(t) {
              return t;
            }
          },
          {
            key: "ease",
            value: function ease(t) {
              return _ease(t);
            }
          },
          {
            key: "quad",
            value: function quad(t) {
              return t * t;
            }
          },
          {
            key: "cubic",
            value: function cubic(t) {
              return t * t * t;
            }
          },
          {
            key: "poly",
            value: function poly(n) {
              return function(t) {
                return Math.pow(t, n);
              };
            }
          },
          {
            key: "sin",
            value: function sin(t) {
              return 1 - Math.cos(t * Math.PI / 2);
            }
          },
          {
            key: "circle",
            value: function circle(t) {
              return 1 - Math.sqrt(1 - t * t);
            }
          },
          {
            key: "exp",
            value: function exp(t) {
              return Math.pow(2, 10 * (t - 1));
            }
          },
          {
            key: "elastic",
            value: function elastic() {
              var bounciness = arguments.length > 0 &&
                arguments[0] !== undefined
                ? arguments[0]
                : 1;
              var p = bounciness * Math.PI;
              return function(t) {
                return (
                  1 - Math.pow(Math.cos(t * Math.PI / 2), 3) * Math.cos(t * p)
                );
              };
            }
          },
          {
            key: "back",
            value: function back(s) {
              if (s === undefined) {
                s = 1.70158;
              }
              return function(t) {
                return t * t * ((s + 1) * t - s);
              };
            }
          },
          {
            key: "bounce",
            value: function bounce(t) {
              if (t < 1 / 2.75) {
                return 7.5625 * t * t;
              }

              if (t < 2 / 2.75) {
                t -= 1.5 / 2.75;
                return 7.5625 * t * t + 0.75;
              }

              if (t < 2.5 / 2.75) {
                t -= 2.25 / 2.75;
                return 7.5625 * t * t + 0.9375;
              }

              t -= 2.625 / 2.75;
              return 7.5625 * t * t + 0.984375;
            }
          },
          {
            key: "bezier",
            value: function bezier(x1, y1, x2, y2) {
              return _bezier(x1, y1, x2, y2);
            }
          },
          {
            key: "in",
            value: function _in(easing) {
              return easing;
            }
          },
          {
            key: "out",
            value: function out(easing) {
              return function(t) {
                return 1 - easing(1 - t);
              };
            }
          },
          {
            key: "inOut",
            value: function inOut(easing) {
              return function(t) {
                if (t < 0.5) {
                  return easing(t * 2) / 2;
                }
                return 1 - easing((1 - t) * 2) / 2;
              };
            }
          }
        ]);
        return Easing;
      })();

      var _ease = Easing.bezier(0.42, 0, 1, 1);

      module.exports = Easing;

      /***/
    },
    /* 48 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      function SetPolyfill() {
        this._cache = [];
      }

      SetPolyfill.prototype.add = function(e) {
        if (this._cache.indexOf(e) === -1) {
          this._cache.push(e);
        }
      };

      SetPolyfill.prototype.forEach = function(cb) {
        this._cache.forEach(cb);
      };

      module.exports = SetPolyfill;

      /***/
    },
    /* 49 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var Animation = __webpack_require__(8);
      var AnimatedValue = __webpack_require__(6);
      var RequestAnimationFrame = __webpack_require__(13);
      var CancelAnimationFrame = __webpack_require__(12);
      var invariant = __webpack_require__(10);
      var SpringConfig = __webpack_require__(50);

      function withDefault(value, defaultValue) {
        if (value === undefined || value === null) {
          return defaultValue;
        }
        return value;
      }
      var SpringAnimation = (function(_Animation) {
        _inherits(SpringAnimation, _Animation);

        function SpringAnimation(config) {
          _classCallCheck(this, SpringAnimation);
          var _this = _possibleConstructorReturn(
            this,
            (SpringAnimation.__proto__ ||
              Object.getPrototypeOf(SpringAnimation))
              .call(this)
          );

          _this._overshootClamping = withDefault(
            config.overshootClamping,
            false
          );
          _this._restDisplacementThreshold = withDefault(
            config.restDisplacementThreshold,
            0.001
          );
          _this._restSpeedThreshold = withDefault(
            config.restSpeedThreshold,
            0.001
          );
          _this._initialVelocity = config.velocity;
          _this._lastVelocity = withDefault(config.velocity, 0);
          _this._toValue = config.toValue;
          _this.__isInteraction = config.isInteraction !== undefined
            ? config.isInteraction
            : true;

          var springConfig;
          if (config.bounciness !== undefined || config.speed !== undefined) {
            invariant(
              config.tension === undefined && config.friction === undefined,
              "You can only define bounciness/speed or tension/friction but not both"
            );

            springConfig = SpringConfig.fromBouncinessAndSpeed(
              withDefault(config.bounciness, 8),
              withDefault(config.speed, 12)
            );
          } else {
            springConfig = SpringConfig.fromOrigamiTensionAndFriction(
              withDefault(config.tension, 40),
              withDefault(config.friction, 7)
            );
          }
          _this._tension = springConfig.tension;
          _this._friction = springConfig.friction;
          return _this;
        }
        _createClass(SpringAnimation, [
          {
            key: "start",
            value: function start(
              fromValue,
              onUpdate,
              onEnd,
              previousAnimation
            ) {
              this.__active = true;
              this._startPosition = fromValue;
              this._lastPosition = this._startPosition;

              this._onUpdate = onUpdate;
              this.__onEnd = onEnd;
              this._lastTime = Date.now();

              if (previousAnimation instanceof SpringAnimation) {
                var internalState = previousAnimation.getInternalState();
                this._lastPosition = internalState.lastPosition;
                this._lastVelocity = internalState.lastVelocity;
                this._lastTime = internalState.lastTime;
              }
              if (
                this._initialVelocity !== undefined &&
                this._initialVelocity !== null
              ) {
                this._lastVelocity = this._initialVelocity;
              }
              this.onUpdate();
            }
          },
          {
            key: "getInternalState",
            value: function getInternalState() {
              return {
                lastPosition: this._lastPosition,
                lastVelocity: this._lastVelocity,
                lastTime: this._lastTime
              };
            }
          },
          {
            key: "onUpdate",
            value: function onUpdate() {
              var position = this._lastPosition;
              var velocity = this._lastVelocity;

              var tempPosition = this._lastPosition;
              var tempVelocity = this._lastVelocity;

              var MAX_STEPS = 64;
              var now = Date.now();
              if (now > this._lastTime + MAX_STEPS) {
                now = this._lastTime + MAX_STEPS;
              }

              var TIMESTEP_MSEC = 1;
              var numSteps = Math.floor((now - this._lastTime) / TIMESTEP_MSEC);

              for (var i = 0; i < numSteps; ++i) {
                var step = TIMESTEP_MSEC / 1000;

                var aVelocity = velocity;
                var aAcceleration =
                  this._tension * (this._toValue - tempPosition) -
                  this._friction * tempVelocity;
                var tempPosition = position + aVelocity * step / 2;
                var tempVelocity = velocity + aAcceleration * step / 2;

                var bVelocity = tempVelocity;
                var bAcceleration =
                  this._tension * (this._toValue - tempPosition) -
                  this._friction * tempVelocity;
                tempPosition = position + bVelocity * step / 2;
                tempVelocity = velocity + bAcceleration * step / 2;

                var cVelocity = tempVelocity;
                var cAcceleration =
                  this._tension * (this._toValue - tempPosition) -
                  this._friction * tempVelocity;
                tempPosition = position + cVelocity * step / 2;
                tempVelocity = velocity + cAcceleration * step / 2;

                var dVelocity = tempVelocity;
                var dAcceleration =
                  this._tension * (this._toValue - tempPosition) -
                  this._friction * tempVelocity;
                tempPosition = position + cVelocity * step / 2;
                tempVelocity = velocity + cAcceleration * step / 2;

                var dxdt =
                  (aVelocity + 2 * (bVelocity + cVelocity) + dVelocity) / 6;
                var dvdt =
                  (aAcceleration +
                    2 * (bAcceleration + cAcceleration) +
                    dAcceleration) /
                  6;

                position += dxdt * step;
                velocity += dvdt * step;
              }

              this._lastTime = now;
              this._lastPosition = position;
              this._lastVelocity = velocity;

              this._onUpdate(position);
              if (!this.__active) {
                return;
              }

              var isOvershooting = false;
              if (this._overshootClamping && this._tension !== 0) {
                if (this._startPosition < this._toValue) {
                  isOvershooting = position > this._toValue;
                } else {
                  isOvershooting = position < this._toValue;
                }
              }
              var isVelocity = Math.abs(velocity) <= this._restSpeedThreshold;
              var isDisplacement = true;
              if (this._tension !== 0) {
                isDisplacement =
                  Math.abs(this._toValue - position) <=
                  this._restDisplacementThreshold;
              }

              if (isOvershooting || (isVelocity && isDisplacement)) {
                if (this._tension !== 0) {
                  this._onUpdate(this._toValue);
                }

                this.__debouncedOnEnd({ finished: true });
                return;
              }
              this._animationFrame = RequestAnimationFrame.current(
                this.onUpdate.bind(this)
              );
            }
          },
          {
            key: "stop",
            value: function stop() {
              this.__active = false;
              CancelAnimationFrame.current(this._animationFrame);
              this.__debouncedOnEnd({ finished: false });
            }
          }
        ]);
        return SpringAnimation;
      })(Animation);

      module.exports = SpringAnimation;

      /***/
    },
    /* 50 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      function tensionFromOrigamiValue(oValue) {
        return (oValue - 30) * 3.62 + 194;
      }

      function frictionFromOrigamiValue(oValue) {
        return (oValue - 8) * 3 + 25;
      }

      function fromOrigamiTensionAndFriction(tension, friction) {
        return {
          tension: tensionFromOrigamiValue(tension),
          friction: frictionFromOrigamiValue(friction)
        };
      }

      function fromBouncinessAndSpeed(bounciness, speed) {
        function normalize(value, startValue, endValue) {
          return (value - startValue) / (endValue - startValue);
        }

        function projectNormal(n, start, end) {
          return start + n * (end - start);
        }

        function linearInterpolation(t, start, end) {
          return t * end + (1 - t) * start;
        }

        function quadraticOutInterpolation(t, start, end) {
          return linearInterpolation(2 * t - t * t, start, end);
        }

        function b3Friction1(x) {
          return (
            0.0007 * Math.pow(x, 3) - 0.031 * Math.pow(x, 2) + 0.64 * x + 1.28
          );
        }

        function b3Friction2(x) {
          return (
            0.000044 * Math.pow(x, 3) - 0.006 * Math.pow(x, 2) + 0.36 * x + 2
          );
        }

        function b3Friction3(x) {
          return (
            0.00000045 * Math.pow(x, 3) -
            0.000332 * Math.pow(x, 2) +
            0.1078 * x +
            5.84
          );
        }

        function b3Nobounce(tension) {
          if (tension <= 18) {
            return b3Friction1(tension);
          } else if (tension > 18 && tension <= 44) {
            return b3Friction2(tension);
          } else {
            return b3Friction3(tension);
          }
        }

        var b = normalize(bounciness / 1.7, 0, 20);
        b = projectNormal(b, 0, 0.8);
        var s = normalize(speed / 1.7, 0, 20);
        var bouncyTension = projectNormal(s, 0.5, 200);
        var bouncyFriction = quadraticOutInterpolation(
          b,
          b3Nobounce(bouncyTension),
          0.01
        );

        return {
          tension: tensionFromOrigamiValue(bouncyTension),
          friction: frictionFromOrigamiValue(bouncyFriction)
        };
      }

      module.exports = {
        fromOrigamiTensionAndFriction: fromOrigamiTensionAndFriction,
        fromBouncinessAndSpeed: fromBouncinessAndSpeed
      };

      /***/
    },
    /* 51 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var Animation = __webpack_require__(8);
      var AnimatedValue = __webpack_require__(6);
      var Easing = __webpack_require__(47);
      var RequestAnimationFrame = __webpack_require__(13);
      var CancelAnimationFrame = __webpack_require__(12);

      var easeInOut = Easing.inOut(Easing.ease);
      var TimingAnimation = (function(_Animation) {
        _inherits(TimingAnimation, _Animation);

        function TimingAnimation(config) {
          _classCallCheck(this, TimingAnimation);
          var _this = _possibleConstructorReturn(
            this,
            (TimingAnimation.__proto__ ||
              Object.getPrototypeOf(TimingAnimation))
              .call(this)
          );

          _this._toValue = config.toValue;
          _this._easing = config.easing !== undefined
            ? config.easing
            : easeInOut;
          _this._duration = config.duration !== undefined
            ? config.duration
            : 500;
          _this._delay = config.delay !== undefined ? config.delay : 0;
          _this.__isInteraction = config.isInteraction !== undefined
            ? config.isInteraction
            : true;
          return _this;
        }
        _createClass(TimingAnimation, [
          {
            key: "start",
            value: function start(fromValue, onUpdate, onEnd) {
              var _this2 = this;
              this.__active = true;
              this._fromValue = fromValue;
              this._onUpdate = onUpdate;
              this.__onEnd = onEnd;

              var start = function start() {
                if (_this2._duration === 0) {
                  _this2._onUpdate(_this2._toValue);
                  _this2.__debouncedOnEnd({ finished: true });
                } else {
                  _this2._startTime = Date.now();
                  _this2._animationFrame = RequestAnimationFrame.current(
                    _this2.onUpdate.bind(_this2)
                  );
                }
              };
              if (this._delay) {
                this._timeout = setTimeout(start, this._delay);
              } else {
                start();
              }
            }
          },
          {
            key: "onUpdate",
            value: function onUpdate() {
              var now = Date.now();
              if (now >= this._startTime + this._duration) {
                if (this._duration === 0) {
                  this._onUpdate(this._toValue);
                } else {
                  this._onUpdate(
                    this._fromValue +
                      this._easing(1) * (this._toValue - this._fromValue)
                  );
                }
                this.__debouncedOnEnd({ finished: true });
                return;
              }

              this._onUpdate(
                this._fromValue +
                  this._easing((now - this._startTime) / this._duration) *
                    (this._toValue - this._fromValue)
              );

              if (this.__active) {
                this._animationFrame = RequestAnimationFrame.current(
                  this.onUpdate.bind(this)
                );
              }
            }
          },
          {
            key: "stop",
            value: function stop() {
              this.__active = false;
              clearTimeout(this._timeout);
              CancelAnimationFrame.current(this._animationFrame);
              this.__debouncedOnEnd({ finished: false });
            }
          }
        ]);
        return TimingAnimation;
      })(Animation);

      module.exports = TimingAnimation;

      /***/
    },
    /* 52 */
    /***/ function(module, exports) {
      var NEWTON_ITERATIONS = 4;
      var NEWTON_MIN_SLOPE = 0.001;
      var SUBDIVISION_PRECISION = 0.0000001;
      var SUBDIVISION_MAX_ITERATIONS = 10;

      var kSplineTableSize = 11;
      var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

      var float32ArraySupported = typeof Float32Array === "function";

      function A(aA1, aA2) {
        return 1.0 - 3.0 * aA2 + 3.0 * aA1;
      }
      function B(aA1, aA2) {
        return 3.0 * aA2 - 6.0 * aA1;
      }
      function C(aA1) {
        return 3.0 * aA1;
      }

      function calcBezier(aT, aA1, aA2) {
        return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
      }

      function getSlope(aT, aA1, aA2) {
        return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
      }

      function binarySubdivide(aX, aA, aB, mX1, mX2) {
        var currentX,
          currentT,
          i = 0;
        do {
          currentT = aA + (aB - aA) / 2.0;
          currentX = calcBezier(currentT, mX1, mX2) - aX;
          if (currentX > 0.0) {
            aB = currentT;
          } else {
            aA = currentT;
          }
        } while (
          Math.abs(currentX) > SUBDIVISION_PRECISION &&
          ++i < SUBDIVISION_MAX_ITERATIONS
        );
        return currentT;
      }

      function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
        for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
          var currentSlope = getSlope(aGuessT, mX1, mX2);
          if (currentSlope === 0.0) {
            return aGuessT;
          }
          var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
          aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
      }

      module.exports = function bezier(mX1, mY1, mX2, mY2) {
        if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
          throw new Error("bezier x values must be in [0, 1] range");
        }

        var sampleValues = float32ArraySupported
          ? new Float32Array(kSplineTableSize)
          : new Array(kSplineTableSize);
        if (mX1 !== mY1 || mX2 !== mY2) {
          for (var i = 0; i < kSplineTableSize; ++i) {
            sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
          }
        }

        function getTForX(aX) {
          var intervalStart = 0.0;
          var currentSample = 1;
          var lastSample = kSplineTableSize - 1;

          for (
            ;
            currentSample !== lastSample && sampleValues[currentSample] <= aX;
            ++currentSample
          ) {
            intervalStart += kSampleStepSize;
          }
          --currentSample;

          var dist =
            (aX - sampleValues[currentSample]) /
            (sampleValues[currentSample + 1] - sampleValues[currentSample]);
          var guessForT = intervalStart + dist * kSampleStepSize;

          var initialSlope = getSlope(guessForT, mX1, mX2);
          if (initialSlope >= NEWTON_MIN_SLOPE) {
            return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
          } else if (initialSlope === 0.0) {
            return guessForT;
          } else {
            return binarySubdivide(
              aX,
              intervalStart,
              intervalStart + kSampleStepSize,
              mX1,
              mX2
            );
          }
        }

        return function BezierEasing(x) {
          if (mX1 === mY1 && mX2 === mY2) {
            return x;
          }

          if (x === 0) {
            return 0;
          }
          if (x === 1) {
            return 1;
          }
          return calcBezier(getTForX(x), mY1, mY2);
        };
      };

      /***/
    },
    /* 53 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _extends =
        Object.assign ||
        function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var React = __webpack_require__(36);
      var AnimatedProps = __webpack_require__(22);
      var ApplyAnimatedValues = __webpack_require__(23);

      function createAnimatedComponent(Component) {
        var refName = "node";
        var AnimatedComponent = (function(_React$Component) {
          _inherits(AnimatedComponent, _React$Component);
          function AnimatedComponent() {
            _classCallCheck(this, AnimatedComponent);
            return _possibleConstructorReturn(
              this,
              (AnimatedComponent.__proto__ ||
                Object.getPrototypeOf(AnimatedComponent))
                .apply(this, arguments)
            );
          }
          _createClass(AnimatedComponent, [
            {
              key: "componentWillUnmount",
              value: function componentWillUnmount() {
                this._propsAnimated && this._propsAnimated.__detach();
              }
            },
            {
              key: "setNativeProps",
              value: function setNativeProps(props) {
                var didUpdate = ApplyAnimatedValues.current(
                  this.refs[refName],
                  props,
                  this
                );
                if (didUpdate === false) {
                  this.forceUpdate();
                }
              }
            },
            {
              key: "componentWillMount",
              value: function componentWillMount() {
                this.attachProps(this.props);
              }
            },
            {
              key: "attachProps",
              value: function attachProps(nextProps) {
                var _this2 = this;
                var oldPropsAnimated = this._propsAnimated;

                var callback = function callback() {
                  var didUpdate = ApplyAnimatedValues.current(
                    _this2.refs[refName],
                    _this2._propsAnimated.__getAnimatedValue(),
                    _this2
                  );
                  if (didUpdate === false) {
                    _this2.forceUpdate();
                  }
                };

                this._propsAnimated = new AnimatedProps(nextProps, callback);

                oldPropsAnimated && oldPropsAnimated.__detach();
              }
            },
            {
              key: "componentWillReceiveProps",
              value: function componentWillReceiveProps(nextProps) {
                this.attachProps(nextProps);
              }
            },
            {
              key: "render",
              value: function render() {
                return React.createElement(
                  Component,
                  _extends({}, this._propsAnimated.__getValue(), {
                    ref: refName
                  })
                );
              }
            }
          ]);
          return AnimatedComponent;
        })(React.Component);

        AnimatedComponent.propTypes = {
          style: function style(props, propName, componentName) {
            if (!Component.propTypes) {
              return;
            }
          }
        };

        return AnimatedComponent;
      }

      module.exports = createAnimatedComponent;

      /***/
    },
    /* 54 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var _extends =
        Object.assign ||
        function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };

      var invariant = __webpack_require__(10);

      var Animated = __webpack_require__(1);
      var AnimatedValue = __webpack_require__(6);
      var AnimatedValueXY = __webpack_require__(45);
      var AnimatedAddition = __webpack_require__(38);
      var AnimatedMultiplication = __webpack_require__(40);
      var AnimatedModulo = __webpack_require__(39);
      var AnimatedTemplate = __webpack_require__(42);
      var AnimatedTracking = __webpack_require__(43);
      var isAnimated = __webpack_require__(55);

      var Animation = __webpack_require__(8);
      var TimingAnimation = __webpack_require__(51);
      var DecayAnimation = __webpack_require__(46);
      var SpringAnimation = __webpack_require__(49);

      var maybeVectorAnim = function maybeVectorAnim(value, config, anim) {
        if (value instanceof AnimatedValueXY) {
          var configX = _extends({}, config);
          var configY = _extends({}, config);
          for (var key in config) {
            var _config$key = config[key],
              x = _config$key.x,
              y = _config$key.y;
            if (x !== undefined && y !== undefined) {
              configX[key] = x;
              configY[key] = y;
            }
          }
          var aX = anim(value.x, configX);
          var aY = anim(value.y, configY);

          return parallel([aX, aY], { stopTogether: false });
        }
        return null;
      };

      var spring = function spring(value, config) {
        return (
          maybeVectorAnim(value, config, spring) || {
            start: function start(callback) {
              var singleValue = value;
              var singleConfig = config;
              singleValue.stopTracking();
              if (config.toValue instanceof Animated) {
                singleValue.track(
                  new AnimatedTracking(
                    singleValue,
                    config.toValue,
                    SpringAnimation,
                    singleConfig,
                    callback
                  )
                );
              } else {
                singleValue.animate(
                  new SpringAnimation(singleConfig),
                  callback
                );
              }
            },

            stop: function stop() {
              value.stopAnimation();
            }
          }
        );
      };

      var timing = function timing(value, config) {
        return (
          maybeVectorAnim(value, config, timing) || {
            start: function start(callback) {
              var singleValue = value;
              var singleConfig = config;
              singleValue.stopTracking();
              if (config.toValue instanceof Animated) {
                singleValue.track(
                  new AnimatedTracking(
                    singleValue,
                    config.toValue,
                    TimingAnimation,
                    singleConfig,
                    callback
                  )
                );
              } else {
                singleValue.animate(
                  new TimingAnimation(singleConfig),
                  callback
                );
              }
            },

            stop: function stop() {
              value.stopAnimation();
            }
          }
        );
      };

      var decay = function decay(value, config) {
        return (
          maybeVectorAnim(value, config, decay) || {
            start: function start(callback) {
              var singleValue = value;
              var singleConfig = config;
              singleValue.stopTracking();
              singleValue.animate(new DecayAnimation(singleConfig), callback);
            },

            stop: function stop() {
              value.stopAnimation();
            }
          }
        );
      };

      var sequence = function sequence(animations) {
        var current = 0;
        return {
          start: function start(callback) {
            var onComplete = function onComplete(result) {
              if (!result.finished) {
                callback && callback(result);
                return;
              }

              current++;

              if (current === animations.length) {
                callback && callback(result);
                return;
              }

              animations[current].start(onComplete);
            };

            if (animations.length === 0) {
              callback && callback({ finished: true });
            } else {
              animations[current].start(onComplete);
            }
          },

          stop: function stop() {
            if (current < animations.length) {
              animations[current].stop();
            }
          }
        };
      };

      var parallel = function parallel(animations, config) {
        var doneCount = 0;

        var hasEnded = {};
        var stopTogether = !(config && config.stopTogether === false);

        var result = {
          start: function start(callback) {
            if (doneCount === animations.length) {
              callback && callback({ finished: true });
              return;
            }

            animations.forEach(function(animation, idx) {
              var cb = function cb(endResult) {
                hasEnded[idx] = true;
                doneCount++;
                if (doneCount === animations.length) {
                  doneCount = 0;
                  callback && callback(endResult);
                  return;
                }

                if (!endResult.finished && stopTogether) {
                  result.stop();
                }
              };

              if (!animation) {
                cb({ finished: true });
              } else {
                animation.start(cb);
              }
            });
          },

          stop: function stop() {
            animations.forEach(function(animation, idx) {
              !hasEnded[idx] && animation.stop();
              hasEnded[idx] = true;
            });
          }
        };

        return result;
      };

      var delay = function delay(time) {
        return timing(new AnimatedValue(0), {
          toValue: 0,
          delay: time,
          duration: 0
        });
      };

      var stagger = function stagger(time, animations) {
        return parallel(
          animations.map(function(animation, i) {
            return sequence([delay(time * i), animation]);
          })
        );
      };

      var event = function event(argMapping, config) {
        return function() {
          for (
            var _len = arguments.length, args = Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key];
          }
          var traverse = function traverse(recMapping, recEvt, key) {
            if (typeof recEvt === "number") {
              invariant(
                recMapping instanceof AnimatedValue,
                "Bad mapping of type " +
                  typeof recMapping +
                  " for key " +
                  key +
                  ", event value must map to AnimatedValue"
              );

              recMapping.setValue(recEvt);
              return;
            }
            invariant(
              typeof recMapping === "object",
              "Bad mapping of type " + typeof recMapping + " for key " + key
            );

            invariant(
              typeof recEvt === "object",
              "Bad event of type " + typeof recEvt + " for key " + key
            );

            for (var key in recMapping) {
              traverse(recMapping[key], recEvt[key], key);
            }
          };
          argMapping.forEach(function(mapping, idx) {
            traverse(mapping, args[idx], "arg" + idx);
          });
          if (config && config.listener) {
            config.listener.apply(null, args);
          }
        };
      };

      module.exports = {
        Value: AnimatedValue,

        ValueXY: AnimatedValueXY,

        decay: decay,

        timing: timing,

        spring: spring,

        add: function add(a, b) {
          return new AnimatedAddition(a, b);
        },

        multiply: function multiply(a, b) {
          return new AnimatedMultiplication(a, b);
        },

        modulo: function modulo(a, modulus) {
          return new AnimatedModulo(a, modulus);
        },

        template: function template(strings) {
          for (
            var _len2 = arguments.length,
              values = Array(_len2 > 1 ? _len2 - 1 : 0),
              _key2 = 1;
            _key2 < _len2;
            _key2++
          ) {
            values[_key2 - 1] = arguments[_key2];
          }
          return new AnimatedTemplate(strings, values);
        },

        delay: delay,

        sequence: sequence,

        parallel: parallel,

        stagger: stagger,

        event: event,

        isAnimated: isAnimated,

        createAnimatedComponent: __webpack_require__(53),

        inject: {
          ApplyAnimatedValues: __webpack_require__(23).inject,
          InteractionManager: __webpack_require__(25).inject,
          FlattenStyle: __webpack_require__(24).inject,
          RequestAnimationFrame: __webpack_require__(13).inject,
          CancelAnimationFrame: __webpack_require__(12).inject
        },

        __PropsOnlyForTests: __webpack_require__(22)
      };

      /***/
    },
    /* 55 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      var Animated = __webpack_require__(1);

      function isAnimated(obj) {
        return obj instanceof Animated;
      }

      module.exports = isAnimated;

      /***/
    },
    /* 56 */
    /***/ function(module, exports) {
      /*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

      function normalizeColor(color) {
        var match;

        if (typeof color === "number") {
          if (color >>> 0 === color && color >= 0 && color <= 0xffffffff) {
            return color;
          }
          return null;
        }

        // Ordered based on occurrences on Facebook codebase
        if ((match = matchers.hex6.exec(color))) {
          return parseInt(match[1] + "ff", 16) >>> 0;
        }

        if (names.hasOwnProperty(color)) {
          return names[color];
        }

        if ((match = matchers.rgb.exec(color))) {
          return (
            ((parse255(match[1]) << 24) | // r
            (parse255(match[2]) << 16) | // g
            (parse255(match[3]) << 8) | // b
              0x000000ff) >>> // a
            0
          );
        }

        if ((match = matchers.rgba.exec(color))) {
          return (
            ((parse255(match[1]) << 24) | // r
            (parse255(match[2]) << 16) | // g
            (parse255(match[3]) << 8) | // b
              parse1(match[4])) >>> // a
            0
          );
        }

        if ((match = matchers.hex3.exec(color))) {
          return (
            parseInt(
              match[1] +
              match[1] + // r
              match[2] +
              match[2] + // g
              match[3] +
              match[3] + // b
                "ff", // a
              16
            ) >>> 0
          );
        }

        // https://drafts.csswg.org/css-color-4/#hex-notation
        if ((match = matchers.hex8.exec(color))) {
          return parseInt(match[1], 16) >>> 0;
        }

        if ((match = matchers.hex4.exec(color))) {
          return (
            parseInt(
              match[1] +
              match[1] + // r
              match[2] +
              match[2] + // g
              match[3] +
              match[3] + // b
                match[4] +
                match[4], // a
              16
            ) >>> 0
          );
        }

        if ((match = matchers.hsl.exec(color))) {
          return (
            (hslToRgb(
              parse360(match[1]), // h
              parsePercentage(match[2]), // s
              parsePercentage(match[3]) // l
            ) |
              0x000000ff) >>> // a
            0
          );
        }

        if ((match = matchers.hsla.exec(color))) {
          return (
            (hslToRgb(
              parse360(match[1]), // h
              parsePercentage(match[2]), // s
              parsePercentage(match[3]) // l
            ) |
              parse1(match[4])) >>> // a
            0
          );
        }

        return null;
      }

      function hue2rgb(p, q, t) {
        if (t < 0) {
          t += 1;
        }
        if (t > 1) {
          t -= 1;
        }
        if (t < 1 / 6) {
          return p + (q - p) * 6 * t;
        }
        if (t < 1 / 2) {
          return q;
        }
        if (t < 2 / 3) {
          return p + (q - p) * (2 / 3 - t) * 6;
        }
        return p;
      }

      function hslToRgb(h, s, l) {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        var r = hue2rgb(p, q, h + 1 / 3);
        var g = hue2rgb(p, q, h);
        var b = hue2rgb(p, q, h - 1 / 3);

        return (
          (Math.round(r * 255) << 24) |
          (Math.round(g * 255) << 16) |
          (Math.round(b * 255) << 8)
        );
      }

      // var INTEGER = '[-+]?\\d+';
      var NUMBER = "[-+]?\\d*\\.?\\d+";
      var PERCENTAGE = NUMBER + "%";

      function toArray(arrayLike) {
        return Array.prototype.slice.call(arrayLike, 0);
      }

      function call() {
        return "\\(\\s*(" + toArray(arguments).join(")\\s*,\\s*(") + ")\\s*\\)";
      }

      var matchers = {
        rgb: new RegExp("rgb" + call(NUMBER, NUMBER, NUMBER)),
        rgba: new RegExp("rgba" + call(NUMBER, NUMBER, NUMBER, NUMBER)),
        hsl: new RegExp("hsl" + call(NUMBER, PERCENTAGE, PERCENTAGE)),
        hsla: new RegExp("hsla" + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER)),
        hex3: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex4: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#([0-9a-fA-F]{6})$/,
        hex8: /^#([0-9a-fA-F]{8})$/
      };

      function parse255(str) {
        var int = parseInt(str, 10);
        if (int < 0) {
          return 0;
        }
        if (int > 255) {
          return 255;
        }
        return int;
      }

      function parse360(str) {
        var int = parseFloat(str);
        return (int % 360 + 360) % 360 / 360;
      }

      function parse1(str) {
        var num = parseFloat(str);
        if (num < 0) {
          return 0;
        }
        if (num > 1) {
          return 255;
        }
        return Math.round(num * 255);
      }

      function parsePercentage(str) {
        // parseFloat conveniently ignores the final %
        var int = parseFloat(str, 10);
        if (int < 0) {
          return 0;
        }
        if (int > 100) {
          return 1;
        }
        return int / 100;
      }

      var names = {
        transparent: 0x00000000,

        // http://www.w3.org/TR/css3-color/#svg-color
        aliceblue: 0xf0f8ffff,
        antiquewhite: 0xfaebd7ff,
        aqua: 0x00ffffff,
        aquamarine: 0x7fffd4ff,
        azure: 0xf0ffffff,
        beige: 0xf5f5dcff,
        bisque: 0xffe4c4ff,
        black: 0x000000ff,
        blanchedalmond: 0xffebcdff,
        blue: 0x0000ffff,
        blueviolet: 0x8a2be2ff,
        brown: 0xa52a2aff,
        burlywood: 0xdeb887ff,
        burntsienna: 0xea7e5dff,
        cadetblue: 0x5f9ea0ff,
        chartreuse: 0x7fff00ff,
        chocolate: 0xd2691eff,
        coral: 0xff7f50ff,
        cornflowerblue: 0x6495edff,
        cornsilk: 0xfff8dcff,
        crimson: 0xdc143cff,
        cyan: 0x00ffffff,
        darkblue: 0x00008bff,
        darkcyan: 0x008b8bff,
        darkgoldenrod: 0xb8860bff,
        darkgray: 0xa9a9a9ff,
        darkgreen: 0x006400ff,
        darkgrey: 0xa9a9a9ff,
        darkkhaki: 0xbdb76bff,
        darkmagenta: 0x8b008bff,
        darkolivegreen: 0x556b2fff,
        darkorange: 0xff8c00ff,
        darkorchid: 0x9932ccff,
        darkred: 0x8b0000ff,
        darksalmon: 0xe9967aff,
        darkseagreen: 0x8fbc8fff,
        darkslateblue: 0x483d8bff,
        darkslategray: 0x2f4f4fff,
        darkslategrey: 0x2f4f4fff,
        darkturquoise: 0x00ced1ff,
        darkviolet: 0x9400d3ff,
        deeppink: 0xff1493ff,
        deepskyblue: 0x00bfffff,
        dimgray: 0x696969ff,
        dimgrey: 0x696969ff,
        dodgerblue: 0x1e90ffff,
        firebrick: 0xb22222ff,
        floralwhite: 0xfffaf0ff,
        forestgreen: 0x228b22ff,
        fuchsia: 0xff00ffff,
        gainsboro: 0xdcdcdcff,
        ghostwhite: 0xf8f8ffff,
        gold: 0xffd700ff,
        goldenrod: 0xdaa520ff,
        gray: 0x808080ff,
        green: 0x008000ff,
        greenyellow: 0xadff2fff,
        grey: 0x808080ff,
        honeydew: 0xf0fff0ff,
        hotpink: 0xff69b4ff,
        indianred: 0xcd5c5cff,
        indigo: 0x4b0082ff,
        ivory: 0xfffff0ff,
        khaki: 0xf0e68cff,
        lavender: 0xe6e6faff,
        lavenderblush: 0xfff0f5ff,
        lawngreen: 0x7cfc00ff,
        lemonchiffon: 0xfffacdff,
        lightblue: 0xadd8e6ff,
        lightcoral: 0xf08080ff,
        lightcyan: 0xe0ffffff,
        lightgoldenrodyellow: 0xfafad2ff,
        lightgray: 0xd3d3d3ff,
        lightgreen: 0x90ee90ff,
        lightgrey: 0xd3d3d3ff,
        lightpink: 0xffb6c1ff,
        lightsalmon: 0xffa07aff,
        lightseagreen: 0x20b2aaff,
        lightskyblue: 0x87cefaff,
        lightslategray: 0x778899ff,
        lightslategrey: 0x778899ff,
        lightsteelblue: 0xb0c4deff,
        lightyellow: 0xffffe0ff,
        lime: 0x00ff00ff,
        limegreen: 0x32cd32ff,
        linen: 0xfaf0e6ff,
        magenta: 0xff00ffff,
        maroon: 0x800000ff,
        mediumaquamarine: 0x66cdaaff,
        mediumblue: 0x0000cdff,
        mediumorchid: 0xba55d3ff,
        mediumpurple: 0x9370dbff,
        mediumseagreen: 0x3cb371ff,
        mediumslateblue: 0x7b68eeff,
        mediumspringgreen: 0x00fa9aff,
        mediumturquoise: 0x48d1ccff,
        mediumvioletred: 0xc71585ff,
        midnightblue: 0x191970ff,
        mintcream: 0xf5fffaff,
        mistyrose: 0xffe4e1ff,
        moccasin: 0xffe4b5ff,
        navajowhite: 0xffdeadff,
        navy: 0x000080ff,
        oldlace: 0xfdf5e6ff,
        olive: 0x808000ff,
        olivedrab: 0x6b8e23ff,
        orange: 0xffa500ff,
        orangered: 0xff4500ff,
        orchid: 0xda70d6ff,
        palegoldenrod: 0xeee8aaff,
        palegreen: 0x98fb98ff,
        paleturquoise: 0xafeeeeff,
        palevioletred: 0xdb7093ff,
        papayawhip: 0xffefd5ff,
        peachpuff: 0xffdab9ff,
        peru: 0xcd853fff,
        pink: 0xffc0cbff,
        plum: 0xdda0ddff,
        powderblue: 0xb0e0e6ff,
        purple: 0x800080ff,
        rebeccapurple: 0x663399ff,
        red: 0xff0000ff,
        rosybrown: 0xbc8f8fff,
        royalblue: 0x4169e1ff,
        saddlebrown: 0x8b4513ff,
        salmon: 0xfa8072ff,
        sandybrown: 0xf4a460ff,
        seagreen: 0x2e8b57ff,
        seashell: 0xfff5eeff,
        sienna: 0xa0522dff,
        silver: 0xc0c0c0ff,
        skyblue: 0x87ceebff,
        slateblue: 0x6a5acdff,
        slategray: 0x708090ff,
        slategrey: 0x708090ff,
        snow: 0xfffafaff,
        springgreen: 0x00ff7fff,
        steelblue: 0x4682b4ff,
        tan: 0xd2b48cff,
        teal: 0x008080ff,
        thistle: 0xd8bfd8ff,
        tomato: 0xff6347ff,
        turquoise: 0x40e0d0ff,
        violet: 0xee82eeff,
        wheat: 0xf5deb3ff,
        white: 0xffffffff,
        whitesmoke: 0xf5f5f5ff,
        yellow: 0xffff00ff,
        yellowgreen: 0x9acd32ff
      };

      function rgba(colorInt) {
        var r = Math.round((colorInt & 0xff000000) >>> 24);
        var g = Math.round((colorInt & 0x00ff0000) >>> 16);
        var b = Math.round((colorInt & 0x0000ff00) >>> 8);
        var a = ((colorInt & 0x000000ff) >>> 0) / 255;
        return {
          r: r,
          g: g,
          b: b,
          a: a
        };
      }

      normalizeColor.rgba = rgba;

      module.exports = normalizeColor;

      /***/
    },
    /* 57 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule react-native-implementation
 * @noflow - get/set properties not yet supported by flow. also `...require(x)` is broken #6560135
 */

      const invariant = __webpack_require__(4);
      const warning = __webpack_require__(2);

      if (__DEV__) {
        var warningDedupe = {};
        var addonWarn = function(prevName, newPackageName) {
          warning(
            warningDedupe[prevName],
            "React.addons." +
              prevName +
              ' is deprecated. Please import the "' +
              newPackageName +
              '" package instead.'
          );
          warningDedupe[prevName] = true;
        };
      }

      // Export React, plus some native additions.
      const ReactNative = {
        // Components
        get AccessibilityInfo() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "AccessibilityInfo"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get ActivityIndicator() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "ActivityIndicator"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get ART() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "ReactNativeART"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Button() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Button"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get DatePickerIOS() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "DatePickerIOS"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get DrawerLayoutAndroid() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "DrawerLayoutAndroid"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get FlatList() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "FlatList"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Image() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Image"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get ImageEditor() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "ImageEditor"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get ImageStore() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "ImageStore"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get KeyboardAvoidingView() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "KeyboardAvoidingView"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get ListView() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "ListView"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Modal() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Modal"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get NavigatorIOS() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "NavigatorIOS"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Picker() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Picker"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get PickerIOS() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "PickerIOS"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get ProgressBarAndroid() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "ProgressBarAndroid"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get ProgressViewIOS() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "ProgressViewIOS"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get ScrollView() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "ScrollView"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get SectionList() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "SectionList"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get SegmentedControlIOS() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "SegmentedControlIOS"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Slider() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Slider"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get SnapshotViewIOS() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "SnapshotViewIOS"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Switch() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Switch"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get RefreshControl() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "RefreshControl"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get StatusBar() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "StatusBar"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get SwipeableListView() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "SwipeableListView"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get TabBarIOS() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "TabBarIOS"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Text() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Text"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get TextInput() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "TextInput"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get ToastAndroid() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "ToastAndroid"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get ToolbarAndroid() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "ToolbarAndroid"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Touchable() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Touchable"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get TouchableHighlight() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "TouchableHighlight"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get TouchableNativeFeedback() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "TouchableNativeFeedback"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get TouchableOpacity() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "TouchableOpacity"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get TouchableWithoutFeedback() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error(
                'Cannot find module "TouchableWithoutFeedback"'
              );
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get View() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "View"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get ViewPagerAndroid() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "ViewPagerAndroid"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get VirtualizedList() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "VirtualizedList"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get WebView() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "WebView"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },

        // APIs
        get ActionSheetIOS() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "ActionSheetIOS"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get AdSupportIOS() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "AdSupportIOS"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Alert() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Alert"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get AlertIOS() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "AlertIOS"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Animated() {
          return __webpack_require__(54);
        },
        get AppRegistry() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "AppRegistry"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get AppState() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "AppState"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get AsyncStorage() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "AsyncStorage"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get BackAndroid() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "BackAndroid"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        }, // deprecated: use BackHandler instead
        get BackHandler() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "BackHandler"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get CameraRoll() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "CameraRoll"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Clipboard() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Clipboard"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get DatePickerAndroid() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "DatePickerAndroid"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get DeviceInfo() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "DeviceInfo"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Dimensions() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Dimensions"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Easing() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Easing"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get I18nManager() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "I18nManager"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get ImagePickerIOS() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "ImagePickerIOS"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get InteractionManager() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "InteractionManager"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Keyboard() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Keyboard"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get LayoutAnimation() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "LayoutAnimation"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Linking() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Linking"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get NativeEventEmitter() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "NativeEventEmitter"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get NetInfo() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "NetInfo"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get PanResponder() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "PanResponder"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get PermissionsAndroid() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "PermissionsAndroid"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get PixelRatio() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "PixelRatio"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get PushNotificationIOS() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "PushNotificationIOS"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Settings() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Settings"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Share() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Share"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get StatusBarIOS() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "StatusBarIOS"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get StyleSheet() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "StyleSheet"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Systrace() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Systrace"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get TimePickerAndroid() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "TimePickerAndroid"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get TVEventHandler() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "TVEventHandler"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get UIManager() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "UIManager"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Vibration() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Vibration"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get VibrationIOS() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "VibrationIOS"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },

        // Plugins
        get DeviceEventEmitter() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "RCTDeviceEventEmitter"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get NativeAppEventEmitter() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error(
                'Cannot find module "RCTNativeAppEventEmitter"'
              );
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get NativeModules() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "NativeModules"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get Platform() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "Platform"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get processColor() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "processColor"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get requireNativeComponent() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "requireNativeComponent"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },

        // Prop Types
        get ColorPropType() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "ColorPropType"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get EdgeInsetsPropType() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "EdgeInsetsPropType"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get PointPropType() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "PointPropType"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },
        get ViewPropTypes() {
          return __webpack_require__(
            !(function webpackMissingModule() {
              var e = new Error('Cannot find module "ViewPropTypes"');
              e.code = "MODULE_NOT_FOUND";
              throw e;
            })()
          );
        },

        // Deprecated
        get Navigator() {
          invariant(
            false,
            "Navigator is deprecated and has been removed from this package. It can now be installed " +
              "and imported from `react-native-deprecated-custom-components` instead of `react-native`. " +
              "Learn about alternative navigation solutions at http://facebook.github.io/react-native/docs/navigation.html"
          );
          return null;
        }
      };

      // Better error messages when accessing React APIs on ReactNative
      if (__DEV__) {
        const throwOnWrongReactAPI = __webpack_require__(
          !(function webpackMissingModule() {
            var e = new Error('Cannot find module "throwOnWrongReactAPI"');
            e.code = "MODULE_NOT_FOUND";
            throw e;
          })()
        );
        const reactAPIs = ["createClass", "Component"];

        for (const key of reactAPIs) {
          Object.defineProperty(ReactNative, key, {
            get() {
              throwOnWrongReactAPI(key);
            },
            enumerable: false,
            configurable: false
          });
        }
      }

      // Preserve getters with warnings on the internal ReactNative copy without
      // invoking them.
      const ReactNativeInternal = __webpack_require__(
        !(function webpackMissingModule() {
          var e = new Error('Cannot find module "ReactNative"');
          e.code = "MODULE_NOT_FOUND";
          throw e;
        })()
      );
      function applyForwarding(key) {
        if (__DEV__) {
          Object.defineProperty(
            ReactNative,
            key,
            Object.getOwnPropertyDescriptor(ReactNativeInternal, key)
          );
          return;
        }
        ReactNative[key] = ReactNativeInternal[key];
      }
      for (const key in ReactNativeInternal) {
        applyForwarding(key);
      }
      module.exports = ReactNative;

      /***/
    },
    /* 58 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

      /**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

      function escape(key) {
        var escapeRegex = /[=:]/g;
        var escaperLookup = {
          "=": "=0",
          ":": "=2"
        };
        var escapedString = ("" + key).replace(escapeRegex, function(match) {
          return escaperLookup[match];
        });

        return "$" + escapedString;
      }

      /**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
      function unescape(key) {
        var unescapeRegex = /(=0|=2)/g;
        var unescaperLookup = {
          "=0": "=",
          "=2": ":"
        };
        var keySubstring = key[0] === "." && key[1] === "$"
          ? key.substring(2)
          : key.substring(1);

        return ("" + keySubstring).replace(unescapeRegex, function(match) {
          return unescaperLookup[match];
        });
      }

      var KeyEscapeUtils = {
        escape: escape,
        unescape: unescape
      };

      module.exports = KeyEscapeUtils;

      /***/
    },
    /* 59 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

        var _prodInvariant = __webpack_require__(5);

        var invariant = __webpack_require__(4);

        /**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
        var oneArgumentPooler = function(copyFieldsFrom) {
          var Klass = this;
          if (Klass.instancePool.length) {
            var instance = Klass.instancePool.pop();
            Klass.call(instance, copyFieldsFrom);
            return instance;
          } else {
            return new Klass(copyFieldsFrom);
          }
        };

        var twoArgumentPooler = function(a1, a2) {
          var Klass = this;
          if (Klass.instancePool.length) {
            var instance = Klass.instancePool.pop();
            Klass.call(instance, a1, a2);
            return instance;
          } else {
            return new Klass(a1, a2);
          }
        };

        var threeArgumentPooler = function(a1, a2, a3) {
          var Klass = this;
          if (Klass.instancePool.length) {
            var instance = Klass.instancePool.pop();
            Klass.call(instance, a1, a2, a3);
            return instance;
          } else {
            return new Klass(a1, a2, a3);
          }
        };

        var fourArgumentPooler = function(a1, a2, a3, a4) {
          var Klass = this;
          if (Klass.instancePool.length) {
            var instance = Klass.instancePool.pop();
            Klass.call(instance, a1, a2, a3, a4);
            return instance;
          } else {
            return new Klass(a1, a2, a3, a4);
          }
        };

        var standardReleaser = function(instance) {
          var Klass = this;
          !(instance instanceof Klass)
            ? process.env.NODE_ENV !== "production"
              ? invariant(
                  false,
                  "Trying to release an instance into a pool of a different type."
                )
              : _prodInvariant("25")
            : void 0;
          instance.destructor();
          if (Klass.instancePool.length < Klass.poolSize) {
            Klass.instancePool.push(instance);
          }
        };

        var DEFAULT_POOL_SIZE = 10;
        var DEFAULT_POOLER = oneArgumentPooler;

        /**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
        var addPoolingTo = function(CopyConstructor, pooler) {
          // Casting as any so that flow ignores the actual implementation and trusts
          // it to match the type we declared
          var NewKlass = CopyConstructor;
          NewKlass.instancePool = [];
          NewKlass.getPooled = pooler || DEFAULT_POOLER;
          if (!NewKlass.poolSize) {
            NewKlass.poolSize = DEFAULT_POOL_SIZE;
          }
          NewKlass.release = standardReleaser;
          return NewKlass;
        };

        var PooledClass = {
          addPoolingTo: addPoolingTo,
          oneArgumentPooler: oneArgumentPooler,
          twoArgumentPooler: twoArgumentPooler,
          threeArgumentPooler: threeArgumentPooler,
          fourArgumentPooler: fourArgumentPooler
        };

        module.exports = PooledClass;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 60 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

        var ReactBaseClasses = __webpack_require__(27);
        var ReactChildren = __webpack_require__(61);
        var ReactClass = __webpack_require__(62);
        var ReactDOMFactories = __webpack_require__(63);
        var ReactElement = __webpack_require__(7);
        var ReactPropTypes = __webpack_require__(64);
        var ReactVersion = __webpack_require__(66);

        var onlyChild = __webpack_require__(68);
        var warning = __webpack_require__(2);
        var checkPropTypes = __webpack_require__(35);

        var createElement = ReactElement.createElement;
        var createFactory = ReactElement.createFactory;
        var cloneElement = ReactElement.cloneElement;

        if (process.env.NODE_ENV !== "production") {
          var ReactElementValidator = __webpack_require__(31);
          createElement = ReactElementValidator.createElement;
          createFactory = ReactElementValidator.createFactory;
          cloneElement = ReactElementValidator.cloneElement;
        }

        var createMixin = function(mixin) {
          return mixin;
        };

        if (process.env.NODE_ENV !== "production") {
          var warnedForCreateMixin = false;

          createMixin = function(mixin) {
            process.env.NODE_ENV !== "production"
              ? warning(
                  warnedForCreateMixin,
                  "React.createMixin is deprecated and should not be used. You " +
                    "can use this mixin directly instead."
                )
              : void 0;
            warnedForCreateMixin = true;
            return mixin;
          };
        }

        var React = {
          // Modern

          Children: {
            map: ReactChildren.map,
            forEach: ReactChildren.forEach,
            count: ReactChildren.count,
            toArray: ReactChildren.toArray,
            only: onlyChild
          },

          Component: ReactBaseClasses.Component,
          PureComponent: ReactBaseClasses.PureComponent,

          createElement: createElement,
          cloneElement: cloneElement,
          isValidElement: ReactElement.isValidElement,

          checkPropTypes: checkPropTypes,

          // Classic

          PropTypes: ReactPropTypes,
          createClass: ReactClass.createClass,
          createFactory: createFactory,
          createMixin: createMixin,

          // This looks DOM specific but these are actually isomorphic helpers
          // since they are just generating DOM strings.
          DOM: ReactDOMFactories,

          version: ReactVersion
        };

        module.exports = React;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 61 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

      var PooledClass = __webpack_require__(59);
      var ReactElement = __webpack_require__(7);

      var emptyFunction = __webpack_require__(16);
      var traverseAllChildren = __webpack_require__(69);

      var twoArgumentPooler = PooledClass.twoArgumentPooler;
      var fourArgumentPooler = PooledClass.fourArgumentPooler;

      var userProvidedKeyEscapeRegex = /\/+/g;
      function escapeUserProvidedKey(text) {
        return ("" + text).replace(userProvidedKeyEscapeRegex, "$&/");
      }

      /**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
      function ForEachBookKeeping(forEachFunction, forEachContext) {
        this.func = forEachFunction;
        this.context = forEachContext;
        this.count = 0;
      }
      ForEachBookKeeping.prototype.destructor = function() {
        this.func = null;
        this.context = null;
        this.count = 0;
      };
      PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

      function forEachSingleChild(bookKeeping, child, name) {
        var func = bookKeeping.func,
          context = bookKeeping.context;

        func.call(context, child, bookKeeping.count++);
      }

      /**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
      function forEachChildren(children, forEachFunc, forEachContext) {
        if (children == null) {
          return children;
        }
        var traverseContext = ForEachBookKeeping.getPooled(
          forEachFunc,
          forEachContext
        );
        traverseAllChildren(children, forEachSingleChild, traverseContext);
        ForEachBookKeeping.release(traverseContext);
      }

      /**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
      function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
        this.result = mapResult;
        this.keyPrefix = keyPrefix;
        this.func = mapFunction;
        this.context = mapContext;
        this.count = 0;
      }
      MapBookKeeping.prototype.destructor = function() {
        this.result = null;
        this.keyPrefix = null;
        this.func = null;
        this.context = null;
        this.count = 0;
      };
      PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

      function mapSingleChildIntoContext(bookKeeping, child, childKey) {
        var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context;

        var mappedChild = func.call(context, child, bookKeeping.count++);
        if (Array.isArray(mappedChild)) {
          mapIntoWithKeyPrefixInternal(
            mappedChild,
            result,
            childKey,
            emptyFunction.thatReturnsArgument
          );
        } else if (mappedChild != null) {
          if (ReactElement.isValidElement(mappedChild)) {
            mappedChild = ReactElement.cloneAndReplaceKey(
              mappedChild,
              // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              keyPrefix +
                (mappedChild.key && (!child || child.key !== mappedChild.key)
                  ? escapeUserProvidedKey(mappedChild.key) + "/"
                  : "") +
                childKey
            );
          }
          result.push(mappedChild);
        }
      }

      function mapIntoWithKeyPrefixInternal(
        children,
        array,
        prefix,
        func,
        context
      ) {
        var escapedPrefix = "";
        if (prefix != null) {
          escapedPrefix = escapeUserProvidedKey(prefix) + "/";
        }
        var traverseContext = MapBookKeeping.getPooled(
          array,
          escapedPrefix,
          func,
          context
        );
        traverseAllChildren(
          children,
          mapSingleChildIntoContext,
          traverseContext
        );
        MapBookKeeping.release(traverseContext);
      }

      /**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
      function mapChildren(children, func, context) {
        if (children == null) {
          return children;
        }
        var result = [];
        mapIntoWithKeyPrefixInternal(children, result, null, func, context);
        return result;
      }

      function forEachSingleChildDummy(traverseContext, child, name) {
        return null;
      }

      /**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
      function countChildren(children, context) {
        return traverseAllChildren(children, forEachSingleChildDummy, null);
      }

      /**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.toarray
 */
      function toArray(children) {
        var result = [];
        mapIntoWithKeyPrefixInternal(
          children,
          result,
          null,
          emptyFunction.thatReturnsArgument
        );
        return result;
      }

      var ReactChildren = {
        forEach: forEachChildren,
        map: mapChildren,
        mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
        count: countChildren,
        toArray: toArray
      };

      module.exports = ReactChildren;

      /***/
    },
    /* 62 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

        var _assign = __webpack_require__(17),
          _prodInvariant = __webpack_require__(5);

        var ReactBaseClasses = __webpack_require__(27);
        var ReactElement = __webpack_require__(7);
        var ReactNoopUpdateQueue = __webpack_require__(33);

        var emptyObject = __webpack_require__(26);
        var invariant = __webpack_require__(4);
        var warning = __webpack_require__(2);

        var ReactComponent = ReactBaseClasses.Component;

        var MIXINS_KEY = "mixins";

        // Helper function to allow the creation of anonymous functions which do not
        // have .name set to the name of the variable being assigned to.
        function identity(fn) {
          return fn;
        }

        /**
 * Policies that describe methods in `ReactClassInterface`.
 */

        /**
 * Composite components are higher-level components that compose other composite
 * or host components.
 *
 * To create a new type of `ReactClass`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactClassInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will be available on the prototype.
 *
 * @interface ReactClassInterface
 * @internal
 */
        var ReactClassInterface = {
          /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */
          mixins: "DEFINE_MANY",

          /**
   * An object containing properties and methods that should be defined on
   * the component's constructor instead of its prototype (static methods).
   *
   * @type {object}
   * @optional
   */
          statics: "DEFINE_MANY",

          /**
   * Definition of prop types for this component.
   *
   * @type {object}
   * @optional
   */
          propTypes: "DEFINE_MANY",

          /**
   * Definition of context types for this component.
   *
   * @type {object}
   * @optional
   */
          contextTypes: "DEFINE_MANY",

          /**
   * Definition of context types this component sets for its children.
   *
   * @type {object}
   * @optional
   */
          childContextTypes: "DEFINE_MANY",

          // ==== Definition methods ====

          /**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   *
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   *
   * @return {object}
   * @optional
   */
          getDefaultProps: "DEFINE_MANY_MERGED",

          /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   *
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */
          getInitialState: "DEFINE_MANY_MERGED",

          /**
   * @return {object}
   * @optional
   */
          getChildContext: "DEFINE_MANY_MERGED",

          /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @required
   */
          render: "DEFINE_ONCE",

          // ==== Delegate methods ====

          /**
   * Invoked when the component is initially created and about to be mounted.
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   *
   * @optional
   */
          componentWillMount: "DEFINE_MANY",

          /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   *
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
          componentDidMount: "DEFINE_MANY",

          /**
   * Invoked before the component receives new props.
   *
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   *
   *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   *
   * @param {object} nextProps
   * @optional
   */
          componentWillReceiveProps: "DEFINE_MANY",

          /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props, state and/or context.
   *
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props/state/context will not require a component
   * update.
   *
   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @return {boolean} True if the component should update.
   * @optional
   */
          shouldComponentUpdate: "DEFINE_ONCE",

          /**
   * Invoked when the component is about to update due to a transition from
   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
   * and `nextContext`.
   *
   * Use this as an opportunity to perform preparation before an update occurs.
   *
   * NOTE: You **cannot** use `this.setState()` in this method.
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */
          componentWillUpdate: "DEFINE_MANY",

          /**
   * Invoked when the component's DOM representation has been updated.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   *
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {?object} prevContext
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
          componentDidUpdate: "DEFINE_MANY",

          /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   *
   * Use this as an opportunity to deallocate any external resources.
   *
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   *
   * @optional
   */
          componentWillUnmount: "DEFINE_MANY",

          // ==== Advanced methods ====

          /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */
          updateComponent: "OVERRIDE_BASE"
        };

        /**
 * Mapping from class specification keys to special processing functions.
 *
 * Although these are declared like instance properties in the specification
 * when defining classes using `React.createClass`, they are actually static
 * and are accessible on the constructor instead of the prototype. Despite
 * being static, they must be defined outside of the "statics" key under
 * which all other static methods are defined.
 */
        var RESERVED_SPEC_KEYS = {
          displayName: function(Constructor, displayName) {
            Constructor.displayName = displayName;
          },
          mixins: function(Constructor, mixins) {
            if (mixins) {
              for (var i = 0; i < mixins.length; i++) {
                mixSpecIntoComponent(Constructor, mixins[i]);
              }
            }
          },
          childContextTypes: function(Constructor, childContextTypes) {
            if (process.env.NODE_ENV !== "production") {
              validateTypeDef(Constructor, childContextTypes, "child context");
            }
            Constructor.childContextTypes = _assign(
              {},
              Constructor.childContextTypes,
              childContextTypes
            );
          },
          contextTypes: function(Constructor, contextTypes) {
            if (process.env.NODE_ENV !== "production") {
              validateTypeDef(Constructor, contextTypes, "context");
            }
            Constructor.contextTypes = _assign(
              {},
              Constructor.contextTypes,
              contextTypes
            );
          },
          /**
   * Special case getDefaultProps which should move into statics but requires
   * automatic merging.
   */
          getDefaultProps: function(Constructor, getDefaultProps) {
            if (Constructor.getDefaultProps) {
              Constructor.getDefaultProps = createMergedResultFunction(
                Constructor.getDefaultProps,
                getDefaultProps
              );
            } else {
              Constructor.getDefaultProps = getDefaultProps;
            }
          },
          propTypes: function(Constructor, propTypes) {
            if (process.env.NODE_ENV !== "production") {
              validateTypeDef(Constructor, propTypes, "prop");
            }
            Constructor.propTypes = _assign(
              {},
              Constructor.propTypes,
              propTypes
            );
          },
          statics: function(Constructor, statics) {
            mixStaticSpecIntoComponent(Constructor, statics);
          },
          autobind: function() {}
        };

        function validateTypeDef(Constructor, typeDef, location) {
          for (var propName in typeDef) {
            if (typeDef.hasOwnProperty(propName)) {
              // use a warning instead of an invariant so components
              // don't show up in prod but only in __DEV__
              process.env.NODE_ENV !== "production"
                ? warning(
                    typeof typeDef[propName] === "function",
                    "%s: %s type `%s` is invalid; it must be a function, usually from " +
                      "React.PropTypes.",
                    Constructor.displayName || "ReactClass",
                    location,
                    propName
                  )
                : void 0;
            }
          }
        }

        function validateMethodOverride(isAlreadyDefined, name) {
          var specPolicy = ReactClassInterface.hasOwnProperty(name)
            ? ReactClassInterface[name]
            : null;

          // Disallow overriding of base class methods unless explicitly allowed.
          if (ReactClassMixin.hasOwnProperty(name)) {
            !(specPolicy === "OVERRIDE_BASE")
              ? process.env.NODE_ENV !== "production"
                ? invariant(
                    false,
                    "ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.",
                    name
                  )
                : _prodInvariant("73", name)
              : void 0;
          }

          // Disallow defining methods more than once unless explicitly allowed.
          if (isAlreadyDefined) {
            !(
              specPolicy === "DEFINE_MANY" ||
              specPolicy === "DEFINE_MANY_MERGED"
            )
              ? process.env.NODE_ENV !== "production"
                ? invariant(
                    false,
                    "ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",
                    name
                  )
                : _prodInvariant("74", name)
              : void 0;
          }
        }

        /**
 * Mixin helper which handles policy validation and reserved
 * specification keys when building React classes.
 */
        function mixSpecIntoComponent(Constructor, spec) {
          if (!spec) {
            if (process.env.NODE_ENV !== "production") {
              var typeofSpec = typeof spec;
              var isMixinValid = typeofSpec === "object" && spec !== null;

              process.env.NODE_ENV !== "production"
                ? warning(
                    isMixinValid,
                    "%s: You're attempting to include a mixin that is either null " +
                      "or not an object. Check the mixins included by the component, " +
                      "as well as any mixins they include themselves. " +
                      "Expected object but got %s.",
                    Constructor.displayName || "ReactClass",
                    spec === null ? null : typeofSpec
                  )
                : void 0;
            }

            return;
          }

          !(typeof spec !== "function")
            ? process.env.NODE_ENV !== "production"
              ? invariant(
                  false,
                  "ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."
                )
              : _prodInvariant("75")
            : void 0;
          !!ReactElement.isValidElement(spec)
            ? process.env.NODE_ENV !== "production"
              ? invariant(
                  false,
                  "ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object."
                )
              : _prodInvariant("76")
            : void 0;

          var proto = Constructor.prototype;
          var autoBindPairs = proto.__reactAutoBindPairs;

          // By handling mixins before any other properties, we ensure the same
          // chaining order is applied to methods with DEFINE_MANY policy, whether
          // mixins are listed before or after these methods in the spec.
          if (spec.hasOwnProperty(MIXINS_KEY)) {
            RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
          }

          for (var name in spec) {
            if (!spec.hasOwnProperty(name)) {
              continue;
            }

            if (name === MIXINS_KEY) {
              // We have already handled mixins in a special case above.
              continue;
            }

            var property = spec[name];
            var isAlreadyDefined = proto.hasOwnProperty(name);
            validateMethodOverride(isAlreadyDefined, name);

            if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
              RESERVED_SPEC_KEYS[name](Constructor, property);
            } else {
              // Setup methods on prototype:
              // The following member methods should not be automatically bound:
              // 1. Expected ReactClass methods (in the "interface").
              // 2. Overridden methods (that were mixed in).
              var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
              var isFunction = typeof property === "function";
              var shouldAutoBind =
                isFunction &&
                !isReactClassMethod &&
                !isAlreadyDefined &&
                spec.autobind !== false;

              if (shouldAutoBind) {
                autoBindPairs.push(name, property);
                proto[name] = property;
              } else {
                if (isAlreadyDefined) {
                  var specPolicy = ReactClassInterface[name];

                  // These cases should already be caught by validateMethodOverride.
                  !(
                    isReactClassMethod &&
                    (specPolicy === "DEFINE_MANY_MERGED" ||
                      specPolicy === "DEFINE_MANY")
                  )
                    ? process.env.NODE_ENV !== "production"
                      ? invariant(
                          false,
                          "ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.",
                          specPolicy,
                          name
                        )
                      : _prodInvariant("77", specPolicy, name)
                    : void 0;

                  // For methods which are defined more than once, call the existing
                  // methods before calling the new property, merging if appropriate.
                  if (specPolicy === "DEFINE_MANY_MERGED") {
                    proto[name] = createMergedResultFunction(
                      proto[name],
                      property
                    );
                  } else if (specPolicy === "DEFINE_MANY") {
                    proto[name] = createChainedFunction(proto[name], property);
                  }
                } else {
                  proto[name] = property;
                  if (process.env.NODE_ENV !== "production") {
                    // Add verbose displayName to the function, which helps when looking
                    // at profiling tools.
                    if (typeof property === "function" && spec.displayName) {
                      proto[name].displayName = spec.displayName + "_" + name;
                    }
                  }
                }
              }
            }
          }
        }

        function mixStaticSpecIntoComponent(Constructor, statics) {
          if (!statics) {
            return;
          }
          for (var name in statics) {
            var property = statics[name];
            if (!statics.hasOwnProperty(name)) {
              continue;
            }

            var isReserved = name in RESERVED_SPEC_KEYS;
            !!isReserved
              ? process.env.NODE_ENV !== "production"
                ? invariant(
                    false,
                    'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.',
                    name
                  )
                : _prodInvariant("78", name)
              : void 0;

            var isInherited = name in Constructor;
            !!isInherited
              ? process.env.NODE_ENV !== "production"
                ? invariant(
                    false,
                    "ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",
                    name
                  )
                : _prodInvariant("79", name)
              : void 0;
            Constructor[name] = property;
          }
        }

        /**
 * Merge two objects, but throw if both contain the same key.
 *
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */
        function mergeIntoWithNoDuplicateKeys(one, two) {
          !(one && two && typeof one === "object" && typeof two === "object")
            ? process.env.NODE_ENV !== "production"
              ? invariant(
                  false,
                  "mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects."
                )
              : _prodInvariant("80")
            : void 0;

          for (var key in two) {
            if (two.hasOwnProperty(key)) {
              !(one[key] === undefined)
                ? process.env.NODE_ENV !== "production"
                  ? invariant(
                      false,
                      "mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.",
                      key
                    )
                  : _prodInvariant("81", key)
                : void 0;
              one[key] = two[key];
            }
          }
          return one;
        }

        /**
 * Creates a function that invokes two functions and merges their return values.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
        function createMergedResultFunction(one, two) {
          return function mergedResult() {
            var a = one.apply(this, arguments);
            var b = two.apply(this, arguments);
            if (a == null) {
              return b;
            } else if (b == null) {
              return a;
            }
            var c = {};
            mergeIntoWithNoDuplicateKeys(c, a);
            mergeIntoWithNoDuplicateKeys(c, b);
            return c;
          };
        }

        /**
 * Creates a function that invokes two functions and ignores their return vales.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
        function createChainedFunction(one, two) {
          return function chainedFunction() {
            one.apply(this, arguments);
            two.apply(this, arguments);
          };
        }

        /**
 * Binds a method to the component.
 *
 * @param {object} component Component whose method is going to be bound.
 * @param {function} method Method to be bound.
 * @return {function} The bound method.
 */
        function bindAutoBindMethod(component, method) {
          var boundMethod = method.bind(component);
          if (process.env.NODE_ENV !== "production") {
            boundMethod.__reactBoundContext = component;
            boundMethod.__reactBoundMethod = method;
            boundMethod.__reactBoundArguments = null;
            var componentName = component.constructor.displayName;
            var _bind = boundMethod.bind;
            boundMethod.bind = function(newThis) {
              for (
                var _len = arguments.length,
                  args = Array(_len > 1 ? _len - 1 : 0),
                  _key = 1;
                _key < _len;
                _key++
              ) {
                args[_key - 1] = arguments[_key];
              }

              // User is trying to bind() an autobound method; we effectively will
              // ignore the value of "this" that the user is trying to use, so
              // let's warn.
              if (newThis !== component && newThis !== null) {
                process.env.NODE_ENV !== "production"
                  ? warning(
                      false,
                      "bind(): React component methods may only be bound to the " +
                        "component instance.\n\nSee %s",
                      componentName
                    )
                  : void 0;
              } else if (!args.length) {
                process.env.NODE_ENV !== "production"
                  ? warning(
                      false,
                      "bind(): You are binding a component method to the component. " +
                        "React does this for you automatically in a high-performance " +
                        "way, so you can safely remove this call.\n\nSee %s",
                      componentName
                    )
                  : void 0;
                return boundMethod;
              }
              var reboundMethod = _bind.apply(boundMethod, arguments);
              reboundMethod.__reactBoundContext = component;
              reboundMethod.__reactBoundMethod = method;
              reboundMethod.__reactBoundArguments = args;
              return reboundMethod;
            };
          }
          return boundMethod;
        }

        /**
 * Binds all auto-bound methods in a component.
 *
 * @param {object} component Component whose method is going to be bound.
 */
        function bindAutoBindMethods(component) {
          var pairs = component.__reactAutoBindPairs;
          for (var i = 0; i < pairs.length; i += 2) {
            var autoBindKey = pairs[i];
            var method = pairs[i + 1];
            component[autoBindKey] = bindAutoBindMethod(component, method);
          }
        }

        /**
 * Add more to the ReactClass base class. These are all legacy features and
 * therefore not already part of the modern ReactComponent.
 */
        var ReactClassMixin = {
          /**
   * TODO: This will be deprecated because state should always keep a consistent
   * type signature and the only use case for this, is to avoid that.
   */
          replaceState: function(newState, callback) {
            this.updater.enqueueReplaceState(
              this,
              newState,
              callback,
              "replaceState"
            );
          },

          /**
   * Checks whether or not this composite component is mounted.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
          isMounted: function() {
            return this.updater.isMounted(this);
          }
        };

        var ReactClassComponent = function() {};
        _assign(
          ReactClassComponent.prototype,
          ReactComponent.prototype,
          ReactClassMixin
        );

        /**
 * Module for creating composite components.
 *
 * @class ReactClass
 */
        var ReactClass = {
          /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/react-api.html#createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
          createClass: function(spec) {
            // To keep our warnings more understandable, we'll use a little hack here to
            // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
            // unnecessarily identify a class without displayName as 'Constructor'.
            var Constructor = identity(function(props, context, updater) {
              // This constructor gets overridden by mocks. The argument is used
              // by mocks to assert on what gets mounted.

              if (process.env.NODE_ENV !== "production") {
                process.env.NODE_ENV !== "production"
                  ? warning(
                      this instanceof Constructor,
                      "Something is calling a React component directly. Use a factory or " +
                        "JSX instead. See: https://fb.me/react-legacyfactory"
                    )
                  : void 0;
              }

              // Wire up auto-binding
              if (this.__reactAutoBindPairs.length) {
                bindAutoBindMethods(this);
              }

              this.props = props;
              this.context = context;
              this.refs = emptyObject;
              this.updater = updater || ReactNoopUpdateQueue;

              this.state = null;

              // ReactClasses doesn't have constructors. Instead, they use the
              // getInitialState and componentWillMount methods for initialization.

              var initialState = this.getInitialState
                ? this.getInitialState()
                : null;
              if (process.env.NODE_ENV !== "production") {
                // We allow auto-mocks to proceed as if they're returning null.
                if (
                  initialState === undefined &&
                  this.getInitialState._isMockFunction
                ) {
                  // This is probably bad practice. Consider warning here and
                  // deprecating this convenience.
                  initialState = null;
                }
              }
              !(
                typeof initialState === "object" && !Array.isArray(initialState)
              )
                ? process.env.NODE_ENV !== "production"
                  ? invariant(
                      false,
                      "%s.getInitialState(): must return an object or null",
                      Constructor.displayName || "ReactCompositeComponent"
                    )
                  : _prodInvariant(
                      "82",
                      Constructor.displayName || "ReactCompositeComponent"
                    )
                : void 0;

              this.state = initialState;
            });
            Constructor.prototype = new ReactClassComponent();
            Constructor.prototype.constructor = Constructor;
            Constructor.prototype.__reactAutoBindPairs = [];

            mixSpecIntoComponent(Constructor, spec);

            // Initialize the defaultProps property after all mixins have been merged.
            if (Constructor.getDefaultProps) {
              Constructor.defaultProps = Constructor.getDefaultProps();
            }

            if (process.env.NODE_ENV !== "production") {
              // This is a tag to indicate that the use of these method names is ok,
              // since it's used with createClass. If it's not, then it's likely a
              // mistake so we'll warn you to use the static property, property
              // initializer or constructor respectively.
              if (Constructor.getDefaultProps) {
                Constructor.getDefaultProps.isReactClassApproved = {};
              }
              if (Constructor.prototype.getInitialState) {
                Constructor.prototype.getInitialState.isReactClassApproved = {};
              }
            }

            !Constructor.prototype.render
              ? process.env.NODE_ENV !== "production"
                ? invariant(
                    false,
                    "createClass(...): Class specification must implement a `render` method."
                  )
                : _prodInvariant("83")
              : void 0;

            if (process.env.NODE_ENV !== "production") {
              process.env.NODE_ENV !== "production"
                ? warning(
                    !Constructor.prototype.componentShouldUpdate,
                    "%s has a method called " +
                      "componentShouldUpdate(). Did you mean shouldComponentUpdate()? " +
                      "The name is phrased as a question because the function is " +
                      "expected to return a value.",
                    spec.displayName || "A component"
                  )
                : void 0;
              process.env.NODE_ENV !== "production"
                ? warning(
                    !Constructor.prototype.componentWillRecieveProps,
                    "%s has a method called " +
                      "componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",
                    spec.displayName || "A component"
                  )
                : void 0;
            }

            // Reduce time spent doing lookups by setting these on the prototype.
            for (var methodName in ReactClassInterface) {
              if (!Constructor.prototype[methodName]) {
                Constructor.prototype[methodName] = null;
              }
            }

            return Constructor;
          }
        };

        module.exports = ReactClass;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 63 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

        var ReactElement = __webpack_require__(7);

        /**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
        var createDOMFactory = ReactElement.createFactory;
        if (process.env.NODE_ENV !== "production") {
          var ReactElementValidator = __webpack_require__(31);
          createDOMFactory = ReactElementValidator.createFactory;
        }

        /**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
        var ReactDOMFactories = {
          a: createDOMFactory("a"),
          abbr: createDOMFactory("abbr"),
          address: createDOMFactory("address"),
          area: createDOMFactory("area"),
          article: createDOMFactory("article"),
          aside: createDOMFactory("aside"),
          audio: createDOMFactory("audio"),
          b: createDOMFactory("b"),
          base: createDOMFactory("base"),
          bdi: createDOMFactory("bdi"),
          bdo: createDOMFactory("bdo"),
          big: createDOMFactory("big"),
          blockquote: createDOMFactory("blockquote"),
          body: createDOMFactory("body"),
          br: createDOMFactory("br"),
          button: createDOMFactory("button"),
          canvas: createDOMFactory("canvas"),
          caption: createDOMFactory("caption"),
          cite: createDOMFactory("cite"),
          code: createDOMFactory("code"),
          col: createDOMFactory("col"),
          colgroup: createDOMFactory("colgroup"),
          data: createDOMFactory("data"),
          datalist: createDOMFactory("datalist"),
          dd: createDOMFactory("dd"),
          del: createDOMFactory("del"),
          details: createDOMFactory("details"),
          dfn: createDOMFactory("dfn"),
          dialog: createDOMFactory("dialog"),
          div: createDOMFactory("div"),
          dl: createDOMFactory("dl"),
          dt: createDOMFactory("dt"),
          em: createDOMFactory("em"),
          embed: createDOMFactory("embed"),
          fieldset: createDOMFactory("fieldset"),
          figcaption: createDOMFactory("figcaption"),
          figure: createDOMFactory("figure"),
          footer: createDOMFactory("footer"),
          form: createDOMFactory("form"),
          h1: createDOMFactory("h1"),
          h2: createDOMFactory("h2"),
          h3: createDOMFactory("h3"),
          h4: createDOMFactory("h4"),
          h5: createDOMFactory("h5"),
          h6: createDOMFactory("h6"),
          head: createDOMFactory("head"),
          header: createDOMFactory("header"),
          hgroup: createDOMFactory("hgroup"),
          hr: createDOMFactory("hr"),
          html: createDOMFactory("html"),
          i: createDOMFactory("i"),
          iframe: createDOMFactory("iframe"),
          img: createDOMFactory("img"),
          input: createDOMFactory("input"),
          ins: createDOMFactory("ins"),
          kbd: createDOMFactory("kbd"),
          keygen: createDOMFactory("keygen"),
          label: createDOMFactory("label"),
          legend: createDOMFactory("legend"),
          li: createDOMFactory("li"),
          link: createDOMFactory("link"),
          main: createDOMFactory("main"),
          map: createDOMFactory("map"),
          mark: createDOMFactory("mark"),
          menu: createDOMFactory("menu"),
          menuitem: createDOMFactory("menuitem"),
          meta: createDOMFactory("meta"),
          meter: createDOMFactory("meter"),
          nav: createDOMFactory("nav"),
          noscript: createDOMFactory("noscript"),
          object: createDOMFactory("object"),
          ol: createDOMFactory("ol"),
          optgroup: createDOMFactory("optgroup"),
          option: createDOMFactory("option"),
          output: createDOMFactory("output"),
          p: createDOMFactory("p"),
          param: createDOMFactory("param"),
          picture: createDOMFactory("picture"),
          pre: createDOMFactory("pre"),
          progress: createDOMFactory("progress"),
          q: createDOMFactory("q"),
          rp: createDOMFactory("rp"),
          rt: createDOMFactory("rt"),
          ruby: createDOMFactory("ruby"),
          s: createDOMFactory("s"),
          samp: createDOMFactory("samp"),
          script: createDOMFactory("script"),
          section: createDOMFactory("section"),
          select: createDOMFactory("select"),
          small: createDOMFactory("small"),
          source: createDOMFactory("source"),
          span: createDOMFactory("span"),
          strong: createDOMFactory("strong"),
          style: createDOMFactory("style"),
          sub: createDOMFactory("sub"),
          summary: createDOMFactory("summary"),
          sup: createDOMFactory("sup"),
          table: createDOMFactory("table"),
          tbody: createDOMFactory("tbody"),
          td: createDOMFactory("td"),
          textarea: createDOMFactory("textarea"),
          tfoot: createDOMFactory("tfoot"),
          th: createDOMFactory("th"),
          thead: createDOMFactory("thead"),
          time: createDOMFactory("time"),
          title: createDOMFactory("title"),
          tr: createDOMFactory("tr"),
          track: createDOMFactory("track"),
          u: createDOMFactory("u"),
          ul: createDOMFactory("ul"),
          var: createDOMFactory("var"),
          video: createDOMFactory("video"),
          wbr: createDOMFactory("wbr"),

          // SVG
          circle: createDOMFactory("circle"),
          clipPath: createDOMFactory("clipPath"),
          defs: createDOMFactory("defs"),
          ellipse: createDOMFactory("ellipse"),
          g: createDOMFactory("g"),
          image: createDOMFactory("image"),
          line: createDOMFactory("line"),
          linearGradient: createDOMFactory("linearGradient"),
          mask: createDOMFactory("mask"),
          path: createDOMFactory("path"),
          pattern: createDOMFactory("pattern"),
          polygon: createDOMFactory("polygon"),
          polyline: createDOMFactory("polyline"),
          radialGradient: createDOMFactory("radialGradient"),
          rect: createDOMFactory("rect"),
          stop: createDOMFactory("stop"),
          svg: createDOMFactory("svg"),
          text: createDOMFactory("text"),
          tspan: createDOMFactory("tspan")
        };

        module.exports = ReactDOMFactories;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 64 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

        var _prodInvariant = __webpack_require__(5);

        var ReactElement = __webpack_require__(7);
        var ReactPropTypesSecret = __webpack_require__(34);

        var emptyFunction = __webpack_require__(16);
        var getIteratorFn = __webpack_require__(20);
        var invariant = __webpack_require__(4);
        var warning = __webpack_require__(2);

        /**
 * Collection of methods that allow declaration and validation of props that are
 * supplied to React components. Example usage:
 *
 *   var Props = require('ReactPropTypes');
 *   var MyArticle = React.createClass({
 *     propTypes: {
 *       // An optional string prop named "description".
 *       description: Props.string,
 *
 *       // A required enum prop named "category".
 *       category: Props.oneOf(['News','Photos']).isRequired,
 *
 *       // A prop named "dialog" that requires an instance of Dialog.
 *       dialog: Props.instanceOf(Dialog).isRequired
 *     },
 *     render: function() { ... }
 *   });
 *
 * A more formal specification of how these methods are used:
 *
 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
 *   decl := ReactPropTypes.{type}(.isRequired)?
 *
 * Each and every declaration produces a function with the same signature. This
 * allows the creation of custom validation functions. For example:
 *
 *  var MyLink = React.createClass({
 *    propTypes: {
 *      // An optional string or URI prop named "href".
 *      href: function(props, propName, componentName) {
 *        var propValue = props[propName];
 *        if (propValue != null && typeof propValue !== 'string' &&
 *            !(propValue instanceof URI)) {
 *          return new Error(
 *            'Expected a string or an URI for ' + propName + ' in ' +
 *            componentName
 *          );
 *        }
 *      }
 *    },
 *    render: function() {...}
 *  });
 *
 * @internal
 */

        var ANONYMOUS = "<<anonymous>>";

        var ReactPropTypes;

        if (process.env.NODE_ENV !== "production") {
          // Keep in sync with production version below
          ReactPropTypes = {
            array: createPrimitiveTypeChecker("array"),
            bool: createPrimitiveTypeChecker("boolean"),
            func: createPrimitiveTypeChecker("function"),
            number: createPrimitiveTypeChecker("number"),
            object: createPrimitiveTypeChecker("object"),
            string: createPrimitiveTypeChecker("string"),
            symbol: createPrimitiveTypeChecker("symbol"),

            any: createAnyTypeChecker(),
            arrayOf: createArrayOfTypeChecker,
            element: createElementTypeChecker(),
            instanceOf: createInstanceTypeChecker,
            node: createNodeChecker(),
            objectOf: createObjectOfTypeChecker,
            oneOf: createEnumTypeChecker,
            oneOfType: createUnionTypeChecker,
            shape: createShapeTypeChecker
          };
        } else {
          var productionTypeChecker = function() {
            true
              ? process.env.NODE_ENV !== "production"
                ? invariant(
                    false,
                    "React.PropTypes type checking code is stripped in production."
                  )
                : _prodInvariant("144")
              : void 0;
          };
          productionTypeChecker.isRequired = productionTypeChecker;
          var getProductionTypeChecker = function() {
            return productionTypeChecker;
          };
          // Keep in sync with development version above
          ReactPropTypes = {
            array: productionTypeChecker,
            bool: productionTypeChecker,
            func: productionTypeChecker,
            number: productionTypeChecker,
            object: productionTypeChecker,
            string: productionTypeChecker,
            symbol: productionTypeChecker,

            any: productionTypeChecker,
            arrayOf: getProductionTypeChecker,
            element: productionTypeChecker,
            instanceOf: getProductionTypeChecker,
            node: productionTypeChecker,
            objectOf: getProductionTypeChecker,
            oneOf: getProductionTypeChecker,
            oneOfType: getProductionTypeChecker,
            shape: getProductionTypeChecker
          };
        }

        /**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
        /*eslint-disable no-self-compare*/
        function is(x, y) {
          // SameValue algorithm
          if (x === y) {
            // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return x !== 0 || 1 / x === 1 / y;
          } else {
            // Step 6.a: NaN == NaN
            return x !== x && y !== y;
          }
        }
        /*eslint-enable no-self-compare*/

        /**
 * We use an Error-like object for backward compatibility as people may call
 * PropTypes directly and inspect their output. However, we don't use real
 * Errors anymore. We don't inspect their stack anyway, and creating them
 * is prohibitively expensive if they are created too often, such as what
 * happens in oneOfType() for any type before the one that matched.
 */
        function PropTypeError(message) {
          this.message = message;
          this.stack = "";
        }
        // Make `instanceof Error` still work for returned errors.
        PropTypeError.prototype = Error.prototype;

        function createChainableTypeChecker(validate) {
          if (process.env.NODE_ENV !== "production") {
            var manualPropTypeCallCache = {};
          }
          function checkType(
            isRequired,
            props,
            propName,
            componentName,
            location,
            propFullName,
            secret
          ) {
            componentName = componentName || ANONYMOUS;
            propFullName = propFullName || propName;
            if (process.env.NODE_ENV !== "production") {
              if (
                secret !== ReactPropTypesSecret &&
                typeof console !== "undefined"
              ) {
                var cacheKey = componentName + ":" + propName;
                if (!manualPropTypeCallCache[cacheKey]) {
                  process.env.NODE_ENV !== "production"
                    ? warning(
                        false,
                        "You are manually calling a React.PropTypes validation " +
                          "function for the `%s` prop on `%s`. This is deprecated " +
                          "and will not work in production with the next major version. " +
                          "You may be seeing this warning due to a third-party PropTypes " +
                          "library. See https://fb.me/react-warning-dont-call-proptypes " +
                          "for details.",
                        propFullName,
                        componentName
                      )
                    : void 0;
                  manualPropTypeCallCache[cacheKey] = true;
                }
              }
            }
            if (props[propName] == null) {
              if (isRequired) {
                if (props[propName] === null) {
                  return new PropTypeError(
                    "The " +
                      location +
                      " `" +
                      propFullName +
                      "` is marked as required " +
                      ("in `" + componentName + "`, but its value is `null`.")
                  );
                }
                return new PropTypeError(
                  "The " +
                    location +
                    " `" +
                    propFullName +
                    "` is marked as required in " +
                    ("`" + componentName + "`, but its value is `undefined`.")
                );
              }
              return null;
            } else {
              return validate(
                props,
                propName,
                componentName,
                location,
                propFullName
              );
            }
          }

          var chainedCheckType = checkType.bind(null, false);
          chainedCheckType.isRequired = checkType.bind(null, true);

          return chainedCheckType;
        }

        function createPrimitiveTypeChecker(expectedType) {
          function validate(
            props,
            propName,
            componentName,
            location,
            propFullName,
            secret
          ) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== expectedType) {
              // `propValue` being instance of, say, date/regexp, pass the 'object'
              // check, but we can offer a more precise error message here rather than
              // 'of type `object`'.
              var preciseType = getPreciseType(propValue);

              return new PropTypeError(
                "Invalid " +
                  location +
                  " `" +
                  propFullName +
                  "` of type " +
                  ("`" +
                    preciseType +
                    "` supplied to `" +
                    componentName +
                    "`, expected ") +
                  ("`" + expectedType + "`.")
              );
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }

        function createAnyTypeChecker() {
          return createChainableTypeChecker(emptyFunction.thatReturnsNull);
        }

        function createArrayOfTypeChecker(typeChecker) {
          function validate(
            props,
            propName,
            componentName,
            location,
            propFullName
          ) {
            if (typeof typeChecker !== "function") {
              return new PropTypeError(
                "Property `" +
                  propFullName +
                  "` of component `" +
                  componentName +
                  "` has invalid PropType notation inside arrayOf."
              );
            }
            var propValue = props[propName];
            if (!Array.isArray(propValue)) {
              var propType = getPropType(propValue);
              return new PropTypeError(
                "Invalid " +
                  location +
                  " `" +
                  propFullName +
                  "` of type " +
                  ("`" +
                    propType +
                    "` supplied to `" +
                    componentName +
                    "`, expected an array.")
              );
            }
            for (var i = 0; i < propValue.length; i++) {
              var error = typeChecker(
                propValue,
                i,
                componentName,
                location,
                propFullName + "[" + i + "]",
                ReactPropTypesSecret
              );
              if (error instanceof Error) {
                return error;
              }
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }

        function createElementTypeChecker() {
          function validate(
            props,
            propName,
            componentName,
            location,
            propFullName
          ) {
            var propValue = props[propName];
            if (!ReactElement.isValidElement(propValue)) {
              var propType = getPropType(propValue);
              return new PropTypeError(
                "Invalid " +
                  location +
                  " `" +
                  propFullName +
                  "` of type " +
                  ("`" +
                    propType +
                    "` supplied to `" +
                    componentName +
                    "`, expected a single ReactElement.")
              );
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }

        function createInstanceTypeChecker(expectedClass) {
          function validate(
            props,
            propName,
            componentName,
            location,
            propFullName
          ) {
            if (!(props[propName] instanceof expectedClass)) {
              var expectedClassName = expectedClass.name || ANONYMOUS;
              var actualClassName = getClassName(props[propName]);
              return new PropTypeError(
                "Invalid " +
                  location +
                  " `" +
                  propFullName +
                  "` of type " +
                  ("`" +
                    actualClassName +
                    "` supplied to `" +
                    componentName +
                    "`, expected ") +
                  ("instance of `" + expectedClassName + "`.")
              );
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }

        function createEnumTypeChecker(expectedValues) {
          if (!Array.isArray(expectedValues)) {
            process.env.NODE_ENV !== "production"
              ? warning(
                  false,
                  "Invalid argument supplied to oneOf, expected an instance of array."
                )
              : void 0;
            return emptyFunction.thatReturnsNull;
          }

          function validate(
            props,
            propName,
            componentName,
            location,
            propFullName
          ) {
            var propValue = props[propName];
            for (var i = 0; i < expectedValues.length; i++) {
              if (is(propValue, expectedValues[i])) {
                return null;
              }
            }

            var valuesString = JSON.stringify(expectedValues);
            return new PropTypeError(
              "Invalid " +
                location +
                " `" +
                propFullName +
                "` of value `" +
                propValue +
                "` " +
                ("supplied to `" +
                  componentName +
                  "`, expected one of " +
                  valuesString +
                  ".")
            );
          }
          return createChainableTypeChecker(validate);
        }

        function createObjectOfTypeChecker(typeChecker) {
          function validate(
            props,
            propName,
            componentName,
            location,
            propFullName
          ) {
            if (typeof typeChecker !== "function") {
              return new PropTypeError(
                "Property `" +
                  propFullName +
                  "` of component `" +
                  componentName +
                  "` has invalid PropType notation inside objectOf."
              );
            }
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== "object") {
              return new PropTypeError(
                "Invalid " +
                  location +
                  " `" +
                  propFullName +
                  "` of type " +
                  ("`" +
                    propType +
                    "` supplied to `" +
                    componentName +
                    "`, expected an object.")
              );
            }
            for (var key in propValue) {
              if (propValue.hasOwnProperty(key)) {
                var error = typeChecker(
                  propValue,
                  key,
                  componentName,
                  location,
                  propFullName + "." + key,
                  ReactPropTypesSecret
                );
                if (error instanceof Error) {
                  return error;
                }
              }
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }

        function createUnionTypeChecker(arrayOfTypeCheckers) {
          if (!Array.isArray(arrayOfTypeCheckers)) {
            process.env.NODE_ENV !== "production"
              ? warning(
                  false,
                  "Invalid argument supplied to oneOfType, expected an instance of array."
                )
              : void 0;
            return emptyFunction.thatReturnsNull;
          }

          function validate(
            props,
            propName,
            componentName,
            location,
            propFullName
          ) {
            for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
              var checker = arrayOfTypeCheckers[i];
              if (
                checker(
                  props,
                  propName,
                  componentName,
                  location,
                  propFullName,
                  ReactPropTypesSecret
                ) == null
              ) {
                return null;
              }
            }

            return new PropTypeError(
              "Invalid " +
                location +
                " `" +
                propFullName +
                "` supplied to " +
                ("`" + componentName + "`.")
            );
          }
          return createChainableTypeChecker(validate);
        }

        function createNodeChecker() {
          function validate(
            props,
            propName,
            componentName,
            location,
            propFullName
          ) {
            if (!isNode(props[propName])) {
              return new PropTypeError(
                "Invalid " +
                  location +
                  " `" +
                  propFullName +
                  "` supplied to " +
                  ("`" + componentName + "`, expected a ReactNode.")
              );
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }

        function createShapeTypeChecker(shapeTypes) {
          function validate(
            props,
            propName,
            componentName,
            location,
            propFullName
          ) {
            var propValue = props[propName];
            var propType = getPropType(propValue);
            if (propType !== "object") {
              return new PropTypeError(
                "Invalid " +
                  location +
                  " `" +
                  propFullName +
                  "` of type `" +
                  propType +
                  "` " +
                  ("supplied to `" + componentName + "`, expected `object`.")
              );
            }
            for (var key in shapeTypes) {
              var checker = shapeTypes[key];
              if (!checker) {
                continue;
              }
              var error = checker(
                propValue,
                key,
                componentName,
                location,
                propFullName + "." + key,
                ReactPropTypesSecret
              );
              if (error) {
                return error;
              }
            }
            return null;
          }
          return createChainableTypeChecker(validate);
        }

        function isNode(propValue) {
          switch (typeof propValue) {
            case "number":
            case "string":
            case "undefined":
              return true;
            case "boolean":
              return !propValue;
            case "object":
              if (Array.isArray(propValue)) {
                return propValue.every(isNode);
              }
              if (
                propValue === null ||
                ReactElement.isValidElement(propValue)
              ) {
                return true;
              }

              var iteratorFn = getIteratorFn(propValue);
              if (iteratorFn) {
                var iterator = iteratorFn.call(propValue);
                var step;
                if (iteratorFn !== propValue.entries) {
                  while (!(step = iterator.next()).done) {
                    if (!isNode(step.value)) {
                      return false;
                    }
                  }
                } else {
                  // Iterator will provide entry [k,v] tuples rather than values.
                  while (!(step = iterator.next()).done) {
                    var entry = step.value;
                    if (entry) {
                      if (!isNode(entry[1])) {
                        return false;
                      }
                    }
                  }
                }
              } else {
                return false;
              }

              return true;
            default:
              return false;
          }
        }

        function isSymbol(propType, propValue) {
          // Native Symbol.
          if (propType === "symbol") {
            return true;
          }

          // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
          if (propValue["@@toStringTag"] === "Symbol") {
            return true;
          }

          // Fallback for non-spec compliant Symbols which are polyfilled.
          if (typeof Symbol === "function" && propValue instanceof Symbol) {
            return true;
          }

          return false;
        }

        // Equivalent of `typeof` but with special handling for array and regexp.
        function getPropType(propValue) {
          var propType = typeof propValue;
          if (Array.isArray(propValue)) {
            return "array";
          }
          if (propValue instanceof RegExp) {
            // Old webkits (at least until Android 4.0) return 'function' rather than
            // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
            // passes PropTypes.object.
            return "object";
          }
          if (isSymbol(propType, propValue)) {
            return "symbol";
          }
          return propType;
        }

        // This handles more types than `getPropType`. Only used for error messages.
        // See `createPrimitiveTypeChecker`.
        function getPreciseType(propValue) {
          var propType = getPropType(propValue);
          if (propType === "object") {
            if (propValue instanceof Date) {
              return "date";
            } else if (propValue instanceof RegExp) {
              return "regexp";
            }
          }
          return propType;
        }

        // Returns class name of the object, if any.
        function getClassName(propValue) {
          if (!propValue.constructor || !propValue.constructor.name) {
            return ANONYMOUS;
          }
          return propValue.constructor.name;
        }

        module.exports = ReactPropTypes;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 65 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

      module.exports = {
        IndeterminateComponent: 0, // Before we know whether it is functional or class
        FunctionalComponent: 1,
        ClassComponent: 2,
        HostRoot: 3, // Root of a host tree. Could be nested inside another node.
        HostPortal: 4, // A subtree. Could be an entry point to a different renderer.
        HostComponent: 5,
        HostText: 6,
        CoroutineComponent: 7,
        CoroutineHandlerPhase: 8,
        YieldComponent: 9,
        Fragment: 10
      };

      /***/
    },
    /* 66 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

      module.exports = "16.0.0-alpha.6";

      /***/
    },
    /* 67 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

      var checkPropTypes = __webpack_require__(35);

      var _require = __webpack_require__(29),
        getStackAddendum = _require.getStackAddendum;

      function checkReactTypeSpec(typeSpecs, values, location, componentName) {
        checkPropTypes(
          typeSpecs,
          values,
          location,
          componentName,
          getStackAddendum
        );
      }

      module.exports = checkReactTypeSpec;

      /***/
    },
    /* 68 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

        var _prodInvariant = __webpack_require__(5);

        var ReactElement = __webpack_require__(7);

        var invariant = __webpack_require__(4);

        /**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
        function onlyChild(children) {
          !ReactElement.isValidElement(children)
            ? process.env.NODE_ENV !== "production"
              ? invariant(
                  false,
                  "React.Children.only expected to receive a single React element child."
                )
              : _prodInvariant("143")
            : void 0;
          return children;
        }

        module.exports = onlyChild;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 69 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function(process) {
        /**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

        var _prodInvariant = __webpack_require__(5);

        var ReactCurrentOwner = __webpack_require__(14);
        var REACT_ELEMENT_TYPE = __webpack_require__(30);

        var getIteratorFn = __webpack_require__(20);
        var invariant = __webpack_require__(4);
        var KeyEscapeUtils = __webpack_require__(58);
        var warning = __webpack_require__(2);

        var SEPARATOR = ".";
        var SUBSEPARATOR = ":";

        /**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

        /**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

        var didWarnAboutMaps = false;

        /**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
        function getComponentKey(component, index) {
          // Do some typechecking here since we call this blindly. We want to ensure
          // that we don't block potential future ES APIs.
          if (
            component &&
            typeof component === "object" &&
            component.key != null
          ) {
            // Explicit key
            return KeyEscapeUtils.escape(component.key);
          }
          // Implicit key determined by the index in the set
          return index.toString(36);
        }

        /**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
        function traverseAllChildrenImpl(
          children,
          nameSoFar,
          callback,
          traverseContext
        ) {
          var type = typeof children;

          if (type === "undefined" || type === "boolean") {
            // All of the above are perceived as null.
            children = null;
          }

          if (
            children === null ||
            type === "string" ||
            type === "number" ||
            // The following is inlined from ReactElement. This means we can optimize
            // some checks. React Fiber also inlines this logic for similar purposes.
            (type === "object" && children.$$typeof === REACT_ELEMENT_TYPE)
          ) {
            callback(
              traverseContext,
              children,
              // If it's the only child, treat the name as if it was wrapped in an array
              // so that it's consistent if the number of children grows.
              nameSoFar === ""
                ? SEPARATOR + getComponentKey(children, 0)
                : nameSoFar
            );
            return 1;
          }

          var child;
          var nextName;
          var subtreeCount = 0; // Count of children found in the current subtree.
          var nextNamePrefix = nameSoFar === ""
            ? SEPARATOR
            : nameSoFar + SUBSEPARATOR;

          if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              child = children[i];
              nextName = nextNamePrefix + getComponentKey(child, i);
              subtreeCount += traverseAllChildrenImpl(
                child,
                nextName,
                callback,
                traverseContext
              );
            }
          } else {
            var iteratorFn = getIteratorFn(children);
            if (iteratorFn) {
              if (process.env.NODE_ENV !== "production") {
                // Warn about using Maps as children
                if (iteratorFn === children.entries) {
                  var mapsAsChildrenAddendum = "";
                  if (ReactCurrentOwner.current) {
                    var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
                    if (mapsAsChildrenOwnerName) {
                      mapsAsChildrenAddendum =
                        "\n\nCheck the render method of `" +
                        mapsAsChildrenOwnerName +
                        "`.";
                    }
                  }
                  process.env.NODE_ENV !== "production"
                    ? warning(
                        didWarnAboutMaps,
                        "Using Maps as children is unsupported and will likely yield " +
                          "unexpected results. Convert it to a sequence/iterable of keyed " +
                          "ReactElements instead.%s",
                        mapsAsChildrenAddendum
                      )
                    : void 0;
                  didWarnAboutMaps = true;
                }
              }

              var iterator = iteratorFn.call(children);
              var step;
              var ii = 0;
              while (!(step = iterator.next()).done) {
                child = step.value;
                nextName = nextNamePrefix + getComponentKey(child, ii++);
                subtreeCount += traverseAllChildrenImpl(
                  child,
                  nextName,
                  callback,
                  traverseContext
                );
              }
            } else if (type === "object") {
              var addendum = "";
              if (process.env.NODE_ENV !== "production") {
                addendum =
                  " If you meant to render a collection of children, use an array " +
                  "instead.";
                if (ReactCurrentOwner.current) {
                  var name = ReactCurrentOwner.current.getName();
                  if (name) {
                    addendum +=
                      "\n\nCheck the render method of `" + name + "`.";
                  }
                }
              }
              var childrenString = "" + children;
              true
                ? process.env.NODE_ENV !== "production"
                  ? invariant(
                      false,
                      "Objects are not valid as a React child (found: %s).%s",
                      childrenString === "[object Object]"
                        ? "object with keys {" +
                            Object.keys(children).join(", ") +
                            "}"
                        : childrenString,
                      addendum
                    )
                  : _prodInvariant(
                      "31",
                      childrenString === "[object Object]"
                        ? "object with keys {" +
                            Object.keys(children).join(", ") +
                            "}"
                        : childrenString,
                      addendum
                    )
                : void 0;
            }
          }

          return subtreeCount;
        }

        /**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
        function traverseAllChildren(children, callback, traverseContext) {
          if (children == null) {
            return 0;
          }

          return traverseAllChildrenImpl(
            children,
            "",
            callback,
            traverseContext
          );
        }

        module.exports = traverseAllChildren;
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 70 */
    /***/ function(module, exports, __webpack_require__) {
      (function webpackMissingModule() {
        throw new Error('Cannot find module "./main.js"');
      })();
      module.exports = __webpack_require__(37);

      /***/
    }
    /******/
  ]
);

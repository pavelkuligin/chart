var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/donutchart.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@skpm/timers/immediate.js":
/*!************************************************!*\
  !*** ./node_modules/@skpm/timers/immediate.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var timeout = __webpack_require__(/*! ./timeout */ "./node_modules/@skpm/timers/timeout.js")

function setImmediate(func, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
  return timeout.setTimeout(func, 0, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
}

function clearImmediate(id) {
  return timeout.clearTimeout(id)
}

module.exports = {
  setImmediate: setImmediate,
  clearImmediate: clearImmediate
}


/***/ }),

/***/ "./node_modules/@skpm/timers/test-if-fiber.js":
/*!****************************************************!*\
  !*** ./node_modules/@skpm/timers/test-if-fiber.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () {
  return typeof coscript !== 'undefined' && coscript.createFiber
}


/***/ }),

/***/ "./node_modules/@skpm/timers/timeout.js":
/*!**********************************************!*\
  !*** ./node_modules/@skpm/timers/timeout.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var fiberAvailable = __webpack_require__(/*! ./test-if-fiber */ "./node_modules/@skpm/timers/test-if-fiber.js")

var setTimeout
var clearTimeout

var fibers = []

if (fiberAvailable()) {
  var fibers = []

  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    // fibers takes care of keeping coscript around
    var id = fibers.length
    fibers.push(coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
      }
    ))
    return id
  }

  clearTimeout = function (id) {
    var timeout = fibers[id]
    if (timeout) {
      timeout.cancel() // fibers takes care of keeping coscript around
      fibers[id] = undefined // garbage collect the fiber
    }
  }
} else {
  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    coscript.shouldKeepAround = true
    var id = fibers.length
    fibers.push(true)
    coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        if (fibers[id]) { // if not cleared
          func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
        }
        clearTimeout(id)
        if (fibers.every(function (_id) { return !_id })) { // if everything is cleared
          coscript.shouldKeepAround = false
        }
      }
    )
    return id
  }

  clearTimeout = function (id) {
    fibers[id] = false
  }
}

module.exports = {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
}


/***/ }),

/***/ "./node_modules/cocoascript-class/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = undefined;
exports.default = ObjCClass;

var _runtime = __webpack_require__(/*! ./runtime.js */ "./node_modules/cocoascript-class/lib/runtime.js");

exports.SuperCall = _runtime.SuperCall;

// super when returnType is id and args are void
// id objc_msgSendSuper(struct objc_super *super, SEL op, void)

const SuperInit = (0, _runtime.SuperCall)(NSStringFromSelector("init"), [], { type: "@" });

// Returns a real ObjC class. No need to use new.
function ObjCClass(defn) {
  const superclass = defn.superclass || NSObject;
  const className = (defn.className || defn.classname || "ObjCClass") + NSUUID.UUID().UUIDString();
  const reserved = new Set(['className', 'classname', 'superclass']);
  var cls = MOClassDescription.allocateDescriptionForClassWithName_superclass_(className, superclass);
  // Add each handler to the class description
  const ivars = [];
  for (var key in defn) {
    const v = defn[key];
    if (typeof v == 'function' && key !== 'init') {
      var selector = NSSelectorFromString(key);
      cls.addInstanceMethodWithSelector_function_(selector, v);
    } else if (!reserved.has(key)) {
      ivars.push(key);
      cls.addInstanceVariableWithName_typeEncoding(key, "@");
    }
  }

  cls.addInstanceMethodWithSelector_function_(NSSelectorFromString('init'), function () {
    const self = SuperInit.call(this);
    ivars.map(name => {
      Object.defineProperty(self, name, {
        get() {
          return getIvar(self, name);
        },
        set(v) {
          (0, _runtime.object_setInstanceVariable)(self, name, v);
        }
      });
      self[name] = defn[name];
    });
    // If there is a passsed-in init funciton, call it now.
    if (typeof defn.init == 'function') defn.init.call(this);
    return self;
  });

  return cls.registerClass();
};

function getIvar(obj, name) {
  const retPtr = MOPointer.new();
  (0, _runtime.object_getInstanceVariable)(obj, name, retPtr);
  return retPtr.value().retain().autorelease();
}

/***/ }),

/***/ "./node_modules/cocoascript-class/lib/runtime.js":
/*!*******************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/runtime.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = SuperCall;
exports.CFunc = CFunc;
const objc_super_typeEncoding = '{objc_super="receiver"@"super_class"#}';

// You can store this to call your function. this must be bound to the current instance.
function SuperCall(selector, argTypes, returnType) {
  const func = CFunc("objc_msgSendSuper", [{ type: '^' + objc_super_typeEncoding }, { type: ":" }, ...argTypes], returnType);
  return function (...args) {
    const struct = make_objc_super(this, this.superclass());
    const structPtr = MOPointer.alloc().initWithValue_(struct);
    return func(structPtr, selector, ...args);
  };
}

// Recursively create a MOStruct
function makeStruct(def) {
  if (typeof def !== 'object' || Object.keys(def).length == 0) {
    return def;
  }
  const name = Object.keys(def)[0];
  const values = def[name];

  const structure = MOStruct.structureWithName_memberNames_runtime(name, Object.keys(values), Mocha.sharedRuntime());

  Object.keys(values).map(member => {
    structure[member] = makeStruct(values[member]);
  });

  return structure;
}

function make_objc_super(self, cls) {
  return makeStruct({
    objc_super: {
      receiver: self,
      super_class: cls
    }
  });
}

// Due to particularities of the JS bridge, we can't call into MOBridgeSupport objects directly
// But, we can ask key value coding to do the dirty work for us ;)
function setKeys(o, d) {
  const funcDict = NSMutableDictionary.dictionary();
  funcDict.o = o;
  Object.keys(d).map(k => funcDict.setValue_forKeyPath(d[k], "o." + k));
}

// Use any C function, not just ones with BridgeSupport
function CFunc(name, args, retVal) {
  function makeArgument(a) {
    if (!a) return null;
    const arg = MOBridgeSupportArgument.alloc().init();
    setKeys(arg, {
      type64: a.type
    });
    return arg;
  }
  const func = MOBridgeSupportFunction.alloc().init();
  setKeys(func, {
    name: name,
    arguments: args.map(makeArgument),
    returnValue: makeArgument(retVal)
  });
  return func;
}

/*
@encode(char*) = "*"
@encode(id) = "@"
@encode(Class) = "#"
@encode(void*) = "^v"
@encode(CGRect) = "{CGRect={CGPoint=dd}{CGSize=dd}}"
@encode(SEL) = ":"
*/

function addStructToBridgeSupport(key, structDef) {
  // OK, so this is probably the nastiest hack in this file.
  // We go modify MOBridgeSupportController behind its back and use kvc to add our own definition
  // There isn't another API for this though. So the only other way would be to make a real bridgesupport file.
  const symbols = MOBridgeSupportController.sharedController().valueForKey('symbols');
  if (!symbols) throw Error("Something has changed within bridge support so we can't add our definitions");
  // If someone already added this definition, don't re-register it.
  if (symbols[key] !== null) return;
  const def = MOBridgeSupportStruct.alloc().init();
  setKeys(def, {
    name: key,
    type: structDef.type
  });
  symbols[key] = def;
};

// This assumes the ivar is an object type. Return value is pretty useless.
const object_getInstanceVariable = exports.object_getInstanceVariable = CFunc("object_getInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "^@" }], { type: "^{objc_ivar=}" });
// Again, ivar is of object type
const object_setInstanceVariable = exports.object_setInstanceVariable = CFunc("object_setInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "@" }], { type: "^{objc_ivar=}" });

// We need Mocha to understand what an objc_super is so we can use it as a function argument
addStructToBridgeSupport('objc_super', { type: objc_super_typeEncoding });

/***/ }),

/***/ "./node_modules/promise-polyfill/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/promise-polyfill/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setTimeout, setImmediate) {

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  this._state = 0;
  this._handled = false;
  this._value = undefined;
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = function(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
};

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@skpm/timers/timeout.js */ "./node_modules/@skpm/timers/timeout.js")["setTimeout"], __webpack_require__(/*! ./node_modules/@skpm/timers/immediate.js */ "./node_modules/@skpm/timers/immediate.js")["setImmediate"]))

/***/ }),

/***/ "./node_modules/sketch-polyfill-fetch/lib/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/sketch-polyfill-fetch/lib/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Promise) {/* globals NSJSONSerialization NSJSONWritingPrettyPrinted NSDictionary NSHTTPURLResponse NSString NSASCIIStringEncoding NSUTF8StringEncoding coscript NSURL NSMutableURLRequest NSMutableData NSURLConnection */
var _ObjCClass = __webpack_require__(/*! cocoascript-class */ "./node_modules/cocoascript-class/lib/index.js")

var ObjCClass = _ObjCClass.default

function response (httpResponse, data) {
  var keys = []
  var all = []
  var headers = {}
  var header

  for (var i = 0; i < httpResponse.allHeaderFields().allKeys().length; i++) {
    var key = httpResponse.allHeaderFields().allKeys()[i].toLowerCase()
    var value = String(httpResponse.allHeaderFields()[key])
    keys.push(key)
    all.push([key, value])
    header = headers[key]
    headers[key] = header ? (header + ',' + value) : value
  }

  return {
    ok: (httpResponse.statusCode() / 200 | 0) == 1, // 200-399
    status: httpResponse.statusCode(),
    statusText: NSHTTPURLResponse.localizedStringForStatusCode(httpResponse.statusCode()),
    url: String(httpResponse.URL().absoluteString()),
    clone: response.bind(this, httpResponse, data),
    text: function () {
      return new Promise(function (resolve, reject) {
        const str = NSString.alloc().initWithData_encoding(data, NSASCIIStringEncoding)
        if (str) {
          resolve(str)
        } else {
          reject(new Error("Couldn't parse body"))
        }
      })
    },
    json: function () {
      return new Promise(function (resolve, reject) {
        var str = NSString.alloc().initWithData_encoding(data, NSUTF8StringEncoding)
        if (str) {
          // parse errors are turned into exceptions, which cause promise to be rejected
          var obj = JSON.parse(str)
          resolve(obj)
        } else {
          reject(new Error('Could not parse JSON because it is not valid UTF-8 data.'))
        }
      })
    },
    blob: function () {
      return Promise.resolve(data)
    },
    headers: {
      keys: function () { return keys },
      entries: function () { return all },
      get: function (n) { return headers[n.toLowerCase()] },
      has: function (n) { return n.toLowerCase() in headers }
    }
  }
}

// We create one ObjC class for ourselves here
var DelegateClass

function fetch (urlString, options) {
  options = options || {}
  var fiber
  try {
    fiber = coscript.createFiber()
  } catch (err) {
    coscript.shouldKeepAround = true
  }
  return new Promise(function (resolve, reject) {
    var url = NSURL.alloc().initWithString(urlString)
    var request = NSMutableURLRequest.requestWithURL(url)
    request.setHTTPMethod(options.method || 'GET')

    Object.keys(options.headers || {}).forEach(function (i) {
      request.setValue_forHTTPHeaderField(options.headers[i], i)
    })

    if (options.body) {
      var data
      if (typeof options.body === 'string') {
        var str = NSString.alloc().initWithString(options.body)
        data = str.dataUsingEncoding(NSUTF8StringEncoding)
      } else {
        var error
        data = NSJSONSerialization.dataWithJSONObject_options_error(options.body, NSJSONWritingPrettyPrinted, error)
        if (error != null) {
          return reject(error)
        }
        request.setValue_forHTTPHeaderField('' + data.length(), 'Content-Length')
      }
      request.setHTTPBody(data)
    }

    var finished = false

    if (!DelegateClass) {
      DelegateClass = ObjCClass({
        classname: 'FetchPolyfillDelegate',
        data: null,
        httpResponse: null,
        fiber: null,
        callbacks: null,

        'connectionDidFinishLoading:': function (connection) {
          finished = true
          this.callbacks.resolve(response(this.httpResponse, this.data))
          if (this.fiber) {
            this.fiber.cleanup()
          } else {
            coscript.shouldKeepAround = false
          }
        },
        'connection:didReceiveResponse:': function (connection, httpResponse) {
          this.httpResponse = httpResponse
          this.data = NSMutableData.alloc().init()
        },
        'connection:didFailWithError:': function (connection, error) {
          finished = true
          this.callbacks.reject(error)
          if (this.fiber) {
            this.fiber.cleanup()
          } else {
            coscript.shouldKeepAround = false
          }
        },
        'connection:didReceiveData:': function (connection, data) {
          this.data.appendData(data)
        }
      })
    }

    var connectionDelegate = DelegateClass.new()
    connectionDelegate.callbacks = NSDictionary.dictionaryWithDictionary({
      resolve: resolve,
      reject: reject
    })
    connectionDelegate.fiber = fiber;

    var connection = NSURLConnection.alloc().initWithRequest_delegate(
      request,
      connectionDelegate
    )

    if (fiber) {
      fiber.onCleanup(function () {
        if (!finished) {
          connection.cancel()
        }
      })
    }

  })
}

module.exports = fetch

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/promise-polyfill/lib/index.js */ "./node_modules/promise-polyfill/lib/index.js")))

/***/ }),

/***/ "./src/common.js":
/*!***********************!*\
  !*** ./src/common.js ***!
  \***********************/
/*! exports provided: canvasCreate, canvasCreateMulti, fetchData, processData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(fetch) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasCreate", function() { return canvasCreate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasCreateMulti", function() { return canvasCreateMulti; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchData", function() { return fetchData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processData", function() { return processData; });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// function that returns all parameters of canvas
function canvasCreate(context) {
  var selection = context.selection;
  var doc = context.document;
  var page = "";
  var canvasCount = selection.length;
  var canvas = {
    layer: selection[0],
    height: selection[0].frame().height(),
    width: selection[0].frame().width(),
    x: selection[0].frame().x(),
    y: selection[0].frame().y(),
    doc: doc
  };
  return canvas;
}
function canvasCreateMulti(context) {
  var selection = context.selection;
  var doc = context.document;
  var page = "";
  var canvasCount = selection.length;
  var heights = [],
      widths = [],
      xs = [],
      ys = [];

  for (var i = 0; i < selection.length; i++) {
    heights[i] = selection[i].frame().height();
    widths[i] = selection[i].frame().width();
    xs[i] = selection[i].frame().x();
    ys[i] = selection[i].frame().y();
  }

  var canvas = {
    layer: selection,
    height: heights,
    width: widths,
    x: xs,
    y: ys,
    doc: doc
  };
  return canvas;
}
function fetchData(popupDataObj) {
  var url = popupDataObj.url,
      keys = popupDataObj.key,
      dataTable = new Array(),
      dataMax = new Array(),
      dataMin = new Array();
  return fetch(url).then(function (res) {
    return res.json();
  }).then(function (dataJSON) {
    //return an array of values that match on a certain key
    function getValues(obj, key) {
      var objects = [];

      for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;

        if (_typeof(obj[i]) == 'object') {
          objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
          objects.push(obj[i]);
        }
      }

      return objects;
    }

    for (var i in keys) {
      var row = getValues(dataJSON, keys[i]);

      for (var j in row) {
        row[j] = parseFloat(row[j]).toFixed(2);
      }

      dataTable[i] = row;
      dataMax[i] = Math.max.apply(Math, _toConsumableArray(dataTable[i]));
      dataMin[i] = Math.min.apply(Math, _toConsumableArray(dataTable[i]));
    }

    var data = {
      table: dataTable,
      max: Math.max.apply(Math, dataMax),
      min: Math.min.apply(Math, dataMin),
      rows: dataTable.length,
      columns: dataTable[0].length
    };
    dataObj = data;
    return dataObj;
  });
}
function processData(type) {
  // function that search non numeric data in pasteBoard
  var pasteBoard = NSPasteboard.generalPasteboard();
  var stringPasteboard = String(pasteBoard.stringForType(NSPasteboardTypeString));

  function searchInPasteBoard(pasteBoard) {
    var onlyNumbers = pasteBoard.replace(/[^\w]/g, "");
    var letterReg = /[a-zA-z]/;
    return letterReg.test(onlyNumbers);
  }

  var letters = searchInPasteBoard(stringPasteboard); // if 0 — only numbers

  var dataObj,
      popupDataObj = {
    key: ""
  },
      dataTable = new Array(),
      dataMax = new Array(),
      dataMin = new Array();

  switch (letters) {
    case false:
      {
        var dataCreate = function dataCreate(pasteBoard) {
          var dataRows = pasteBoard.replace(/[\t]/g, ", ").split("\n");

          for (var i in dataRows) {
            dataTable[i] = dataRows[i].replace(/[\s]/g, "").split(",");

            for (var j in dataTable[i]) {
              dataTable[i][j] = parseFloat(dataTable[i][j]);
            }

            dataMax[i] = Math.max.apply(Math, _toConsumableArray(dataTable[i]));
            dataMin[i] = Math.min.apply(Math, _toConsumableArray(dataTable[i]));
          } // For MAX and MIN add support of stacked charts


          var data = {
            table: dataTable,
            max: Math.max.apply(Math, dataMax),
            min: Math.min.apply(Math, dataMin),
            rows: dataTable.length,
            columns: dataTable[0].length
          };
          return data;
        };

        ;
        dataObj = dataCreate(stringPasteboard);
        return [dataObj, false];
        break;
      }

    case true:
      {
        // Make sure that Sparklines, Progress Bar and Gauge Chart is OK
        var dataRequestPopup = function dataRequestPopup(nameOne, nameTwo) {
          var randomView = NSView.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 260.0, 40.0));
          var rowsInput = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 15.0, 120.0, 25.0));
          rowsInput.cell().setPlaceholderString(nameOne);
          randomView.addSubview(rowsInput);
          var columnsInput = "";

          if (nameTwo != "") {
            columnsInput = NSTextField.alloc().initWithFrame(NSMakeRect(140.0, 15.0, 120.0, 25.0));
            columnsInput.cell().setPlaceholderString(nameTwo);
            randomView.addSubview(columnsInput);
          }

          var apiView = NSView.alloc().initWithFrame(NSMakeRect(0.0, 0.0, 260.0, 75.0));
          var keyJSON = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 15.0, 260.0, 25.0));
          keyJSON.cell().setPlaceholderString("Type keys in JSON to visualize it");
          apiView.addSubview(keyJSON);
          var urlJSON = NSTextField.alloc().initWithFrame(NSMakeRect(0.0, 50.0, 260.0, 25.0));
          urlJSON.cell().setPlaceholderString("Type url to JSON");
          apiView.addSubview(urlJSON);
          var alert = COSAlertWindow.new();
          alert.setMessageText("Data for Chart");
          alert.addTextLabelWithValue("Random data");
          alert.addAccessoryView(randomView);
          alert.addTextLabelWithValue("or data from JSON");
          alert.addAccessoryView(apiView);
          alert.addButtonWithTitle("OK");
          alert.addButtonWithTitle("Cancel");
          alert.alert().window().setInitialFirstResponder(rowsInput);

          if (nameTwo != "") {
            rowsInput.setNextKeyView(columnsInput);
          }

          urlJSON.setNextKeyView(keyJSON); // Run popup

          var responseCode = alert.runModal();
          var rowsCount = rowsInput.stringValue(),
              columnsCount = columnsInput.stringValue(),
              urlJSONString = urlJSON.stringValue(),
              keyJSONString = "";
          var test = keyJSON.stringValue();

          if (test.length() > 1) {
            keyJSONString = keyJSON.stringValue().replace(/[\s]/g, "").split(",");
          }

          var popupData = {};
          return popupData = {
            rows: rowsCount,
            columns: columnsCount,
            url: urlJSONString,
            key: keyJSONString
          };
        };

        // Random data generaton
        var createRandomData = function createRandomData(rows, columns, type) {
          var dataMaxNumber = 100,
              dataRow = new Array();

          for (var i = 0; i < rows; i++) {
            if (type == "circle") {
              var startRandNumber = 60,
                  counterNumber = 0;

              for (var j = 0; j < columns - 1; j++) {
                dataRow[j] = Math.round(Math.random() * (dataMaxNumber - startRandNumber));
                counterNumber = counterNumber + dataRow[j];
                startRandNumber = counterNumber;
              }

              dataRow[columns - 1] = dataMaxNumber - counterNumber;
            } else {
              for (var _j = 0; _j < columns; _j++) {
                // Improve random data generation algorithm !!!
                dataRow[_j] = (Math.random() * dataMaxNumber).toFixed(0);
              }
            }

            dataTable[i] = dataRow;
            dataRow = [];
            dataMax[i] = Math.max.apply(Math, _toConsumableArray(dataTable[i]));
            dataMin[i] = Math.min.apply(Math, _toConsumableArray(dataTable[i]));
          }

          var data = {
            table: dataTable,
            max: Math.max.apply(Math, dataMax),
            min: Math.min.apply(Math, dataMin),
            rows: dataTable.length,
            columns: dataTable[0].length
          };
          return data;
        };

        popupDataObj = dataRequestPopup("Categories", "Items");
        ;

        if (popupDataObj.url != "") {
          return [popupDataObj, true];
        } else {
          dataObj = createRandomData(popupDataObj.rows, popupDataObj.columns, type);
          return [dataObj, false];
        }

        break;
      }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/sketch-polyfill-fetch/lib/index.js */ "./node_modules/sketch-polyfill-fetch/lib/index.js")))

/***/ }),

/***/ "./src/donutchart.js":
/*!***************************!*\
  !*** ./src/donutchart.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nicenum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nicenum */ "./src/nicenum.js");
/* harmony import */ var _selectionToGroup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectionToGroup */ "./src/selectionToGroup.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "./src/common.js");



/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var fetch = __webpack_require__(/*! sketch-polyfill-fetch */ "./node_modules/sketch-polyfill-fetch/lib/index.js");

  var url = context.plugin.urlForResourceNamed("params.json");
  var result = NSString.stringWithContentsOfFile_encoding_error(url, NSUTF8StringEncoding, null);
  var params = JSON.parse(result);
  var canvas = Object(_common__WEBPACK_IMPORTED_MODULE_2__["canvasCreateMulti"])(context);
  canvas.doc.currentPage().changeSelectionBySelectingLayers_([]);

  function createPieChart(Num) {
    var radius = canvas.width[Num] / 2 - params.donutBorder / 2,
        x0 = canvas.x[Num] + canvas.width[Num] / 2,
        y0 = canvas.y[Num],
        yCenter = y0 + canvas.width[Num] / 2,
        startAngle = -90,
        endAngle = 0,
        addAngle = 0;
    var sortedItems = new Array();
    sortedItems = dataObj.table[Num];

    function compareNumeric(a, b) {
      return b - a;
    }

    sortedItems.sort(compareNumeric);

    for (var j = 0; j < dataObj.columns; j++) {
      endAngle = sortedItems[j] * 3.6 - 90 + addAngle;
      var arc = NSBezierPath.bezierPath();
      arc.appendBezierPathWithArcWithCenter_radius_startAngle_endAngle(NSMakePoint(x0, yCenter), radius, startAngle, endAngle);
      addAngle = endAngle + 90;
      startAngle = endAngle; // Create shape from path

      var newBezier = MSPath.pathWithBezierPath(arc);
      var arcShape = MSShapeGroup.shapeWithBezierPath(newBezier);
      var border = arcShape.style().addStylePartOfType(1);
      border.color = MSColor.colorWithRed_green_blue_alpha(params.colorPalete[j][0] / 255, params.colorPalete[j][1] / 255, params.colorPalete[j][2] / 255, 1);
      border.thickness = params.donutBorder;
      arcShape.setName("c_donut_" + (j + 1));
      var arcArray = NSArray.arrayWithArray([arcShape]); // Add arc on artboard

      if (canvas.doc.currentPage().currentArtboard() === null) {
        canvas.doc.currentPage().addLayers(arcArray);
      } else {
        canvas.doc.currentPage().currentArtboard().addLayers(arcArray);
      }

      arcShape.select_byExpandingSelection(true, true);
    }

    ;
    canvas.layer[Num].select_byExpandingSelection(true, true);
    Object(_selectionToGroup__WEBPACK_IMPORTED_MODULE_1__["selectionToGroup"])(canvas, "Donut chart");
  }

  function drawChart() {
    for (var i = 0; i < canvas.layer.length; i++) {
      var maxSpark = Math.max.apply(null, dataObj.table[i]);
      var minSpark = Math.min.apply(null, dataObj.table[i]);
      var niceScales = Object(_nicenum__WEBPACK_IMPORTED_MODULE_0__["calculateNiceNum"])(minSpark, maxSpark);
      dataObj.niceMax = niceScales.niceMaximum;
      dataObj.niceMin = niceScales.niceMinimum;

      if (canvas.layer[0].isKindOfClass(MSShapeGroup)) {
        createPieChart(i);
      } else {
        var plot = canvas.layer[i].firstLayer();
        canvas.height[i] = plot.frame().height();
        canvas.width[i] = plot.frame().width();
        canvas.x[i] = plot.frame().x() + canvas.layer[i].frame().x();
        canvas.y[i] = plot.frame().y() + canvas.layer[i].frame().y();
        plot.duplicate();
        var layersInGroup = canvas.layer[i].containedLayersCount();
        canvas.layer[i].layerAtIndex(0).select_byExpandingSelection(true, true);

        for (var z = 0; z < layersInGroup - 1; z++) {
          var layer = canvas.layer[i].layerAtIndex(1);
          layer.removeFromParent();
        }

        canvas.layer[i].ungroup();
        createPieChart(i);
      }
    }
  }

  var dataObjArray = Object(_common__WEBPACK_IMPORTED_MODULE_2__["processData"])("circle");
  var dataObj = 0;

  if (dataObjArray[1] === false) {
    dataObj = dataObjArray[0];
    drawChart();
  } else {
    Object(_common__WEBPACK_IMPORTED_MODULE_2__["fetchData"])(dataObjArray[0]).then(function (response) {
      dataObj = response;
      drawChart();
    });
  }
});

/***/ }),

/***/ "./src/nicenum.js":
/*!************************!*\
  !*** ./src/nicenum.js ***!
  \************************/
/*! exports provided: calculateNiceNum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateNiceNum", function() { return calculateNiceNum; });
function calculateNiceNum(minNum, maxNum) {
  // Nice max and min functions
  var minPoint,
      maxPoint,
      maxTicks = 10,
      range,
      tickSpacing,
      niceMin,
      niceMax;
  /**
   * Instantiates a new instance of the NiceScale class.
   *
   *  min the minimum data point on the axis
   *  max the maximum data point on the axis
   */

  function niceScale(min, max) {
    minPoint = min;
    maxPoint = max;
    calculate();
    return {
      niceMinimum: niceMin,
      niceMaximum: niceMax
    };
  }
  /**
   * Calculate and update values for tick spacing and nice
   * minimum and maximum data points on the axis.
   */


  function calculate() {
    range = niceNum(maxPoint - minPoint, false);
    tickSpacing = niceNum(range / (maxTicks - 1), true);
    niceMin = Math.floor(minPoint / tickSpacing) * tickSpacing;
    niceMax = Math.ceil(maxPoint / tickSpacing) * tickSpacing;
  }
  /**
   * Returns a "nice" number approximately equal to range Rounds
   * the number if round = true Takes the ceiling if round = false.
   *
   *  localRange the data range
   *  round whether to round the result
   *  a "nice" number to be used for the data range
   */


  function niceNum(localRange, round) {
    var exponent;
    /** exponent of localRange */

    var fraction;
    /** fractional part of localRange */

    var niceFraction;
    /** nice, rounded fraction */

    exponent = Math.floor(Math.log10(localRange));
    fraction = localRange / Math.pow(10, exponent);

    if (round) {
      if (fraction < 1.5) niceFraction = 1;else if (fraction < 3) niceFraction = 2;else if (fraction < 7) niceFraction = 5;else niceFraction = 10;
    } else {
      if (fraction <= 1) niceFraction = 1;else if (fraction <= 2) niceFraction = 2;else if (fraction <= 5) niceFraction = 5;else niceFraction = 10;
    }

    return niceFraction * Math.pow(10, exponent);
  }

  return niceScale(minNum, maxNum);
}

/***/ }),

/***/ "./src/selectionToGroup.js":
/*!*********************************!*\
  !*** ./src/selectionToGroup.js ***!
  \*********************************/
/*! exports provided: selectionToGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectionToGroup", function() { return selectionToGroup; });
function selectionToGroup(canvas, chartName) {
  // Push all selected layers to array
  var allLayers = "";

  if (canvas.doc.currentPage().currentArtboard() === null) {
    allLayers = canvas.doc.currentPage().layers();
  } else {
    allLayers = canvas.doc.currentPage().currentArtboard().layers();
  }

  var layersCount = allLayers.count(),
      selectedLayers = new Array(),
      sortedLayers = new Array(),
      selectedLayer = "",
      layersMeta = [];

  for (var l = 0; l < layersCount; l++) {
    selectedLayer = allLayers[l].isSelected();

    if (selectedLayer == true) {
      selectedLayers.push({
        "name": allLayers[l].name().toLowerCase(),
        "layer": allLayers[l]
      });
    }

    ;
  }

  ;

  function compareObjects(a, b) {
    if (a.name < b.name) {
      return 1;
    }

    if (a.name > b.name) {
      return -1;
    }

    return 0;
  }

  ;
  selectedLayers.sort(compareObjects);

  for (var _l = 0; _l < selectedLayers.length; _l++) {
    sortedLayers.push(selectedLayers[_l].layer);
  }

  ; // Group from selected layers

  var layersToAdd = MSLayerArray.arrayWithLayers(sortedLayers);
  var newGroup = MSLayerGroup.groupFromLayers(layersToAdd);
  newGroup.setName(chartName);
  canvas.doc.currentPage().changeSelectionBySelectingLayers_([]);
}

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=donutchart.js.map
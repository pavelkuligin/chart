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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/panel.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/MochaJSDelegate.js":
/*!********************************!*\
  !*** ./src/MochaJSDelegate.js ***!
  \********************************/
/*! exports provided: MochaJSDelegate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MochaJSDelegate", function() { return MochaJSDelegate; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//
//  MochaJSDelegate.js
//  MochaJSDelegate
//
//  Created by Matt Curtis
//  Copyright (c) 2015. All rights reserved.
//
var MochaJSDelegate = function MochaJSDelegate(selectorHandlerDict) {
  var uniqueClassName = "MochaJSDelegate_DynamicClass_" + NSUUID.UUID().UUIDString();
  var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, NSObject);
  delegateClassDesc.registerClass(); //	Handler storage

  var handlers = {}; //	Define interface

  this.setHandlerForSelector = function (selectorString, func) {
    var handlerHasBeenSet = selectorString in handlers;
    var selector = NSSelectorFromString(selectorString);
    handlers[selectorString] = func;

    if (!handlerHasBeenSet) {
      /*
      	For some reason, Mocha acts weird about arguments:
      	https://github.com/logancollins/Mocha/issues/28
      		We have to basically create a dynamic handler with a likewise dynamic number of predefined arguments.
      */
      var dynamicHandler = function dynamicHandler() {
        var functionToCall = handlers[selectorString];
        if (!functionToCall) return;
        return functionToCall.apply(delegateClassDesc, arguments);
      };

      var args = [],
          regex = /:/g;
      var match;

      while (match = regex.exec(selectorString)) {
        args.push("arg" + args.length);
      }

      dynamicFunction = eval("(function(" + args.join(",") + "){ return dynamicHandler.apply(this, arguments); })");
      delegateClassDesc.addInstanceMethodWithSelector_function_(selector, dynamicFunction);
    }
  };

  this.removeHandlerForSelector = function (selectorString) {
    delete handlers[selectorString];
  };

  this.getHandlerForSelector = function (selectorString) {
    return handlers[selectorString];
  };

  this.getAllHandlers = function () {
    return handlers;
  };

  this.getClass = function () {
    return NSClassFromString(uniqueClassName);
  };

  this.getClassInstance = function () {
    return NSClassFromString(uniqueClassName).new();
  }; //	Conveience


  if (_typeof(selectorHandlerDict) == "object") {
    for (var selectorString in selectorHandlerDict) {
      this.setHandlerForSelector(selectorString, selectorHandlerDict[selectorString]);
    }
  }
};

/***/ }),

/***/ "./src/panel.js":
/*!**********************!*\
  !*** ./src/panel.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MochaJSDelegate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MochaJSDelegate */ "./src/MochaJSDelegate.js");

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  // Panel
  var panelWidth = 80;
  var panelHeight = 268; // Create the panel and set its appearance

  var panel = NSPanel.alloc().init();
  panel.setFrame_display(NSMakeRect(0, 0, panelWidth, panelHeight), true);
  panel.setStyleMask(NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask | NSFullSizeContentViewWindowMask);
  panel.setBackgroundColor(NSColor.whiteColor()); // Set the panel's title and title bar appearance

  panel.title = "";
  panel.titlebarAppearsTransparent = true; // Center and focus the panel

  panel.center();
  panel.makeKeyAndOrderFront(null);
  panel.setLevel(NSFloatingWindowLevel); // Make the plugin's code stick around (since it's a floating panel)

  COScript.currentCOScript().setShouldKeepAround_(true); // Hide the Minimize and Zoom button

  panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
  panel.standardWindowButton(NSWindowZoomButton).setHidden(true); // Create the blurred background

  var vibrancy = NSVisualEffectView.alloc().initWithFrame(NSMakeRect(0, 0, panelWidth, panelHeight));
  vibrancy.setAppearance(NSAppearance.appearanceNamed(NSAppearanceNameVibrantLight));
  vibrancy.setBlendingMode(NSVisualEffectBlendingModeBehindWindow); // Create the WebView with a request to a Web page in Contents/Resources/

  var webView = WebView.alloc().initWithFrame(NSMakeRect(0, 0, panelWidth, panelHeight - 44));
  var request = NSURLRequest.requestWithURL(context.plugin.urlForResourceNamed("webView.html"));
  webView.mainFrame().loadRequest(request);
  webView.setDrawsBackground(false); // Access the Web page's JavaScript environment

  var windowObject = webView.windowScriptObject(); // Create the delegate

  var delegate = new _MochaJSDelegate__WEBPACK_IMPORTED_MODULE_0__["MochaJSDelegate"]({
    // Listen to the page loading state
    "webView:didFinishLoadForFrame:": function webViewDidFinishLoadForFrame(webView, webFrame) {
      // Get the current selection
      var selection = context.selection;

      if (selection.length == 1) {
        // Send the CSS attributes as a string to the Web page
        windowObject.evaluateWebScript("updatePreview('" + selection[0].CSSAttributes().join(" ") + "')");
      } else {
        // Or send an empty string to the Web page
        windowObject.evaluateWebScript("updatePreview(' ')");
      }
    },
    // Listen to URL changes
    "webView:didChangeLocationWithinPageForFrame:": function webViewDidChangeLocationWithinPageForFrame(webView, webFrame) {
      // Extract the URL hash (without #) by executing JavaScript in the Web page
      var hash = windowObject.evaluateWebScript("window.location.hash.substring(1)"); // Parse the hash's JSON content

      var data = JSON.parse(hash); // Launch a Sketch action and focus the main window

      var utils = context;
      var doc = utils.doc;
      var command = utils.command;
      var scriptPath = utils.scriptPath;
      var pluginURLString = scriptPath.stringByDeletingLastPathComponent().stringByDeletingLastPathComponent().stringByDeletingLastPathComponent(); // Making new context

      var ctx = utils;
      var fullContext = command.fullContextFromContext_url_(ctx, utils.scriptURL);
      var pluginUrl = NSURL.fileURLWithPath(pluginURLString);
      log('Before Run Plugin Command');
      NSApp.delegate().runPluginCommandWithIdentifier_fromBundleAtURL_context(data.action, pluginUrl, fullContext);
      log('After Run Plugin Command');
      NSApp.mainWindow().makeKeyAndOrderFront(null);
    }
  }); // Set the delegate on the WebView

  webView.setFrameLoadDelegate_(delegate.getClassInstance()); // Add the content views to the panel

  panel.contentView().addSubview(vibrancy);
  panel.contentView().addSubview(webView); // Create an NSThread dictionary with a specific identifier

  var threadDictionary = NSThread.mainThread().threadDictionary();
  var identifier = "co.awkward.floatingexample"; // If there's already a panel, prevent the plugin from running

  if (threadDictionary[identifier]) return; // After creating the panel, store a reference to it

  threadDictionary[identifier] = panel;
  var closeButton = panel.standardWindowButton(NSWindowCloseButton); // Assign a function to the Close button

  closeButton.setCOSJSTargetFunction(function (sender) {
    panel.close(); // Remove the reference to the panel

    threadDictionary.removeObjectForKey(identifier); // Stop the plugin

    COScript.currentCOScript().setShouldKeepAround_(false);
  });
});

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=panel.js.map
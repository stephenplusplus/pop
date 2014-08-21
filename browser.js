!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.popIt=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
module.exports = function (fn) {
	if (typeof fn !== 'function') {
		throw new TypeError('Expected a function');
	}

	if (fn.length === 0) {
		return [];
	}

	// from https://github.com/jrburke/requirejs
	var reComments = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;

	var reFnArgs = /^function\s*[^(]*\(([^)]+)\)/;

	var match = reFnArgs.exec(fn.toString().replace(reComments, ''));

	return match ? match[1].split(',').map(function (el) {
		return el.trim();
	}) : [];
};

},{}],2:[function(require,module,exports){
'use strict';

var fnArgs = require('fn-args');
var poppies = {};

function isRegistering(name) {
  return typeof name === 'string';
}

function getDep(name) {
  if (!name) {
    throw new Error('No dependencies specified?');
  }
  if (!poppies[name]) {
    throw new Error('Couldn\'t Pop: ' + name);
  }
  if (typeof poppies[name].value === 'function') {
    return poppies[name].value.bind(poppies[name].context);
  } else {
    return poppies[name].value;
  }
}

function register(name, value, context) {
  poppies[name] = {
    value: value,
    context: context
  };
}

function pop(name, value) {
  if (isRegistering(name)) {
    register.apply(null, [].slice.call(arguments));
    return;
  }

  var fn = arguments[0];
  var context = arguments[arguments.length - 1];

  return function () {
    return fn.apply(context, fnArgs(fn).map(getDep));
  };
}

module.exports = pop;

},{"fn-args":1}]},{},[2])(2)
});
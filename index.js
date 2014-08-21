'use strict';

var poppies = {};
var DEP_REGEX = /function\s*\(([^\)]*)/;

function isRegistering(name) {
  return typeof name === 'string';
}

function trim(str) {
  return str.trim();
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

function getDeps(fn) {
  var deps = [];
  if (DEP_REGEX.test(fn.toString())) {
    deps = fn.toString().match(DEP_REGEX)[1].split(',').map(trim).map(getDep);
  }
  return deps;
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
    return fn.apply(context, getDeps(fn));
  };
}

module.exports = pop;

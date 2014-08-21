var assert = require('assert');
var pop = require('./');

describe('pop', function () {
  it('should inject string', function (done) {
    pop('dev', 'stephen');
    pop(function (dev) {
      assert.equal(dev, 'stephen');
      done();
    })();
  });

  it('should inject fn', function (done) {
    pop('fn', function () {
      return 'HI!';
    });
    pop(function (fn) {
      assert.equal(fn(), 'HI!');
      done();
    })();
  });

  it('should bind context', function (done) {
    pop('fnWithContext', function () {
      assert.deepEqual(this, { hi: 'there' });
      done();
    }, { hi: 'there' });
    pop(function (fnWithContext) {
      fnWithContext();
      assert.deepEqual(this, { hi: 'there again' });
    }, { hi: 'there again' })();
  });

  it('should not pop function values\' dependencies', function (done) {
    pop('fnThatTakesAnArg', function (cb) {
      cb();
    });
    pop(function (fnThatTakesAnArg) {
      fnThatTakesAnArg(done);
    })();
  });

  it('should pop popped function values\' dependencies', function (done) {
    pop('str', 'poppy-pop-pop');
    pop('popFn', pop(function (str) {
      return str;
    }));
    pop(function (popFn) {
      assert.equal(popFn(), 'poppy-pop-pop');
      done();
    })();
  });

  it('should be lazy', function (done) {
    pop('B', pop(function (A) {
      assert.equal(A, 'a');
    }));
    pop('A', 'a');
    pop(function (B) {
      B();
      done();
    })();
  });
});

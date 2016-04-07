function applyMiddleware (...middlewares) {
  console.log('middlewares', middlewares);
  return function (input) {
    function done () {
      console.log('done');
    }
    var last = middlewares[middlewares.length - 1];
    var rest = middlewares.slice(0, -1);

    var middleware = rest.reduceRight((composed, fn) => fn(composed), last(done));
    return middleware(input);
  }
}

function a (next) {
  return function (input) {
    console.log('a called with', input);
    next(input)
  }
}

function b (next) {
  return function (input) {
    console.log('b called with', input);
    next(input);
  }
}

function c (next) {
  return function (input) {
    console.log('c called with', input);
    next(input);
  }
}


var composed = applyMiddleware(a, b, c);

composed('foobar');

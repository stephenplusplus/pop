# pop-it
> Angular-style Dependency Injection for Node.js & the browser.


## Angular-y DI is fun.

So, "inject" some fun into your app.

##### `Node.js`
```sh
$ npm install --save pop-it
```
```js
var pop = require('pop-it');

pop('aPoppy', 'This is it!');

pop(function (aPoppy) {
  // aPoppy = 'This is it!'
})();
```

##### `The Browser`
```html
<script src="pop-it/browser.js"></script>
```
```js
pop('shoop', 'a-doop');

pop(function (shoop) {
  // shoop = 'a-doop'
})();
```


## Register a dependency (internally known as a poppy)

A poppy can be any value.

```js
// Num nums.
pop('num', 3);

// Stringilings.
pop('str', 'String!');

// Funkadunks.
pop('fn', function () {
  return this;
}, { optional: 'context' });
```


## Execute a poppy

Assume we registered the above dependencies.

```js
pop(function (num, str, fn) {
  // num = 3
  // str = 'String!'
  // fn() = { optional: 'context' }
})();
```

Poppies are executed lazily, so your ordering isn't super important. Watch how
we register a popped function to a poppy.

```js
// register "b" with the value of a lazily-executed popped function.
pop('b', pop(function (a) {
  return a;
}));

pop('a', 'a');

pop(function (b) {
  // b() = 'a'
})();
```


## Pop to the It.
![](http://i.imgur.com/egAMSu0.gif)


## License
Copyright (c) 2014 Stephen Sawchuk. Licensed under the MIT license.

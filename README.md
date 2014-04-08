# typedarray-to-buffer [![travis](http://img.shields.io/travis/feross/typedarray-to-buffer.svg)](https://travis-ci.org/feross/typedarray-to-buffer) [![npm](http://img.shields.io/npm/v/typedarray-to-buffer.svg)](https://npmjs.org/package/typedarray-to-buffer) [![gittip](http://img.shields.io/gittip/feross.svg)](https://www.gittip.com/feross/)

### Convert a typed array to a [Buffer](https://github.com/feross/buffer) without a copy.

[![testling badge](https://ci.testling.com/feross/buffer.png)](https://ci.testling.com/feross/buffer)

Say you're using the ['buffer'](https://github.com/feross/buffer) module on npm, or
[browserify](http://browserify.org/) and you're working with lots of binary data.
Creating lots of Buffers here and Buffers there...

Unfortunately, sometimes the browser or someone elses API gives you back an
`ArrayBuffer` or typed array (`Uint8Array`, etc.) and you need to convert it to a
`Buffer` so you can work with it easily. What do you do?

Of course: `new Buffer(uint8array)`.

But, alas, every time you do `new Buffer(uint8array)`, the entire array gets **copied** into
a new typed array. The `Buffer` constructor does a copy. This is defined by the
[node docs](http://nodejs.org/api/buffer.html), so it can't be changed. The 'buffer'
module matches the node API exactly.

So, what can you do if you're
[writing a performance critical application](https://github.com/feross/buffer/issues/22)
and can't afford extra copies for no good reason? *Use this module, of course!*

## install

```bash
npm install typedarray-to-buffer
```

## usage

To convert a typed array to a `Buffer` without a copy, do this:

```js
var toBuffer = require('typedarray-to-buffer')
var Buffer = require('buffer/').Buffer  // omit this line if you're using `browserify`

var arr = new Uint8Array([1, 2, 3])
arr = toBuffer(arr)

// arr is a buffer now!

arr.toString()  // '\u0001\u0002\u0003'
arr.readUInt16BE(0)  // 258
```

## some advanced details

In the case that the browser actually supports typed arrays, you don't even need to use
the return value of `toBuffer` since **the original Uint8Array has been augmented**
with all the methods from `Buffer`. See
[how does Buffer work?](https://github.com/feross/buffer#how-does-it-work) for why we do
this.

If the browser doesn't support typed arrays then the only way we can give a buffer is to
return it you. So, just always use the return value if you want to support all browsers!

## license

MIT. Copyright (C) [Feross Aboukhadijeh](http://feross.org), Romain Beauxis, and other contributors.

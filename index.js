/**
 * Convert a typed array to a Buffer without a copy
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install typedarray-to-buffer`
 */

var isTypedArray = require('is-typedarray').strict

module.exports = function (arr) {
  // If `Buffer` is the browser `buffer` module, and the browser supports typed arrays,
  // then avoid a copy. Otherwise, create a `Buffer` with a copy.
  if (isTypedArray(arr)) {
    if (!Buffer.TYPED_ARRAY_SUPPORT) {
      // This is not faster than new Buffer(arr), but it has different semantics,
      // because it uses 4 bytes instead of one per element for Uint32Array.
      return new Buffer(new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength))
    }
    // Use the typed array's underlying ArrayBuffer to back new Buffer. This respects
    // the "view" on the ArrayBuffer, i.e. byteOffset and byteLength. No copy.
    var buffer = new Buffer(arr.buffer)
    if (arr.byteLength !== buffer.length) {
      buffer = buffer.slice(arr.byteOffset, arr.byteOffset + arr.byteLength)
    }
    return buffer
  } else {
    // Unsupported type, just pass it through to the `Buffer` constructor.
    return new Buffer(arr)
  }
}

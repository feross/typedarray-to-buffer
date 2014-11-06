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
  if (typeof Buffer._augment === 'function' && Buffer.TYPED_ARRAY_SUPPORT) {
    // If `Buffer` is the browser `buffer` module, and the browser supports typed arrays,
    // then avoid a copy.
    if (arr instanceof Uint8Array) {
      return Buffer._augment(arr)
    } else if (isTypedArray(arr)) {
      return Buffer._augment(new Uint8Array(arr))
    }
  }

  // Otherwise, fallback to creating a `Buffer` with a copy.
  return new Buffer(arr)
}

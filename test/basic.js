var test = require('tape')
var toBuffer = require('../')

test('convert to buffer from uint8array', function (t) {
  if (typeof Uint8Array !== 'undefined') {
    var arr = new Uint8Array([1, 2, 3])
    arr = toBuffer(arr)

    t.deepEqual(arr, new Buffer([1, 2, 3]), 'contents equal')
    t.ok(Buffer.isBuffer(arr), 'is buffer')
    t.equal(arr.readUInt8(0), 1)
    t.equal(arr.readUInt8(1), 2)
    t.equal(arr.readUInt8(2), 3)
  } else {
    t.pass('browser lacks uint8array support, skip test')
  }
  t.end()
})

test('convert to buffer from another array type (uint32array)', function (t) {
  if (typeof Uint32Array !== 'undefined') {
    var arr = new Uint32Array([1, 2, 3])
    arr = toBuffer(arr)

    t.deepEqual(arr, new Buffer([1, 2, 3]), 'contents equal')
    t.ok(Buffer.isBuffer(arr), 'is buffer')
    t.equal(arr.readUInt8(0), 1)
    t.equal(arr.readUInt8(1), 2)
    t.equal(arr.readUInt8(2), 3)
    t.equal(arr instanceof Uint8Array, !!Buffer.TYPED_ARRAY_SUPPORT)

  } else {
    t.pass('browser lacks uint32array support, skip test')
  }
  t.end()
})

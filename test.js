'use strict'

var test = require('tape')
var JSONParse = require('./')

test('parsing an object', function (assert) {
  var obj = { cat: 'Peter', colors: ['black', 'white'], age: 1 }
  var str = JSON.stringify(obj)
  var parse = JSONParse(str)
  assert.deepEqual(undefined, parse.error)
  assert.deepEqual('object', typeof parse.value)
  assert.deepEqual(parse.value.cat, obj.cat)
  assert.end()
})

test('parsing the package.json should fail', function (assert) {
  var parse = JSONParse(require('./package.json'))
  assert.deepEqual(undefined, parse.value)
  assert.ok(parse.error instanceof Error)
  assert.equal('SyntaxError', parse.error.name)
  assert.end()
})

test('parsing an object and use a reviver function', function (assert) {
  var obj = { age: 10 }
  var str = JSON.stringify(obj)
  var parse = JSONParse(str, function (k, v) {
    if (!k) {
      return v
    } else {
      return v * 2
    }
  })
  assert.deepEqual(undefined, parse.error)
  assert.deepEqual('object', typeof parse.value)
  assert.deepEqual(parse.value.age, obj.age * 2)
  assert.end()
})

test('another bad stringify object should fail',
  function (assert) {
    var str = '{cat: "Peter" age: 1}'
    var parse = JSONParse(str)
    assert.deepEqual(undefined, parse.value)
    assert.ok(parse.error instanceof Error)
    assert.equal('SyntaxError', parse.error.name)
    assert.end()
  })

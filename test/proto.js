var ini = require('../')
var t = require('tap')

var data = '__proto__ = quux\n' +
'foo = baz\n' +
'[__proto__]\n' +
'foo = bar\n' +
'[other]\n' +
'foo = asdf\n' +
'[kid.__proto__.foo]\n' +
'foo = kid\n' +
'[arrproto]\n' +
'hello = snyk\n' +
'__proto__[] = you did a good job\n' +
'__proto__[] = so you deserve arrays\n' +
'thanks = true\n'
var res = ini.parse(data)
t.deepEqual(res, {
  foo: 'baz',
  other: {
    foo: 'asdf',
  },
  kid: {
    foo: {
      foo: 'kid',
    },
  },
  arrproto: {
    hello: 'snyk',
    thanks: true,
  },
})
t.equal(res.__proto__, Object.prototype)
t.equal(res.kid.__proto__, Object.prototype)
t.equal(res.kid.foo.__proto__, Object.prototype)
t.equal(res.arrproto.__proto__, Object.prototype)
t.equal(Object.prototype.foo, undefined)
t.equal(Object.prototype[0], undefined)
t.equal(Object.prototype['0'], undefined)
t.equal(Object.prototype[1], undefined)
t.equal(Object.prototype['1'], undefined)
t.equal(Array.prototype[0], undefined)
t.equal(Array.prototype[1], undefined)

const test = require('tap').test
const parse = require('../toml')

test('toml parsing', async t => {
  t.plan(4)
  const config = await parse('./test/config.toml')
  t.equal(config.all.enableHeader, true)
  t.equal(config.org['1234'].enableHeader, false)
  t.equal(config.org['4321'].enableHeader, false)
  t.equal(config.org['4321'].superSpeed, true)
})

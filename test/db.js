const test = require('tap').test
const db = require('../db')

test('load config', async t => {
  t.plan(1)
  await db.load('./test/config.toml')
  const res = await db.get('all')
  const value = JSON.parse(res[0].value.toString())
  t.equal(value.enableHeader, true)
})

const test = require('tap').test
const rimraf = require('rimraf')
const db = require('../db')('./test/.db')

test('load config', async t => {
  t.plan(1)
  await db.load('./test/config.toml')
  const res = await db.get('all')
  const value = JSON.parse(res[0].value.toString())
  t.equal(value.enableHeader, false)
})

test('cleanup', async t => {
  rimraf.sync('./test/.db')
  t.pass('all done!')
})

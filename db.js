const {promisify} = require('util')
const hyperdb = require('hyperdb')
const toml = require('./toml')

module.exports = (path, key) => {
  const db = hyperdb(path, key)

  const get = promisify(db.get.bind(db))
  const put = promisify(db.put.bind(db))
  const on = (event, fn) => {
    db.on(event, () => {
      fn(db.key, db.discoveryKey)
    })
  }

  const load = async p => {
    const config = await toml(p)
    const keys = Object.keys(config)
    const promises = keys.map(key => {
      return put(key, JSON.stringify(config[key]))
    })

    return Promise.all(promises)
  }

  return {
    db,
    load,
    get,
    put,
    on
  }
}

// i love you. <3

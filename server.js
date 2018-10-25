const Theodore = require('theodore')
const logger = require('pino')()
const app = new Theodore()
const net = require('./net')

let db

const run = (port, key, dbPath, bundle) => {
  db = require('./db')(dbPath, key)
  const lookup = key ? false : true
  const onlistener = () => {
    logger.info(`Listening on http://localhost:${port}`)
    db.on('ready', (key, discoveryKey) => {
      logger.info(`Serving key ${key.toString('hex')}`)
      net(db.db, discoveryKey, lookup)
      if (bundle) db.load(bundle)
    })
  }
  app.get('/', (req, res, params) => res.send('hello world', 200))
  app.get('/status', (req, res, params) => res.send('OK', 200))

  app.get('/feature/:key', async (req, res, params) => {
    const {key} = params
    try {
      const result = await db.get(key)
      const value = JSON.parse(result[0].value)
      res.json(value, 200)
    } catch (e) {
      res.json({
        msg: `no key: ${key}`
      }, 404)
    }
  })

  app.post('/feature/:key', async (req, res, params) => {
    res.send('OK', 200)
  })

  app.get('*', (req, res, params) => {
    res.send('nope', 404)
  })

  app.listen(port, onlistener)
}

module.exports = run
